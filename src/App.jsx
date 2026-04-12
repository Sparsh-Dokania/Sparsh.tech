import { useEffect } from "react";
import gsap from "gsap";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
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

const LENIS_LERP = 0.085;
const LENIS_ANCHOR_DURATION = 1.15;
const LENIS_WHEEL_MULTIPLIER = 0.82;
const LENIS_TOUCH_MULTIPLIER = 1;
const LENIS_SYNC_TOUCH_LERP = 0.09;
const LENIS_TOUCH_INERTIA = 1.15;
const LENIS_SECTION_SNAP_IDLE_MS = 110;
const LENIS_SECTION_SNAP_DURATION = 0.75;
const LENIS_SECTION_SNAP_DISTANCE = 130;
const LENIS_SECTION_SNAP_VELOCITY = 0.08;
const LENIS_SECTION_SNAP_COOLDOWN_MS = 520;

function App() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const isCoarsePointer = window.matchMedia("(pointer: coarse)").matches;

    const lenis = new Lenis({
      autoRaf: true,
      lerp: prefersReducedMotion ? 0.16 : LENIS_LERP,
      duration: prefersReducedMotion ? 0.8 : undefined,
      easing: (t) => 1 - Math.pow(1 - t, 4),
      smoothWheel: true,
      syncTouch: true,
      syncTouchLerp: LENIS_SYNC_TOUCH_LERP,
      touchInertiaExponent: LENIS_TOUCH_INERTIA,
      wheelMultiplier: prefersReducedMotion ? 1 : LENIS_WHEEL_MULTIPLIER,
      touchMultiplier: isCoarsePointer ? LENIS_TOUCH_MULTIPLIER : 0.92,
      overscroll: false,
    });
    let snapIdleTimeout = 0;
    let snapReleaseTimeout = 0;
    let isSnapping = false;
    let lastSnapAt = 0;
    let lastSnappedSectionId = "";
    let suppressSectionPauseUntil = 0;

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
    let speed = 0;

    const onMouseMove = (event) => {
      pmx = mx;
      pmy = my;
      mx = event.clientX;
      my = event.clientY;

      speed = Math.sqrt((mx - pmx) ** 2 + (my - pmy) ** 2);

      if (hasCursor) {
        cursor.style.left = `${mx}px`;
        cursor.style.top = `${my}px`;

        // Scale cursor based on movement speed
        const speedScale = Math.min(1 + speed * 0.002, 1.15);
        gsap.to(cursor, {
          width: 12 * speedScale,
          height: 12 * speedScale,
          duration: 0.15,
          overwrite: false,
        });
      }

      // Magnetic pull on preview cards
      const previews = document.querySelectorAll(".project-preview");
      previews.forEach((preview) => {
        const rect = preview.getBoundingClientRect();
        const px = rect.left + rect.width / 2;
        const py = rect.top + rect.height / 2;
        const dist = Math.sqrt((mx - px) ** 2 + (my - py) ** 2);

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

    const hero = document.querySelector("#hero");
    const heroGrid = hero?.querySelector('[style*="backgroundImage"]');
    const nav = document.querySelector("nav");
    const sections = Array.from(document.querySelectorAll("section[id]"));

    const applyScrollEffects = () => {
      if (!nav) {
        return;
      }

      const scrollY = window.scrollY;

      if (scrollY > 60) {
        nav.style.background = "rgba(8,8,8,0.92)";
        nav.style.backdropFilter = "blur(12px)";
        nav.style.borderBottom = "1px solid rgba(200,255,0,0.08)";
      } else {
        nav.style.background = "none";
        nav.style.backdropFilter = "none";
        nav.style.borderBottom = "none";
      }

      if (hero) {
        const heroScale = Math.max(0.96, 1 - scrollY * 0.0001);
        hero.style.transform = `scale(${heroScale})`;
      }

      if (heroGrid) {
        const gridShift = scrollY * 0.02;
        heroGrid.style.transform = `translate(${gridShift}px, ${gridShift * 0.5}px)`;
      }
    };

    lenis.on("scroll", applyScrollEffects);
    applyScrollEffects();

    const maybeSnapToSection = () => {
      if (prefersReducedMotion || isCoarsePointer || isSnapping) {
        return;
      }

      if (performance.now() < suppressSectionPauseUntil) {
        return;
      }

      if (Math.abs(lenis.velocity) > LENIS_SECTION_SNAP_VELOCITY) {
        return;
      }

      if (performance.now() - lastSnapAt < LENIS_SECTION_SNAP_COOLDOWN_MS) {
        return;
      }

      const offset = getTopUiOffset();
      const currentY = window.scrollY;

      let closestSection = null;
      let closestDistance = Number.POSITIVE_INFINITY;

      sections.forEach((section) => {
        const targetY =
          section.getBoundingClientRect().top + window.scrollY - offset;
        const distance = Math.abs(targetY - currentY);

        if (distance < closestDistance) {
          closestDistance = distance;
          closestSection = section;
        }
      });

      if (!closestSection || closestDistance > LENIS_SECTION_SNAP_DISTANCE) {
        return;
      }

      if (closestSection.id === lastSnappedSectionId && closestDistance < 10) {
        return;
      }

      isSnapping = true;
      lastSnappedSectionId = closestSection.id;
      suppressSectionPauseUntil = performance.now() + 950;

      lenis.scrollTo(closestSection, {
        offset: -offset,
        duration: LENIS_SECTION_SNAP_DURATION,
        lock: true,
        force: true,
      });

      window.clearTimeout(snapReleaseTimeout);
      snapReleaseTimeout = window.setTimeout(
        () => {
          isSnapping = false;
          lastSnapAt = performance.now();
        },
        LENIS_SECTION_SNAP_DURATION * 1000 + 140,
      );
    };

    const handleLenisScroll = () => {
      applyScrollEffects();

      window.clearTimeout(snapIdleTimeout);
      snapIdleTimeout = window.setTimeout(() => {
        maybeSnapToSection();
      }, LENIS_SECTION_SNAP_IDLE_MS);
    };

    lenis.off("scroll", applyScrollEffects);
    lenis.on("scroll", handleLenisScroll);

    const projectItems = document.querySelectorAll(".project-item");
    const onProjectEnter = () => {
      if (hasCursor) {
        gsap.to(cursor, {
          width: 60,
          height: 60,
          duration: 0.25,
          overwrite: true,
        });
      }
    };
    const onProjectLeave = () => {
      if (hasCursor) {
        gsap.to(cursor, {
          width: 12,
          height: 12,
          duration: 0.25,
          overwrite: true,
        });
      }
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

    const getTopUiOffset = () => {
      const ticker =
        document.querySelector('[data-ui="ticker"]') ||
        document.querySelector(
          'div[aria-hidden][class*="fixed"][class*="top-0"]',
        );
      const nav = document.querySelector("nav");

      const tickerHeight = ticker?.offsetHeight || 0;
      const navRect = nav?.getBoundingClientRect();
      const navBottom = navRect ? Math.max(0, navRect.bottom) : 0;

      return Math.max(72, tickerHeight + navBottom + 12);
    };

    const onHashLinkClick = (event) => {
      const anchor = event.target.closest('a[href^="#"]');
      if (!anchor) {
        return;
      }

      const href = anchor.getAttribute("href");
      if (!href || href === "#") {
        return;
      }

      const target = document.querySelector(href);
      if (!target) {
        return;
      }

      event.preventDefault();

      const offset = getTopUiOffset();
      suppressSectionPauseUntil = performance.now() + 700;
      isSnapping = false;
      lenis.scrollTo(target, {
        offset: -offset,
        duration: LENIS_ANCHOR_DURATION,
        lock: true,
      });
      window.history.replaceState(null, "", href);
    };

    document.addEventListener("click", onHashLinkClick);

    if (window.location.hash) {
      const initialTarget = document.querySelector(window.location.hash);
      if (initialTarget) {
        const offset = getTopUiOffset();
        window.setTimeout(() => {
          suppressSectionPauseUntil = performance.now() + 700;
          isSnapping = false;
          lenis.scrollTo(initialTarget, {
            offset: -offset,
            immediate: true,
          });
        }, 0);
      }
    }

    return () => {
      window.clearTimeout(snapIdleTimeout);
      window.clearTimeout(snapReleaseTimeout);
      lenis.destroy();
      document.documentElement.classList.remove("reveal-ready");
      if (hasCursor) {
        document.removeEventListener("mousemove", onMouseMove);
        window.cancelAnimationFrame(rafId);
      }
      observer.disconnect();
      if (hasCursor) {
        projectItems.forEach((item) => {
          item.removeEventListener("mouseenter", onProjectEnter);
          item.removeEventListener("mouseleave", onProjectLeave);
        });
      }
      document.removeEventListener("click", onHashLinkClick);
    };
  }, []);

  return (
    <>
      <NoiseBackground />
      <Cursor />
      <Ticker />
      <Navbar />
      <Hero />
      <StackMarquee />
      <About />
      <Work />
      <HowIBuild />
      <Experience />
      <Contact />
      <Analytics />
      <Footer />
    </>
  );
}

export default App;
