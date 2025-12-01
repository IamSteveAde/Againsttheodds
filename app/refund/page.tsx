import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export const metadata = {
  title: "Refund Policy - Dozy Mmobuosi",
  description: "Refund policy for Against the Odds book purchases",
}

export default function RefundPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4 py-12 max-w-3xl">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">Refund Policy</h1>

          <div className="space-y-8 text-gray-700 dark:text-gray-300">
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">1. Refund Eligibility</h2>
              <p className="mb-4">
                We want you to be completely satisfied with your purchase. If you are not satisfied with your order, you
                may request a refund within 14 days of purchase.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">2. Digital Products</h2>
              <p className="mb-4">
                For audiobook and digital copies: Once purchased and downloaded, these products cannot be refunded as
                they are non-physical goods. However, if you experience technical issues accessing your purchase, please
                contact us for support.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">3. Physical Products</h2>
              <p className="mb-4">
                For paperback and hardcover copies: If you receive a damaged or defective product, please contact us
                within 7 days of delivery. We will either replace the item or process a full refund.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">4. How to Request a Refund</h2>
              <p className="mb-4">
                To request a refund, please send an email to info@dozymmobuosi.com with your order number and reason for
                the refund request. We will respond within 5 business days.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">5. Processing Time</h2>
              <p className="mb-4">
                Once your refund request is approved, it will be processed within 7-10 business days. Please note that
                it may take an additional 3-5 business days for the funds to appear in your original payment method.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">6. Partial Refunds</h2>
              <p className="mb-4">
                If you have purchased multiple items and wish to refund only certain items, we will process partial
                refunds on a case-by-case basis.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">7. Contact Information</h2>
              <p className="mb-4">For any questions about our refund policy, please contact us at:</p>
              <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                <p className="font-semibold text-gray-900 dark:text-white">Email:</p>
                <p>info@dozymmobuosi.com</p>
                <p className="font-semibold text-gray-900 dark:text-white mt-2">Phone:</p>
                <p>+234 123 456 7890</p>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
