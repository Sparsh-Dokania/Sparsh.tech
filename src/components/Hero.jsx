function Hero() {
  return (
    <section
      id="hero"
      className="min-h-screen pt-7 pb-0 px-0 flex flex-col justify-end relative overflow-hidden"
    >
      <div
        className="absolute inset-0 animate-[grid-drift_20s_ease-in-out_infinite_alternate]"
        aria-hidden="true"
        style={{
          backgroundImage:
            'linear-gradient(rgba(200,255,0,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(200,255,0,0.04) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      ></div>
      <div className="relative z-[2] pt-0 pb-20 px-10 max-[768px]:pt-0 max-[768px]:pb-[60px] max-[768px]:px-5">
        <div className="[font-family:var(--mono)] text-[10px] tracking-[0.25em] uppercase text-[var(--acid)] mb-3 opacity-0 animate-[fadeUp_0.8s_ease_0.2s_forwards]">
          Frontend Engineer · UI that Feels Alive
        </div>
        <h1 className="[font-family:var(--syne)] font-extrabold [font-size:clamp(72px,12vw,160px)] leading-[0.88] tracking-[-0.04em] text-[var(--white)] mb-4">
          <span
            className="block"
            style={{
              opacity: 0,
              transform: 'translateY(100%)',
              animation: 'slideUp 0.9s cubic-bezier(0.16,1,0.3,1) forwards',
              animationDelay: '0.4s',
            }}
          >
            SPARSH
          </span>
          <span
            className="block text-[var(--acid)]"
            style={{
              opacity: 0,
              transform: 'translateY(100%)',
              animation: 'slideUp 0.9s cubic-bezier(0.16,1,0.3,1) forwards',
              animationDelay: '0.55s',
            }}
          >
            DOKANIA
          </span>
          <span
            className="block italic [font-family:var(--serif)] [font-size:clamp(60px,10vw,130px)] leading-[0.95]"
            style={{
              opacity: 0,
              transform: 'translateY(100%)',
              animation: 'slideUp 0.9s cubic-bezier(0.16,1,0.3,1) forwards',
              animationDelay: '0.7s',
            }}
          >
            here.
          </span>
        </h1>
        <div className="flex items-end justify-between mt-10 opacity-0 animate-[fadeUp_0.9s_ease_1s_forwards]">
          <p className="magnetic-target [font-family:var(--mono)] text-[13px] text-[rgba(242,237,228,0.5)] leading-[1.8] max-w-[360px] [&_strong]:text-[var(--acid)] [&_strong]:font-bold">
            I build <strong>interfaces that feel alive</strong>.
            <br />
            Engineering precision meets design instinct —
            <br />
            from pixel to production.
          </p>
          <div className="flex flex-col items-center gap-2 text-[9px] tracking-[0.2em] uppercase text-[rgba(242,237,228,0.3)]">
            <div
              className="w-px h-[60px] animate-[scroll-pulse_2s_ease-in-out_infinite]"
              style={{ background: 'linear-gradient(to bottom, var(--acid), transparent)' }}
            ></div>
            <span>Scroll</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
