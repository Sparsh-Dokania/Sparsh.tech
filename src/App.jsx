import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import Cursor from "./components/Cursor";
import Loader from "./components/Loader";
import Ticker from "./components/Ticker";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import StackMarquee from "./components/StackMarquee";
import About from "./components/About";
import Work from "./components/Work";
import HowIBuild from "./components/HowIBuild";
import Experience from "./components/Experience";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import "./styles.css";
import { Analytics } from "@vercel/analytics/react";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    document.documentElement.classList.add("reveal-ready");

    const revealElements = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );

    revealElements.forEach((element) => observer.observe(element));

    const nav = document.querySelector("nav");
    let scrollFrame = 0;

    const applyNavState = () => {
      scrollFrame = 0;

      if (!nav) {
        return;
      }

      nav.classList.toggle("nav-scrolled", window.scrollY > 60);
    };

    const onScroll = () => {
      if (scrollFrame || prefersReducedMotion) {
        return;
      }

      scrollFrame = window.requestAnimationFrame(applyNavState);
    };

    applyNavState();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      document.documentElement.classList.remove("reveal-ready");
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);

      if (scrollFrame) {
        window.cancelAnimationFrame(scrollFrame);
      }
    };
  }, []);

  // Lock scroll while loader is active
  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isLoading]);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && <Loader onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      {!isLoading && <Cursor />}
      <Ticker />
      <Navbar />
      <main className="portfolio-scroll">
        <Hero />
        <StackMarquee />
        <About />
        <Work />
        <HowIBuild />
        <Experience />
        <Contact />
      </main>
      <Analytics />
      <Footer />
    </>
  );
}

export default App;
