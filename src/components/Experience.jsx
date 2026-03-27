function Experience() {
  return (
    <section
      id="experience"
      className="py-[120px] px-10 relative border-t border-t-[rgba(200,255,0,0.12)] max-[768px]:py-20 max-[768px]:px-5"
    >
      <div className="[font-family:var(--mono)] text-[10px] tracking-[0.25em] uppercase text-[var(--acid)] mb-4 flex items-center gap-3 before:content-[''] before:w-6 before:h-px before:bg-[var(--acid)]">
        Experience
      </div>
      <div className="grid [grid-template-columns:1fr_2fr] gap-20 max-[768px]:[grid-template-columns:1fr] max-[768px]:gap-10">
        <div>
          <h2 className="reveal [font-family:var(--syne)] font-extrabold [font-size:clamp(36px,5vw,60px)] tracking-[-0.03em] leading-[0.95] sticky top-[120px]">
            WHERE
            <br />
            I&apos;VE
            <br />
            BEEN.
          </h2>
        </div>
        <div className="flex flex-col">
          <div className="reveal py-8 px-0 border-t border-t-[rgba(242,237,228,0.06)] grid [grid-template-columns:140px_1fr] gap-8 max-[768px]:[grid-template-columns:1fr] max-[768px]:gap-2">
            <div className="[font-family:var(--mono)] text-[11px] text-[rgba(242,237,228,0.3)] tracking-[0.08em] pt-1">
              2024 — Now
            </div>
            <div>
              <div className="[font-family:var(--syne)] font-bold text-lg text-[var(--white)] mb-1">
                Frontend Engineer
              </div>
              <div className="[font-family:var(--mono)] text-xs text-[var(--acid)] mb-3.5 tracking-[0.08em]">
                Company Name
              </div>
              <div className="[font-family:var(--mono)] text-xs leading-[1.9] text-[rgba(242,237,228,0.45)]">
                Building production-grade React applications. Owning the frontend architecture,
                performance optimization, and design system implementation.
              </div>
            </div>
          </div>
          <div className="reveal reveal-delay-1 py-8 px-0 border-t border-t-[rgba(242,237,228,0.06)] grid [grid-template-columns:140px_1fr] gap-8 max-[768px]:[grid-template-columns:1fr] max-[768px]:gap-2">
            <div className="[font-family:var(--mono)] text-[11px] text-[rgba(242,237,228,0.3)] tracking-[0.08em] pt-1">
              2023 — 2024
            </div>
            <div>
              <div className="[font-family:var(--syne)] font-bold text-lg text-[var(--white)] mb-1">
                Junior Developer
              </div>
              <div className="[font-family:var(--mono)] text-xs text-[var(--acid)] mb-3.5 tracking-[0.08em]">
                Agency / Startup
              </div>
              <div className="[font-family:var(--mono)] text-xs leading-[1.9] text-[rgba(242,237,228,0.45)]">
                Shipped fast, learned faster. Built client projects across e-commerce, SaaS, and
                marketing. First exposure to design systems and component architecture.
              </div>
            </div>
          </div>
          <div className="reveal reveal-delay-2 py-8 px-0 border-t border-t-[rgba(242,237,228,0.06)] grid [grid-template-columns:140px_1fr] gap-8 max-[768px]:[grid-template-columns:1fr] max-[768px]:gap-2">
            <div className="[font-family:var(--mono)] text-[11px] text-[rgba(242,237,228,0.3)] tracking-[0.08em] pt-1">
              2022 — 2023
            </div>
            <div>
              <div className="[font-family:var(--syne)] font-bold text-lg text-[var(--white)] mb-1">
                Self-taught · Freelance
              </div>
              <div className="[font-family:var(--mono)] text-xs text-[var(--acid)] mb-3.5 tracking-[0.08em]">
                Independent
              </div>
              <div className="[font-family:var(--mono)] text-xs leading-[1.9] text-[rgba(242,237,228,0.45)]">
                Started from zero. Built 10+ projects to learn the craft. Landed first paid client at
                month 4.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Experience
