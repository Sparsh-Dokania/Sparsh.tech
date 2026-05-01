import { useEffect, useRef } from "react";
import ProximityRotateText from "./ProximityRotateText";

function Hero() {
  const glowRef = useRef(null);

  useEffect(() => {
    const glow = glowRef.current;
    if (!glow) return;

    const canHover = window.matchMedia(
      "(pointer: fine) and (min-width: 768px)",
    );

    let rafId = 0;
    let idleTimer = 0;
    let currentX = 0;
    let currentY = 0;
    let targetX = 0;
    let targetY = 0;

    const setGlowTransform = (x, y) => {
      glow.style.transform = `translate(-50%, -50%) translate3d(${x.toFixed(
        2,
      )}px, ${y.toFixed(2)}px, 0)`;
    };

    const resetTarget = () => {
      targetX = 0;
      targetY = 0;
      startAnimation();
    };

    const animate = () => {
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;

      setGlowTransform(currentX, currentY);

      if (
        Math.abs(targetX - currentX) > 0.05 ||
        Math.abs(targetY - currentY) > 0.05
      ) {
        rafId = window.requestAnimationFrame(animate);
      } else {
        currentX = targetX;
        currentY = targetY;
        setGlowTransform(currentX, currentY);
        rafId = 0;
      }
    };

    const startAnimation = () => {
      if (!rafId) {
        rafId = window.requestAnimationFrame(animate);
      }
    };

    const handleMouseMove = (event) => {
      if (!canHover.matches) return;

      const normalizedX = event.clientX / window.innerWidth - 0.5;
      const normalizedY = event.clientY / window.innerHeight - 0.5;

      targetX = normalizedX * 24;
      targetY = normalizedY * 16;

      window.clearTimeout(idleTimer);
      idleTimer = window.setTimeout(resetTarget, 1400);
      startAnimation();
    };

    const handleCapabilityChange = () => {
      resetTarget();
    };

    setGlowTransform(0, 0);

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseleave", resetTarget);
    window.addEventListener("blur", resetTarget);
    canHover.addEventListener("change", handleCapabilityChange);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", resetTarget);
      window.removeEventListener("blur", resetTarget);
      canHover.removeEventListener("change", handleCapabilityChange);
      window.clearTimeout(idleTimer);

      if (rafId) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, []);

  return (
    <section
      id="hero"
      className="relative flex min-h-screen flex-col justify-end overflow-hidden"
    >
      <style>
        {`
          @keyframes hero-fade-up {
            from {
              opacity: 0;
              transform: translateY(var(--hero-rise, 20px));
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>

      {/* Background */}
      <div
        className="absolute inset-0 animate-[grid-drift_20s_ease-in-out_infinite_alternate]"
        aria-hidden="true"
        style={{
          backgroundImage:
            "linear-gradient(rgba(200,255,0,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(200,255,0,0.04) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex min-h-screen w-full flex-col justify-center px-5 pb-24 pt-[max(88px,env(safe-area-inset-top))] text-center md:block md:min-h-0 md:px-10 md:pb-20 md:pt-0 md:text-left">
        {/* Label */}
        <div className="mb-5 text-[10px] uppercase tracking-[0.25em] text-[var(--acid)] opacity-0 [font-family:var(--mono)] [--hero-rise:14px] animate-[hero-fade-up_0.8s_ease_0.05s_forwards] md:mb-4">
          Frontend Engineer
        </div>

        {/* Name */}
        <div className="relative mx-auto w-full max-w-full font-extrabold leading-[0.9] tracking-[-0.04em] text-[var(--white)] [font-family:var(--syne)] md:mx-0 md:leading-[0.88]">
          <div
            ref={glowRef}
            className="absolute left-1/2 top-1/2 -z-10 h-[58vw] min-h-[150px] w-[92vw] max-w-[900px] rounded-full bg-[radial-gradient(circle,rgba(200,255,0,0.16)_0%,rgba(200,255,0,0.08)_28%,rgba(200,255,0,0.04)_48%,transparent_72%)] opacity-90 blur-[80px] will-change-transform sm:h-[34vw] sm:w-[72vw] md:h-[clamp(360px,30vw,460px)] md:w-[clamp(700px,62vw,900px)] md:opacity-75"
            aria-hidden="true"
          />

          <div className="whitespace-nowrap text-[clamp(40px,11vw,64px)] opacity-0 [--hero-rise:30px] animate-[hero-fade-up_0.8s_ease_0.15s_forwards] md:text-[clamp(56px,10vw,130px)]">
            <ProximityRotateText text="SPARSH" />
          </div>

          <div className="whitespace-nowrap text-[clamp(40px,11vw,64px)] text-[var(--acid)] opacity-0 [--hero-rise:30px] animate-[hero-fade-up_0.8s_ease_0.3s_forwards] md:text-[clamp(56px,10vw,130px)]">
            <ProximityRotateText text="DOKANIA" />
          </div>
        </div>

        {/* Tagline */}
        <div className="mt-5 text-[22px] italic text-[rgba(242,237,228,0.88)] opacity-0 [font-family:var(--serif)] [--hero-rise:20px] animate-[hero-fade-up_0.8s_ease_0.5s_forwards] md:mt-4 md:text-[clamp(24px,4vw,46px)]">
          builds what responds
        </div>

        {/* Paragraph Desktop Only */}
        <p className="mt-10 hidden max-w-[360px] text-[13px] leading-[1.9] text-[rgba(242,237,228,0.55)] opacity-0 [font-family:var(--mono)] animate-[fadeUp_0.8s_ease_0.8s_forwards] md:block">
          Most interfaces <strong className="text-[var(--acid)]">render</strong>
          .
          <br />
          Mine <strong className="text-[var(--acid)]">respond</strong>.
        </p>
      </div>

      {/* Scroll Indicator */}
      <div className="pointer-events-none absolute bottom-[max(18px,env(safe-area-inset-bottom))] left-1/2 flex -translate-x-1/2 flex-col items-center gap-1 text-[8px] uppercase leading-none tracking-[0.2em] text-[rgba(242,237,228,0.3)] opacity-0 animate-[fadeUp_0.8s_ease_0.9s_forwards] md:hidden">
        <div
          className="h-[34px] w-px animate-[scroll-pulse_2s_ease-in-out_infinite]"
          style={{
            background: "linear-gradient(to bottom, var(--acid), transparent)",
          }}
        />
        <span>Scroll</span>
      </div>
    </section>
  );
}

export default Hero;
