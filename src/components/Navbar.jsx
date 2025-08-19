function Navbar() {
  return (
   <nav className="text-sm no-underline text-[#1a1a1a] w-full h-16 overflow-hidden">
    <div className="nav-col">
      <div className="nav-items">
        <a href="#" className="text-sm no-underline text-[#1a1a1a] hover:text-[#333333] transition-colors">Sparsh</a>
      </div>
      <div className="nav-items">
        <p className="text-sm text-[#1a1a1a]">Digital studio</p>
      </div>
    </div>
    <div className="nav-col">
      <div className="nav-items">
        <a href="#" className="text-sm no-underline text-[#1a1a1a] hover:text-[#333333] transition-colors">works</a>
        <a href="#" className="text-sm no-underline text-[#1a1a1a] hover:text-[#333333] transition-colors">studio</a>
        <a href="#" className="text-sm no-underline text-[#1a1a1a] hover:text-[#333333] transition-colors">contact</a>
      </div>
      <div className="nav-items">
        <a href="#" className="text-sm no-underline text-[#1a1a1a] hover:text-[#333333] transition-colors">twitter</a>
        <a href="#" className="text-sm no-underline text-[#1a1a1a] hover:text-[#333333] transition-colors">linkedin</a>
      </div>
      <div className="nav-items">
        <p className="text-sm text-[#1a1a1a]">India, co</p>
      </div>
    </div>
   </nav>
  );
}

export default Navbar;