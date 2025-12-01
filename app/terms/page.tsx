import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export const metadata = {
  title: "Terms & Conditions - Dozy Mmobuosi",
  description: "Terms and conditions for Against the Odds book purchase",
}

export default function TermsPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4 py-12 max-w-3xl">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">Terms & Conditions</h1>

          <div className="space-y-8 text-gray-700 dark:text-gray-300">
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">1. Agreement to Terms</h2>
              <p className="mb-4">
                By purchasing or accessing "Against the Odds" by Dozy Mmobuosi, you agree to be bound by these Terms and
                Conditions. If you do not agree to abide by the above, please do not use this service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">2. License Grant</h2>
              <p className="mb-4">
                Upon purchase, you are granted a personal, non-transferable, non-exclusive license to access and use the
                book in accordance with these terms. You may not reproduce, distribute, or transmit the content for
                commercial purposes without explicit permission.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                3. Intellectual Property Rights
              </h2>
              <p className="mb-4">
                All content, including text, images, and audiobook recordings, are the property of Dozy Mmobuosi and are
                protected by copyright laws. Unauthorized use is prohibited.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">4. Limitation of Liability</h2>
              <p className="mb-4">
                In no event shall Dozy Mmobuosi or its associates be liable for any indirect, incidental, special,
                consequential, or punitive damages arising from the purchase or use of this product.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">5. Modifications</h2>
              <p className="mb-4">
                We reserve the right to modify these Terms and Conditions at any time. Your continued use of our
                services following the posting of revised Terms means that you accept and agree to the changes.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">6. Governing Law</h2>
              <p className="mb-4">
                These Terms and Conditions are governed by the laws of Nigeria and are subject to the exclusive
                jurisdiction of the courts of Nigeria.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">7. Contact Information</h2>
              <p className="mb-4">
                If you have any questions about these Terms and Conditions, please contact us at info@dozymmobuosi.com.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
