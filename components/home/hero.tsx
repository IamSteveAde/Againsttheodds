import Link from "next/link"
import { StyledImage } from "@/components/styled-image"

export function Hero() {
  return (
    <section className="py-16 md:py-24 bg-white dark:bg-gray-900">
      <header className="w-full py-4 bg-gradient-to-r from-sky-400 to-gray-300 text-center">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-800">
          AGAINST THE ODDS
        </h2>
      </header>

      <div className="container mx-auto px-4 text-center flex flex-col items-center">
        
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mt-10 mb-4 text-gray-900 dark:text-white">
          AGAINST dTHE ODDS
        </h1>

        <p className="text-lg sm:text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-8">
          My Journey Through Storms and Triumphs
          <br />
          <strong className="text-gray-900 dark:text-white">by Dozy Mmobuosi</strong>
        </p>

        <div className="w-full max-w-[250px] xs:max-w-[280px] sm:max-w-[320px] md:max-w-[380px] lg:max-w-[450px] xl:max-w-[500px] mb-8">
          <StyledImage
            src="/images/sharp.jpeg"
            alt="Against The Odds Book Cover"
            width={500}
            height={700}
            variant="book"
            priority
          />
        </div>

        <Link
          href="#buy"
          className="inline-block border border-gray-800 dark:border-white text-gray-900 dark:text-white px-8 py-3 rounded-lg transition hover:bg-gray-100 dark:hover:bg-gray-800 font-medium"
        >
          Buy Book
        </Link>
      </div>
    </section>
  )
}
