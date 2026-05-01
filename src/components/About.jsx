import TextReveal from "./TextReveal";

const bodyTextClass =
  "text-[13px] leading-[2] text-[rgba(242,237,228,0.55)] mb-8";

function About() {
  return (
    <section
      id="about"
      className="relative min-h-screen px-10 py-[120px] border-t border-t-[rgba(200,255,0,0.12)] max-[768px]:px-5 max-[768px]:py-20"
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
            <em className="text-[var(--acid)]">soul.</em>
          </h2>
          <div className="reveal reveal-delay-2 grid [grid-template-columns:repeat(3,1fr)] gap-px mt-12 border border-[rgba(200,255,0,0.1)] bg-[rgba(200,255,0,0.1)] max-[768px]:[grid-template-columns:1fr]">
            <div className="py-6 px-5 bg-[var(--black)]">
              <div className="[font-family:var(--syne)] font-extrabold text-[42px] text-[var(--acid)] leading-none">
                1+
              </div>
              <div className="text-[10px] tracking-[0.15em] uppercase text-[rgba(242,237,228,0.4)] mt-1.5">
                Year building & learning
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
                &infin;
              </div>
              <div className="text-[10px] tracking-[0.15em] uppercase text-[rgba(242,237,228,0.4)] mt-1.5">
                Curiosity
              </div>
            </div>
          </div>
        </div>
        <div className="reveal reveal-delay-1">
          <TextReveal className={bodyTextClass} delay={0.05}>
            I&apos;m Sparsh Dokania &mdash; a frontend-focused builder working at the intersection of engineering and experience.
          </TextReveal>
          <TextReveal className={bodyTextClass} delay={0.1}>
            Most interfaces today are static. They render. I&apos;m more interested in how they respond.
          </TextReveal>
          <TextReveal className={bodyTextClass} delay={0.15}>
            Every project I build is an attempt to push that line &mdash; making interfaces feel alive, intentional, and reactive.
          </TextReveal>
          <TextReveal className={bodyTextClass} delay={0.2}>
            No internships. No agency work. Just self-built systems, broken things, and rebuilt them better.
          </TextReveal>
          <TextReveal className={bodyTextClass} delay={0.25}>
            Currently expanding into backend to understand the full system &mdash; not just how it looks, but how it works underneath.
          </TextReveal>
          <TextReveal className={`${bodyTextClass} mb-0`} delay={0.3}>
            No templates. No copy-paste. Everything here was built to understand &mdash; not just to show.
          </TextReveal>
        </div>
      </div>
    </section>
  );
}

export default About;
