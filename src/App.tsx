import { Nav } from "./components/Nav";
import { Hero } from "./components/Hero";
import { Metrics } from "./components/Metrics";
import { Experience } from "./components/Experience";
import { Projects } from "./components/Projects";
import { Skills } from "./components/Skills";
import { Education } from "./components/Education";
import { Footer } from "./components/Footer";
import { useLenis } from "./lib/useLenis";

export default function App() {
  useLenis();

  return (
    <>
      <a
        href="#main"
        className="sr-only z-50 rounded-lg bg-blossom px-4 py-2 font-medium text-ink focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
      >
        Skip to content
      </a>
      <Nav />
      <main id="main">
        <Hero />
        <Metrics />
        <Experience />
        <Projects />
        <Skills />
        <Education />
      </main>
      <Footer />
    </>
  );
}
