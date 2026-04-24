import { useEffect, useRef } from "react";
import gsap from "gsap";

const iphoneVideo = "/assets/videos/AppleiPhone.mp4";
const k72Video = "/assets/videos/k72.mp4";
const gamingVideo = "/assets/videos/RedefineGaming.mp4";

function Work() {
  const workRef = useRef(null);

  useEffect(() => {
    const root = workRef.current;
    if (!root) return;

    const canHover = window.matchMedia(
      "(hover: hover) and (pointer: fine)",
    ).matches;
    const items = Array.from(root.querySelectorAll(".project-item"));
    const cleanups = [];
    let activeItem = null;

    if (canHover) {
      items.forEach((item) => {
        const descWrap = item.querySelector(".project-desc-wrap");
        const desc = item.querySelector(".project-desc");
        const preview = item.querySelector(".project-preview");
        const video = item.querySelector("video");
        const link = item.dataset.link;

        const onClick = () => {
          gsap.to(item, {
            scale: 0.97,
            duration: 0.12,
            yoyo: true,
            repeat: 1,
            ease: "power1.inOut",
            onComplete: () => {
              window.open(link, "_blank", "noopener, noreferrer");
            },
          });
        };
        item.addEventListener("click", onClick);
        cleanups.push(() => {
          item.removeEventListener("click", onClick);
        });
        if (!descWrap || !desc || !preview) return;

        gsap.set(descWrap, { height: 54, overflow: "hidden" });
        gsap.set(preview, { opacity: 0, x: 40, scale: 0.96, rotate: 2 });
        gsap.set(item, { scale: 1 });

        let expandTimeline = null;

        const onEnter = () => {
          if (activeItem && activeItem !== item) {
            activeItem.classList.remove("project-active");
          }
          activeItem = item;
          item.classList.add("project-active");

          expandTimeline = gsap.timeline();

          expandTimeline
            .to(
              item,
              {
                scale: 1.01,
                duration: 0.45,
                ease: "power3.out",
                delay: 0.15,
              },
              0,
            )
            .to(
              descWrap,
              {
                height: "auto",
                duration: 0.5,
                ease: "power3.out",
                delay: 0.15,
              },
              0,
            )
            .fromTo(
              desc.children,
              { y: 8, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                stagger: 0.025,
                duration: 0.38,
                ease: "power3.out",
                delay: 0.2,
              },
              0,
            )
            .to(
              preview,
              {
                opacity: 1,
                x: 0,
                scale: 1,
                rotate: 0,
                duration: 0.5,
                ease: "power3.out",
              },
              0.25,
            );

          if (video) {
            const playVideo = () => {
              video.currentTime = 0;

              const promise = video.play();
              if (promise !== undefined) {
                promise.catch(() => {});
              }
            };

            if (video.readyState >= 2) {
              playVideo();
            } else {
              video.addEventListener("loadeddata", playVideo, { once: true });
            }
          }
        };

        const onLeave = () => {
          gsap.to(item, {
            scale: 1.005,
            duration: 0.3,
            ease: "power2.in",
          });

          gsap.to(descWrap, {
            height: 54,
            duration: 0.35,
            ease: "power2.in",
          });

          gsap.to(preview, {
            opacity: 0,
            x: 40,
            scale: 0.96,
            rotate: 2,
            duration: 0.35,
            ease: "power2.in",
          });

          if (video) video.pause();
        };

        item.addEventListener("mouseenter", onEnter);
        item.addEventListener("mouseleave", onLeave);

        cleanups.push(() => {
          item.removeEventListener("mouseenter", onEnter);
          item.removeEventListener("mouseleave", onLeave);
          if (expandTimeline) expandTimeline.kill();
        });
      });
    } else {
      items.forEach((item) => {
        const descWrap = item.querySelector(".project-desc-wrap");
        const desc = item.querySelector(".project-desc");
        const preview = item.querySelector(".project-preview");
        if (descWrap) {
          gsap.set(descWrap, { height: "auto", overflow: "visible" });
        }
        if (desc) {
          gsap.set(desc, { y: 0, opacity: 1 });
        }
        if (preview) {
          gsap.set(preview, { opacity: 0, x: 40, scale: 0.96, rotate: 2 });
        }
      });
    }

    return () => cleanups.forEach((fn) => fn());
  }, []);

  return (
    <section
      id="work"
      ref={workRef}
      className="relative min-h-screen px-10 py-[120px] border-t border-t-[rgba(200,255,0,0.12)] max-[768px]:px-5 max-[768px]:py-20"
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
                transform: "translateY(100%)",
                animation: "slideUp 0.9s cubic-bezier(0.16,1,0.3,1) forwards",
                animationDelay: "0.7s",
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
        <div className="project-item group reveal relative grid [grid-template-columns:60px_1fr_auto] items-center gap-8 py-7 px-0 border-t border-t-[rgba(242,237,228,0.06)] cursor-none overflow-hidden before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-0 before:bg-[rgba(200,255,0,0.04)] hover:before:w-full before:transition-all before:duration-[400ms] before:ease-[cubic-bezier(0.16,1,0.3,1)]" data-link = "https://appleiphone-project.vercel.app/">
          <div className="[font-family:var(--mono)] text-[11px] text-[rgba(242,237,228,0.2)]">
            001
          </div>
          <div className="relative z-[1]">
            <div className="[font-family:var(--syne)] font-bold [font-size:clamp(22px,3vw,36px)] text-[var(--white)] mb-1.5 group-hover:text-[var(--acid)]">
              iPhone 3D Experience
            </div>
            <div className="project-desc-wrap mt-3">
              <p className="project-desc max-w-[740px] [font-family:var(--mono)] text-[12px] leading-[1.85] text-[rgba(242,237,228,0.42)]">
                <span className="block">
                  A fully interactive 3D product interface built from scratch.
                </span>
                <span className="block">
                  Not a clone - a reconstruction of how premium product
                  experiences are engineered.
                </span>
                <span className="block">
                  Integrated real-time 3D rendering using Three.js.
                </span>
                <span className="block">
                  Built scroll-synced animation systems with GSAP.
                </span>
                <span className="block">
                  Optimized motion and performance across devices.
                </span>
              </p>
            </div>
          </div>
          <div className="text-2xl text-[rgba(242,237,228,0.15)] group-hover:text-[var(--acid)] group-hover:translate-x-1 group-hover:-translate-y-1">
            ↗
          </div>
          <div className="project-preview pointer-events-none absolute right-[-18px] top-1/2 -translate-y-1/2 translate-x-full w-[260px] rounded-md border border-[rgba(200,255,0,0.22)] bg-[rgba(8,8,8,0.92)] p-2 shadow-[0_18px_60px_rgba(0,0,0,0.45)] max-[768px]:hidden">
            <video
              className="w-full h-[140px] object-cover rounded-[3px]"
              muted
              loop
              playsInline
              preload="auto"
            >
              <source src={iphoneVideo} type="video/mp4" />
            </video>
            <div className="mt-2 [font-family:var(--mono)] text-[10px] tracking-[0.15em] uppercase text-[var(--acid)]">
              View Project ↗
            </div>
          </div>
        </div>

        <div className="project-item group reveal reveal-delay-1 relative grid [grid-template-columns:60px_1fr_auto] items-center gap-8 py-7 px-0 border-t border-t-[rgba(242,237,228,0.06)] cursor-none overflow-hidden before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-0 before:bg-[rgba(200,255,0,0.04)] hover:before:w-full before:transition-all before:duration-[400ms] before:ease-[cubic-bezier(0.16,1,0.3,1)]" data-link= "https://k72-pink-three.vercel.app">
          <div className="[font-family:var(--mono)] text-[11px] text-[rgba(242,237,228,0.2)]">
            002
          </div>
          <div className="relative z-[1]">
            <div className="[font-family:var(--syne)] font-bold [font-size:clamp(22px,3vw,36px)] text-[var(--white)] mb-1.5 group-hover:text-[var(--acid)]">
              K72 Motion System
            </div>
            <div className="project-desc-wrap mt-3">
              <p className="project-desc max-w-[740px] [font-family:var(--mono)] text-[12px] leading-[1.85] text-[rgba(242,237,228,0.42)]">
                <span className="block">
                  An animation-first frontend focused on rhythm, pacing, and
                  feel.
                </span>
                <span className="block">
                  Designed interaction states as reusable motion patterns.
                </span>
                <span className="block">
                  Built modular GSAP timelines for controlled sequencing.
                </span>
                <span className="block">
                  Structured components for scalable visual choreography.
                </span>
                <span className="block">
                  Balanced expressiveness with performance constraints.
                </span>
              </p>
            </div>
          </div>
          <div className="text-2xl text-[rgba(242,237,228,0.15)] group-hover:text-[var(--acid)] group-hover:translate-x-1 group-hover:-translate-y-1">
            ↗
          </div>
          <div className="project-preview pointer-events-none absolute right-[-18px] top-1/2 -translate-y-1/2 translate-x-full w-[260px] rounded-md border border-[rgba(200,255,0,0.22)] bg-[rgba(8,8,8,0.92)] p-2 shadow-[0_18px_60px_rgba(0,0,0,0.45)] max-[768px]:hidden">
            <video
              className="w-full h-[140px] object-cover rounded-[3px]"
              muted
              loop
              playsInline
              preload="auto"
            >
              <source src={k72Video} type="video/mp4" />
            </video>
            <div className="mt-2 [font-family:var(--mono)] text-[10px] tracking-[0.15em] uppercase text-[var(--acid)]">
              View Project ↗
            </div>
          </div>
        </div>

        <div className="project-item group reveal reveal-delay-2 relative grid [grid-template-columns:60px_1fr_auto] items-center gap-8 py-7 px-0 border-t border-t-[rgba(242,237,228,0.06)] cursor-none overflow-hidden before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-0 before:bg-[rgba(200,255,0,0.04)] hover:before:w-full before:transition-all before:duration-[400ms] before:ease-[cubic-bezier(0.16,1,0.3,1)]" data-link = "https://redefine-gaming-steel.vercel.app">
          <div className="[font-family:var(--mono)] text-[11px] text-[rgba(242,237,228,0.2)]">
            003
          </div>
          <div className="relative z-[1]">
            <div className="[font-family:var(--syne)] font-bold [font-size:clamp(22px,3vw,36px)] text-[var(--white)] mb-1.5 group-hover:text-[var(--acid)]">
              Zentry-Inspired Gaming Interface
            </div>
            <div className="project-desc-wrap mt-3">
              <p className="project-desc max-w-[740px] [font-family:var(--mono)] text-[12px] leading-[1.85] text-[rgba(242,237,228,0.42)]">
                <span className="block">
                  A high-intensity landing experience translated into performant
                  frontend code.
                </span>
                <span className="block">
                  Explored cinematic transitions and interaction layering.
                </span>
                <span className="block">
                  Implemented composited motion stacks with responsive behavior.
                </span>
                <span className="block">
                  Refined typography and movement to match a game-like tone.
                </span>
                <span className="block">
                  Maintained smooth frame pacing under heavy animation load.
                </span>
              </p>
            </div>
          </div>
          <div className="text-2xl text-[rgba(242,237,228,0.15)] group-hover:text-[var(--acid)] group-hover:translate-x-1 group-hover:-translate-y-1">
            ↗
          </div>
          <div className="project-preview pointer-events-none absolute right-[-18px] top-1/2 -translate-y-1/2 translate-x-full w-[260px] rounded-md border border-[rgba(200,255,0,0.22)] bg-[rgba(8,8,8,0.92)] p-2 shadow-[0_18px_60px_rgba(0,0,0,0.45)] max-[768px]:hidden">
            <video
              className="w-full h-[140px] object-cover rounded-[3px]"
              muted
              loop
              playsInline
              preload="auto"
            >
              <source src={gamingVideo} type="video/mp4" />
            </video>
            <div className="mt-2 [font-family:var(--mono)] text-[10px] tracking-[0.15em] uppercase text-[var(--acid)]">
              View Project ↗
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Work;
