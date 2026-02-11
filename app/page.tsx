import Hero from "@/components/Hero";
import Skills from "@/components/Skills";
import AboutSection from '@/components/AboutSection';
import Projects from "@/components/Projects";


export default function Home() {
  return (
    <main className="bg-black min-h-screen text-white selection:bg-white selection:text-black">
      <Hero />
      <Skills />
      <AboutSection />
      <Projects />

      {/* Footer */}
      <footer className="hidden md:block py-12 text-neutral-500 text-sm">
        <div className="max-w-7xl mx-auto px-2 text-center">
          Built by Madhu &copy; 2026
        </div>
        <div className="max-w-7xl mx-auto px-2 text-center">
          All rights reserved.
        </div>
      </footer>
    </main>
  );
}
