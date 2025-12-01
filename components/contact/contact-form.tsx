"use client"

import type React from "react"

import { useState } from "react"

interface FormData {
  name: string
  email: string
  topic: string
  message: string
}

export function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    topic: "",
    message: "",
  })
  const [showSuccess, setShowSuccess] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // This would connect to a backend or email service
      // For now, just show success message
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setShowSuccess(true)
      setFormData({ name: "", email: "", topic: "", message: "" })
      setTimeout(() => setShowSuccess(false), 3000)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="py-12 md:py-20 bg-white dark:bg-gray-950">
      <div className="container mx-auto px-4 max-w-2xl">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-12 text-gray-900 dark:text-white text-balance">
          Contact Us
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-red-500 dark:focus:border-red-400 transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-red-500 dark:focus:border-red-400 transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">How can we help you?</label>
            <select
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:border-red-500 dark:focus:border-red-400 transition"
            >
              <option value="">Select an option</option>
              <option>General Inquiry</option>
              <option>Bulk Order / Corporate Purchase</option>
              <option>Media & Press Inquiry</option>
              <option>Speaking Engagement Request</option>
              <option>Partnership or Collaboration</option>
              <option>Issues With My Order</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">Your Message</label>
            <textarea
              name="message"
              placeholder="Type your message..."
              value={formData.message}
              onChange={handleChange}
              required
              rows={5}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-red-500 dark:focus:border-red-400 transition resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-red-600 hover:bg-red-700 dark:bg-red-600 dark:hover:bg-red-700 text-white py-3 rounded-lg transition disabled:bg-gray-400 dark:disabled:bg-gray-600 font-medium"
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </button>

          {showSuccess && (
            <div className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 p-4 rounded-lg border border-green-300 dark:border-green-700">
              Thank you! Your message has been sent successfully.
            </div>
          )}
        </form>
      </div>
    </section>
  )
}
