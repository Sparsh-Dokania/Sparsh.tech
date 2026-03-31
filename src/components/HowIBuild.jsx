function HowIBuild() {
  return (
    <section className="py-[120px] px-10 relative border-t border-t-[rgba(200,255,0,0.12)] max-[768px]:py-20 max-[768px]:px-5">
      <div className="reveal flex items-end justify-between mb-16">
        <div>
          <div className="[font-family:var(--mono)] text-[10px] tracking-[0.25em] uppercase text-[var(--acid)] mb-4 flex items-center gap-3 before:content-[''] before:w-6 before:h-px before:bg-[var(--acid)]">
            My Process
          </div>
          <h2 className="[font-family:var(--syne)] font-extrabold [font-size:clamp(40px,6vw,80px)] leading-[0.9] tracking-[-0.03em]">
            HOW I <br />
            <span
              className="block italic [font-family:var(--serif)] [font-size:clamp(60px,10vw,130px)] leading-[0.95] text-[var(--acid)]"
              style={{
                opacity: 0,
                transform: 'translateY(100%)',
                animation: 'slideUp 0.9s cubic-bezier(0.16,1,0.3,1) forwards',
                animationDelay: '0.7s',
              }}
            >
              build.
            </span>
          </h2>
        </div>
        <div className="[font-family:var(--mono)] text-[11px] text-[rgba(242,237,228,0.3)] tracking-[0.1em]">
          0 — 5
        </div>
      </div>

      <div className="grid [grid-template-columns:repeat(2,1fr)] gap-12 max-[768px]:grid-cols-1 max-[768px]:gap-8">
        <div className="magnetic-target reveal reveal-delay-1 flex flex-col gap-2">
          <div className="[font-family:var(--syne)] font-bold text-lg text-[var(--white)]">
            01 · Break It Down
          </div>
          <p className="[font-family:var(--mono)] text-xs leading-[1.9] text-[rgba(242,237,228,0.55)]">
            Start by understanding the problem as a system. Not just the visual, but the interaction flows, state management, and performance constraints.
          </p>
        </div>

        <div className="magnetic-target reveal reveal-delay-1 flex flex-col gap-2">
          <div className="[font-family:var(--syne)] font-bold text-lg text-[var(--white)]">
            02 · Build Fast, Test Faster
          </div>
          <p className="[font-family:var(--mono)] text-xs leading-[1.9] text-[rgba(242,237,228,0.55)]">
            Prototype interactions early. Motion reveals problems. Testing on device immediately shows what works and what feels wrong.
          </p>
        </div>

        <div className="magnetic-target reveal reveal-delay-2 flex flex-col gap-2">
          <div className="[font-family:var(--syne)] font-bold text-lg text-[var(--white)]">
            03 · Motion First
          </div>
          <p className="[font-family:var(--mono)] text-xs leading-[1.9] text-[rgba(242,237,228,0.55)]">
            Animation isn't decoration—it's communication. Every transition should inform the user about state, hierarchy, and what changed.
          </p>
        </div>

        <div className="magnetic-target reveal reveal-delay-2 flex flex-col gap-2">
          <div className="[font-family:var(--syne)] font-bold text-lg text-[var(--white)]">
            04 · Polish Every Pixel
          </div>
          <p className="[font-family:var(--mono)] text-xs leading-[1.9] text-[rgba(242,237,228,0.55)]">
            Micro-interactions matter. Small delays, easing curves, and scale changes make the difference between "good" and "felt good."
          </p>
        </div>

        <div className="magnetic-target reveal reveal-delay-3 flex flex-col gap-2">
          <div className="[font-family:var(--syne)] font-bold text-lg text-[var(--white)]">
            05 · Measure Performance
          </div>
          <p className="[font-family:var(--mono)] text-xs leading-[1.9] text-[rgba(242,237,228,0.55)]">
            60 FPS is non-negotiable. Monitor first paint, frame rate, and memory. Beautiful motion means nothing if it stutters.
          </p>
        </div>
      </div>
    </section>
  )
}

export default HowIBuild
