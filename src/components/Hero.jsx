import MagneticText from "./MagneticText";
import ParticleText from "./ParticleText";
function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen flex-col justify-end overflow-hidden px-0 pb-0 pt-7"
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

      <div className="relative z-[2] px-10 pb-20 pt-0 max-[768px]:px-5 max-[768px]:pb-[60px] max-[768px]:pt-0">
        <div className="mb-3 [font-family:var(--mono)] text-[10px] uppercase tracking-[0.25em] text-[var(--acid)] opacity-0 animate-[fadeUp_0.8s_ease_0.2s_forwards]">
          Frontend Engineer � UI that Feels Alive
        </div>

        <div className="[font-family:var(--syne)] font-extrabold [font-size:clamp(72px,12vw,160px)] leading-[0.88] tracking-[-0.04em] text-[var(--white)] mb-4">
          <h1 className="[font-family:var(--syne)] font-extrabold [font-size:clamp(72px,12vw,160px)] leading-[0.88] tracking-[-0.04em] text-[var(--white)] mb-4">
            <div>
              <RollingText text="SPARSH" />
            </div>

            <div className="text-[var(--acid)]">
              <RollingText text="DOKANIA" />
            </div>

            <div className="italic [font-family:var(--serif)] text-[clamp(40px,6vw,90px)]">
              <RollingText text="— builds what responds." />
            </div>
          </h1>
        </div>

        <div className="mt-10 flex items-end justify-between gap-8 opacity-0 animate-[fadeUp_0.9s_ease_1s_forwards] max-[768px]:mt-8 max-[768px]:flex-col max-[768px]:items-start">
          <p className="magnetic-target max-w-[360px] [font-family:var(--mono)] text-[13px] leading-[1.8] text-[rgba(242,237,228,0.5)] max-[768px]:max-w-[300px] max-[768px]:text-[12px] [&_strong]:font-bold [&_strong]:text-[var(--acid)]">
            Most interfaces <strong>render</strong>.
            <br />
            Mine <strong>respond</strong>.
          </p>

          <div className="flex flex-col items-center gap-2 text-[9px] uppercase tracking-[0.2em] text-[rgba(242,237,228,0.3)] max-[768px]:items-start">
            <div
              className="h-[60px] w-px transition-transform duration-300 hover:scale-y-[1.2] animate-[scroll-pulse_2s_ease-in-out_infinite]"
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
