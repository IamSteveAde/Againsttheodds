import { StyledImage } from "@/components/styled-image"
import Link from "next/link"

export function BookHighlight() {
  return (
    <section className="py-12 md:py-20 bg-white dark:bg-gray-950">
      <div className="container mx-auto px-4 grid md:grid-cols-2 gap-8 md:gap-12 items-center">
        <div className="order-2 md:order-1">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
            AGAINST THE ODDS
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
            Dozy Mmobuosi, visionary entrepreneur and innovator, is a testament to resilience and determination.
            <span className="text-red-600 dark:text-red-500 font-semibold"> Against the Odds</span> is a masterclass
            in cultivating a winning mindset and a reminder that no challenge is too great to overcome.
          </p>
          <Link
            href="#buy"
            className="inline-block bg-white text-red-600 hover:bg-red-50 dark:bg-white dark:text-red-600 dark:hover:bg-red-50 px-6 sm:px-8 py-2 sm:py-3 rounded-lg transition font-medium"
          >
            Buy Book
          </Link>
        </div>
        <div className="order-1 md:order-2">
          <StyledImage
            src="/images/sharp.jpeg"
            alt="Against The Odds Book Cover"
            width={400}
            height={500}
            variant="book"
          />
        </div>
      </div>
    </section>
  )
}
