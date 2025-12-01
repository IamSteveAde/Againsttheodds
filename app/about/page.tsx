import { Header } from "@/components/header"
import { BookHighlightSection } from "@/components/about/book-highlight-section"
import { AuthorSection } from "@/components/about/author-section"
import { Footer } from "@/components/footer"

export default function About() {
  return (
    <>
      <Header />
      <main>
        <BookHighlightSection />
        <AuthorSection />
      </main>
      <Footer />
    </>
  )
}
