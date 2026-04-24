import ProximityRotateText from "./ProximityRotateText";

function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen flex-col justify-end overflow-hidden px-0 pb-0 pt-7 max-[768px]:items-center max-[768px]:justify-center"
    >
      <div
        className="absolute inset-0 opacity-100 transition-opacity duration-500 hover:opacity-60 animate-[grid-drift_20s_ease-in-out_infinite_alternate]"
        aria-hidden="true"
        style={{
          backgroundImage:
            "linear-gradient(rgba(200,255,0,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(200,255,0,0.04) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-[2] w-full max-w-[1440px] px-10 pb-20 pt-0 max-[768px]:flex max-[768px]:min-h-screen max-[768px]:flex-col max-[768px]:items-center max-[768px]:justify-center max-[768px]:gap-6 max-[768px]:px-5 max-[768px]:pb-0 max-[768px]:pt-0 max-[768px]:text-center">
        <div className="mb-3 [font-family:var(--mono)] text-[10px] uppercase tracking-[0.25em] text-[var(--acid)] opacity-0 animate-[fadeUp_0.8s_ease_0.2s_forwards] max-[768px]:mb-0 max-[768px]:max-w-[260px] max-[768px]:leading-[1.6]">
          Frontend Engineer | UI that Feels Alive
        </div>

        <div className="mb-4 overflow-x-clip [font-family:var(--syne)] font-extrabold tracking-[-0.04em] text-[var(--white)] max-[768px]:mb-0 max-[768px]:flex max-[768px]:flex-col max-[768px]:items-center max-[768px]:gap-4">
          <h1 className="flex flex-col leading-[0.9] max-[768px]:items-center max-[768px]:leading-[0.96]">
            <span className="block whitespace-nowrap text-[clamp(52px,10vw,120px)] max-[768px]:text-[clamp(36px,12vw,64px)]">
              <ProximityRotateText
                text="SPARSH"
                className="block whitespace-nowrap"
              />
            </span>

            <span className="block whitespace-nowrap text-[var(--acid)] text-[clamp(52px,10vw,120px)] max-[768px]:text-[clamp(36px,12vw,64px)]">
              <ProximityRotateText
                text="DOKANIA"
                className="block whitespace-nowrap"
              />
            </span>
          </h1>

          <div className="mt-3 italic [font-family:var(--serif)] text-[clamp(24px,4.8vw,48px)] leading-[1.2] tracking-[-0.01em] text-[rgba(242,237,228,0.9)] max-[768px]:mt-0 max-[768px]:max-w-[320px] max-[768px]:text-[clamp(18px,5.5vw,28px)]">
            <span className="block opacity-0 translate-y-[20px] animate-[fadeUp_1s_ease_0.6s_forwards] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:tracking-[0.02em] hover:text-[var(--white)]">
              builds what responds
            </span>
          </div>
        </div>

        <div className="mt-10 flex items-end justify-between gap-8 opacity-0 animate-[fadeUp_0.9s_ease_1s_forwards] max-[768px]:mt-0 max-[768px]:flex-col max-[768px]:items-center max-[768px]:gap-4 max-[768px]:text-center">
          <p className="magnetic-target max-w-[360px] [font-family:var(--mono)] text-[13px] leading-[1.9] text-[rgba(242,237,228,0.5)] max-[768px]:max-w-[300px] max-[768px]:text-[11px] max-[768px]:leading-[1.8] [&_strong]:font-bold [&_strong]:text-[var(--acid)]">
            Most interfaces <strong>render</strong>.
            <br />
            Mine <strong>respond</strong>.
          </p>

          <div className="flex flex-col items-center gap-2 text-[9px] uppercase tracking-[0.2em] text-[rgba(242,237,228,0.3)] max-[768px]:absolute max-[768px]:bottom-6 max-[768px]:left-1/2 max-[768px]:-translate-x-1/2">
            <div
              className="h-[60px] w-px animate-[scroll-pulse_2s_ease-in-out_infinite]"
              style={{
                background:
                  "linear-gradient(to bottom, var(--acid), transparent)",
              }}
            />
            <span>Scroll</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
