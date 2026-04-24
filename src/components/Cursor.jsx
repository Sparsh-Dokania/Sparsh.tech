import { useEffect } from "react";
import gsap from "gsap";

function Cursor() {
  useEffect(() => {
    const targets = document.querySelectorAll(".magnetic-target");
    const cursorRing = document.getElementById("cursor-ring");

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
        gsap.to(cursorRing, {
          width: 52,
          height: 52,
          borderColor: "rgba(200,255,0,0.65)",
          duration: 0.25,
          ease: "power3.out",
        });
      };

      const onLeave = () => {
        gsap.to(el, {
          x: 0,
          y: 0,
          duration: 0.4,
          ease: "power3.out",
        });

        gsap.to(cursorRing, {
          width: 40,
          height: 40,
          borderColor: "rgba(200,255,0,0.4)",
          duration: 0.25,
          ease: "power3.out",
        });
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

    return () => cleanups.forEach((fn) => fn());
  }, []);

  return (
    <>
      <div
        id="cursor"
        className="fixed h-3 w-3 rounded-full bg-[var(--acid)] pointer-events-none z-[9999] [mix-blend-mode:difference]"
      />

      <div
        id="cursor-ring"
        className="fixed h-10 w-10 rounded-full pointer-events-none z-[9998] border border-[rgba(200,255,0,0.4)]"
      />
    </>
  );
}

export default Cursor;
