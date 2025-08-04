// src/components/Preloader.jsx
import { useEffect, useRef } from "react";
import gsap from "gsap";

const Preloader = ({ onComplete }) => {
  const preloaderRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ onComplete });

    tl.fromTo(
      textRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
    )
      .to(textRef.current, {
        scale: 0.5,
        y: -100,
        duration: 1,
        ease: "power4.inOut",
      })
      .to(
        preloaderRef.current,
        {
          y: "-100%",
          duration: 1.2,
          ease: "power4.inOut",
        },
        "-=0.5"
      );
  }, [onComplete]);

  return (
    <div
      ref={preloaderRef}
      className="fixed inset-0 z-50 bg-gray-900 flex items-center justify-center text-white text-5xl font-bold"
    >
      <div ref={textRef}>Sparsh Dokania</div>
    </div>
  );
};

export default Preloader;
