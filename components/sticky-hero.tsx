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
      <header
        className={`fixed w-full top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white dark:bg-gray-950 shadow-lg border-b border-gray-200 dark:border-gray-800 py-3"
            : "bg-transparent py-6"
        }`}
      >
        <div className="container mx-auto px-4 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 z-10">
            <Image
              src="/images/pordozy.jpg"
              alt="Pordozy Logo"
              width={50}
              height={50}
              className={`rounded-full transition-all ${scrolled ? "h-10 w-10" : "h-12 w-12"}`}
            />
            <span className={`font-bold transition-all ${
              scrolled ? "text-gray-900 dark:text-white" : "text-gray-900 dark:text-white"
            }`}>
              DOZY MMOBUOSI
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            <Link
              href="/"
              className="transition font-medium text-gray-900 dark:text-white hover:text-gray-700 dark:hover:text-gray-300"
            >
              Home
            </Link>

            <Link
              href="/about"
              className="transition font-medium text-gray-900 dark:text-white hover:text-gray-700 dark:hover:text-gray-300"
            >
              About
            </Link>

            <Link
              href="/author"
              className="transition font-medium text-gray-900 dark:text-white hover:text-gray-700 dark:hover:text-gray-300"
            >
              Author Bio
            </Link>

            {/* Resources Dropdown */}
            <div className="relative group">
              <button className="flex items-center gap-1 transition font-medium text-gray-900 dark:text-white hover:text-gray-700 dark:hover:text-gray-300">
                Resources
                <ChevronDown size={16} />
              </button>
              <div className="absolute left-0 mt-0 w-48 rounded-lg shadow-xl transition opacity-0 invisible group-hover:opacity-100 group-hover:visible bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700">
                <Link
                  href="/testimonials"
                  className="block px-4 py-3 text-gray-900 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  Testimonials
                </Link>
                <Link
                  href="/faq"
                  className="block px-4 py-3 text-gray-900 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  FAQs
                </Link>
              </div>
            </div>

            <Link
              href="/contact"
              className="transition font-medium text-gray-900 dark:text-white hover:text-gray-700 dark:hover:text-gray-300"
            >
              Contact
            </Link>
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowModal(true)}
              className="px-6 py-2 rounded-lg font-medium border border-gray-400 dark:border-gray-600 bg-transparent text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            >
              Buy Book
            </button>

            <ThemeToggle />

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden text-gray-900 dark:text-white"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isOpen && (
            <nav className="lg:hidden mt-4 pb-4 space-y-3 bg-white dark:bg-gray-900 p-4 rounded-lg border border-gray-200 dark:border-gray-800">
              <Link
                href="/"
                className="block transition font-medium text-gray-900 dark:text-white hover:text-gray-700 dark:hover:text-gray-300"
              >
                Home
              </Link>
              <Link
                href="/about"
                className="block transition font-medium text-gray-900 dark:text-white hover:text-gray-700 dark:hover:text-gray-300"
              >
                About
              </Link>
              <Link
                href="/author"
                className="block transition font-medium text-gray-900 dark:text-white hover:text-gray-700 dark:hover:text-gray-300"
              >
                Author Bio
              </Link>
              <Link
                href="/testimonials"
                className="block transition font-medium text-gray-900 dark:text-white hover:text-gray-700 dark:hover:text-gray-300"
              >
                Testimonials
              </Link>
              <Link
                href="/faq"
                className="block transition font-medium text-gray-900 dark:text-white hover:text-gray-700 dark:hover:text-gray-300"
              >
                FAQs
              </Link>
              <Link
                href="/contact"
                className="block transition font-medium text-gray-900 dark:text-white hover:text-gray-700 dark:hover:text-gray-300"
              >
                Contact
              </Link>
            </nav>
          )}
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative w-full h-screen min-h-[600px] flex items-center justify-center pt-20 bg-transparent">
        <div className="z-10 text-center max-w-3xl mx-auto px-4">
          {/* GRADIENT HEADING */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6 leading-tight 
            bg-gradient-to-br from-sky-400 to-gray-300 bg-clip-text text-transparent">
            AGAINST THE ODDS
          </h1>

          <p className="text-lg sm:text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-4 font-light">
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
