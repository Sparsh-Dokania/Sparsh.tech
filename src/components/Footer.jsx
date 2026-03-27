function Footer() {
  return (
    <footer className="py-8 px-10 border-t border-t-[rgba(200,255,0,0.08)] flex justify-between items-center max-[768px]:flex-col max-[768px]:gap-2 max-[768px]:text-center">
      <div className="text-[10px] text-[rgba(242,237,228,0.2)] tracking-[0.1em]">
        © 2025 Your Name — All rights reserved
      </div>
      <div className="text-[10px] text-[rgba(242,237,228,0.2)] tracking-[0.08em]">
        Built with <span className="text-[var(--acid)]">precision</span> · Signal/Noise
      </div>
    </footer>
  )
}

export default Footer
