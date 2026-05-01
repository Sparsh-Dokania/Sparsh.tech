import { useEffect, useRef } from "react";
import gsap from "gsap";

const iphoneVideo = "/assets/videos/AppleiPhone.mp4";
const k72Video = "/assets/videos/k72.mp4";
const gamingVideo = "/assets/videos/RedefineGaming.mp4";

const projects = [
  {
    id: "001",
    title: "iPhone 3D Experience",
    link: "https://appleiphone-project.vercel.app/",
    video: iphoneVideo,
    description: [
      "A fully interactive 3D product interface built from scratch.",
      "Not a clone - a reconstruction of how premium product experiences are engineered.",
      "Integrated real-time 3D rendering using Three.js.",
      "Built scroll-synced animation systems with GSAP.",
      "Optimized motion and performance across devices.",
    ],
  },
  {
    id: "002",
    title: "K72 Motion System",
    link: "https://k72-pink-three.vercel.app",
    video: k72Video,
    description: [
      "An animation-first frontend focused on rhythm, pacing, and feel.",
      "Designed interaction states as reusable motion patterns.",
      "Built modular GSAP timelines for controlled sequencing.",
      "Structured components for scalable visual choreography.",
      "Balanced expressiveness with performance constraints.",
    ],
  },
  {
    id: "003",
    title: "Zentry-Inspired Gaming Interface",
    link: "https://redefine-gaming-steel.vercel.app",
    video: gamingVideo,
    description: [
      "A high-intensity landing experience translated into performant frontend code.",
      "Explored cinematic transitions and interaction layering.",
      "Implemented composited motion stacks with responsive behavior.",
      "Refined typography and movement to match a game-like tone.",
      "Maintained smooth frame pacing under heavy animation load.",
    ],
  },
];

function playVideo(video, reset = false) {
  if (!video) return;

  if (reset) {
    video.currentTime = 0;
  }

  const promise = video.play();

  if (promise !== undefined) {
    promise.catch(() => {});
  }
}

