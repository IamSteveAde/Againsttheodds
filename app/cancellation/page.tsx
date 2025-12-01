import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export const metadata = {
  title: "Cancellation Policy - Dozy Mmobuosi",
  description: "Cancellation policy for Against the Odds book purchases",
}

export default function CancellationPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4 py-12 max-w-3xl">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">Cancellation Policy</h1>

          <div className="space-y-8 text-gray-700 dark:text-gray-300">

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">1. Order Cancellation</h2>
              <p className="mb-4">
                You may cancel your order for the "Against the Odds" book at any time before it is shipped. Once the order 
                has been processed for shipping, cancellation may no longer be possible.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">2. Digital Products</h2>
              <p className="mb-4">
                Digital copies and audiobooks cannot be cancelled once purchased and downloaded, as these are considered 
                non-reversible transactions. If you face technical issues accessing your purchase, please contact us.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">3. Physical Products</h2>
              <p className="mb-4">
                For paperback or hardcover books: If your order has not yet shipped, you may cancel it and receive a full refund. 
                If the product has already been shipped, please follow our return process to request a refund or exchange.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">4. How to Cancel</h2>
              <p className="mb-4">
                To cancel your order, please email us at info@dozymmobuosi.com with your order number and reason for cancellation. 
                We will respond within 5 business days to confirm your cancellation request.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">5. Processing Time</h2>
              <p className="mb-4">
                Once your cancellation is approved, refunds (if applicable) will be processed within 7-10 business days. 
                It may take an additional 3-5 business days for the funds to appear in your original payment method.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">6. Partial Cancellations</h2>
              <p className="mb-4">
                If you ordered multiple items and wish to cancel only certain items, partial cancellations can be requested. 
                These will be handled on a case-by-case basis.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">7. Contact Information</h2>
              <p className="mb-4">
                For any questions about our cancellation policy, please contact us at:
              </p>
              <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                <p className="font-semibold text-gray-900 dark:text-white">Email:</p>
                <p>info@dozymmobuosi.com</p>
               
              </div>
            </section>

          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
