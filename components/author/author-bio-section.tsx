import { StyledImage } from "@/components/styled-image"

export function AuthorBioSection() {
  return (
    <section className="py-12 md:py-20">
      <div className="container mx-auto px-4">
        {/* Heading Section */}
        <div className="text-center mb-12 md:mb-16">
          <p className="text-gray-600 dark:text-gray-400 italic mb-2">Author Bio</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Dozy Mmobuosi
          </h2>
        </div>

        {/* Main Content Grid */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left: Bio Text */}
          <div className="space-y-4 text-gray-600 dark:text-gray-400 order-2 md:order-1">
            <p>
              Dozy Mmobuosi is a global business leader and technology innovator. From humble beginnings in Nigeria, he
              has built companies across telecommunications, food & beverages, artificial intelligence, finance, and
              energy.
            </p>
            <p>
              As the founder of Tingo Mobile, he helped millions of farmers access mobile technology. Through Tingo
              Foods and Tingo BV PLC, he has created value chains that feed communities and build Africa's FMCG
              industry. With Equity Health Group, he is advancing healthcare access across the continent.
            </p>
            <p>
              Today, Dozy leads in artificial intelligence through Tingo AI, developing Africa's first AI-powered radio
              station, generative AI systems, and large-scale AI data centers. His ventures reflect his core belief:
              Africa can lead the world in innovation.
            </p>
            <p>
              Dozy first rose to prominence as the founder of Tingo Mobile, a trailblazing fintech and agri-tech company
              that provided mobile devices, digital services, and financial access to millions of smallholder farmers in
              Nigeria. Through this venture, he pioneered one of Africa's earliest large-scale mobile-based platforms
              enabling farmers to connect to markets, access credit, and improve productivity.
            </p>
            <p>
              His success in building Tingo into a multi-billion-dollar enterprise established him as a key figure at
              the intersection of technology and inclusive economic development.
            </p>
          </div>

          {/* Right: Floating Images Layout */}
          <div className="relative h-96 md:h-[500px] w-full order-1 md:order-2">
            {/* Center Book Cover */}
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <StyledImage
                src="/images/sharp.jpeg"
                alt="Against The Odds Book Cover"
                width={280}
                height={400}
                variant="book"
                priority
                className="drop-shadow-2xl"
              />
            </div>

            {/* Top Left - Formal Portrait */}
            <div className="absolute top-0 left-0 w-24 h-32 md:w-32 md:h-40 z-20 -translate-y-2 -translate-x-2 hidden sm:block">
              <StyledImage
                src="/images/dozym.jpg"
                alt="Dozy Mmobuosi - Formal Portrait"
                width={120}
                height={160}
                variant="portrait"
                className="w-full h-full object-cover rounded-lg shadow-lg border-4 border-white dark:border-gray-900 transform hover:scale-105 transition-transform"
              />
            </div>

            {/* Mobile: Single image below book */}
            <div className="sm:hidden flex gap-4 mt-96 justify-center">
              <div className="w-20 h-28">
                <StyledImage
                  src="/images/dozym.jpg"
                  alt="Dozy Mmobuosi - Formal Portrait"
                  width={80}
                  height={110}
                  variant="portrait"
                  className="w-full h-full object-cover rounded-lg shadow-lg border-2 border-white dark:border-gray-900"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
