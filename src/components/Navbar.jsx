function Navbar() {
  const navLinkClass =
    "[font-family:var(--mono)] text-[11px] tracking-[0.15em] uppercase text-[rgba(242,237,228,0.5)] no-underline relative transition-colors duration-200 after:content-[''] after:absolute after:left-0 after:bottom-[-3px] after:w-0 after:h-px after:bg-[var(--acid)] after:transition-all after:duration-200 hover:text-[var(--acid)] hover:after:w-full"

  return (
    <nav className="fixed top-7 left-0 right-0 z-[99] flex items-center justify-between py-[18px] px-10 max-[768px]:py-[14px] max-[768px]:px-5">
      <a
        className="relative [font-family:var(--syne)] font-extrabold text-[15px] tracking-[0.12em] text-[var(--acid)] no-underline before:content-[attr(data-text)] after:content-[attr(data-text)] before:absolute after:absolute before:top-0 after:top-0 before:left-0 after:left-0 before:text-[var(--acid)] after:text-[var(--acid)] before:opacity-0 after:opacity-0 hover:before:opacity-80 hover:before:text-[var(--red)] hover:before:animate-[glitch-1_0.3s_steps(2)_3] hover:after:opacity-80 hover:after:text-[var(--acid)] hover:after:animate-[glitch-2_0.3s_steps(2)_3]"
        href="#hero"
        data-text="SN/"
      >
        SD/
      </a>
      <ul className="flex gap-8 list-none max-[768px]:hidden">
        <li>
          <a className={navLinkClass} href="#about">
            About
          </a>
        </li>
        <li>
          <a className={navLinkClass} href="#work">
            Work
          </a>
        </li>
        <li>
          <a className={navLinkClass} href="#experience">
            Experience
          </a>
        </li>
        <li>
          <a className={navLinkClass} href="#contact">
            Contact
          </a>
        </li>
      </ul>
      <div className="flex items-center gap-[7px] text-[10px] tracking-[0.12em] text-[rgba(242,237,228,0.4)] uppercase">
        <span className="w-1.5 h-1.5 rounded-full bg-[var(--acid)] animate-[pulse_2s_ease-in-out_infinite]"></span>
        Available · 2026
      </div>
    </nav>
  )
}

export default Navbar
