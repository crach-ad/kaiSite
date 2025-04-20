import Hero from "@/components/hero"
import About from "@/components/about"
import Portfolio from "@/components/portfolio"
import Press from "@/components/press"
import Contact from "@/components/contact"
import ThemeSwitcher from "@/components/theme-switcher"

export default function Home() {
  return (
    <main className="min-h-screen">
      <ThemeSwitcher />
      <Hero />
      <About />
      <Portfolio />
      <Press />
      <Contact />
    </main>
  )
}
