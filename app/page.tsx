import Hero from "@/components/Hero";
import HeroImage from "@/components/HeroImage";
import Projects from "@/components/Projects";
import About from "@/components/About";
import Stack from "@/components/Stack";
import CtaBand from "@/components/CtaBand";
import Contact from "@/components/Contact";
import { site } from "@/data/site";

export default function Home() {
  return (
    <main id="main">
      <Hero media={<HeroImage src={site.heroImage.src} alt={site.heroImage.alt} />} />
      <Projects />
      <About />
      <Stack />
      <CtaBand />
      <Contact />
    </main>
  );
}