"use client"

import type React from "react"
import { useState } from "react"
import { X, Check } from "lucide-react"

interface PricingModalProps {
  isOpen: boolean
  onClose: () => void
}

export function PricingModal({ isOpen, onClose }: PricingModalProps) {
  const [selectedFormat, setSelectedFormat] = useState<"audiobook" | "paperback" | "hardcover">("audiobook")
  const [quantity, setQuantity] = useState(1)
  const [showCheckout, setShowCheckout] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    addressLine1: "",
    city: "",
    postcode: "",
    stateCode: "",
    country: "",
    language: "English",
  })

  if (!isOpen) return null

  const pricing = {
    audiobook: { price: 15, currency: "£", name: "Audiobook" },
    paperback: { price: 27, currency: "£", name: "Paperback" },
    hardcover: { price: 39, currency: "£", name: "Hardcover" },
  }

  const selected = pricing[selectedFormat]
  const total = selected.price * quantity

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCheckout = async () => {
    setIsLoading(true)
    setError("")

    try {
      // Validate form data
      if (!formData.fullName || !formData.email || !formData.phone || !formData.addressLine1 || !formData.city || !formData.postcode || !formData.country || !formData.language) {
        setError("Please fill in all required fields")
        setIsLoading(false)
        return
      }

      // Split full name into first and last name
      const nameParts = formData.fullName.trim().split(" ")
      const firstName = nameParts[0] || ""
      const lastName = nameParts.slice(1).join(" ") || nameParts[0] || ""

      // Convert GBP to NGN (approximate exchange rate, you may want to get this from an API)
      const exchangeRate = 1950 // 1 GBP = ~1950 NGN (update as needed)
      const amountInNGN = Math.round(total * exchangeRate)

      // Generate unique transaction reference
      const merchantTransactionReference = `BOOK-${Date.now()}-${Math.random().toString(36).substring(2, 9).toUpperCase()}`

      // Prepare payment payload with callback URL
      const callbackUrl = `${window.location.origin}/payment-callback`
      
      const paymentPayload = {
        amount: amountInNGN,
        currency: "NGN",
        customerFirstName: firstName,
        customerLastName: lastName,
        customerEmail: formData.email,
        customerPhone: formData.phone,
        customerAddress: `${formData.addressLine1}, ${formData.city}, ${formData.country}`,
        merchantTransactionReference: merchantTransactionReference,
        callbackUrl: callbackUrl,
        customFields: [
          {
            name: "bookFormat",
            value: selected.name
          },
          {
            name: "quantity",
            value: quantity.toString()
          },
          {
            name: "city",
            value: formData.city
          },
          {
            name: "country",
            value: formData.country
          },
          {
            name: "language",
            value: formData.language
          }
        ]
      }

      // Initiate payment with Tingo Payment
      const response = await fetch("https://tingopayment.tingoradio.ai/api/Payment/initiate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(paymentPayload),
      })

      if (!response.ok) {
        throw new Error("Failed to initiate payment")
      }

      const paymentResponse = await response.json()

      // Check if we have a checkout URL
      if (paymentResponse.checkoutUrl) {
        // Store order details in localStorage for verification callback
        localStorage.setItem("pendingOrder", JSON.stringify({
          transactionReference: merchantTransactionReference,
          formData: formData,
          selectedFormat: selectedFormat,
          quantity: quantity,
          total: total,
          amountInNGN: amountInNGN,
          timestamp: Date.now()
        }))

        // Redirect to payment checkout URL
        window.location.href = paymentResponse.checkoutUrl
      } else {
        throw new Error("No checkout URL received from payment gateway")
      }
    } catch (err) {
      console.error("Payment error:", err)
      setError(err instanceof Error ? err.message : "Payment failed. Please try again.")
      setIsLoading(false)
    }
  }

  return (
    <div
      className="fixed inset-0 bg-black/50 dark:bg-black/70 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-gray-900 rounded-lg max-w-2xl w-full shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-800">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Get Your Copy</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[calc(100vh-200px)] overflow-y-auto">
          {!showCheckout && !showSuccess && (
            <div>
              {/* Pricing Cards */}
              <div className="grid md:grid-cols-3 gap-4 mb-8">
                {(["audiobook", "paperback", "hardcover"] as const).map((format) => (
                  <button
                    key={format}
                    onClick={() => setSelectedFormat(format)}
                    className={`p-4 rounded-lg border-2 transition ${
                      selectedFormat === format
                        ? "border-red-600 bg-red-50 dark:bg-red-900/20"
                        : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                    }`}
                  >
                    <div className="text-sm font-semibold text-gray-600 dark:text-gray-300 mb-2">
                      {pricing[format].name}
                    </div>
                    <div className="text-3xl font-bold text-gray-900 dark:text-white">
                      {pricing[format].currency}
                      {pricing[format].price}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">GBP</div>
                  </button>
                ))}
              </div>

              {/* Features */}
              <div className="mb-8">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4">What&apos;s Included:</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                    <Check size={20} className="text-green-600 dark:text-green-500" />
                    <span>Full digital access to &quot;Against the Odds&quot;</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                    <Check size={20} className="text-green-600 dark:text-green-500" />
                    <span>Lifetime access to your copy</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                    <Check size={20} className="text-green-600 dark:text-green-500" />
                    <span>Exclusive author updates</span>
                  </div>
                </div>
              </div>

              {/* Quantity */}
              <div className="mb-8">
                <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">Quantity:</label>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    −
                  </button>
                  <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, Number.parseInt(e.target.value) || 1))}
                    className="w-20 text-center px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  />
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Total */}
              <div className="mb-8 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700 dark:text-gray-300">Total:</span>
                  <span className="text-2xl font-bold text-gray-900 dark:text-white">
                    {pricing[selectedFormat].currency}
                    {total}
                  </span>
                </div>
              </div>

              {/* CTA Button */}
              <button
                onClick={() => setShowCheckout(true)}
                className="w-full bg-white text-red-600 hover:bg-red-50 dark:bg-white dark:text-red-600 dark:hover:bg-red-50 py-3 rounded-lg font-semibold transition border border-red-600"
              >
                Proceed to Checkout
              </button>
            </div>
          )}

          {showCheckout && !showSuccess && (
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Shipping Information</h3>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-1">Full Name *</label>
                  <input
                    type="text"
                    name="fullName"
                    placeholder="John Doe"
                    value={formData.fullName}
                    onChange={handleFormChange}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-1">Email *</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={handleFormChange}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="+1 234 567 8900"
                    value={formData.phone}
                    onChange={handleFormChange}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-1">
                    Street Address *
                  </label>
                  <input
                    type="text"
                    name="addressLine1"
                    placeholder="123 Main St"
                    value={formData.addressLine1}
                    onChange={handleFormChange}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-1">City *</label>
                  <input
                    type="text"
                    name="city"
                    placeholder="New York"
                    value={formData.city}
                    onChange={handleFormChange}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-1">Postcode *</label>
                    <input
                      type="text"
                      name="postcode"
                      placeholder="PO1 3AX"
                      value={formData.postcode}
                      onChange={handleFormChange}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-1">State/Region</label>
                    <input
                      type="text"
                      name="stateCode"
                      placeholder="Optional"
                      value={formData.stateCode}
                      onChange={handleFormChange}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-1">Country *</label>
                  <input
                    type="text"
                    name="country"
                    placeholder="United Kingdom"
                    value={formData.country}
                    onChange={handleFormChange}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-1">Book Language *</label>
                  <select
                    name="language"
                    value={formData.language}
                    onChange={(e) => setFormData((prev) => ({ ...prev, language: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  >
                    <option value="English">English</option>
                    <option value="Arabic">Arabic</option>
                    <option value="Mandarin">Mandarin</option>
                    <option value="Japanese">Japanese</option>
                    <option value="Swahili">Swahili</option>
                  </select>
                </div>
              </div>

              {/* Order Summary */}
              <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg mb-6">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600 dark:text-gray-400">
                    {selected.name} x {quantity}
                  </span>
                  <span className="text-gray-900 dark:text-white font-semibold">
                    {selected.currency}
                    {total}
                  </span>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700 rounded-lg">
                  <p className="text-sm text-red-800 dark:text-red-300">{error}</p>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  onClick={() => setShowCheckout(false)}
                  disabled={isLoading}
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Back
                </button>
                <button
                  onClick={handleCheckout}
                  disabled={isLoading}
                  className="flex-1 bg-white text-red-600 hover:bg-red-50 dark:bg-white dark:text-red-600 dark:hover:bg-red-50 py-2 rounded-lg font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed border border-red-600"
                >
                  {isLoading ? "Processing..." : "Complete Order"}
                </button>
              </div>
            </div>
          )}

          {showSuccess && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check size={32} className="text-green-600 dark:text-green-500" />
              </div>
              <p className="text-lg font-semibold text-gray-900 dark:text-white">Thank you for your order!</p>
              <p className="text-gray-600 dark:text-gray-400 mt-2">A confirmation email will be sent shortly.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
