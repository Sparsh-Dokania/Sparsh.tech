import { useEffect } from "react";
import gsap from "gsap";
import Cursor from "./components/Cursor";
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
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const cursor = document.getElementById("cursor");
    const ring = document.getElementById("cursor-ring");
    const hasCursor = Boolean(cursor && ring);

    let mx = 0;
    let my = 0;
    let pmx = 0;
    let pmy = 0;
    let rx = 0;
    let ry = 0;
    let rafId = 0;

    const onMouseMove = (event) => {
      pmx = mx;
      pmy = my;
      mx = event.clientX;
      my = event.clientY;

      if (hasCursor) {
        const speed = Math.hypot(mx - pmx, my - pmy);
        const speedScale = Math.min(1 + speed * 0.002, 1.15);

        cursor.style.left = `${mx}px`;
        cursor.style.top = `${my}px`;

        gsap.to(cursor, {
          width: 12 * speedScale,
          height: 12 * speedScale,
          duration: 0.15,
          overwrite: false,
        });
      }

      const previews = document.querySelectorAll(".project-preview");
      previews.forEach((preview) => {
        const rect = preview.getBoundingClientRect();
        const px = rect.left + rect.width / 2;
        const py = rect.top + rect.height / 2;
        const dist = Math.hypot(mx - px, my - py);

        if (dist < 120) {
          const pullStrength = (120 - dist) / 120;
          const pull = 8 * pullStrength;
          const angle = Math.atan2(my - py, mx - px);

          gsap.to(preview, {
            x: Math.cos(angle) * pull * 0.6,
            y: Math.sin(angle) * pull * 0.6,
            duration: 0.3,
            overwrite: false,
          });
        } else {
          gsap.to(preview, {
            x: 0,
            y: 0,
            duration: 0.4,
            overwrite: false,
          });
        }
      });
    };

    if (hasCursor) {
      document.addEventListener("mousemove", onMouseMove);
    }

    const lerpRing = () => {
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;

      if (hasCursor) {
        ring.style.left = `${rx}px`;
        ring.style.top = `${ry}px`;
      }

      rafId = window.requestAnimationFrame(lerpRing);
    };

    if (hasCursor) {
      rafId = window.requestAnimationFrame(lerpRing);
    }

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

    const projectItems = document.querySelectorAll(".project-item");
    const onProjectEnter = () => {
      if (!hasCursor) {
        return;
      }

      gsap.to(cursor, {
        width: 60,
        height: 60,
        duration: 0.25,
        overwrite: true,
      });
    };

    const onProjectLeave = () => {
      if (!hasCursor) {
        return;
      }

      gsap.to(cursor, {
        width: 12,
        height: 12,
        duration: 0.25,
        overwrite: true,
      });
    };

    if (hasCursor) {
      projectItems.forEach((item) => {
        item.addEventListener("mouseenter", onProjectEnter);
        item.addEventListener("mouseleave", onProjectLeave);
      });

      if (window.matchMedia("(pointer: coarse)").matches) {
        cursor.style.display = "none";
        ring.style.display = "none";
        document.body.style.cursor = "auto";
      }
    }

    return () => {
      document.documentElement.classList.remove("reveal-ready");
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);

      if (scrollFrame) {
        window.cancelAnimationFrame(scrollFrame);
      }

      if (hasCursor) {
        document.removeEventListener("mousemove", onMouseMove);
        window.cancelAnimationFrame(rafId);
        projectItems.forEach((item) => {
          item.removeEventListener("mouseenter", onProjectEnter);
          item.removeEventListener("mouseleave", onProjectLeave);
        });
      }
    };
  }, []);

  return (
    <>
      <Cursor />
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
