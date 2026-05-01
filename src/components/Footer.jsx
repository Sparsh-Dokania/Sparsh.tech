import React, { useEffect, useRef } from "react";
import gsap from "gsap";

function Footer() {
  const containerRef = useRef(null);
  const ghostTextRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Unhide and transition up
            gsap.to(ghostTextRef.current, {
              y: 0,
              opacity: 0.035,
              duration: 1.5,
              ease: "power3.out",
              onComplete: () => {
                // Ultra subtle atmospheric drift
                gsap.to(ghostTextRef.current, {
                  y: -12,
                  duration: 8,
                  ease: "sine.inOut",
                  yoyo: true,
                  repeat: -1,
                });
              },
            });
            observer.disconnect();
          }
        });
      },
      { threshold: 0.15 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer
      ref={containerRef}
      className="relative flex min-h-[60vh] flex-col justify-between overflow-hidden border-t border-t-[rgba(200,255,0,0.08)] bg-[var(--black)] px-6 pb-10 pt-24 md:min-h-[75vh] md:px-12 md:pb-12 md:pt-32"
    >
      {/* Subtle Background Edge Glow */}
      <div className="pointer-events-none absolute bottom-0 left-1/2 -z-[1] h-[300px] w-[80%] -translate-x-1/2 translate-y-1/2 rounded-full bg-[rgba(200,255,0,0.02)] blur-[100px]" />

      {/* Atmospheric Ghost Text */}
      <div
        ref={ghostTextRef}
        className="pointer-events-none absolute inset-0 flex select-none flex-col items-center justify-center text-center [font-family:var(--syne)] text-[clamp(90px,18vw,280px)] font-black uppercase leading-[0.8] tracking-[-0.04em]"
        style={{ opacity: 0, transform: "translateY(40px)" }}
      >
        <span className="text-[var(--white)] blur-[2px]">SPARSH</span>
        <span className="text-[var(--acid)] blur-[2px]">DOKANIA</span>
      </div>

      {/* Foreground Content */}
      <div className="relative z-10 flex flex-1 flex-col justify-between">
        {/* Fill top spacing to vertically center the signature */}
        <div className="flex-1" />

        <div className="flex flex-col items-center justify-center">
          <h2 className="group [font-family:var(--serif)] text-[clamp(44px,8vw,110px)] italic leading-[0.95] text-[rgba(242,237,228,0.85)] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:text-[var(--white)] hover:drop-shadow-[0_0_30px_rgba(200,255,0,0.18)]">
            Built to respond.
          </h2>
        </div>

        {/* Fill bottom spacing before utility row */}
        <div className="flex-1" />

        {/* Bottom Utility Row */}
        <div className="mt-16 flex w-full flex-col items-center justify-between gap-5 border-t border-[rgba(242,237,228,0.04)] pt-8 md:mt-20 md:flex-row md:gap-0">
          <div className="[font-family:var(--mono)] text-[10px] tracking-[0.15em] text-[rgba(242,237,228,0.25)]">
            © {new Date().getFullYear()} Sparsh Dokania
          </div>

          <button
            onClick={scrollToTop}
            className="group flex items-center gap-2 [font-family:var(--mono)] text-[10px] uppercase tracking-[0.15em] text-[rgba(242,237,228,0.35)] transition-colors duration-300 hover:text-[var(--acid)]"
          >
            Back to top
            <span className="transition-transform duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1">
              ↑
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
