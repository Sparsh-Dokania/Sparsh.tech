import { useEffect, useMemo, useRef } from "react"

const MAX_DISTANCE = 180
const MAX_ROTATE_Z = 10
const MAX_ROTATE_Y = 8
const MAX_TRANSLATE_Z = 28
const MAX_SCALE_DELTA = 0.04

export default function ProximityRotateText({ text, className = "" }) {
  const containerRef = useRef(null)
  const letterRefs = useRef([])
  const rafIdRef = useRef(0)
  const pointerRef = useRef({ x: 0, y: 0 })
  const isEnabledRef = useRef(false)
  const letters = useMemo(() => text.split(""), [text])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const resetLetters = () => {
      letterRefs.current.forEach((letter) => {
        if (!letter) return
        letter.style.transform =
          "perspective(800px) rotateZ(0deg) rotateY(0deg) translateZ(0px) scale(1)"
      })
    }

    const updateEnabledState = () => {
      isEnabledRef.current = window.innerWidth >= 768
      if (!isEnabledRef.current) {
        resetLetters()
      }
    }

    const updateTransforms = () => {
      rafIdRef.current = 0
      if (!isEnabledRef.current) {
        return
      }

      const { x: mouseX, y: mouseY } = pointerRef.current

      letterRefs.current.forEach((letter) => {
        if (!letter) return

        const rect = letter.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2

        const dx = mouseX - centerX
        const dy = mouseY - centerY
        const dist = Math.hypot(dx, dy)

        if (dist >= MAX_DISTANCE) {
          letter.style.transform =
            "perspective(800px) rotateZ(0deg) rotateY(0deg) translateZ(0px) scale(1)"
          return
        }

        const strength = 1 - dist / MAX_DISTANCE
        const normalizedX = Math.max(-1, Math.min(1, dx / MAX_DISTANCE))

        const rotateZ = normalizedX * MAX_ROTATE_Z * strength
        const rotateY = -normalizedX * MAX_ROTATE_Y * strength
        const translateZ = MAX_TRANSLATE_Z * strength
        const scale = 1 + MAX_SCALE_DELTA * strength

        letter.style.transform = `perspective(800px) rotateZ(${rotateZ.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateZ(${translateZ.toFixed(2)}px) scale(${scale.toFixed(3)})`
      })
    }

    const scheduleUpdate = () => {
      if (rafIdRef.current) {
        return
      }
      rafIdRef.current = window.requestAnimationFrame(updateTransforms)
    }

    const handleMouseMove = (event) => {
      pointerRef.current.x = event.clientX
      pointerRef.current.y = event.clientY
      scheduleUpdate()
    }

    const handleMouseLeave = () => {
      if (rafIdRef.current) {
        window.cancelAnimationFrame(rafIdRef.current)
        rafIdRef.current = 0
      }
      resetLetters()
    }

    updateEnabledState()
    window.addEventListener("resize", updateEnabledState)
    container.addEventListener("mousemove", handleMouseMove)
    container.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      window.removeEventListener("resize", updateEnabledState)
      container.removeEventListener("mousemove", handleMouseMove)
      container.removeEventListener("mouseleave", handleMouseLeave)
      if (rafIdRef.current) {
        window.cancelAnimationFrame(rafIdRef.current)
      }
    }
  }, [])

  return (
    <span
      ref={containerRef}
      className={`inline-block [transform-style:preserve-3d] ${className}`}
    >
      {letters.map((char, i) => (
        <span
          key={i}
          ref={(el) => {
            letterRefs.current[i] = el
          }}
          className="inline-block will-change-transform transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  )
}