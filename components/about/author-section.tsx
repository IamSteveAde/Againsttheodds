import { StyledImage } from "@/components/styled-image"

export function AuthorSection() {
  return (
    <section className="py-12 md:py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 grid md:grid-cols-2 gap-8 md:gap-12 items-center">
        <div>
          <StyledImage src="/images/pordozy.jpg" alt="Dozy Mmobuosi" width={400} height={400} variant="portrait" />
        </div>
        <div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-1 text-gray-900 dark:text-white">
            Dozy Mmobuosi
          </h2>
          <p className="text-red-600 dark:text-red-400 font-semibold mb-6">
            <strong>Visionary Entrepreneur & Innovator</strong>
          </p>
          <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            Dozy Mmobuosi is a trailblazing entrepreneur known for his innovation, leadership, and relentless drive. His
            journey demonstrates how resilience, creativity, and strategic thinking can turn challenges into
            opportunities. Dozy continues to inspire millions by defying the odds and making a lasting impact in
            business and society.
          </p>
          <div>
            <StyledImage
              src="/images/sharp.jpeg"
              alt="Against The Odds Book Cover"
              width={400}
              height={400}
              variant="book"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
