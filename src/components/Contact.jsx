function Contact() {
  return (
    <section
      id="contact"
      className="py-[120px] px-10 relative border-t border-t-[rgba(200,255,0,0.12)] min-h-[80vh] flex flex-col justify-center max-[768px]:py-20 max-[768px]:px-5"
    >
      <div className="[font-family:var(--mono)] text-[10px] tracking-[0.25em] uppercase text-[var(--acid)] mb-4 flex items-center gap-3 before:content-[''] before:w-6 before:h-px before:bg-[var(--acid)]">
        Let&apos;s build something that stands out.
      </div>
      <div className="reveal [font-family:var(--syne)] font-extrabold [font-size:clamp(48px,9vw,120px)] leading-[0.9] tracking-[-0.04em] mb-12 [&_em]:[font-family:var(--serif)] [&_em]:italic [&_em]:font-normal [&_em]:text-[var(--acid)] [&_em]:block">
        Let&apos;s build
        <br />
        <em>something wild.</em>
      </div>
      <div className="reveal reveal-delay-1 flex gap-0.5 max-[768px]:flex-col">
        <a
          className="inline-flex items-center gap-2.5 py-4 px-7 bg-transparent border border-[rgba(200,255,0,0.2)] text-[var(--white)] no-underline [font-family:var(--mono)] text-[11px] tracking-[0.15em] uppercase relative overflow-hidden before:content-[''] before:absolute before:inset-0 before:bg-[var(--acid)] before:scale-x-0 before:origin-left before:z-0 before:transition-transform before:duration-300 before:ease-[cubic-bezier(0.16,1,0.3,1)] hover:before:scale-x-100 hover:text-[var(--black)] hover:border-[var(--acid)]"
          href="mailto:sparshdokaniaofficial@gmail.com"
        >
          <span className="relative z-[1]">✉ sparshdokaniaofficial@gmail.com</span>
        </a>
        <a
          className="inline-flex items-center gap-2.5 py-4 px-7 bg-transparent border border-[rgba(200,255,0,0.2)] text-[var(--white)] no-underline [font-family:var(--mono)] text-[11px] tracking-[0.15em] uppercase relative overflow-hidden before:content-[''] before:absolute before:inset-0 before:bg-[var(--acid)] before:scale-x-0 before:origin-left before:z-0 before:transition-transform before:duration-300 before:ease-[cubic-bezier(0.16,1,0.3,1)] hover:before:scale-x-100 hover:text-[var(--black)] hover:border-[var(--acid)]"
          href="https://www.linkedin.com/in/sparshdokania"
          target="_blank"
          rel="noopener"
        >
          <span className="relative z-[1]">↗ LinkedIn</span>
        </a>
        <a
          className="inline-flex items-center gap-2.5 py-4 px-7 bg-transparent border border-[rgba(200,255,0,0.2)] text-[var(--white)] no-underline [font-family:var(--mono)] text-[11px] tracking-[0.15em] uppercase relative overflow-hidden before:content-[''] before:absolute before:inset-0 before:bg-[var(--acid)] before:scale-x-0 before:origin-left before:z-0 before:transition-transform before:duration-300 before:ease-[cubic-bezier(0.16,1,0.3,1)] hover:before:scale-x-100 hover:text-[var(--black)] hover:border-[var(--acid)]"
          href="https://github.com/Sparsh-Dokania"
          target="_blank"
          rel="noopener"
        >
          <span className="relative z-[1]">↗ GitHub</span>
        </a>
        <a
          className="inline-flex items-center gap-2.5 py-4 px-7 bg-transparent border border-[rgba(200,255,0,0.2)] text-[var(--white)] no-underline [font-family:var(--mono)] text-[11px] tracking-[0.15em] uppercase relative overflow-hidden before:content-[''] before:absolute before:inset-0 before:bg-[var(--acid)] before:scale-x-0 before:origin-left before:z-0 before:transition-transform before:duration-300 before:ease-[cubic-bezier(0.16,1,0.3,1)] hover:before:scale-x-100 hover:text-[var(--black)] hover:border-[var(--acid)]"
          href="#"
          target="_blank"
          rel="noopener"
        >
          <span className="relative z-[1]">↓ Résumé</span>
        </a>
      </div>
    </section>
  )
}

export default Contact
