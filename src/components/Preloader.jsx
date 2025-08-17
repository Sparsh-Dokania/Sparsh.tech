// src/components/Preloader.jsx
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Preloader({ onComplete }) {
  const preloaderRef = useRef();
  const nameRef = useRef();
  const devTextRef = useRef();
  const randomWordsRef = useRef([]);
  const splitRef = useRef();

  useEffect(() => {
    const tl = gsap.timeline({
      defaults: { ease: "power3.inOut" },
      onComplete: () => {
        // Signal that loading is done
        onComplete();
      },
    });

    // Initial name animation
    tl.fromTo(
      nameRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1 }
    )
      .to(nameRef.current, {
        duration: 0.8,
        text: "S      Dokania",
        onUpdate: () => {},
      })
      .to(nameRef.current, {
        duration: 0.8,
        text: "S      Dev",
      })
      .to(nameRef.current, {
        duration: 0.8,
        text: "SDev",
        onUpdate: () => {
          const el = nameRef.current;
          if (el) {
            el.innerHTML = `<span class="text-3xl font-bold">S</span><span class="text-5xl font-extrabold">Dev</span>`;
          }
        },
      });

    // Show random words staggered
    tl.fromTo(
      randomWordsRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.3, duration: 0.5 },
      "-=1"
    );

    // Bar animation & split text
    tl.fromTo(
      splitRef.current,
      { width: 0 },
      { width: "100%", duration: 1 },
      "+=0.5"
    )
      .to(nameRef.current, {
        y: -100,
        duration: 0.8,
      })
      .to(randomWordsRef.current, {
        y: 100,
        opacity: 0,
        duration: 0.5,
      }, "<")
      .to(preloaderRef.current, {
        y: "-100%",
        duration: 1,
      });

  }, []);

  return (
    <div
      ref={preloaderRef}
      className="fixed top-0 left-0 w-full h-screen bg-black text-white flex flex-col items-center justify-center z-50 overflow-hidden"
    >
      <h1
        ref={nameRef}
        className="text-5xl font-extrabold tracking-widest transition-all"
      >
        Sparsh Dokania
      </h1>

      <div className="flex space-x-6 mt-8 text-sm">
        {["Creator", "Frontend", "Interactive"].map((word, i) => (
          <span
            key={i}
            ref={(el) => (randomWordsRef.current[i] = el)}
            className="opacity-0"
          >
            {word}
          </span>
        ))}
      </div>

      <div
        ref={splitRef}
        className="absolute top-1/2 left-0 h-[4px] bg-white w-0"
      />
    </div>
  );
}
