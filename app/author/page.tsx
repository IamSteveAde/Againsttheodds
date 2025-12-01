import { Header } from "@/components/header"
import { AuthorBioSection } from "@/components/author/author-bio-section"
import { Footer } from "@/components/footer"

export default function Author() {
  return (
    <>
      <Header />
      <main>
        <AuthorBioSection />
      </main>
      <Footer />
    </>
  )
}
