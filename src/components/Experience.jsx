import { useEffect, useRef } from 'react'
import gsap from 'gsap'

function Experience() {
  const logRef = useRef(null)

  useEffect(() => {
    const root = logRef.current
    if (!root) {
      return undefined
    }

    const isMobile = window.matchMedia('(max-width: 768px)').matches
    const items = Array.from(root.querySelectorAll('.exp-item'))
    const cleanups = []

    if (!isMobile) {
      items.forEach((item) => {
        const descWrap = item.querySelector('.exp-desc-wrap')
        const desc = item.querySelector('.exp-desc')
        const preview = item.querySelector('.exp-preview')
        const video = item.querySelector('video')

        if (!descWrap || !desc || !preview) {
          return
        }

        gsap.set([descWrap, desc, preview], { willChange: 'transform, opacity, height' })
        gsap.set(descWrap, { height: 0, opacity: 0 })
        gsap.set(desc, { y: 10, opacity: 0 })
        gsap.set(preview, { opacity: 0, scale: 0.96, x: 24, rotate: 2.5 })

        const onEnter = () => {
          gsap.to(item, {
            paddingTop: 44,
            paddingBottom: 44,
            duration: 0.46,
            ease: 'power3.out',
            overwrite: true,
          })
          gsap.to(descWrap, {
            height: 'auto',
            opacity: 1,
            duration: 0.5,
            ease: 'power3.out',
            delay: 0.15,
            overwrite: true,
          })
          gsap.to(desc, {
            y: 0,
            opacity: 1,
            duration: 0.5,
            ease: 'power3.out',
            delay: 0.18,
            overwrite: true,
          })
          gsap.to(preview, {
            opacity: 1,
            scale: 1,
            x: 0,
            rotate: 2.5,
            duration: 0.52,
            ease: 'power3.out',
            delay: 0.2,
            overwrite: true,
          })

          if (video) {
            video.currentTime = 0
            const p = video.play()
            if (p?.catch) p.catch(() => {})
          }
        }

        const onLeave = () => {
          gsap.to(item, {
            paddingTop: 32,
            paddingBottom: 32,
            duration: 0.4,
            ease: 'power3.out',
            overwrite: true,
          })
          gsap.to(descWrap, {
            height: 0,
            opacity: 0,
            duration: 0.38,
            ease: 'power3.out',
            overwrite: true,
          })
          gsap.to(desc, {
            y: 10,
            opacity: 0,
            duration: 0.32,
            ease: 'power3.out',
            overwrite: true,
          })
          gsap.to(preview, {
            opacity: 0,
            scale: 0.96,
            x: 24,
            rotate: 2.5,
            duration: 0.34,
            ease: 'power3.out',
            overwrite: true,
          })

          if (video) {
            video.pause()
          }
        }

        item.addEventListener('mouseenter', onEnter)
        item.addEventListener('mouseleave', onLeave)
        cleanups.push(() => {
          item.removeEventListener('mouseenter', onEnter)
          item.removeEventListener('mouseleave', onLeave)
          if (video) {
            video.pause()
          }
        })
      })
    }

    return () => {
      cleanups.forEach((cleanup) => cleanup())
    }
  }, [])

  return (
    <section
      id="experience"
      className="py-[120px] px-10 relative border-t border-t-[rgba(200,255,0,0.12)] max-[768px]:py-20 max-[768px]:px-5"
    >
      <div className="[font-family:var(--mono)] text-[10px] tracking-[0.25em] uppercase text-[var(--acid)] mb-4 flex items-center gap-3 before:content-[''] before:w-6 before:h-px before:bg-[var(--acid)]">
        Build Log
      </div>
      <div
        ref={logRef}
        className="grid [grid-template-columns:1fr_2fr] gap-20 max-[768px]:[grid-template-columns:1fr] max-[768px]:gap-10"
      >
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
              <div className="exp-desc-wrap overflow-hidden max-[768px]:!h-auto max-[768px]:!opacity-100">
                <div className="exp-desc [font-family:var(--mono)] text-xs leading-[1.9] text-[rgba(242,237,228,0.45)]">
                  Focused on building high-performance frontend systems using React, GSAP, and
                  Three.js. Exploring interaction, animation layering, and real-time rendering.
                </div>
              </div>
            </div>
            <div className="exp-preview pointer-events-none absolute right-[-18px] top-1/2 -translate-y-1/2 translate-x-full w-[240px] rounded-md border border-[rgba(200,255,0,0.22)] bg-[rgba(8,8,8,0.92)] p-2 shadow-[0_18px_60px_rgba(0,0,0,0.45)] max-[768px]:hidden">
              <video
                className="w-full h-[132px] object-cover rounded-[3px]"
                muted
                loop
                playsInline
                preload="metadata"
                poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='480' height='270'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' x2='1' y1='0' y2='1'%3E%3Cstop offset='0' stop-color='%23080808'/%3E%3Cstop offset='1' stop-color='%23151910'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23g)'/%3E%3C/svg%3E"
              >
                <source
                  src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
                  type="video/mp4"
                />
              </video>
              <div className="mt-2 [font-family:var(--mono)] text-[10px] tracking-[0.15em] uppercase text-[var(--acid)]">
                View Project ↗
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
              <div className="exp-desc-wrap overflow-hidden max-[768px]:!h-auto max-[768px]:!opacity-100">
                <div className="exp-desc [font-family:var(--mono)] text-xs leading-[1.9] text-[rgba(242,237,228,0.45)]">
                  Built multiple frontend projects from scratch — not tutorials, but full
                  recreations and original implementations. Focused on understanding how
                  production-level interfaces behave.
                </div>
              </div>
            </div>
            <div className="exp-preview pointer-events-none absolute right-[-18px] top-1/2 -translate-y-1/2 translate-x-full w-[240px] rounded-md border border-[rgba(200,255,0,0.22)] bg-[rgba(8,8,8,0.92)] p-2 shadow-[0_18px_60px_rgba(0,0,0,0.45)] max-[768px]:hidden">
              <video
                className="w-full h-[132px] object-cover rounded-[3px]"
                muted
                loop
                playsInline
                preload="metadata"
                poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='480' height='270'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' x2='1' y1='0' y2='1'%3E%3Cstop offset='0' stop-color='%23080808'/%3E%3Cstop offset='1' stop-color='%230f1a13'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23g)'/%3E%3C/svg%3E"
              >
                <source
                  src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
                  type="video/mp4"
                />
              </video>
              <div className="mt-2 [font-family:var(--mono)] text-[10px] tracking-[0.15em] uppercase text-[var(--acid)]">
                View Project ↗
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
              <div className="exp-desc-wrap overflow-hidden max-[768px]:!h-auto max-[768px]:!opacity-100">
                <div className="exp-desc [font-family:var(--mono)] text-xs leading-[1.9] text-[rgba(242,237,228,0.45)]">
                  Learned core web fundamentals and programming logic. Shifted from consuming
                  tutorials to building independently.
                </div>
              </div>
            </div>
            <div className="exp-preview pointer-events-none absolute right-[-18px] top-1/2 -translate-y-1/2 translate-x-full w-[240px] rounded-md border border-[rgba(200,255,0,0.22)] bg-[rgba(8,8,8,0.92)] p-2 shadow-[0_18px_60px_rgba(0,0,0,0.45)] max-[768px]:hidden">
              <video
                className="w-full h-[132px] object-cover rounded-[3px]"
                muted
                loop
                playsInline
                preload="metadata"
                poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='480' height='270'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' x2='1' y1='0' y2='1'%3E%3Cstop offset='0' stop-color='%23080808'/%3E%3Cstop offset='1' stop-color='%23131a0f'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23g)'/%3E%3C/svg%3E"
              >
                <source
                  src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
                  type="video/mp4"
                />
              </video>
              <div className="mt-2 [font-family:var(--mono)] text-[10px] tracking-[0.15em] uppercase text-[var(--acid)]">
                View Project ↗
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Experience
