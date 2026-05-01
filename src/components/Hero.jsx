import { useEffect, useRef } from "react";
import ProximityRotateText from "./ProximityRotateText";

const SPOTLIGHT_BASE_ROTATE = 28;

function Spotlight({ className = "", fill = "var(--acid)", spotlightRef }) {
  return (
    <svg
      ref={spotlightRef}
      className={`pointer-events-none absolute z-[1] opacity-0 ${className}`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 3787 2842"
      fill="none"
      aria-hidden="true"
    >
      <g filter="url(#hero-spotlight-filter)">
        <ellipse
          cx="1924.71"
          cy="273.501"
          rx="1924.71"
          ry="273.501"
          transform="matrix(-0.822377 -0.568943 -0.568943 0.822377 3631.88 2291.09)"
          fill={fill}
          fillOpacity="0.22"
        />
      </g>
      <defs>
        <filter
          id="hero-spotlight-filter"
          x="0.860352"
          y="0.838989"
          width="3785.16"
          height="2840.26"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="151"
            result="effect1_foregroundBlur_1065_8"
          />
        </filter>
      </defs>
    </svg>
  );
}

function Hero() {
  const glowRef = useRef(null);
  const spotlightRef = useRef(null);

  useEffect(() => {
    const glow = glowRef.current;
    const spotlight = spotlightRef.current;
    if (!glow && !spotlight) return;

    const canHover = window.matchMedia(
      "(pointer: fine) and (min-width: 768px)",
    );

    let rafId = 0;
    let idleTimer = 0;
    let currentX = 0;
    let currentY = 0;
    let currentSpotlightX = 0;
    let currentSpotlightY = 0;
    let currentSpotlightRotate = 0;
    let targetX = 0;
    let targetY = 0;
    let targetSpotlightX = 0;
    let targetSpotlightY = 0;
    let targetSpotlightRotate = 0;

    const setGlowTransform = (x, y) => {
      if (!glow) return;

      glow.style.transform = `translate(-50%, -50%) translate3d(${x.toFixed(
        2,
      )}px, ${y.toFixed(2)}px, 0)`;
    };

    const setSpotlightTransform = (x, y, rotate) => {
      if (!spotlight) return;

      spotlight.style.transform = `translate3d(${x.toFixed(
        2,
      )}px, ${y.toFixed(
        2,
      )}px, 0) rotate(${(SPOTLIGHT_BASE_ROTATE + rotate).toFixed(2)}deg) scale(1)`;
    };

    const resetTarget = () => {
      targetX = 0;
      targetY = 0;
      targetSpotlightX = 0;
      targetSpotlightY = 0;
      targetSpotlightRotate = 0;
      startAnimation();
    };

    const animate = () => {
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;
      currentSpotlightX += (targetSpotlightX - currentSpotlightX) * 0.055;
      currentSpotlightY += (targetSpotlightY - currentSpotlightY) * 0.055;
      currentSpotlightRotate +=
        (targetSpotlightRotate - currentSpotlightRotate) * 0.045;

      setGlowTransform(currentX, currentY);
      setSpotlightTransform(
        currentSpotlightX,
        currentSpotlightY,
        currentSpotlightRotate,
      );

      if (
        Math.abs(targetX - currentX) > 0.05 ||
        Math.abs(targetY - currentY) > 0.05 ||
        Math.abs(targetSpotlightX - currentSpotlightX) > 0.05 ||
        Math.abs(targetSpotlightY - currentSpotlightY) > 0.05 ||
        Math.abs(targetSpotlightRotate - currentSpotlightRotate) > 0.01
      ) {
        rafId = window.requestAnimationFrame(animate);
      } else {
        currentX = targetX;
        currentY = targetY;
        currentSpotlightX = targetSpotlightX;
        currentSpotlightY = targetSpotlightY;
        currentSpotlightRotate = targetSpotlightRotate;
        setGlowTransform(currentX, currentY);
        setSpotlightTransform(
          currentSpotlightX,
          currentSpotlightY,
          currentSpotlightRotate,
        );
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
      targetSpotlightX = normalizedX * 12;
      targetSpotlightY = normalizedY * 8;
      targetSpotlightRotate = normalizedX * 1.2 + normalizedY * 0.8;

      window.clearTimeout(idleTimer);
      idleTimer = window.setTimeout(resetTarget, 1400);
      startAnimation();
    };

    const handleCapabilityChange = () => {
      resetTarget();
    };

    setGlowTransform(0, 0);
    setSpotlightTransform(0, 0, 0);

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
      className="relative flex min-h-screen flex-col justify-end overflow-hidden bg-[var(--black)]"
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

          @keyframes hero-spotlight {
            0% {
              opacity: 0;
            }
            100% {
              opacity: var(--spotlight-opacity, 0.24);
            }
          }
        `}
      </style>

      {/* Background */}
      <div
        className="absolute inset-0 z-0 animate-[grid-drift_20s_ease-in-out_infinite_alternate]"
        aria-hidden="true"
        style={{
          backgroundImage:
            "linear-gradient(rgba(200,255,0,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(200,255,0,0.04) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <Spotlight
        spotlightRef={spotlightRef}
        className="-top-[14%] -right-[42%] h-[92%] w-[150%] origin-[82%_8%] opacity-0 [--spotlight-opacity:0.16] animate-[hero-spotlight_2.6s_ease_0.35s_forwards] mix-blend-screen will-change-transform sm:-top-[16%] sm:-right-[28%] sm:h-[100%] sm:w-[132%] sm:[--spotlight-opacity:0.18] md:-top-[18%] md:-right-[16%] md:h-[112%] md:w-[108%] md:[--spotlight-opacity:0.24] lg:-top-[17%] lg:-right-[12%] lg:h-[116%] lg:w-[96%] lg:[--spotlight-opacity:0.26]"
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
      <div className="pointer-events-none absolute bottom-[max(30px,env(safe-area-inset-bottom))] left-1/2 flex -translate-x-1/2 flex-col items-center gap-1 text-[8px] uppercase leading-none tracking-[0.2em] text-[rgba(242,237,228,0.3)] opacity-0 animate-[fadeUp_0.8s_ease_0.9s_forwards] md:hidden">
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
