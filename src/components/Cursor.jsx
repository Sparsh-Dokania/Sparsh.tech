function Cursor() {
  return (
    <>
      <div
        id="cursor"
        className="fixed w-3 h-3 bg-[var(--acid)] rounded-full pointer-events-none z-[9999] [mix-blend-mode:difference]"
        style={{
          transform: 'translate(-50%, -50%)',
          transition: 'transform 0.08s ease, width 0.2s ease, height 0.2s ease, background 0.2s ease',
        }}
      ></div>
      <div
        id="cursor-ring"
        className="fixed w-10 h-10 rounded-full pointer-events-none z-[9998] border border-[rgba(200,255,0,0.4)]"
        style={{ transform: 'translate(-50%, -50%)', transition: 'all 0.18s ease' }}
      ></div>
    </>
  )
}

export default Cursor
