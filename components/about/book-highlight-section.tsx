import { StyledImage } from "@/components/styled-image";
import Link from "next/link";



export function BookHighlightSection() {
  return (
    <section className="py-16 bg-white dark:bg-gray-950">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center gap-12">
        
        {/* Image Left */}
        <div className="flex-1 w-full">
          <StyledImage
            src="/images/sharp.jpeg"
            alt="Against The Odds Book Cover"
            width={600}
            height={800}
            className="w-full h-auto object-cover rounded-xl shadow-lg"
          />
        </div>

        {/* Text Right */}
        <div className="flex-1 w-full md:w-1/2 text-center md:text-left">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
            AGAINST THE ODDS
          </h2>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-3">
            <strong>My Journey Through Storms and Triumphs</strong> - by Dozy Mmobuosi
          </p>
          <p className="text-base md:text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
            "Against The Odds" is a powerful story of resilience, determination, and visionary leadership. Dozy Mmobuosi
            takes you through the trials, triumphs, and lessons learned while building his remarkable journey, inspiring
            readers to defy challenges and achieve greatness.
          </p>

         
        </div>
      </div>
    </section>
  );
}
