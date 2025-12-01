"use client";

import { useState, useEffect } from "react";
import { StyledImage } from "@/components/styled-image";

export function StickyHero() {
  const [isOpen, setIsOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative w-full h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-950">
      <div className="text-center px-4 max-w-3xl">
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-br from-sky-400 to-gray-300 bg-clip-text text-transparent">
          AGAINST THE ODDS
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-4">
          My Journey Through Storms and Triumphs
        </p>
        <p className="text-xl sm:text-2xl text-gray-900 dark:text-white mb-10 font-semibold">
          by Dozy Mmobuosi
        </p>
        <button
          onClick={() => setShowModal(true)}
          className="px-10 py-4 border border-gray-400 dark:border-gray-600 bg-transparent text-gray-900 dark:text-white rounded-lg font-semibold hover:bg-gray-100 dark:hover:bg-gray-800 transition"
        >
          Buy Book
        </button>
      </div>
    </section>
  );
}

export function BookHighlight() {
  const [showModal, setShowModal] = useState(false); // Added state here

  return (
    <section className="py-12 md:py-20 bg-white dark:bg-gray-950">
      <div className="container mx-auto px-4 grid gap-8">
        {/* Image on top */}
        <div className="w-full">
          <StyledImage
            src="/images/sharp.jpeg"
            alt="Against The Odds Book Cover"
            width={1200}
            height={800}
            className="w-full h-auto object-cover"
          />
        </div>

        {/* Text below, centered and 50% width */}
        <div className="mx-auto w-full md:w-1/2 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
            AGAINST THE ODDS
          </h2>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
            Dozy Mmobuosi, visionary entrepreneur and innovator, is a testament to resilience and determination.
            <span className="text-red-600 dark:text-red-500 font-semibold"> Against the Odds</span> is a masterclass
            in cultivating a winning mindset and a reminder that no challenge is too great to overcome.
          </p>
         
        </div>
      </div>
    </section>
  );
}