function ProjectRow({ project, index }) {
  const revealDelay = index === 0 ? "" : ` reveal-delay-${index}`;

  return (
    <>
      <a
        href={project.link}
        target="_blank"
        rel="noreferrer"
        className={`project-item group reveal${revealDelay} relative hidden cursor-none grid-cols-[60px_minmax(0,1fr)_128px] items-center gap-8 overflow-hidden border-t border-t-[rgba(242,237,228,0.07)] px-0 py-8 transition-colors duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-t-[rgba(200,255,0,0.22)] md:grid before:pointer-events-none before:absolute before:inset-y-0 before:-left-[8%] before:z-0 before:w-[52%] before:origin-left before:-translate-x-8 before:scale-x-75 before:bg-[linear-gradient(90deg,rgba(200,255,0,0.035)_0%,rgba(200,255,0,0.022)_18%,rgba(200,255,0,0.012)_36%,rgba(200,255,0,0.006)_56%,transparent_78%)] before:opacity-0 before:blur-[24px] before:transition-all before:duration-[650ms] before:ease-[cubic-bezier(0.16,1,0.3,1)] hover:before:translate-x-0 hover:before:scale-x-100 hover:before:opacity-100 lg:before:w-[58%] max-md:before:hidden`}
      >
        <div className="relative z-[1] [font-family:var(--mono)] text-[11px] text-[rgba(242,237,228,0.28)] transition-colors duration-300 group-hover:text-[var(--acid)]">
          {project.id}
        </div>

        <div className="relative z-[1] min-w-0">
          <div className="[font-family:var(--syne)] text-[clamp(24px,3vw,38px)] font-bold leading-[1.02] text-[var(--white)] transition-colors duration-300 group-hover:text-[var(--acid)]">
            {project.title}
          </div>

          <div className="project-desc-wrap relative mt-4 max-h-[76px] overflow-hidden transition-[max-height] duration-[560ms] ease-[cubic-bezier(0.16,1,0.3,1)] after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-14 after:bg-[linear-gradient(180deg,rgba(8,8,8,0)_0%,rgba(8,8,8,0.18)_30%,rgba(8,8,8,0.42)_58%,rgba(8,8,8,0.72)_82%,var(--black)_100%)] after:transition-opacity after:duration-[560ms] after:ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:max-h-[190px] group-hover:after:opacity-0">
            <p className="project-desc max-w-[700px] [font-family:var(--mono)] text-[12px] leading-[1.85] text-[rgba(242,237,228,0.46)]">
              {project.description.map((line, lineIndex) => (
                <span
                  key={line}
                  className={`block transition-[transform,opacity,filter] duration-[560ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    lineIndex === 2
                      ? "opacity-45 [filter:blur(2px)] group-hover:translate-y-0 group-hover:opacity-100 group-hover:[filter:blur(0px)]"
                      : lineIndex === 3
                      ? "translate-y-[6px] opacity-25 [filter:blur(4px)] group-hover:translate-y-0 group-hover:opacity-100 group-hover:[filter:blur(0px)]"
                      : lineIndex === 4
                      ? "translate-y-[12px] opacity-0 [filter:blur(6px)] group-hover:translate-y-0 group-hover:opacity-100 group-hover:[filter:blur(0px)]"
                      : ""
                  }`}
                >
                  {line}
                </span>
              ))}
            </p>
          </div>
        </div>

        <div className="relative z-[1] flex flex-col items-end gap-2 [font-family:var(--mono)] text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--white)] opacity-60 transition-all duration-300 group-hover:tracking-[0.19em] group-hover:opacity-100">
          <span className="project-arrow block text-3xl leading-none text-[var(--acid)] opacity-80 transition-opacity duration-[280ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:opacity-100">
            {"\u2197"}
          </span>
          <span>View Project</span>
        </div>

        <div className="project-preview pointer-events-none absolute right-[70px] top-1/2 z-[2] hidden w-[280px] -translate-y-1/2 md:block lg:right-[110px]">
          <div className="project-preview-shell rounded-lg border border-[rgba(200,255,0,0.24)] bg-[rgba(8,8,8,0.94)] p-2.5 opacity-0 shadow-[0_24px_80px_rgba(0,0,0,0.5),0_0_36px_rgba(200,255,0,0.06)] backdrop-blur-md">
            <video
              className="h-[152px] w-full rounded-md object-cover"
              muted
              loop
              playsInline
              preload="metadata"
            >
              <source src={project.video} type="video/mp4" />
            </video>
            <div className="mt-2 flex items-center justify-between [font-family:var(--mono)] text-[10px] uppercase tracking-[0.15em] text-[var(--acid)]">
              <span>Preview</span>
              <span>{"\u2197"}</span>
            </div>
          </div>
        </div>
      </a>

      <a
        href={project.link}
        target="_blank"
        rel="noreferrer"
        className={`mobile-project-card group reveal${revealDelay} block rounded-xl border border-[rgba(242,237,228,0.08)] bg-[rgba(242,237,228,0.025)] p-4 shadow-[0_18px_50px_rgba(0,0,0,0.28)] transition-[border-color,background-color,transform] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] active:scale-[0.99] [&.is-expanded]:border-[rgba(200,255,0,0.22)] [&.is-expanded]:bg-[rgba(200,255,0,0.035)] [&.is-expanded_.mobile-desc-line-hidden]:translate-y-0 [&.is-expanded_.mobile-desc-line-hidden]:opacity-100 [&.is-expanded_.mobile-desc-line-hidden]:[filter:blur(0px)] [&.is-expanded_.mobile-desc-wrap]:max-h-[260px] [&.is-expanded_.mobile-desc-wrap]:after:opacity-0 md:hidden`}
      >
        <div className="mb-3 [font-family:var(--mono)] text-[11px] text-[rgba(200,255,0,0.8)]">
          {project.id}
        </div>
        <h3 className="[font-family:var(--syne)] text-[clamp(25px,8vw,34px)] font-bold leading-[1.02] text-[var(--white)]">
          {project.title}
        </h3>

        <div className="my-5 overflow-hidden rounded-lg border border-[rgba(200,255,0,0.16)] bg-[rgba(0,0,0,0.28)]">
          <video
            data-mobile-video
            className="aspect-video w-full object-cover"
            muted
            loop
            playsInline
            preload="metadata"
          >
            <source src={project.video} type="video/mp4" />
          </video>
        </div>

        <div className="mobile-desc-wrap relative max-h-[76px] overflow-hidden transition-[max-height] duration-[560ms] ease-[cubic-bezier(0.16,1,0.3,1)] after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-14 after:bg-[linear-gradient(180deg,rgba(8,8,8,0)_0%,rgba(8,8,8,0.18)_30%,rgba(8,8,8,0.42)_58%,rgba(8,8,8,0.72)_82%,var(--black)_100%)] after:transition-opacity after:duration-[560ms] after:ease-[cubic-bezier(0.16,1,0.3,1)]">
          <p className="[font-family:var(--mono)] text-[12px] leading-[1.85] text-[rgba(242,237,228,0.46)]">
            {project.description.map((line, lineIndex) => (
              <span
                key={line}
                className={`block transition-[transform,opacity,filter] duration-[560ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  lineIndex === 2
                    ? "mobile-desc-line-hidden opacity-45 [filter:blur(2px)]"
                    : lineIndex === 3
                    ? "mobile-desc-line-hidden translate-y-[6px] opacity-25 [filter:blur(4px)]"
                    : lineIndex === 4
                    ? "mobile-desc-line-hidden translate-y-[12px] opacity-0 [filter:blur(6px)]"
                    : ""
                }`}
              >
                {line}
              </span>
            ))}
          </p>
        </div>

        <div className="mt-5 inline-flex min-h-11 items-center gap-3 rounded-full border border-[rgba(200,255,0,0.32)] bg-[rgba(200,255,0,0.09)] px-5 py-3 [font-family:var(--mono)] text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--acid)]">
          View Project
          <span className="text-base leading-none">{"\u2197"}</span>
        </div>
      </a>
    </>
  );
}

