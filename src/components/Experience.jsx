import { useEffect, useRef } from 'react'
import gsap from 'gsap'

function Experience() {
  const logRef = useRef(null)

  useEffect(() => {
    const root = logRef.current
    if (!root) return

    const canHover = window.matchMedia('(any-hover: hover)').matches
    const items = Array.from(root.querySelectorAll('.exp-item'))
    const cleanups = []

    items.forEach((item) => {
      const descWrap = item.querySelector('.exp-desc-wrap')
      const desc = item.querySelector('.exp-desc')

      const collapsedHeight = 28
      let isOpen = false

      if (!descWrap || !desc) return

      // ✅ FIXED INITIAL STATE
      gsap.set(descWrap, {
        maxHeight: collapsedHeight,
        overflow: 'hidden',
        opacity: 0.7,
      })

      gsap.set(desc, {
        y: 6,
        opacity: 0.85,
      })

      const open = () => {
        const fullHeight = desc.scrollHeight + 6

        gsap.to(descWrap, {
          maxHeight: fullHeight,
          opacity: 1,
          duration: 0.5,
          ease: 'power3.out',
        })

        gsap.to(desc, {
          y: 0,
          opacity: 1,
          duration: 0.4,
          ease: 'power3.out',
          delay: 0.05,
        })

        isOpen = true
      }

      const close = () => {
        gsap.to(descWrap, {
          maxHeight: collapsedHeight,
          opacity: 0.7,
          duration: 0.4,
          ease: 'power3.out',
        })

        gsap.to(desc, {
          y: 6,
          opacity: 0.85,
          duration: 0.3,
          ease: 'power3.out',
        })

        isOpen = false
      }

      if (canHover) {
        item.addEventListener('mouseenter', open)
        item.addEventListener('mouseleave', close)

        cleanups.push(() => {
          item.removeEventListener('mouseenter', open)
          item.removeEventListener('mouseleave', close)
        })
      } else {
        const toggle = () => (isOpen ? close() : open())

        item.addEventListener('click', toggle)

        cleanups.push(() => {
          item.removeEventListener('click', toggle)
        })
      }
    })

    return () => cleanups.forEach((fn) => fn())
  }, [])

  return (
    <section id="experience" className="relative min-h-screen px-10 py-[120px] border-t border-t-[rgba(200,255,0,0.12)] max-[768px]:px-5 max-[768px]:py-20" ref={logRef}>
      <div className="[font-family:var(--mono)] text-[10px] tracking-[0.25em] uppercase text-[var(--acid)] mb-4 flex items-center gap-3 before:content-[''] before:w-6 before:h-px before:bg-[var(--acid)]">
        Build Log
      </div>
      <div className="grid [grid-template-columns:1fr_2fr] gap-20 max-[768px]:[grid-template-columns:1fr] max-[768px]:gap-10">
        <div>
          <h2 className="reveal [font-family:var(--syne)] font-extrabold [font-size:clamp(36px,5vw,60px)] tracking-[-0.03em] leading-[0.95] sticky top-[120px]">
            BUILD
            <br />
           <span className="text-[var(--acid)]">LOG</span>
          </h2>
        </div>
        <div className="flex flex-col">
          <div className="exp-item reveal py-8 px-0 border-t border-t-[rgba(242,237,228,0.06)] grid [grid-template-columns:140px_1fr] gap-8 max-[768px]:[grid-template-columns:1fr] max-[768px]:gap-2 relative">
            <div className="[font-family:var(--mono)] text-[11px] text-[rgba(242,237,228,0.3)] tracking-[0.08em] pt-1">
              2025 — Present
            </div>
            <div>
              <div className="[font-family:var(--syne)] font-bold text-lg text-[var(--white)] mb-1">
                Frontend Systems & Motion Engineering
              </div>
              <div className="[font-family:var(--mono)] text-xs text-[var(--acid)] mb-3.5 tracking-[0.08em]">
                Self-Directed
              </div>
              <div className="exp-desc-wrap overflow-hidden">
                <div className="exp-desc [font-family:var(--mono)] text-xs leading-[1.9] text-[rgba(242,237,228,0.45)]">
                  Focused on building high-performance frontend systems using React, GSAP, and
                  Three.js. Exploring interaction, animation layering, and real-time rendering.
                </div>
              </div>
            </div>
          </div>
          <div className="exp-item reveal reveal-delay-1 py-8 px-0 border-t border-t-[rgba(242,237,228,0.06)] grid [grid-template-columns:140px_1fr] gap-8 max-[768px]:[grid-template-columns:1fr] max-[768px]:gap-2 relative">
            <div className="[font-family:var(--mono)] text-[11px] text-[rgba(242,237,228,0.3)] tracking-[0.08em] pt-1">
              2024 — 2025
            </div>
            <div>
              <div className="[font-family:var(--syne)] font-bold text-lg text-[var(--white)] mb-1">
                Project-Based Learning
              </div>
              <div className="[font-family:var(--mono)] text-xs text-[var(--acid)] mb-3.5 tracking-[0.08em]">
                Independent Build Cycles
              </div>
              <div className="exp-desc-wrap overflow-hidden">
                <div className="exp-desc [font-family:var(--mono)] text-xs leading-[1.9] text-[rgba(242,237,228,0.45)]">
                  Built multiple frontend projects from scratch — not tutorials, but full
                  recreations and original implementations. Focused on understanding how
                  production-level interfaces behave.
                </div>
              </div>
            </div>
          </div>
          <div className="exp-item reveal reveal-delay-2 py-8 px-0 border-t border-t-[rgba(242,237,228,0.06)] grid [grid-template-columns:140px_1fr] gap-8 max-[768px]:[grid-template-columns:1fr] max-[768px]:gap-2 relative">
            <div className="[font-family:var(--mono)] text-[11px] text-[rgba(242,237,228,0.3)] tracking-[0.08em] pt-1">
              2023 — 2024
            </div>
            <div>
              <div className="[font-family:var(--syne)] font-bold text-lg text-[var(--white)] mb-1">
                Foundation Phase
              </div>
              <div className="[font-family:var(--mono)] text-xs text-[var(--acid)] mb-3.5 tracking-[0.08em]">
                Core Skill Acquisition
              </div>
              <div className="exp-desc-wrap overflow-hidden">
                <div className="exp-desc [font-family:var(--mono)] text-xs leading-[1.9] text-[rgba(242,237,228,0.45)]">
                  Learned core web fundamentals and programming logic. Shifted from consuming
                  tutorials to building independently.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Experience
