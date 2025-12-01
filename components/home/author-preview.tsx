import { StyledImage } from "@/components/styled-image"
import Link from "next/link"

export function AuthorPreview() {
  return (
    <section className="py-12 md:py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 grid md:grid-cols-2 gap-8 md:gap-12 items-center">
        <div>
          <StyledImage
            src="/images/dozym.jpg"
            alt="Dozy Mmobuosi"
            width={400}
            height={400}
            variant="portrait"
            priority
          />
        </div>
        <div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 text-gray-900 dark:text-white">
            Dozy Mmobuosi
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
            Visionary entrepreneur and innovator, Dozy Mmobuosi exemplifies resilience, creativity, and leadership. A
            story of defying the odds and inspiring millions.
          </p>
          <Link
            href="/author"
            className="inline-block bg-white text-red-600 hover:bg-red-50 dark:bg-white dark:text-red-600 dark:hover:bg-red-50 px-6 sm:px-8 py-2 sm:py-3 rounded-lg transition font-medium border border-red-600"
          >
            Read Bio
          </Link>
        </div>
      </div>
    </section>
  )
}
