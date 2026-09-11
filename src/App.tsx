import { useEffect, useState } from "react";
import { useLenis } from "./hooks/useLenis";
import LoadingScreen from "./components/LoadingScreen/LoadingScreen";
import Cursor from "./components/Cursor/Cursor";
import Navigation from "./components/Navigation/Navigation";
import Hero from "./components/Hero/Hero";
import Introduction from "./components/About/Introduction";
import About from "./components/About/About";
import Skills from "./components/Skills/Skills";
import Projects from "./components/Projects/Projects";
import Experiments from "./components/Experiments/Experiments";
import Education from "./components/Education/Education";
import Achievements from "./components/Achievements/Achievements";
import BuildingInPublic from "./components/Github/BuildingInPublic";
import ResumeCta from "./components/Contact/ResumeCta";
import Contact from "./components/Contact/Contact";
import Footer from "./components/Footer/Footer";

export default function App() {
  const [revealed, setRevealed] = useState(
    () => sessionStorage.getItem("gv-loaded") === "1",
  );
  useLenis(revealed);

  useEffect(() => {
    document.documentElement.style.overflow = revealed ? "" : "hidden";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [revealed]);

  return (
    <>
      <LoadingScreen onReveal={() => setRevealed(true)} />
      <Cursor />
      <Navigation />
      <main>
        <Hero started={revealed} />
        <Introduction />
        <About />
        <Skills />
        <Projects />
        <Experiments />
        <Education />
        <Achievements />
        <BuildingInPublic />
        <ResumeCta />
        <Contact />
      </main>
      <Footer />
      <div className="grain" aria-hidden="true" />
    </>
  );
}
