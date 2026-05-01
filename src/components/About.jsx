import { motion, useReducedMotion } from "framer-motion";
import TextReveal from "./TextReveal";

const bodyTextClass =
  "text-[13px] leading-[2] text-[rgba(242,237,228,0.55)] mb-8";

const MotionDiv = motion.div;
const headingLineClass = "block";
const statCardClass = "py-6 px-5 bg-[var(--black)]";

function StatCard({ value, label, delay }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <MotionDiv
      className={statCardClass}
      initial={
        shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 24, scale: 0.98 }
      }
      whileInView={
        shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }
      }
      viewport={{ amount: 0.35, once: true }}
      transition={{
        duration: shouldReduceMotion ? 0 : 0.55,
        delay: shouldReduceMotion ? 0 : delay,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <div className="[font-family:var(--syne)] font-extrabold text-[42px] text-[var(--acid)] leading-none">
        {value}
      </div>
      <div className="text-[10px] tracking-[0.15em] uppercase text-[rgba(242,237,228,0.4)] mt-1.5">
        {label}
      </div>
    </MotionDiv>
  );
}

function About() {
  return (
    <section
      id="about"
      className="relative min-h-screen px-10 py-[120px] border-t border-t-[rgba(200,255,0,0.12)] max-[768px]:px-5 max-[768px]:py-20"
    >
      <TextReveal
        as="div"
        className="[font-family:var(--mono)] text-[10px] tracking-[0.25em] uppercase text-[var(--acid)] mb-4 flex items-center gap-3 before:content-[''] before:w-6 before:h-px before:bg-[var(--acid)]"
        delay={0.03}
        stagger={0}
      >
        About
      </TextReveal>
      <div className="grid [grid-template-columns:1fr_1fr] gap-20 items-start max-[768px]:[grid-template-columns:1fr] max-[768px]:gap-10">
        <div>
          <h2 className="[font-family:var(--serif)] italic [font-size:clamp(36px,5vw,64px)] leading-[1.1] text-[var(--white)]">
            <TextReveal
              as="span"
              className={headingLineClass}
              delay={0.08}
              offset={20}
            >
              Code is the
            </TextReveal>
            <TextReveal
              as="span"
              className={`${headingLineClass} text-[var(--acid)] not-italic [font-family:var(--syne)] font-extrabold`}
              delay={0.14}
              offset={20}
            >
              craft.
            </TextReveal>
            <TextReveal
              as="span"
              className={headingLineClass}
              delay={0.2}
              offset={20}
            >
              Design is the
            </TextReveal>
            <TextReveal
              as="em"
              className={`${headingLineClass} text-[var(--acid)]`}
              delay={0.26}
              offset={20}
            >
              soul.
            </TextReveal>
          </h2>
          <div className="grid [grid-template-columns:repeat(3,1fr)] gap-px mt-12 border border-[rgba(200,255,0,0.1)] bg-[rgba(200,255,0,0.1)] max-[768px]:[grid-template-columns:1fr]">
            <StatCard
              value="1+"
              label="Year building & learning"
              delay={0.35}
            />
            <StatCard value="12+" label="Projects shipped" delay={0.42} />
            <StatCard value={"\u221e"} label="Curiosity" delay={0.49} />
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
