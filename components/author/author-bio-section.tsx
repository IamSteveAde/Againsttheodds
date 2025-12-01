import { StyledImage } from "@/components/styled-image";

export function AuthorBioSection() {
  return (
    <section className="flex justify-center py-20 bg-gray-100 dark:bg-gray-900">
      <div className="
        relative w-[90%] md:w-4/5 
        bg-gradient-to-r from-[#071533] via-[#0d2763] to-[#133b8a] 
        rounded-xl overflow-hidden shadow-2xl 
        flex flex-col md:flex-row items-center
        py-10 md:py-0
      ">
        
        {/* Left: Image */}
        <div className="flex-1 flex items-center justify-center w-full md:h-full px-6 md:px-0">
          <StyledImage
            src="/images/dozym.jpg"
            alt="Dozy Mmobuosi"
            width={450}
            height={650}
            variant="portrait"
            className="
              w-full max-w-[350px] md:max-w-[80%] 
              h-auto object-cover rounded-xl shadow-2xl
            "
          />
        </div>

        {/* Right: Text */}
        <div className="
          flex-1 text-white 
          px-6 md:px-10 
          py-10 
          flex flex-col justify-center 
          max-w-[95%] md:max-w-[80%]
        ">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center md:text-left">
            Dozy Mmobuosi
          </h2>

          <p className="text-lg md:text-xl mb-4 italic text-blue-200 text-center md:text-left">
            Author Bio
          </p>

          <div className="space-y-4 text-base md:text-lg leading-relaxed text-center md:text-left">
            <p>
              Dozy Mmobuosi is a global business leader and technology innovator. From humble beginnings in Nigeria, he
              has built companies across telecommunications, food & beverages, artificial intelligence, finance,
              and energy.
            </p>
            <p>
              As the founder of Tingo Mobile, he helped millions of farmers access mobile technology. Through Tingo
              Foods and Tingo BV PLC, he has created value chains that feed communities and build Africa's FMCG
              industry.
            </p>
            <p>
              Today, Dozy leads in artificial intelligence through Tingo AI, developing Africa's first AI-powered radio
              station, generative AI systems, and large-scale AI data centers.
            </p>
            <p>
              Dozy first rose to prominence as the founder of Tingo Mobile, a trailblazing fintech and agri-tech
              company that provided mobile devices and financial access to millions of smallholder farmers in Nigeria.
            </p>
            <p>
              His success in building Tingo into a multi-billion-dollar enterprise established him as a key figure in
              Africa’s economic development.
            </p>
          </div>

          {/* Button */}
          
        </div>

      </div>
    </section>
  );
}
