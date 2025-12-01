# Payment Integration Implementation

This document describes the Tingo Payment integration and Lulu Print API order processing flow.

## Payment Flow

1. **User fills checkout form** - Customer enters their details in the pricing modal (including postcode and state)
2. **Payment initiation** - Order data is sent to Tingo Payment API
3. **Redirect to checkout** - User is redirected to Tingo Payment checkout URL
4. **Payment completion** - User completes payment on Tingo Payment gateway
5. **Callback verification** - User returns to payment callback page
6. **Webhook verification** - System verifies payment with Tingo Payment API
7. **Order submission** - Upon successful verification, order is submitted to Lulu Print API
8. **Print job creation** - Lulu creates a print job and processes the book order

## Files Modified/Created

### Modified Files
- `components/pricing-modal.tsx` - Added payment integration logic

### New Files
- `app/payment-callback/page.tsx` - Payment verification and callback handler
- `app/api/verify-payment/route.ts` - API endpoint to verify payment with Tingo
- `app/api/lulu-book-order/route.ts` - API endpoint to submit order to Lulu book system
- `.env.local.example` - Environment variables template

## Payment Payload Structure

The system sends the following payload to Tingo Payment API:

```json
{
  "amount": 1950000,  // Amount in NGN (converted from GBP)
  "currency": "NGN",
  "customerFirstName": "Josiah",
  "customerLastName": "Obaje",
  "customerEmail": "josiah@gmail.com",
  "customerPhone": "0987654321",
  "customerAddress": "123 Main St, Lagos, Nigeria",
  "merchantTransactionReference": "BOOK-1234567890-ABC123",
  "callbackUrl": "https://yourdomain.com/payment-callback",
  "customFields": [
    { "name": "bookFormat", "value": "Paperback" },
    { "name": "quantity", "value": "2" },
    { "name": "city", "value": "Lagos" },
    { "name": "country", "value": "Nigeria" }
  ]
}
```

## Configuration

### Environment Variables

Create a `.env.local` file with the following variables:

```env
# Tingo Payment API Configuration
TINGO_API_KEY=your_tingo_api_key_here

# Lulu Print API Configuration
LULU_API_ENDPOINT=https://api.sandbox.lulu.com/print-jobs/
LULU_API_KEY=your_lulu_api_key_here

# Lulu Book Files (PDF URLs for cover and interior)
LULU_COVER_URL=https://www.dropbox.com/s/7bv6mg2tj0h3l0r/lulu_trade_perfect_template.pdf?dl=1&raw=1
LULU_INTERIOR_URL=https://www.dropbox.com/s/r20orb8umqjzav9/lulu_trade_interior_template-32.pdf?dl=1&raw=1

# Payment Callback URL
NEXT_PUBLIC_PAYMENT_CALLBACK_URL=http://localhost:3000/payment-callback
```

### Important Notes

1. **Lulu API Endpoint**: Currently set to sandbox. Change to production URL when ready: `https://api.lulu.com/print-jobs/`
2. **Book Files**: Update `LULU_COVER_URL` and `LULU_INTERIOR_URL` with your actual book PDF URLs
3. **POD Package ID**: The default is set to `0600X0900BWSTDPB060UW444MXX` (6x9 Paperback). Update this in the API route if needed
4. **Automation**: Set up a credit card on file in Lulu's developer portal for automatic payment processing

### Exchange Rate

The current GBP to NGN exchange rate is hardcoded as 1:1950. Update this in `components/pricing-modal.tsx` line 61:

```typescript
const exchangeRate = 1950 // Update as needed
```

Consider using a real-time exchange rate API for production.

## Lulu Print API Integration Details

### Print Job Structure

The system creates a print job with the following structure:

- **Contact Email**: Customer's email from the form
- **External ID**: Transaction reference (e.g., `BOOK-1701234567890-ABC123`)
- **Line Items**: Book order with:
  - Cover and interior PDF URLs
  - POD Package ID (manufacturing options)
  - Quantity ordered
  - Book title: "Against The Odds - My Journey Through Storms and Triumphs"
