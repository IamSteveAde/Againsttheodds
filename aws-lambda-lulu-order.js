// AWS Lambda function for Lulu Book Order
// Deploy this to AWS Lambda and expose via API Gateway

// Environment variables needed:
// LULU_CLIENT_KEY=1f516195-62d5-49bb-b70e-f6c82d857494
// LULU_CLIENT_SECRET=PPvnJeTnFa24IoVYKZhNbA2bsWwECuSE
// LULU_API_ENDPOINT=https://api.lulu.com/print-jobs/
// LULU_AUTH_ENDPOINT=https://api.lulu.com/auth/realms/glasstree/protocol/openid-connect/token

const getPodPackageId = (format) => {
  const formatMap = {
    audiobook: "0600X0900BWSTDPB060UW444MXX",
    paperback: "0600X0900BWSTDPB060UW444MXX",
    hardcover: "0600X0900BWSTDPB060UW444MXX",
  };
  return formatMap[format?.toLowerCase()] || "0600X0900BWSTDPB060UW444MXX";
};

const getCountryCode = (country) => {
  const countryMap = {
    "united kingdom": "GB",
    "uk": "GB",
    "nigeria": "NG",
    "united states": "US",
    "usa": "US",
    "canada": "CA",
  };
  return countryMap[country?.toLowerCase()] || "GB";
};

async function getLuluAccessToken() {
  const LULU_CLIENT_KEY = process.env.LULU_CLIENT_KEY;
  const LULU_CLIENT_SECRET = process.env.LULU_CLIENT_SECRET;
  const LULU_AUTH_ENDPOINT = process.env.LULU_AUTH_ENDPOINT || "https://api.lulu.com/auth/realms/glasstree/protocol/openid-connect/token";

  if (!LULU_CLIENT_KEY || !LULU_CLIENT_SECRET) {
    throw new Error("Lulu API credentials are not configured");
  }

  const credentials = Buffer.from(`${LULU_CLIENT_KEY}:${LULU_CLIENT_SECRET}`).toString('base64');

  const response = await fetch(LULU_AUTH_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Authorization": `Basic ${credentials}`
    },
    body: "grant_type=client_credentials"
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(`Failed to get Lulu access token: ${errorData.error || response.statusText}`);
  }

  const data = await response.json();
  return data.access_token;
}

export const handler = async (event) => {
  // Enable CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  // Handle OPTIONS request for CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  try {
    const orderData = JSON.parse(event.body);
    const LULU_PRINT_API = process.env.LULU_API_ENDPOINT || "https://api.lulu.com/print-jobs/";

    // Generate OAuth access token
    const accessToken = await getLuluAccessToken();

    // Prepare the print job payload
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
          title: `Against The Odds - My Journey Through Storms and Triumphs (${orderData.bookLanguage || 'English'})`
        }
      ],
      production_delay: 120,
      shipping_address: {
        city: orderData.shippingAddress.city,
        country_code: getCountryCode(orderData.shippingAddress.country),
        name: `${orderData.customerFirstName} ${orderData.customerLastName}`,
        phone_number: orderData.customerPhone,
        postcode: orderData.shippingAddress.postcode || "",
        state_code: orderData.shippingAddress.stateCode || "",
        street1: orderData.shippingAddress.addressLine1
      },
      shipping_level: "MAIL"
    };

    // Submit print job to Lulu
    const response = await fetch(LULU_PRINT_API, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": "application/json",
        "Cache-Control": "no-cache"
      },
      body: JSON.stringify(printJobPayload)
    });

    const responseData = await response.json();

    if (!response.ok) {
      console.error("Lulu API Error:", responseData);
      return {
        statusCode: response.status,
        headers,
        body: JSON.stringify({
          success: false,
          message: "Failed to submit order to Lulu",
          error: responseData
        })
      };
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        message: "Order submitted successfully to Lulu",
        data: responseData,
        orderId: responseData.id
      })
    };
  } catch (error) {
    console.error("Error processing Lulu order:", error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        success: false,
        message: error.message || "An error occurred while processing your order"
      })
    };
  }
};