function Work() {
  const workRef = useRef(null);

  useEffect(() => {
    const root = workRef.current;
    if (!root) return undefined;

    const canHover = window.matchMedia(
      "(hover: hover) and (pointer: fine)",
    ).matches;
    const desktopItems = Array.from(root.querySelectorAll(".project-item"));
    const mobileVideos = Array.from(root.querySelectorAll("[data-mobile-video]"));
    const cleanups = [];

    if (canHover) {
      desktopItems.forEach((item) => {
        const preview = item.querySelector(".project-preview-shell");
        const video = item.querySelector("video");
        const arrow = item.querySelector(".project-arrow");

        if (!preview) return;

        gsap.set(preview, {
          autoAlpha: 0,
          x: 26,
          y: 10,
          scale: 0.96,
          rotate: 1.2,
          transformOrigin: "50% 50%",
        });

        const onEnter = () => {
          gsap.to(preview, {
            autoAlpha: 1,
            x: 0,
            y: 0,
            scale: 1,
            rotate: 0,
            duration: 0.45,
            ease: "power3.out",
            overwrite: "auto",
          });
          if (arrow) {
            gsap.to(arrow, {
              x: 2,
              y: -2,
              scale: 1.03,
              duration: 0.28,
              ease: "power3.out",
              overwrite: "auto",
            });
          }
          playVideo(video, true);
        };

        const onLeave = () => {
          gsap.to(preview, {
            autoAlpha: 0,
            x: 26,
            y: 10,
            scale: 0.96,
            rotate: 1.2,
            duration: 0.35,
            ease: "power2.out",
            overwrite: "auto",
          });
          if (arrow) {
            gsap.to(arrow, {
              x: 0,
              y: 0,
              scale: 1,
              duration: 0.24,
              ease: "power2.out",
              overwrite: "auto",
            });
          }
          if (video) video.pause();
        };

        item.addEventListener("mouseenter", onEnter);
        item.addEventListener("mouseleave", onLeave);

        cleanups.push(() => {
          item.removeEventListener("mouseenter", onEnter);
          item.removeEventListener("mouseleave", onLeave);
          gsap.killTweensOf([item, preview, arrow]);
          if (video) video.pause();
        });
      });
    }

    if (mobileVideos.length) {
      const mobileCards = Array.from(root.querySelectorAll(".mobile-project-card"));
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const card = entry.target;
            const video = card.querySelector("[data-mobile-video]");

            if (entry.isIntersecting) {
              card.classList.add("is-expanded");
              playVideo(video);
            } else {
              card.classList.remove("is-expanded");
              if (video) video.pause();
            }
          });
        },
        { threshold: 0.45 },
      );

      mobileCards.forEach((card) => observer.observe(card));

      cleanups.push(() => {
        mobileVideos.forEach((video) => video.pause());
        observer.disconnect();
      });
    }

    return () => cleanups.forEach((fn) => fn());
  }, []);

  return (
    <section
      id="work"
      ref={workRef}
      className="relative min-h-screen border-t border-t-[rgba(200,255,0,0.12)] px-5 py-20 md:px-10 md:py-[120px]"
    >
      <div className="reveal mb-12 flex flex-col gap-6 md:mb-16 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="mb-4 flex items-center gap-3 [font-family:var(--mono)] text-[10px] uppercase tracking-[0.25em] text-[var(--acid)] before:h-px before:w-6 before:bg-[var(--acid)] before:content-['']">
            Selected Work
          </div>
          <h2 className="[font-family:var(--syne)] text-[clamp(42px,14vw,80px)] font-extrabold leading-[0.9] tracking-[-0.03em] md:text-[clamp(40px,6vw,80px)]">
            SYSTEMS <br />
            <span
              className="block [font-family:var(--serif)] text-[clamp(56px,18vw,118px)] italic leading-[0.95] text-[var(--acid)] md:text-[clamp(60px,10vw,130px)]"
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
        <div className="[font-family:var(--mono)] text-[11px] uppercase tracking-[0.1em] text-[rgba(242,237,228,0.36)]">
          003 / projects
        </div>
      </div>

      <div className="flex flex-col gap-5 md:gap-0.5">
        {projects.map((project, index) => (
          <ProjectRow key={project.id} project={project} index={index} />
        ))}
      </div>
    </section>
  );
}

export default Work;