- **Production Delay**: 120 minutes (2 hours) before production starts
- **Shipping Address**: Complete address from form including:
  - Name, phone number
  - Street address, city, postcode
  - State/region code (optional)
  - Country code (automatically mapped from country name)
- **Shipping Level**: MAIL (can be changed to PRIORITY_MAIL, GROUND, EXPEDITED, or EXPRESS)

### Country Code Mapping

The system automatically maps country names to ISO country codes. Currently supported:
- United Kingdom/UK → GB
- Nigeria → NG
- United States/USA → US
- Canada → CA

Add more mappings in `app/api/lulu-book-order/route.ts` as needed.

### POD Package IDs

The POD Package ID defines the book format and manufacturing options. Current default: `0600X0900BWSTDPB060UW444MXX`

Format: `[size][color][binding][paper weight][options]`

Example formats:
- `0600X0900BWSTDPB060UW444MXX` - 6x9" Black & White Paperback
- `0600X0900FCSTDPB060UW444MXX` - 6x9" Full Color Paperback
- `0600X0900BWCASPB060UW444MXX` - 6x9" Black & White Hardcover Case

## Next Steps

1. **Add API Keys**: Add the necessary API keys to your `.env.local` file:
   - Lulu API key (get from Lulu developer portal)
   - Tingo Payment API key (if required)

2. **Update Book PDFs**: Replace the placeholder PDF URLs with your actual book files:
   - Cover PDF (LULU_COVER_URL)
   - Interior PDF (LULU_INTERIOR_URL)

3. **Configure POD Package**: Update the POD Package ID in `app/api/lulu-book-order/route.ts` based on your book specifications

4. **Set Up Payment Automation**: 
   - Add a credit card on file in Lulu's developer portal
   - This enables automatic payment processing for print jobs

5. **Test Payment Flow**: 
   - Test with Tingo Payment sandbox/test environment
   - Test with Lulu sandbox API
   - Verify callback URL is accessible
   - Test webhook verification
   - Confirm print job creation

6. **Switch to Production**: 
   - Change Lulu API endpoint to production URL
   - Update to production API keys
   - Test complete flow in production

7. **Error Handling**: Review and enhance error handling based on actual API responses

8. **Security**: Ensure API keys are properly secured and never committed to version control

## API Endpoints

### POST /api/verify-payment
Verifies payment status with Tingo Payment webhook

**Request:**
```json
{
  "transactionReference": "BOOK-1234567890-ABC123"
}
```

**Response:**
```json
{
  "status": "success",
  "data": { /* Tingo Payment response */ }
}
```

### POST /api/lulu-book-order
Submits order to Lulu book system

**Request:**
```json
{
  "transactionReference": "BOOK-1234567890-ABC123",
  "customerFirstName": "Josiah",
  "customerLastName": "Obaje",
  "customerEmail": "josiah@gmail.com",
  "customerPhone": "0987654321",
  "shippingAddress": {
    "addressLine1": "123 Main St",
    "city": "Lagos",
    "country": "Nigeria"
  },
  "bookFormat": "paperback",
  "quantity": 2,
  "totalAmount": 54,
  "amountPaidNGN": 105300,
  "orderDate": "2025-11-30T10:00:00.000Z"
}
```

**Response:**
```json
{
  "success": true,
  "data": { /* Lulu book response */ },
  "message": "Order submitted successfully"
}
```

## Troubleshooting

- **Payment not redirecting**: Check if Tingo Payment API is returning a `checkoutUrl`
- **Verification failing**: Verify the webhook endpoint URL and authentication
- **Order not submitting**: Check Lulu book endpoint URL and API key
- **Callback not working**: Ensure callback URL is publicly accessible (use ngrok for local testing)
