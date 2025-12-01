"use client"

import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"
import { PricingModal } from "./pricing-modal"
import { ThemeToggle } from "./theme-toggle"
import { Menu, X, ChevronDown } from "lucide-react"


export function StickyHero() {
  const [isOpen, setIsOpen] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      {/* NAVBAR */}
     <header className="bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-40">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
<Link href="/" className="flex items-center gap-3 z-10">
  <Image
    src="/dozylog.png"
    alt="Dozy Logo"
    width={250} // normal width
    height={250} // normal height
    className="rounded-full"
  />
</Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition"
            >
              Home
            </Link>
            <Link
              href="/about"
              className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition"
            >
              About
            </Link>
            <Link
              href="/author"
              className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition"
            >
              Author Bio
            </Link>
            <div className="relative group">
              <button className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition flex items-center gap-1">
                Resources
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </button>
              <div className="absolute left-0 mt-0 w-48 bg-white dark:bg-gray-900 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition border border-gray-200 dark:border-gray-800">
                <Link
                  href="/testimonials"
                  className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  Testimonials
                </Link>
                <Link
                  href="/faq"
                  className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-b-lg"
                >
                  FAQs
                </Link>
              </div>
            </div>
            <Link
              href="/contact"
              className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition"
            >
              Contact
            </Link>
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowModal(true)}
              className="bg-white text-red-600 hover:bg-red-50 dark:bg-white dark:text-red-600 dark:hover:bg-red-50 px-6 py-2 rounded-lg transition whitespace-nowrap border border-red-600"
            >
              Buy Book
            </button>

            <ThemeToggle />

            {/* Mobile Menu Button */}
            <button className="md:hidden" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <nav className="md:hidden pb-4 space-y-3">
            <Link
              href="/"
              className="block text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition"
            >
              Home
            </Link>
            <Link
              href="/about"
              className="block text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition"
            >
              About
            </Link>
            <Link
              href="/author"
              className="block text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition"
            >
              Author Bio
            </Link>
            <Link
              href="/testimonials"
              className="block text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition"
            >
              Testimonials
            </Link>
            <Link
              href="/faq"
              className="block text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition"
            >
              FAQs
            </Link>
            <Link
              href="/contact"
              className="block text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition"
            >
              Contact
            </Link>
          </nav>
        )}
      </div>

      {/* Pricing Modal */}
      <PricingModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </header>
      {/* HERO SECTION */}
      <section className="relative w-full h-[50vh] min-h-[600px] flex items-center justify-center pt-20 bg-transparent">
        <div className="z-10 text-center max-w-3xl mx-auto px-4">
          {/* GRADIENT HEADING */}
         <h1 className="text-5xl sm:text-6xl md:text-7xl mb-6 leading-tight font-brandon font-bold
  bg-gradient-to-br from-sky-400 to-gray-300 bg-clip-text text-transparent" >
          AGAINST THE ODDS
        </h1>


      <p className="text-lg brandon-bold sm:text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-4">
        My Journey Through Storms and Triumphs
      </p>


          <p className="text-xl sm:text-2xl text-gray-900 dark:text-white mb-10 font-semibold">
            by Dozy Mmobuosi
          </p>

          {/* TRANSPARENT BUY BUTTON */}
          <button
            onClick={() => setShowModal(true)}
            className="
              px-10 py-4 
              border border-gray-400 dark:border-gray-600 
              bg-transparent 
              text-gray-900 dark:text-white 
              rounded-lg 
              font-semibold 
              hover:bg-gray-100 dark:hover:bg-gray-800 
              transition
            "
          >
            Buy Book
          </button>
        </div>
      </section>

      <PricingModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </>
  )
}
