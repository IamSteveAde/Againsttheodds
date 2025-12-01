import { StyledImage } from "@/components/styled-image";

export function AuthorSection() {
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center gap-12">
        
        {/* Text Left */}
        <div className="flex-1 w-full md:w-1/2 text-center md:text-left">
          <h2 className="text-4xl md:text-5xl font-bold mb-2 text-gray-900 dark:text-white">
            Dozy Mmobuosi
          </h2>
          <p className="text-red-600 dark:text-red-400 font-semibold mb-6">
            <strong>Visionary Entrepreneur & Innovator</strong>
          </p>
          <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
            Dozy Mmobuosi is a trailblazing entrepreneur known for his innovation, leadership, and relentless drive. His
            journey demonstrates how resilience, creativity, and strategic thinking can turn challenges into
            opportunities. Dozy continues to inspire millions by defying the odds and making a lasting impact in
            business and society.
          </p>
        </div>

        {/* Image Right */}
        <div className="flex-1 w-full md:w-1/2 flex justify-center md:justify-end">
          <StyledImage
            src="/images/pordozy.jpg" // only the portrait
            alt="Dozy Mmobuosi"
            width={500}
            height={500}
            className="w-full max-w-sm h-auto object-cover rounded-xl shadow-lg"
            variant="portrait"
          />
        </div>
      </div>
    </section>
  );
}
