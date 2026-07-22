import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";
import { About } from "../components/HomeSection/About";
import { Contact } from "../components/HomeSection/Contact";
import { Hero } from "../components/HomeSection/Hero";
import { Projects } from "../components/HomeSection/Projects";
import { Skills } from "../components/HomeSection/Skills";
import { Process } from "../components/HomeSection/Process";
import { CaseStudies } from "../components/HomeSection/CaseStudies";
import { Presentation } from "../components/HomeSection/Presentation";

export const Home = () => {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Presentation/>
        <Projects />
        <CaseStudies/>
        <Process />
        <Skills />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
};
