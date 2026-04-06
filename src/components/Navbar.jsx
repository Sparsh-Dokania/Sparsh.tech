import { useEffect, useRef, useState } from "react"

function Navbar() {
  const [visible, setVisible] = useState(true)
  const [active, setActive] = useState("")
  const lastScrollRef = useRef(0)

  // Scroll hide/show with a stable listener to avoid rebinding on each scroll.
  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY
      const lastScroll = lastScrollRef.current

      if (currentScroll > lastScroll && currentScroll > 80) {
        setVisible(false)
      } else {
        setVisible(true)
      }

      lastScrollRef.current = currentScroll
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Active section detection
  useEffect(() => {
    const sections = document.querySelectorAll("section")

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id)
          }
        })
      },
      { threshold: 0.6 }
    )

    sections.forEach((sec) => observer.observe(sec))

    return () => sections.forEach((sec) => observer.unobserve(sec))
  }, [])

  const navLink = (id, label) => (
    <a
      href={`#${id}`}
      className={`magnetic-target relative text-[11px] tracking-[0.15em] uppercase transition-all duration-300 
      ${
        active === id
          ? "text-[var(--acid)] after:w-full"
          : "text-[rgba(242,237,228,0.45)]"
      }
      hover:text-[var(--acid)] hover:-translate-y-[1px]
      after:content-[''] after:absolute after:left-0 after:bottom-[-3px]
      after:h-px after:bg-[var(--acid)] after:w-0
      after:transition-all after:duration-300 after:ease-[cubic-bezier(0.16,1,0.3,1)]
      hover:after:w-full`}
    >
      {label}
    </a>
  )

  return (
    <nav
      className={`fixed top-6 left-1/2 -translate-x-1/2 z-[99] 
      w-[92%] max-w-[1100px]
      transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
      ${
        visible
          ? "opacity-100 translate-y-0"
          : "opacity-0 -translate-y-10"
      }`}
    >
      {/* Glass Panel */}
      <div className="relative flex items-center justify-between px-6 py-3 rounded-2xl 
        bg-[rgba(10,10,10,0.6)] backdrop-blur-md 
        border border-[rgba(200,255,0,0.08)]">

        {/* Noise */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-overlay bg-[url('/noise.png')]" />

        {/* Logo */}
        <a
          href="#hero"
          data-text="SN/"
          className="magnetic-target relative font-extrabold text-[15px] tracking-[0.12em] text-[var(--acid)]
          transition-transform duration-300 hover:scale-[1.05]
          before:content-[attr(data-text)] after:content-[attr(data-text)]
          before:absolute after:absolute before:top-0 after:top-0 before:left-0 after:left-0
          before:opacity-0 after:opacity-0
          hover:before:opacity-80 hover:before:text-[var(--red)] hover:before:animate-[glitch-1_0.3s_steps(2)_3]
          hover:after:opacity-80 hover:after:animate-[glitch-2_0.3s_steps(2)_3]`}
        >
          SN/
        </a>

        {/* Links */}
        <div className="hidden md:flex gap-6">
          {navLink("about", "About")}
          {navLink("work", "Work")}
          {navLink("experience", "Experience")}
          {navLink("contact", "Contact")}
        </div>

        {/* Status */}
        <div className="flex items-center gap-2 text-[10px] tracking-[0.12em] uppercase text-[rgba(242,237,228,0.5)]">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--acid)] animate-pulse"></span>
          STATUS: ACTIVE
        </div>
      </div>
    </nav>
  )
}

export default Navbar