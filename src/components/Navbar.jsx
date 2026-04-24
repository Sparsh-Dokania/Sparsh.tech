import { useEffect, useRef, useState } from "react"

const mobileNavItems = ["about", "work", "experience", "contact"]

function Navbar() {
  const [visible, setVisible] = useState(true)
  const [active, setActive] = useState("")
  const [menuOpen, setMenuOpen] = useState(false)
  const lastScrollRef = useRef(0)

  // Scroll hide/show
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
    const sections = document.querySelectorAll("section[id]")

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

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [menuOpen])

  const navLink = (id, label) => (
    <a
      href={`#${id}`}
      onClick={() => setMenuOpen(false)}
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
    <>
      <nav
        className={`fixed top-6 left-1/2 -translate-x-1/2 z-[99]
        w-[92%] max-w-[1100px] max-[768px]:w-[95%]
        transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
        ${
          visible
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-10"
        }`}
      >
        {/* Glass Panel */}
        <div
          className="relative flex items-center justify-between px-6 py-3 
          max-[768px]:px-4 max-[768px]:py-2.5
          rounded-2xl 
          bg-[rgba(10,10,10,0.6)] backdrop-blur-md 
          border border-[rgba(200,255,0,0.08)]"
        >
          {/* Noise */}
          <div className="pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-overlay">
            <div className="w-full h-full bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.15)_1px,transparent_0)] [background-size:4px_4px]" />
          </div>

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
            hover:after:opacity-80 hover:after:animate-[glitch-2_0.3s_steps(2)_3]"
          >
            SN/
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex gap-6">
            {navLink("about", "About")}
            {navLink("work", "Work")}
            {navLink("experience", "Experience")}
            {navLink("contact", "Contact")}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            className="md:hidden text-[var(--acid)] text-[11px] tracking-[0.15em] uppercase transition-colors duration-300 hover:text-[var(--white)]"
          >
            {menuOpen ? "Close" : "Menu"}
          </button>

          {/* Status */}
          <div className="hidden md:flex items-center gap-2 text-[10px] tracking-[0.12em] uppercase text-[rgba(242,237,228,0.5)]">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--acid)] animate-pulse"></span>
            STATUS: ACTIVE
          </div>
        </div>
      </nav>

      {menuOpen && (
        <div className="fixed inset-0 z-[120] flex flex-col items-center justify-center bg-[rgba(8,8,8,0.95)] backdrop-blur-md transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] animate-[fadeIn_0.4s_ease]">
          <div className="pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-overlay">
            <div className="h-full w-full bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.18)_1px,transparent_0)] [background-size:5px_5px]" />
          </div>

          <button
            onClick={() => setMenuOpen(false)}
            className="absolute top-6 right-6 text-[var(--acid)] text-[12px] tracking-[0.2em] uppercase transition-colors duration-300 hover:text-[var(--white)]"
          >
            Close
          </button>

          <div className="flex flex-col items-center gap-8">
            {mobileNavItems.map((id, index) => (
              <a
                key={id}
                href={`#${id}`}
                onClick={() => setMenuOpen(false)}
                className="magnetic-target text-[clamp(28px,6vw,48px)] font-extrabold tracking-[0.1em] uppercase text-[var(--white)] transition-all duration-300 hover:text-[var(--acid)] hover:-translate-y-[2px]"
                style={{
                  opacity: 0,
                  transform: "translateY(20px)",
                  animation: "fadeUp 0.6s ease forwards",
                  animationDelay: `${0.08 + index * 0.08}s`,
                }}
              >
                {id}
              </a>
            ))}
          </div>

          <div className="absolute bottom-10 text-[10px] tracking-[0.2em] text-[rgba(242,237,228,0.4)] uppercase">
            Signal / Noise
          </div>
        </div>
      )}
    </>
  )
}

export default Navbar
