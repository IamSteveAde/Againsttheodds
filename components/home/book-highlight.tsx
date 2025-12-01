import { StyledImage } from "@/components/styled-image";
import Link from "next/link";

export function BookHighlight() {
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
          <Link
            href="#buy"
            className="inline-block border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-3 rounded-lg font-medium transition-colors duration-300"
          >
            Buy Book
          </Link>
        </div>
      </div>
    </section>
  );
}
