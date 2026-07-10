import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Services from "@/components/Services";
import FreelanceCTA from "@/components/FreelanceCTA";
import Skills from "@/components/Skills";
import Education from "@/components/Education";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main className="pt-20">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Services />
        <FreelanceCTA />
        <Skills />
        <Education />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
