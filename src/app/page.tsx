import Hero from "@/components/Hero";
import Skills from "@/components/Skills";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Collaboration from "@/components/Collaboration";

export default function Home() {
  return (
    <main className="bg-black min-h-screen text-white selection:bg-white selection:text-black">
      <Hero />
      <Skills />
      <About />
      <Projects />
      <Collaboration />

      {/* Footer (Simplified) */}
      <footer className="py-12 border-t border-white/10 text-center text-neutral-500 text-sm">
        Madhu (Madhurjya Ray) &copy; 2026
      </footer>
    </main>
  );
}
