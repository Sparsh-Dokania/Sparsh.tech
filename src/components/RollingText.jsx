import { useRef } from "react"

export default function RollingText({ text, className = "" }) {
  const letters = text.split("")

  return (
    <span className={`inline-block group ${className}`}>
      {letters.map((char, i) => (
        <span
          key={i}
          className="relative inline-block overflow-hidden align-top"
        >
          <span
            className="block transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-full group-hover:scale-[1.03]"
            style={{ transitionDelay: `${i * 0.02}s`, ease: "cubic-bezier(0.22,1,0.36,1)" }}
          >
            {char === " " ? "\u00A0" : char}
          </span>

          <span
            className="absolute left-0 top-full block transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-full group-hover:scale-[1.03]"
            style={{ transitionDelay: `${i * 0.02}s`, ease: "cubic-bezier(0.22,1,0.36,1)" }}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        </span>
      ))}
    </span>
  )
}