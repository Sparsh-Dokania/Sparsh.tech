function Work() {
  return (
    <section
      id="work"
      className="py-[120px] px-10 relative border-t border-t-[rgba(200,255,0,0.12)] max-[768px]:py-20 max-[768px]:px-5"
    >
      <div className="reveal flex items-end justify-between mb-16">
        <div>
          <div className="[font-family:var(--mono)] text-[10px] tracking-[0.25em] uppercase text-[var(--acid)] mb-4 flex items-center gap-3 before:content-[''] before:w-6 before:h-px before:bg-[var(--acid)]">
            Selected Work
          </div>
          <h2 className="[font-family:var(--syne)] font-extrabold [font-size:clamp(40px,6vw,80px)] leading-[0.9] tracking-[-0.03em]">
            SYSTEMS <br />
            <span 
            className="block italic [font-family:var(--serif)] [font-size:clamp(60px,10vw,130px)] leading-[0.95] text-[var(--acid)]"
            style={{
              opacity: 0,
              transform: 'translateY(100%)',
              animation: 'slideUp 0.9s cubic-bezier(0.16,1,0.3,1) forwards',
              animationDelay: '0.7s',
            }}
          >
             i built.
          </span>
          </h2>
        </div>
        <div className="[font-family:var(--mono)] text-[11px] text-[rgba(242,237,228,0.3)] tracking-[0.1em]">
          003 / projects
        </div>
      </div>

      <div className="flex flex-col gap-0.5">
        <div className="project-item group reveal grid [grid-template-columns:60px_1fr_auto] items-center gap-8 py-7 px-0 border-t border-t-[rgba(242,237,228,0.06)] cursor-none relative overflow-hidden before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-0 before:bg-[rgba(200,255,0,0.04)] hover:before:w-full before:transition-all before:duration-[400ms] before:ease-[cubic-bezier(0.16,1,0.3,1)] max-[768px]:[grid-template-columns:40px_1fr_auto] max-[768px]:gap-4">
          <div className="[font-family:var(--mono)] text-[11px] text-[rgba(242,237,228,0.2)] tracking-[0.1em]">
            001
          </div>
          <div className="relative z-[1]">
            <div className="[font-family:var(--syne)] font-bold [font-size:clamp(22px,3vw,36px)] tracking-[-0.02em] text-[var(--white)] mb-1.5 transition-colors duration-200 group-hover:text-[var(--acid)]">
              iPhone 3D Experience
            </div>
            <div className="flex gap-2 flex-wrap">
              <span className="text-[9px] tracking-[0.15em] uppercase py-[3px] px-2 border border-[rgba(200,255,0,0.2)] text-[rgba(200,255,0,0.6)]">
                React
              </span>
              <span className="text-[9px] tracking-[0.15em] uppercase py-[3px] px-2 border border-[rgba(200,255,0,0.2)] text-[rgba(200,255,0,0.6)]">
                TypeScript
              </span>
              <span className="text-[9px] tracking-[0.15em] uppercase py-[3px] px-2 border border-[rgba(200,255,0,0.2)] text-[rgba(200,255,0,0.6)]">
                Node.js
              </span>
            </div>
            <p className="mt-3 max-w-[740px] [font-family:var(--mono)] text-[12px] leading-[1.85] text-[rgba(242,237,228,0.42)]">
              A fully interactive 3D product interface built from scratch.
<br/>
Not a clone — a reconstruction of how premium product experiences are engineered.
<br/>
→ Integrated real-time 3D rendering using Three.js  <br/>
→ Built scroll-synced animation system with GSAP  <br/>
→ Optimized performance across devices  <br/>
→ Designed responsive interaction layers  <br/>

This project was about understanding how modern product pages actually work under the hood.
            </p>
          </div>
          <div className="text-2xl text-[rgba(242,237,228,0.15)] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] relative z-[1] group-hover:text-[var(--acid)] group-hover:translate-x-1 group-hover:-translate-y-1">
            ↗
          </div>
        </div>

        <div className="project-item group reveal reveal-delay-1 grid [grid-template-columns:60px_1fr_auto] items-center gap-8 py-7 px-0 border-t border-t-[rgba(242,237,228,0.06)] cursor-none relative overflow-hidden before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-0 before:bg-[rgba(200,255,0,0.04)] hover:before:w-full before:transition-all before:duration-[400ms] before:ease-[cubic-bezier(0.16,1,0.3,1)] max-[768px]:[grid-template-columns:40px_1fr_auto] max-[768px]:gap-4">
          <div className="[font-family:var(--mono)] text-[11px] text-[rgba(242,237,228,0.2)] tracking-[0.1em]">
            002
          </div>
          <div className="relative z-[1]">
            <div className="[font-family:var(--syne)] font-bold [font-size:clamp(22px,3vw,36px)] tracking-[-0.02em] text-[var(--white)] mb-1.5 transition-colors duration-200 group-hover:text-[var(--acid)]">
              K72 Motion System
            </div>
            <div className="flex gap-2 flex-wrap">
              <span className="text-[9px] tracking-[0.15em] uppercase py-[3px] px-2 border border-[rgba(200,255,0,0.2)] text-[rgba(200,255,0,0.6)]">
                Next.js
              </span>
              <span className="text-[9px] tracking-[0.15em] uppercase py-[3px] px-2 border border-[rgba(200,255,0,0.2)] text-[rgba(200,255,0,0.6)]">
                Tailwind
              </span>
              <span className="text-[9px] tracking-[0.15em] uppercase py-[3px] px-2 border border-[rgba(200,255,0,0.2)] text-[rgba(200,255,0,0.6)]">
                Supabase
              </span>
            </div>
            <p className="mt-3 max-w-[740px] [font-family:var(--mono)] text-[12px] leading-[1.85] text-[rgba(242,237,228,0.42)]">
              An animation-first frontend focused purely on motion, timing, and interaction feel.<br/>

→ Built complex scroll-triggered animation sequences  <br/>
→ Explored animation layering and transition timing  <br/>
→ Maintained performance under heavy motion load  <br/>

This was not about UI — it was about mastering motion as a system.
            </p>
          </div>
          <div className="text-2xl text-[rgba(242,237,228,0.15)] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] relative z-[1] group-hover:text-[var(--acid)] group-hover:translate-x-1 group-hover:-translate-y-1">
            ↗
          </div>
        </div>

        <div className="project-item group reveal reveal-delay-2 grid [grid-template-columns:60px_1fr_auto] items-center gap-8 py-7 px-0 border-t border-t-[rgba(242,237,228,0.06)] cursor-none relative overflow-hidden before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-0 before:bg-[rgba(200,255,0,0.04)] hover:before:w-full before:transition-all before:duration-[400ms] before:ease-[cubic-bezier(0.16,1,0.3,1)] max-[768px]:[grid-template-columns:40px_1fr_auto] max-[768px]:gap-4">
          <div className="[font-family:var(--mono)] text-[11px] text-[rgba(242,237,228,0.2)] tracking-[0.1em]">
            003
          </div>
          <div className="relative z-[1]">
            <div className="[font-family:var(--syne)] font-bold [font-size:clamp(22px,3vw,36px)] tracking-[-0.02em] text-[var(--white)] mb-1.5 transition-colors duration-200 group-hover:text-[var(--acid)]">
              Zentry-Inspired Gaming Interface
            </div>
            <div className="flex gap-2 flex-wrap">
              <span className="text-[9px] tracking-[0.15em] uppercase py-[3px] px-2 border border-[rgba(200,255,0,0.2)] text-[rgba(200,255,0,0.6)]">
                GSAP
              </span>
              <span className="text-[9px] tracking-[0.15em] uppercase py-[3px] px-2 border border-[rgba(200,255,0,0.2)] text-[rgba(200,255,0,0.6)]">
                WebGL
              </span>
              <span className="text-[9px] tracking-[0.15em] uppercase py-[3px] px-2 border border-[rgba(200,255,0,0.2)] text-[rgba(200,255,0,0.6)]">
                Three.js
              </span>
            </div>
            <p className="mt-3 max-w-[740px] [font-family:var(--mono)] text-[12px] leading-[1.85] text-[rgba(242,237,228,0.42)]">
              A high-intensity landing experience designed for visual impact and responsiveness.<br/>

→ Built using React + Vite for speed and modularity  <br/>
→ Combined GSAP animations with responsive layout systems <br/> 
→ Recreated commercial-grade UI patterns independently  <br/>

Focused on translating high-end design into working code.
            </p>
          </div>
          <div className="text-2xl text-[rgba(242,237,228,0.15)] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] relative z-[1] group-hover:text-[var(--acid)] group-hover:translate-x-1 group-hover:-translate-y-1">
            ↗
          </div>
        </div>
      </div>
    </section>
  )
}

export default Work
