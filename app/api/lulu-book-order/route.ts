import { NextRequest, NextResponse } from "next/server"

// Map book format to Lulu POD Package ID
const getPodPackageId = (format: string): string => {
  const formatMap: { [key: string]: string } = {
    audiobook: "0600X0900BWSTDPB060UW444MXX", // Default package
    paperback: "0600X0900BWSTDPB060UW444MXX", // 6x9 Paperback Black & White
    hardcover: "0600X0900BWSTDPB060UW444MXX", // Default package
  }
  return formatMap[format.toLowerCase()] || "0600X0900BWSTDPB060UW444MXX"
}

// Get country code from country name
const getCountryCode = (country: string): string => {
  const countryMap: { [key: string]: string } = {
    "united kingdom": "GB",
    "uk": "GB",
    "nigeria": "NG",
    "united states": "US",
    "usa": "US",
    "canada": "CA",
    // Add more country mappings as needed
  }
  return countryMap[country.toLowerCase()] || "GB"
}

// Generate OAuth token for Lulu API
async function getLuluAccessToken(): Promise<string> {
  const LULU_CLIENT_KEY = process.env.LULU_CLIENT_KEY
  const LULU_CLIENT_SECRET = process.env.LULU_CLIENT_SECRET
  const LULU_AUTH_ENDPOINT = process.env.LULU_AUTH_ENDPOINT || "https://api.lulu.com/auth/realms/glasstree/protocol/openid-connect/token"

  if (!LULU_CLIENT_KEY || !LULU_CLIENT_SECRET) {
    throw new Error("Lulu API credentials are not configured")
  }

  // Create Basic Auth string
  const credentials = Buffer.from(`${LULU_CLIENT_KEY}:${LULU_CLIENT_SECRET}`).toString('base64')

  const response = await fetch(LULU_AUTH_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Authorization": `Basic ${credentials}`
    },
    body: "grant_type=client_credentials"
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new Error(`Failed to get Lulu access token: ${errorData.error || response.statusText}`)
  }

  const data = await response.json()
  return data.access_token
}

export async function POST(request: NextRequest) {
  try {
    const orderData = await request.json()

    // Lulu Print API endpoint
    const LULU_PRINT_API = process.env.LULU_API_ENDPOINT || "https://api.lulu.com/print-jobs/"

    // Generate OAuth access token
    const accessToken = await getLuluAccessToken()

    // Prepare the print job payload according to Lulu API specifications
    const printJobPayload = {
      contact_email: orderData.customerEmail,
      external_id: orderData.transactionReference,
      line_items: [
        {
          external_id: `${orderData.transactionReference}-item-1`,
          printable_normalization: {
            cover: {
              source_url: process.env.LULU_COVER_URL || "https://www.dropbox.com/s/7bv6mg2tj0h3l0r/lulu_trade_perfect_template.pdf?dl=1&raw=1"
            },
            interior: {
              source_url: process.env.LULU_INTERIOR_URL || "https://www.dropbox.com/s/r20orb8umqjzav9/lulu_trade_interior_template-32.pdf?dl=1&raw=1"
            },
            pod_package_id: getPodPackageId(orderData.bookFormat)
          },
          quantity: orderData.quantity,
          title: "Against The Odds - My Journey Through Storms and Triumphs"
        }
      ],
      production_delay: 120, // 2 hours delay before production
      shipping_address: {
        city: orderData.shippingAddress.city,
        country_code: getCountryCode(orderData.shippingAddress.country),
        name: `${orderData.customerFirstName} ${orderData.customerLastName}`,
        phone_number: orderData.customerPhone,
        postcode: orderData.shippingAddress.postcode || "",
        state_code: orderData.shippingAddress.stateCode || "",
        street1: orderData.shippingAddress.addressLine1
      },
      shipping_level: "MAIL" // Can be MAIL, PRIORITY_MAIL, GROUND, EXPEDITED, EXPRESS
    }

    // Submit order to Lulu Print API with OAuth token
    const luluResponse = await fetch(LULU_PRINT_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${accessToken}`,
        "Cache-Control": "no-cache"
      },
      body: JSON.stringify(printJobPayload),
    })

    if (!luluResponse.ok) {
      const errorData = await luluResponse.json().catch(() => ({}))
      console.error("Lulu API error:", errorData)
      throw new Error(errorData.message || `Lulu API returned status ${luluResponse.status}`)
    }

    const luluData = await luluResponse.json()

    return NextResponse.json({
      success: true,
      data: luluData,
      message: "Print job created successfully",
      printJobId: luluData.id,
    })
  } catch (error) {
    console.error("Lulu book order submission error:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Order submission failed",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    )
  }
}
