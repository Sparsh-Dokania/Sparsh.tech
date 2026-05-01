import { useEffect, useRef, useState } from "react";

const isFinePointer = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(hover: hover) and (pointer: fine)").matches;

export function CardSpotlight({
  children,
  className = "",
  colors = [
    [200, 255, 0],
    [242, 237, 228],
  ],
  animationSpeed = 4,
}) {
  const cardRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [canReveal, setCanReveal] = useState(false);

  useEffect(() => {
    const updateReveal = () => setCanReveal(isFinePointer());

    updateReveal();
    window.addEventListener("resize", updateReveal);

    return () => window.removeEventListener("resize", updateReveal);
  }, []);

  const handlePointerMove = (event) => {
    if (!cardRef.current || !canReveal) {
      return;
    }

    const rect = cardRef.current.getBoundingClientRect();

    setPosition({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    });
  };

  const primary = colors[0].join(" ");
  const secondary = colors[1].join(" ");

  return (
    <div
      ref={cardRef}
      className={`relative ${className}`}
      onPointerEnter={() => canReveal && setIsHovered(true)}
      onPointerLeave={() => canReveal && setIsHovered(false)}
      onPointerMove={handlePointerMove}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-100 min-[769px]:opacity-0"
        style={{
          background:
            "radial-gradient(circle at 18% 0%, rgba(200,255,0,0.11), transparent 34%)",
        }}
      />

      {canReveal ? (
        <div
          className="pointer-events-none absolute inset-0 transition-opacity duration-500"
          style={{
            opacity: isHovered ? 1 : 0,
            transitionDuration: `${animationSpeed * 100}ms`,
            background: `radial-gradient(420px circle at ${position.x}px ${position.y}px, rgba(${primary} / 0.17), rgba(${secondary} / 0.055) 34%, transparent 68%)`,
          }}
        />
      ) : null}

      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(242,237,228,0.075),transparent_36%,rgba(200,255,0,0.035))]" />
      {children}
    </div>
  );
}
