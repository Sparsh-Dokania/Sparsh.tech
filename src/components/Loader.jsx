import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Loader({ onComplete }) {
  const [phase, setPhase] = useState(0);
  const [fastMode, setFastMode] = useState(false);

  useEffect(() => {
    // Session persistence logic
    const hasSeenLoader = sessionStorage.getItem("portfolio_loader_seen");
    
    // Check user preference for reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // If seen before or user prefers reduced motion, skip to abbreviated/fast loader (0.8s)
    if (hasSeenLoader || prefersReducedMotion) {
      setFastMode(true);
      setPhase(3); // Start near the end
      
      const timer = setTimeout(() => {
        onComplete();
      }, 800);
      return () => clearTimeout(timer);
    } else {
      sessionStorage.setItem("portfolio_loader_seen", "true");

      // Full Cinematic Sequence Timings
      // Phase 1 (0 -> 1.2s): Logo reveal
      const t1 = setTimeout(() => setPhase(1), 0);
      
      // Phase 2 (1.2s -> 2.6s): System lines + Signal Beam
      const t2 = setTimeout(() => setPhase(2), 1200);
      
      // Phase 3 (2.6s -> Exit): Loader splits, Grid fades in, READY
      const t3 = setTimeout(() => setPhase(3), 2600);
      
      // Complete / Trigger App Mount
      const t4 = setTimeout(() => {
        onComplete();
      }, 3400);

      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
        clearTimeout(t3);
        clearTimeout(t4);
      };
    }
  }, [onComplete]);

  // Phase 2 system line typing system
  const systemLines = [
    "INITIALIZING SIGNAL...",
    "CALIBRATING MOTION...",
    "LOADING INTERFACE...",
    "READY."
  ];

  const [activeLine, setActiveLine] = useState(0);

  useEffect(() => {
    if (phase === 2 && !fastMode) {
      // Rotate lines every 350ms
      const interval = setInterval(() => {
        setActiveLine((prev) => {
          if (prev < systemLines.length - 1) return prev + 1;
          clearInterval(interval);
          return prev;
        });
      }, 350);
      return () => clearInterval(interval);
    } else if (phase === 3) {
      setActiveLine(systemLines.length - 1);
    }
  }, [phase, fastMode, systemLines.length]);

  // Global styles mapping for loader elements
  const ease = [0.16, 1, 0.3, 1]; // Premium cubic-bezier matching app

  return (
    <AnimatePresence>
      <motion.div
        exit={{ opacity: 0, pointerEvents: "none" }}
        transition={{ duration: 0.6, ease }}
        className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0a0a0a] overflow-hidden"
      >
        {/* Subtle Grain / Noise Overlay */}
        <div className="absolute inset-0 z-[1] opacity-[0.03] pointer-events-none mix-blend-overlay bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIj48ZmlsdGVyIGlkPSJhIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iLjY1IiBucdW1PY3RhdmVzPSIzIiBzdGl0Y2hUaWxlcz0ic3RpdGNoIi8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsdGVyPSJ1cmwoI2EpIi8+PC9zdmc+')]"/>

        {/* Phase 3 Background Grid Reveal */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: phase >= 3 ? 0.08 : 0 }}
          transition={{ duration: 1, ease }}
          className="absolute inset-0 z-[2] bg-[linear-gradient(rgba(200,255,0,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(200,255,0,0.1)_1px,transparent_1px)] bg-[size:40px_40px] md:bg-[size:60px_60px]"
          style={{ maskImage: "radial-gradient(ellipse at center, black 10%, transparent 80%)" }}
        />

        {/* Shutter Masks (Split Upward and Downward at the End) */}
        {!fastMode && (
          <>
            <motion.div
              animate={{ y: phase >= 3 ? "-100%" : "0%" }}
              transition={{ duration: 1.2, ease, delay: 0.4 }}
              className="absolute top-0 left-0 w-full h-1/2 bg-[#0a0a0a] z-[30]"
            />
            <motion.div
              animate={{ y: phase >= 3 ? "100%" : "0%" }}
              transition={{ duration: 1.2, ease, delay: 0.4 }}
              className="absolute bottom-0 left-0 w-full h-1/2 bg-[#0a0a0a] z-[30]"
            />
          </>
        )}

        <div className="relative z-[40] flex flex-col items-center justify-center">
          
          {/* Central Monogram / Identifier */}
          <div className="relative select-none">
            {/* Base faded state */}
            <h1 className="[font-family:var(--syne)] text-[clamp(60px,12vw,140px)] font-black tracking-[-0.04em] text-[rgba(242,237,228,0.1)]">
              SD/
            </h1>

            {/* Scanline acid reveal overlay */}
            <motion.h1
              initial={{ clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)", opacity: 0, filter: "blur(4px)" }}
              animate={
                fastMode 
                  ? { clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)", opacity: 1, filter: "blur(0px)" }
                  : {
                      clipPath: [
                        "polygon(0 0, 100% 0, 100% 0, 0 0)", 
                        "polygon(0 0, 100% 0, 100% 100%, 0 100%)"
                      ],
                      opacity: phase >= 1 ? [0, 1] : 0,
                      filter: phase >= 3 ? "blur(0px)" : phase >= 1 ? ["blur(8px)", "blur(0px)"] : "blur(4px)",
                    }
              }
              transition={{ duration: 1.4, ease }}
              className="absolute inset-0 [font-family:var(--syne)] text-[clamp(60px,12vw,140px)] font-black tracking-[-0.04em] text-[var(--acid)]"
              style={{
                textShadow: phase >= 3 ? "0 0 40px rgba(200,255,0,0.4)" : "none"
              }}
            >
              SD/
            </motion.h1>
          </div>

          {/* Phase 2: Signal Beam + System Output Lines */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: phase >= 2 || fastMode ? 1 : 0 }}
            transition={{ duration: 0.8, ease }}
            className="mt-6 md:mt-10 flex flex-col items-center gap-4 relative w-full min-w-[280px] max-w-[400px]"
          >
            {/* Growing Glow Beam */}
            <motion.div 
              initial={{ scaleX: 0, opacity: 0 }}
              animate={(phase >= 2 || fastMode) ? { scaleX: 1, opacity: 0.6 } : { scaleX: 0, opacity: 0 }}
              transition={{ duration: 1.4, ease }}
              className="h-[1px] w-full bg-gradient-to-r from-transparent via-[var(--acid)] to-transparent blur-[1px] origin-center"
            />

            {/* Typewriter text sequence */}
            {!fastMode && (
              <div className="h-4 w-full flex justify-center overflow-hidden">
                <AnimatePresence mode="popLayout">
                  <motion.div
                    key={activeLine}
                    initial={{ y: 20, opacity: 0, filter: "blur(4px)" }}
                    animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                    exit={{ y: -20, opacity: 0, filter: "blur(4px)" }}
                    transition={{ duration: 0.4, ease }}
                    className={`[font-family:var(--mono)] text-[10px] uppercase tracking-[0.2em] ${
                      activeLine === systemLines.length - 1 
                        ? "text-[var(--acid)] font-bold drop-shadow-[0_0_8px_rgba(200,255,0,0.5)] animate-pulse" 
                        : "text-[rgba(242,237,228,0.45)]"
                    }`}
                  >
                    {systemLines[activeLine]}
                  </motion.div>
                </AnimatePresence>
              </div>
            )}
          </motion.div>

        </div>
      </motion.div>
    </AnimatePresence>
  );
}
