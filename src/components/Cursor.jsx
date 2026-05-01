import { useEffect, useRef } from "react";
import gsap from "gsap";

function Cursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const activeTargetRef = useRef(null);
  const isDisabledRef = useRef(false);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    const targets = document.querySelectorAll(".magnetic-target");
    const previews = document.querySelectorAll(".project-preview");
    const coarsePointerQuery = window.matchMedia("(pointer: coarse)");
    const cleanups = [];
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    if (!dot || !ring) {
      return undefined;
    }

    const setCursorAvailability = () => {
      isDisabledRef.current =
        coarsePointerQuery.matches || window.innerWidth < 768;

      gsap.set([dot, ring], {
        autoAlpha: isDisabledRef.current ? 0 : 1,
      });

      document.body.style.cursor = isDisabledRef.current ? "auto" : "none";
    };

    gsap.set([dot, ring], {
      x: mouseX,
      y: mouseY,
      xPercent: -50,
      yPercent: -50,
      scale: 1,
      transformOrigin: "50% 50%",
      force3D: true,
    });

    setCursorAvailability();

    const dotXTo = gsap.quickTo(dot, "x", {
      duration: 0.08,
      ease: "power3.out",
    });
    const dotYTo = gsap.quickTo(dot, "y", {
      duration: 0.08,
      ease: "power3.out",
    });
    const ringXTo = gsap.quickTo(ring, "x", {
      duration: 0.24,
      ease: "power3.out",
    });
    const ringYTo = gsap.quickTo(ring, "y", {
      duration: 0.24,
      ease: "power3.out",
    });

    const moveCursor = (x, y) => {
      dotXTo(x);
      dotYTo(y);
      ringXTo(x);
      ringYTo(y);
    };

    const moveActiveTarget = () => {
      const target = activeTargetRef.current;

      if (!target) {
        return;
      }

      const rect = target.getBoundingClientRect();
      const x = mouseX - (rect.left + rect.width / 2);
      const y = mouseY - (rect.top + rect.height / 2);

      gsap.to(target, {
        x: x * 0.2,
        y: y * 0.2,
        duration: 0.3,
        ease: "power3.out",
        overwrite: "auto",
      });
    };

    const moveProjectPreviews = () => {
      previews.forEach((preview) => {
        const rect = preview.getBoundingClientRect();
        const px = rect.left + rect.width / 2;
        const py = rect.top + rect.height / 2;
        const dist = Math.hypot(mouseX - px, mouseY - py);

        if (dist < 120) {
          const pullStrength = (120 - dist) / 120;
          const pull = 8 * pullStrength;
          const angle = Math.atan2(mouseY - py, mouseX - px);

          gsap.to(preview, {
            x: Math.cos(angle) * pull * 0.6,
            y: Math.sin(angle) * pull * 0.6,
            duration: 0.3,
            ease: "power3.out",
            overwrite: "auto",
          });
        } else {
          gsap.to(preview, {
            x: 0,
            y: 0,
            duration: 0.4,
            ease: "power3.out",
            overwrite: "auto",
          });
        }
      });
    };

    const onMouseMove = (event) => {
      if (isDisabledRef.current) {
        return;
      }

      mouseX = event.clientX;
      mouseY = event.clientY;

      moveCursor(mouseX, mouseY);
      moveActiveTarget();
      moveProjectPreviews();
    };

    const onResize = () => {
      setCursorAvailability();
      moveCursor(mouseX, mouseY);
    };

    targets.forEach((el) => {
      const onEnter = () => {
        activeTargetRef.current = el;

        gsap.to(ring, {
          scale: 1.3,
          borderColor: "rgba(200,255,0,0.72)",
          opacity: 1,
          boxShadow: "0 0 12px rgba(200,255,0,0.08)",
          duration: 0.25,
          ease: "power3.out",
          overwrite: "auto",
        });
      };

      const onLeave = () => {
        if (activeTargetRef.current === el) {
          activeTargetRef.current = null;
        }

        gsap.to(el, {
          x: 0,
          y: 0,
          duration: 0.4,
          ease: "power3.out",
          overwrite: "auto",
        });

        gsap.to(ring, {
          scale: 1,
          borderColor: "rgba(200,255,0,0.4)",
          opacity: 0.72,
          boxShadow: "0 0 12px rgba(200,255,0,0.04)",
          duration: 0.25,
          ease: "power3.out",
          overwrite: "auto",
        });
      };

      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);

      cleanups.push(() => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
      });
    });

    document.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("resize", onResize);

    if (coarsePointerQuery.addEventListener) {
      coarsePointerQuery.addEventListener("change", onResize);
    } else {
      coarsePointerQuery.addListener(onResize);
    }

    cleanups.push(() => {
      document.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);

      if (coarsePointerQuery.removeEventListener) {
        coarsePointerQuery.removeEventListener("change", onResize);
      } else {
        coarsePointerQuery.removeListener(onResize);
      }

      document.body.style.cursor = "";
      gsap.killTweensOf([dot, ring, ...targets, ...previews]);
    });

    return () => cleanups.forEach((fn) => fn());
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        id="cursor"
        className="fixed left-0 top-0 h-3 w-3 rounded-full bg-[var(--acid)] pointer-events-none z-[9999] [mix-blend-mode:difference]"
        style={{ transform: "translate(-50%, -50%)" }}
      />

      <div
        ref={ringRef}
        id="cursor-ring"
        className="fixed left-0 top-0 h-10 w-10 rounded-full pointer-events-none z-[9998] border border-[rgba(200,255,0,0.4)] opacity-[0.72]"
        style={{
          transform: "translate(-50%, -50%)",
          boxShadow: "0 0 12px rgba(200,255,0,0.04)",
        }}
      />
    </>
  );
}

export default Cursor;
