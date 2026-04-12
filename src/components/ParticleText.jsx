import { useEffect, useRef } from "react"

export default function ParticleText({ text, className = "" }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")

    let particles = []
    let mouse = { x: null, y: null }
    let hovered = false

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      init()
    }

    window.addEventListener("resize", resize)

    const init = () => {
      particles = []
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      ctx.fillStyle = "#fff"
      ctx.font = "bold 120px Syne"
      ctx.textAlign = "center"
      ctx.fillText(text, canvas.width / 2, canvas.height / 2)

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)

      for (let y = 0; y < imageData.height; y += 4) {
        for (let x = 0; x < imageData.width; x += 4) {
          const index = (y * imageData.width + x) * 4
          if (imageData.data[index + 3] > 128) {
            particles.push({
              x,
              y,
              baseX: x,
              baseY: y,
              vx: 0,
              vy: 0,
            })
          }
        }
      }
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((p) => {
        if (hovered && mouse.x) {
          const dx = p.x - mouse.x
          const dy = p.y - mouse.y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < 80) {
            const force = (80 - dist) / 80
            p.vx += dx * force * 0.05
            p.vy += dy * force * 0.05
          }
        }

        // return to base
        p.vx += (p.baseX - p.x) * 0.02
        p.vy += (p.baseY - p.y) * 0.02

        p.vx *= 0.9
        p.vy *= 0.9

        p.x += p.vx
        p.y += p.vy

        ctx.fillRect(p.x, p.y, 1.5, 1.5)
      })

      requestAnimationFrame(draw)
    }

    const handleMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      mouse.x = e.clientX - rect.left
      mouse.y = e.clientY - rect.top
    }

    const handleEnter = () => (hovered = true)
    const handleLeave = () => {
      hovered = false
      mouse.x = null
      mouse.y = null
    }

    canvas.addEventListener("mousemove", handleMove)
    canvas.addEventListener("mouseenter", handleEnter)
    canvas.addEventListener("mouseleave", handleLeave)

    resize()
    draw()

    return () => {
      window.removeEventListener("resize", resize)
      canvas.removeEventListener("mousemove", handleMove)
    }
  }, [text])

  return (
    <canvas
      ref={canvasRef}
      className={`w-full h-[140px] max-[768px]:h-[80px] ${className}`}
    />
  )
}