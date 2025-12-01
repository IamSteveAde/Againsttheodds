"use client"

import type React from "react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { Mail, MapPin, Phone } from "lucide-react"

export function Footer() {
  const [email, setEmail] = useState("")
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    setSubscribed(true)
    setEmail("")
    setTimeout(() => setSubscribed(false), 3000)
  }

  return (
    <footer className="bg-gray-50 dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 py-12">
        {/* Newsletter */}
        <div className="mb-12 pb-8 border-b border-gray-200 dark:border-gray-800">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Join our newsletter</h3>
              <p className="text-gray-600 dark:text-gray-400">Stay updated with new insights!</p>
            </div>
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-red-500 dark:focus:border-red-400"
              />
              <button
                type="submit"
                className="bg-white text-red-600 hover:bg-red-50 dark:bg-white dark:text-red-600 dark:hover:bg-red-50 px-6 py-2 rounded-lg transition whitespace-nowrap border border-red-600"
              >
                {subscribed ? "Subscribed!" : "Subscribe"}
              </button>
            </form>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="grid md:grid-cols-5 gap-8 mb-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <Image src="/images/pordozy.jpg" alt="Pordozy Logo" width={50} height={50} className="h-12 w-12 rounded-full" />
              <span className="font-bold text-gray-900 dark:text-white text-xl">Dozy Mmobuosi</span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm">Against the Odds - By Dozy Mmobuosi</p>
          </div>

          {/* Sitemap */}
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Sitemap</h4>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li>
                <Link href="/" className="hover:text-gray-900 dark:hover:text-white transition">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-gray-900 dark:hover:text-white transition">
                  About
                </Link>
              </li>
              <li>
                <Link href="/author" className="hover:text-gray-900 dark:hover:text-white transition">
                  Author Bio
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-gray-900 dark:hover:text-white transition">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Resources</h4>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li>
                <Link href="/testimonials" className="hover:text-gray-900 dark:hover:text-white transition">
                  Testimonials
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-gray-900 dark:hover:text-white transition">
                  FAQs
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li>
                <Link href="/terms" className="hover:text-gray-900 dark:hover:text-white transition">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-gray-900 dark:hover:text-white transition">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/refund" className="hover:text-gray-900 dark:hover:text-white transition">
                  Refund Policy
                </Link>
              </li>
              <li>
                <Link href="/cancellation" className="hover:text-gray-900 dark:hover:text-white transition">
                  Cancellation Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Contact</h4>
            <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
              <li className="flex items-start gap-2">
                <Mail size={16} className="mt-0.5 flex-shrink-0 text-red-600 dark:text-red-500" />
                <a
                  href="mailto:info@dozymmobuosi.com"
                  className="hover:text-gray-900 dark:hover:text-white transition"
                >
                  info@dozymmobuosi.com
                </a>
              </li>
              
              <li className="flex items-start gap-2">
                <MapPin size={16} className="mt-0.5 flex-shrink-0 text-red-600 dark:text-red-500" />
                <span>Lagos, Nigeria</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-200 dark:border-gray-800 pt-8 text-center text-sm text-gray-600 dark:text-gray-400">
          <p>&copy; {new Date().getFullYear()} Dozy Mmobuosi. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
