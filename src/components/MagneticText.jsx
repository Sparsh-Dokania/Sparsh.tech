import { useEffect, useRef } from "react"

export default function MagneticText({ text, className = "" }) {
  const containerRef = useRef(null)
  const lettersRef = useRef([])

  useEffect(() => {
    if (window.innerWidth < 768) return

    const container = containerRef.current

    const handleMove = (e) => {
      const rect = container.getBoundingClientRect()
      const pointerX = e.clientX - rect.left

      lettersRef.current.forEach((el, i) => {
        if (!el) return

        const letterRect = el.getBoundingClientRect()
        const letterX = letterRect.left - rect.left + letterRect.width / 2

        const distance = letterX - pointerX

        const min = 40
        const max = 100
        const bound = min * Math.PI

        let scale = 1
        let y = 0

        if (-bound < distance && distance < bound) {
          const rad = distance / min * 0.5

          scale = 1 + (max / min - 1) * Math.cos(rad) * 0.25
          y = -20 * Math.cos(rad)
        }

        el.style.transform = `translateY(${y}px) scale(${scale})`
      })
    }

    const reset = () => {
      lettersRef.current.forEach((el) => {
        if (!el) return
        el.style.transform = `translateY(0px) scale(1)`
      })
    }

    container.addEventListener("mousemove", handleMove)
    container.addEventListener("mouseleave", reset)

    return () => {
      container.removeEventListener("mousemove", handleMove)
      container.removeEventListener("mouseleave", reset)
    }
  }, [])

  return (
    <div ref={containerRef} className={`inline-block ${className}`}>
      {text.split("").map((char, i) => (
        <span
          key={i}
          ref={(el) => (lettersRef.current[i] = el)}
          className="inline-block transition-transform duration-200 ease-out will-change-transform"
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </div>
  )
}