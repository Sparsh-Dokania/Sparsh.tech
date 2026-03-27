function About() {
  return (
    <section
      id="about"
      className="py-[120px] px-10 relative border-t border-t-[rgba(200,255,0,0.12)] max-[768px]:py-20 max-[768px]:px-5"
    >
      <div className="[font-family:var(--mono)] text-[10px] tracking-[0.25em] uppercase text-[var(--acid)] mb-4 flex items-center gap-3 before:content-[''] before:w-6 before:h-px before:bg-[var(--acid)]">
        About
      </div>
      <div className="grid [grid-template-columns:1fr_1fr] gap-20 items-start max-[768px]:[grid-template-columns:1fr] max-[768px]:gap-10">
        <div>
          <h2 className="reveal [font-family:var(--serif)] italic [font-size:clamp(36px,5vw,64px)] leading-[1.1] text-[var(--white)] [&_span]:text-[var(--acid)] [&_span]:not-italic [&_span]:[font-family:var(--syne)] [&_span]:font-extrabold">
            Code is the
            <br />
            <span>craft.</span>
            <br />
            Design is the
            <br />
            <em>soul.</em>
          </h2>
          <div className="reveal reveal-delay-2 grid [grid-template-columns:repeat(3,1fr)] gap-px mt-12 border border-[rgba(200,255,0,0.1)] bg-[rgba(200,255,0,0.1)] max-[768px]:[grid-template-columns:1fr]">
            <div className="py-6 px-5 bg-[var(--black)]">
              <div className="[font-family:var(--syne)] font-extrabold text-[42px] text-[var(--acid)] leading-none">
                3+
              </div>
              <div className="text-[10px] tracking-[0.15em] uppercase text-[rgba(242,237,228,0.4)] mt-1.5">
                Years building
              </div>
            </div>
            <div className="py-6 px-5 bg-[var(--black)]">
              <div className="[font-family:var(--syne)] font-extrabold text-[42px] text-[var(--acid)] leading-none">
                12+
              </div>
              <div className="text-[10px] tracking-[0.15em] uppercase text-[rgba(242,237,228,0.4)] mt-1.5">
                Projects shipped
              </div>
            </div>
            <div className="py-6 px-5 bg-[var(--black)]">
              <div className="[font-family:var(--syne)] font-extrabold text-[42px] text-[var(--acid)] leading-none">
                ∞
              </div>
              <div className="text-[10px] tracking-[0.15em] uppercase text-[rgba(242,237,228,0.4)] mt-1.5">
                Curiosity
              </div>
            </div>
          </div>
        </div>
        <div className="reveal reveal-delay-1">
          <p className="text-[13px] leading-[2] text-[rgba(242,237,228,0.55)] mb-8 [&_strong]:text-[var(--white)] [&_strong]:font-bold">
            I&apos;m a <strong>frontend engineer</strong> who sits at the edge of engineering and design
            — not in one camp, not in the other. I care equally about <strong>how things work</strong>{' '}
            and <strong>how things feel</strong>.
          </p>
          <p className="text-[13px] leading-[2] text-[rgba(242,237,228,0.55)] mb-8 [&_strong]:text-[var(--white)] [&_strong]:font-bold">
            Currently going <strong>fullstack</strong> — building out my backend muscle while keeping
            that frontend edge sharp. I believe the best digital products are built by people who can{' '}
            <strong>see the whole picture</strong>.
          </p>
          <p className="text-[13px] leading-[2] text-[rgba(242,237,228,0.55)] mb-8 [&_strong]:text-[var(--white)] [&_strong]:font-bold">
            When I&apos;m not writing code, I&apos;m studying interfaces that made people stop and say{' '}
            <em>&quot;how did they do that?&quot;</em> — and then figuring out how to do that.
          </p>
        </div>
      </div>
    </section>
  )
}

export default About
