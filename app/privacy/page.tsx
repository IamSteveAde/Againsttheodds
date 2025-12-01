import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export const metadata = {
  title: "Privacy Policy - Dozy Mmobuosi",
  description: "Privacy policy for Against the Odds",
}

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4 py-12 max-w-3xl">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">Privacy Policy</h1>

          <div className="space-y-8 text-gray-700 dark:text-gray-300">
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">1. Introduction</h2>
              <p className="mb-4">
                Dozy Mmobuosi ("we", "us", "our") operates this website. This page informs you of our policies regarding
                the collection, use, and disclosure of personal data when you use our service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">2. Information Collection</h2>
              <p className="mb-4">
                We collect several different types of information for various purposes to provide and improve our
                service to you:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Personal Data: Name, email address, phone number, shipping address</li>
                <li>Usage Data: Browser type, IP address, pages visited, and timestamps</li>
                <li>Cookies: Small files stored on your device to enhance your experience</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">3. Use of Data</h2>
              <p className="mb-4">Dozy Mmobuosi uses the collected data for various purposes:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>To provide and maintain our service</li>
                <li>To process your transactions and send confirmations</li>
                <li>To notify you about changes to our service</li>
                <li>To provide customer support</li>
                <li>To gather analysis or valuable information for service improvement</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">4. Security of Data</h2>
              <p className="mb-4">
                The security of your data is important to us but remember that no method of transmission over the
                Internet is 100% secure. While we strive to use commercially acceptable means to protect your personal
                data, we cannot guarantee its absolute security.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">5. Third-Party Links</h2>
              <p className="mb-4">
                Our service may contain links to other sites that are not operated by us. This Privacy Policy applies
                only to our website, and we are not responsible for the privacy practices of third-party sites.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">6. Changes to This Policy</h2>
              <p className="mb-4">
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new
                Privacy Policy on this page and updating the "effective date" at the top of this Privacy Policy.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">7. Contact Us</h2>
              <p className="mb-4">
                If you have any questions about this Privacy Policy, please contact us at info@dozymmobuosi.com.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
