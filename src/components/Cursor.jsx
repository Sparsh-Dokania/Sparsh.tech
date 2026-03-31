import { useEffect } from "react";
import gsap from "gsap";

function Cursor() {

  useEffect(() => {
    const targets = document.querySelectorAll(".magnetic-target");
    const cursorRing = document.getElementById("cursor-ring");
    const corners = document.getElementById("cursor-corners");

    const cleanups = [];

    targets.forEach((el) => {

      const onMove = (e) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - (rect.left + rect.width / 2);
        const y = e.clientY - (rect.top + rect.height / 2);

        gsap.to(el, {
          x: x * 0.2,
          y: y * 0.2,
          duration: 0.3,
          ease: "power3.out",
        });
      };

      const onEnter = () => {
        const rect = el.getBoundingClientRect();

        // hide ring smoothly
        gsap.to(cursorRing, { opacity: 0, duration: 0.2 });

        // show corners
        gsap.to(corners, {
          opacity: 1,
          x: rect.left,
          y: rect.top,
          width: rect.width,
          height: rect.height,
          duration: 0.3,
          ease: "power3.out",
        });
      };

      const onLeave = () => {
        // reset element
        gsap.to(el, {
          x: 0,
          y: 0,
          duration: 0.4,
          ease: "power3.out",
        });

        // hide corners
        gsap.to(corners, {
          opacity: 0,
          duration: 0.2,
        });

        // show ring back
        gsap.to(cursorRing, { opacity: 1, duration: 0.2 });
      };

      el.addEventListener("mousemove", onMove);
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);

      cleanups.push(() => {
        el.removeEventListener("mousemove", onMove);
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
      });
    });

    return () => cleanups.forEach(fn => fn());
  }, []);

  return (
    <>
      <div id="cursor" className="fixed w-3 h-3 bg-[var(--acid)] rounded-full pointer-events-none z-[9999] [mix-blend-mode:difference]" />

      <div id="cursor-ring" className="fixed w-10 h-10 rounded-full pointer-events-none z-[9998] border border-[rgba(200,255,0,0.4)]" />

      <div id="cursor-corners" className="fixed top-0 left-0 pointer-events-none z-[9997] opacity-0">
        <span className="corner tl"></span>
        <span className="corner tr"></span>
        <span className="corner bl"></span>
        <span className="corner br"></span>
      </div>
    </>
  );
}

export default Cursor;