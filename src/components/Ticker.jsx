const signals = [
  'SIGNAL: INTERFACES THAT RESPOND',
  'STATUS: AVAILABLE',
  'MODE: BUILDING IN MOTION',
  'SYSTEM: SIGNAL OVER NOISE',
  'OUTPUT: REAL-TIME INTERFACES',
  'FOCUS: PERFORMANCE × EXPERIENCE',
]

const loopedSignals = [...signals, ...signals]
const separator = '\u2726'

function Ticker() {
  return (
    <div
      className="hover:scale-[1.01]
transition-transform duration-300 group fixed top-0 left-0 right-0 z-[100] flex h-7 items-center overflow-hidden bg-[var(--acid)] max-[768px]:h-6 "
      aria-hidden="true " 
    >
      <div className="pointer-events-none absolute inset-0 opacity-[0.08] mix-blend-overlay bg-[url('/noise.png')]" />
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-[var(--acid)] via-[var(--acid)]/80 to-transparent backdrop-blur-[2px]" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-[var(--acid)] via-[var(--acid)]/80 to-transparent backdrop-blur-[2px]" />

      <div className="flex min-w-max shrink-0 whitespace-nowrap will-change-transform animate-[ticker_22s_cubic-bezier(0.4,0,0.2,1)_infinite] hover:[animation-play-state:paused] ">
        {loopedSignals.map((signal, index) => (
          <span
            key={`${signal}-${index}`}
            className="group inline-flex items-center px-6 [font-family:var(--mono)] text-[10px] font-bold uppercase tracking-[0.15em] text-[var(--black)] max-[768px]:text-[9px]"
          >
            <span className="opacity-95 transition-transform duration-300 group-hover:translate-y-[-1px]">
              {signal}
            </span>
            <span className="mx-3 text-[9px] opacity-45 max-[768px]:text-[8px]">{separator}</span>
          </span>
        ))}
      </div>
    </div>
  )
}

export default Ticker
