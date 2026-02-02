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

      {/* Footer (Desktop only - mobile copyright is in Collaboration section) */}
      <footer className="hidden md:block py-12 border-t border-white/10 text-neutral-500 text-sm">
        <div className="max-w-7xl mx-auto px-2 text-left">
          Built by Madhu &copy; 2026 
        </div>
        <div className="max-w-7xl mx-auto px-2 text-left">
          All rights reserved.
        </div>
      </footer>
    </main>
  );
}
