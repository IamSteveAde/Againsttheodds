"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

interface FAQItem {
  question: string
  answer: string
}

interface FAQCategory {
  title: string
  items: FAQItem[]
}

const faqCategories: FAQCategory[] = [
  {
    title: "Book Information",
    items: [
      {
        question: 'What is "Against All Odds" about?',
        answer:
          "It is the inspiring true story of Dozy Mmobuosi, detailing his journey through adversity, innovation, and global leadership.",
      },
      {
        question: "Is this a biography or memoir?",
        answer: "The book is a memoir capturing Dozy's life, challenges, and achievements across multiple industries.",
      },
    ],
  },
  {
    title: "Ordering & Payment",
    items: [
      {
        question: "What payment methods are accepted?",
        answer: "We accept debit/credit cards, bank transfers, and major digital payment platforms.",
      },
      {
        question: "Can I order multiple copies?",
        answer: "Yes, bulk orders are supported. Contact us for discounted corporate or event packages.",
      },
    ],
  },
  {
    title: "Shipping & Delivery",
    items: [
      {
        question: "Do you ship worldwide?",
        answer: "Yes, the book can be shipped to most countries. Shipping fees vary by destination.",
      },
      {
        question: "How long does delivery take?",
        answer: "Delivery typically takes 3–7 business days depending on your region.",
      },
    ],
  },
  {
    title: "Returns & Support",
    items: [
      {
        question: "Can I return the book?",
        answer: "Yes, damaged or incorrect orders can be returned within 7 days of delivery.",
      },
      {
        question: "How can I reach customer support?",
        answer: 'You can contact our team via email or the "Support" tab on this website.',
      },
    ],
  },
]

export function FAQSection() {
  const [activeCategory, setActiveCategory] = useState("Book Information")
  const [expandedQuestion, setExpandedQuestion] = useState<string | null>(null)

  const currentCategory = faqCategories.find((cat) => cat.title === activeCategory)

  return (
    <section className="py-12 md:py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 max-w-3xl">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-12 text-gray-900 dark:text-white text-balance">
          FAQ
        </h2>

        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {faqCategories.map((category) => (
            <button
              key={category.title}
              onClick={() => setActiveCategory(category.title)}
              className={`px-4 py-2 rounded-lg transition text-sm md:text-base whitespace-nowrap ${
                activeCategory === category.title
                  ? "bg-red-600 dark:bg-red-600 text-white"
                  : "bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700"
              }`}
            >
              {category.title}
            </button>
          ))}
        </div>

        <div className="space-y-4">
          {currentCategory?.items.map((item, index) => (
            <div
              key={index}
              className="border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 transition-all"
            >
              <button
                onClick={() => setExpandedQuestion(expandedQuestion === item.question ? null : item.question)}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-100 dark:hover:bg-gray-700 transition"
              >
                <span className="font-medium text-left text-gray-900 dark:text-white text-sm md:text-base">
                  {item.question}
                </span>
                <ChevronDown
                  size={20}
                  className={`flex-shrink-0 text-gray-600 dark:text-gray-400 transition ${
                    expandedQuestion === item.question ? "rotate-180" : ""
                  }`}
                />
              </button>
              {expandedQuestion === item.question && (
                <div className="px-6 py-4 bg-gray-50 dark:bg-gray-900 border-t border-gray-300 dark:border-gray-700">
                  <p className="text-gray-700 dark:text-gray-300 text-sm md:text-base leading-relaxed">{item.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
