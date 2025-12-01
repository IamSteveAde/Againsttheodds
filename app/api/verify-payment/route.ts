import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { transactionReference } = await request.json()

    if (!transactionReference) {
      return NextResponse.json(
        { error: "Transaction reference is required" },
        { status: 400 }
      )
    }

    // Call Tingo Payment verification endpoint
    const verificationResponse = await fetch(
      `https://tingopayment.tingoradio.ai/api/Payment/verify/${transactionReference}`,
      {
        method: "GET",
        headers: {
          "accept": "text/plain",
          // Add any required authentication headers here
          // "Authorization": `Bearer ${process.env.TINGO_API_KEY}`,
        },
      }
    )

    if (!verificationResponse.ok) {
      throw new Error("Failed to verify payment with Tingo Payment")
    }

    const verificationData = await verificationResponse.json()

    // Normalize payment status
    const paymentStatus = verificationData.paymentStatus?.toLowerCase()
    const isSuccessful = paymentStatus === "successful" || paymentStatus === "success"
    const isPending = paymentStatus === "pending"

    // Return the verification result with normalized status
    return NextResponse.json({
      success: true,
      paymentStatus: verificationData.paymentStatus,
      isSuccessful,
      isPending,
      data: verificationData,
    })
  } catch (error) {
    console.error("Payment verification error:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Payment verification failed",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    )
  }
}
