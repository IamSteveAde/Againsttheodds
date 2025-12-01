"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Check, X, Loader2 } from "lucide-react"
import { toast } from "sonner"

export default function PaymentCallbackPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [status, setStatus] = useState<"verifying" | "success" | "failed" | "pending">("verifying")
  const [message, setMessage] = useState("Verifying your payment...")

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        // Get transaction reference from URL params (can be reference, merchantTransactionReference, or globalPayTransactionReference)
        const transactionRef = searchParams.get("reference") || 
                              searchParams.get("merchantTransactionReference") || 
                              searchParams.get("globalPayTransactionReference")
        
        if (!transactionRef) {
          setStatus("failed")
          setMessage("No transaction reference found")
          toast.error("Error", { description: "No transaction reference found" })
          return
        }

        // Retrieve order details from localStorage
        const pendingOrderStr = localStorage.getItem("pendingOrder")
        if (!pendingOrderStr) {
          setStatus("failed")
          setMessage("Order details not found")
          toast.error("Error", { description: "Order details not found. Please try ordering again." })
          return
        }

        const pendingOrder = JSON.parse(pendingOrderStr)

        // Verify payment with Tingo Payment API
        const verifyResponse = await fetch(
          `https://tingopayment.tingoradio.ai/api/Payment/verify/${transactionRef}`,
          {
            method: "GET",
            headers: {
              "accept": "text/plain",
            },
          }
        )

        if (!verifyResponse.ok) {
          throw new Error("Payment verification failed")
        }

        const verificationData = await verifyResponse.json()
        
        // Normalize payment status
        const paymentStatus = verificationData.paymentStatus?.toLowerCase()
        const isSuccessful = paymentStatus === "successful" || paymentStatus === "success"
        const isPending = paymentStatus === "pending"

        // Check payment status
        if (isPending) {
          // Payment is still pending
          setStatus("pending")
          setMessage("Payment is still pending. Please complete your payment to get your copy.")
          toast.warning("Payment Pending", {
            description: "Please complete your payment to get your copy of the book."
          })
          
          // Redirect to home after 3 seconds
          setTimeout(() => {
            router.push("/")
          }, 3000)
          return
        }

        if (isSuccessful) {
          // Payment successful, now submit to Lulu book endpoint
          setMessage("Payment verified! Submitting your order to Lulu...")

          // Prepare order data for Lulu book endpoint
          const luluOrderData = {
            transactionReference: transactionRef,
            customerFirstName: pendingOrder.formData.fullName.split(" ")[0],
            customerLastName: pendingOrder.formData.fullName.split(" ").slice(1).join(" ") || pendingOrder.formData.fullName.split(" ")[0],
            customerEmail: pendingOrder.formData.email,
            customerPhone: pendingOrder.formData.phone,
            shippingAddress: {
              addressLine1: pendingOrder.formData.addressLine1,
              city: pendingOrder.formData.city,
              postcode: pendingOrder.formData.postcode,
              stateCode: pendingOrder.formData.stateCode || "",
              country: pendingOrder.formData.country,
            },
            bookFormat: pendingOrder.selectedFormat,
            bookLanguage: pendingOrder.formData.language || "English",
            quantity: pendingOrder.quantity,
            totalAmount: pendingOrder.total,
            amountPaidNGN: pendingOrder.amountInNGN,
            orderDate: new Date().toISOString(),
          }

          const luluResponse = await fetch(process.env.NEXT_PUBLIC_LULU_ORDER_API || "/api/lulu-book-order", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(luluOrderData),
          })

          const luluResult = await luluResponse.json()

          if (luluResponse.ok && luluResult.success) {
            setStatus("success")
            setMessage("Order completed successfully! Your book will be printed and shipped soon.")
            
            toast.success("Order Successful!", {
              description: "Your book order has been submitted to Lulu. Check your email for confirmation."
            })
            
            // Clear pending order from localStorage
            localStorage.removeItem("pendingOrder")
            
            // Redirect to home page after 4 seconds
            setTimeout(() => {
              router.push("/")
            }, 4000)
          } else {
            throw new Error(luluResult.message || "Failed to submit order to Lulu")
          }
        } else {
          setStatus("failed")
          setMessage("Payment was not successful. Please try again.")
          toast.error("Payment Failed", {
            description: "Your payment was not successful. Please try again."
          })
        }
      } catch (error) {
        console.error("Payment verification error:", error)
        setStatus("failed")
        const errorMessage = error instanceof Error ? error.message : "An error occurred during verification"
        setMessage(errorMessage)
        toast.error("Verification Error", {
          description: errorMessage
        })
      }
    }

    verifyPayment()
  }, [searchParams, router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8 text-center">
        {status === "verifying" && (
          <>
            <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <Loader2 size={32} className="text-red-600 dark:text-red-500 animate-spin" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Verifying Payment</h2>
            <p className="text-gray-600 dark:text-gray-400">{message}</p>
          </>
        )}

        {status === "success" && (
          <>
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check size={32} className="text-green-600 dark:text-green-500" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Payment Successful!</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">{message}</p>
            <button
              onClick={() => router.push("/")}
              className="bg-white text-red-600 hover:bg-red-50 px-6 py-2 rounded-lg transition border border-red-600"
            >
              Return to Home
            </button>
          </>
        )}

        {status === "pending" && (
          <>
            <div className="w-16 h-16 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <Loader2 size={32} className="text-yellow-600 dark:text-yellow-500" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Payment Pending</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">{message}</p>
            <button
              onClick={() => router.push("/")}
              className="bg-white text-red-600 hover:bg-red-50 px-6 py-2 rounded-lg transition border border-red-600"
            >
              Return to Home
            </button>
          </>
        )}

        {status === "failed" && (
          <>
            <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <X size={32} className="text-red-600 dark:text-red-500" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Payment Failed</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">{message}</p>
            <button
              onClick={() => router.push("/")}
              className="bg-white text-red-600 hover:bg-red-50 px-6 py-2 rounded-lg transition border border-red-600"
            >
              Return to Home
            </button>
          </>
        )}
      </div>
    </div>
  )
}
