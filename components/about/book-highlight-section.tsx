import { StyledImage } from "@/components/styled-image"
import Link from "next/link"

export function BookHighlightSection() {
  return (
    <section className="py-12 md:py-20 bg-white dark:bg-gray-950">
      <div className="container mx-auto px-4 grid md:grid-cols-2 gap-8 md:gap-12 items-center">
        <div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2 text-gray-900 dark:text-white">
            AGAINST THE ODDS
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 mb-2">
            <strong>My Journey Through Storms and Triumphs</strong> - by Dozy Mmobuosi
          </p>
          <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
            "Against The Odds" is a powerful story of resilience, determination, and visionary leadership. Dozy Mmobuosi
            takes you through the trials, triumphs, and lessons learned while building his remarkable journey, inspiring
            readers to defy challenges and achieve greatness.
          </p>
          
         
        </div>
        <div>
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
