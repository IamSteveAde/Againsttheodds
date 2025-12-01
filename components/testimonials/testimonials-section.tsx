import Image from "next/image"

interface Testimonial {
  name: string
  role: string
  text: string
  image: string
}

const testimonials: Testimonial[] = [
  {
    name: "H.E. Dr. Bakili Muluzi",
    role: "Former President of the Republic of Malawi",
    text: '"In Against The Odds: My Journey Through Storms and Triumphs, Dozy Mmobuosi reminds us that resilience and vision can turn adversity into achievement. His story is not just personal, it is the story of modern Africa\'s rise through courage, innovation, and unyielding hope."',
    image: "/bakili-muluzi.jpg",
  },
  {
    name: "Akon",
    role: "Global Music Icon & Entrepreneur",
    text: "\"I've watched Dozy Mmobuosi rise, fall, and rise again, always with purpose and faith. Against The Odds is more than a story; it's a testament to resilience, vision, and the unstoppable spirit of Africa's new generation of leaders.\"",
    image: "/akon.jpg",
  },
  {
    name: "Aare Dele Momodu",
    role: "Publisher, Ovation International & Chairman, Ovation Media Group",
    text: '"Dozy Mmobuosi\'s Against The Odds is an extraordinary story of ambition, resilience, and faith. It captures the true essence of what it means to dream big, fall hard, and rise even stronger. A powerful inspiration for every African determined to make a difference."',
    image: "/dele-momodu.jpg",
  },
]

export function TestimonialsSection() {
  return (
    <section className="py-12 md:py-20 bg-white dark:bg-gray-950">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-12 text-gray-900 dark:text-white text-balance">
          REVIEWS AND TESTIMONIALS
        </h2>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-gray-50 dark:bg-gray-900 p-6 md:p-8 rounded-lg border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-lg dark:hover:shadow-lg hover:border-red-300 dark:hover:border-red-700"
            >
              <div className="relative mb-4">
                <Image
                  src={testimonial.image || "/placeholder.svg?height=100&width=100&query=testimonial"}
                  alt={testimonial.name}
                  width={100}
                  height={100}
                  className="w-20 h-20 rounded-full mb-4 object-cover ring-2 ring-gray-200 dark:ring-gray-700 shadow-md"
                />
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-4 italic leading-relaxed text-sm md:text-base">
                {testimonial.text}
              </p>
              <h4 className="font-semibold text-gray-900 dark:text-white">{testimonial.name}</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">{testimonial.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
