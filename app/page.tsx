"use client"
import { StickyHero } from "@/components/sticky-hero"
import { BookHighlight } from "@/components/home/book-highlight"
import { AuthorPreview } from "@/components/home/author-preview"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main>
      <StickyHero />
      <BookHighlight />
      <AuthorPreview />
      <Footer />
    </main>
  )
}
