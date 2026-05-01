import { CardSpotlight } from "./ui/CardSpotlight";

const processSteps = [
  {
    number: "01",
    title: "Break It Down",
    description:
      "Start by understanding the problem as a system. Not just the visual, but the interaction flows, state management, and performance constraints.",
  },
  {
    number: "02",
    title: "Build Fast, Test Faster",
    description:
      "Prototype interactions early. Motion reveals problems. Testing on device immediately shows what works and what feels wrong.",
  },
  {
    number: "03",
    title: "Motion First",
    description:
      "Animation is communication. Every transition should inform the user about state, hierarchy, and what changed.",
  },
  {
    number: "04",
    title: "Polish Every Pixel",
    description:
      'Micro-interactions matter. Small delays, easing curves, and scale changes make the difference between "good" and "felt good."',
  },
  {
    number: "05",
    title: "Measure Performance",
    description:
      "60 FPS is non-negotiable. Monitor first paint, frame rate, and memory. Beautiful motion means nothing if it stutters.",
  },
];

const bentoLayout = [
  {
    card: "md:col-span-2 xl:col-span-7 min-h-[260px] md:min-h-[285px]",
    content: "md:max-w-[82%]",
    title: "text-[clamp(24px,2.6vw,40px)]",
  },
  {
    card: "md:col-span-1 xl:col-span-5 min-h-[260px] md:min-h-[285px]",
    content: "md:max-w-[92%]",
    title: "text-[clamp(22px,2.1vw,32px)]",
  },
  {
    card: "md:col-span-1 xl:col-span-5 min-h-[240px] md:min-h-[270px]",
    content: "md:max-w-[92%]",
    title: "text-[clamp(22px,2.1vw,32px)]",
  },
  {
    card: "md:col-span-2 xl:col-span-7 min-h-[260px] md:min-h-[285px]",
    content: "md:max-w-[82%]",
    title: "text-[clamp(24px,2.6vw,40px)]",
  },
  {
    card: "md:col-span-2 xl:col-span-12 min-h-[285px] md:min-h-[340px]",
    content: "md:max-w-[62%] xl:max-w-[52%]",
    title: "text-[clamp(28px,3.2vw,52px)]",
    featured: true,
  },
];

function HowIBuild() {
  return (
    <section className="relative min-h-screen border-t border-t-[rgba(200,255,0,0.12)] px-10 py-[120px] max-[768px]:px-5 max-[768px]:py-20">
      <div className="reveal mb-16 flex items-end justify-between gap-8 max-[768px]:mb-11 max-[768px]:items-start">
        <div>
          <div className="mb-4 flex items-center gap-3 [font-family:var(--mono)] text-[10px] uppercase tracking-[0.25em] text-[var(--acid)] before:h-px before:w-6 before:bg-[var(--acid)] before:content-['']">
            My Process
          </div>
          <h2 className="[font-family:var(--syne)] [font-size:clamp(40px,6vw,80px)] font-extrabold leading-[0.9] tracking-[-0.03em]">
            HOW I <br />
            <span
              className="block text-[var(--acid)] [font-family:var(--serif)] [font-size:clamp(60px,10vw,130px)] italic leading-[0.95]"
              style={{
                opacity: 0,
                transform: "translateY(100%)",
                animation:
                  "slideUp 0.9s cubic-bezier(0.16,1,0.3,1) forwards",
                animationDelay: "0.7s",
              }}
            >
              build.
            </span>
          </h2>
        </div>

        <div className="shrink-0 [font-family:var(--mono)] text-[11px] tracking-[0.1em] text-[rgba(242,237,228,0.3)] max-[768px]:pt-2">
          0 - 5
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5 xl:grid-cols-12 xl:gap-6">
        {processSteps.map((step, index) => {
          const layout = bentoLayout[index];

          return (
            <CardSpotlight
              key={step.number}
              colors={[
                [200, 255, 0],
                [242, 237, 228],
              ]}
              animationSpeed={4.5}
              className={[
                "magnetic-target reveal group overflow-hidden rounded-2xl border border-[rgba(200,255,0,0.08)] bg-[rgba(12,12,12,0.78)] p-6 backdrop-blur-sm transition duration-500 ease-out md:p-7 xl:p-8",
                "hover:border-[rgba(200,255,0,0.28)] hover:shadow-[0_18px_60px_rgba(200,255,0,0.08)]",
                "max-[768px]:min-h-[205px] max-[768px]:rounded-xl max-[768px]:p-5",
                layout.card,
                index < 2
                  ? "reveal-delay-1"
                  : index < 4
                    ? "reveal-delay-2"
                    : "reveal-delay-3",
              ].join(" ")}
            >
              <span
                className={`pointer-events-none absolute -right-2 -top-8 z-0 [font-family:var(--syne)] font-extrabold leading-none tracking-[-0.08em] ${
                  layout.featured
                    ? "text-[180px] text-[rgba(200,255,0,0.04)] md:text-[260px] xl:text-[320px]"
                    : "text-[140px] text-[rgba(200,255,0,0.028)] md:text-[180px] xl:text-[220px]"
                }`}
              >
                {step.number}
              </span>

              <div className="relative z-10 flex h-full flex-col">
                <div className="mb-8 flex items-center justify-between max-[768px]:mb-6">
                  <span className="[font-family:var(--mono)] text-[11px] font-bold tracking-[0.22em] text-[var(--acid)]">
                    {step.number}
                  </span>
                  <span className="h-px w-10 bg-[rgba(200,255,0,0.28)] transition-all duration-500 group-hover:w-16 group-hover:bg-[rgba(200,255,0,0.65)] max-[768px]:w-8" />
                </div>

                <div className={`mt-auto ${layout.content}`}>
                  <h3
                    className={`mb-4 [font-family:var(--syne)] font-bold leading-[1] tracking-[-0.02em] text-[var(--white)] ${layout.title}`}
                  >
                    {step.title}
                  </h3>
                  <p className="[font-family:var(--mono)] text-xs leading-[1.9] text-[rgba(242,237,228,0.58)] transition-colors duration-500 group-hover:text-[rgba(242,237,228,0.72)] max-[768px]:text-[11px] max-[768px]:leading-[1.8]">
                    {step.description}
                  </p>
                </div>
              </div>
            </CardSpotlight>
          );
        })}
      </div>
    </section>
  );
}

export default HowIBuild;
