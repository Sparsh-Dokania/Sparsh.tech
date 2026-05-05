import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const PeerlistWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [cursorDistance, setCursorDistance] = useState(Infinity);
  const widgetRef = useRef(null);

  // Delay appearance (show after 2.5s)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  // Hide while scrolling fast, reappear when stopped
  useEffect(() => {
    let scrollTimer;
    let lastScrollY = window.scrollY;
    
    const handleScroll = () => {
      if (isOpen) return; // Do not hide if the popup is expanded

      const currentScrollY = window.scrollY;
      const scrollDiff = Math.abs(currentScrollY - lastScrollY);
      
      // Only hide if scrolling fast enough
      if (scrollDiff > 10) {
        setIsVisible(false);
      }
      lastScrollY = currentScrollY;

      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(() => {
        setIsVisible(true);
      }, 600); // Reappear after 600ms of no scrolling
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(scrollTimer);
    };
  }, [isOpen]);

  // Handle outside click & ESC key to close
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (widgetRef.current && !widgetRef.current.contains(event.target)) {
        setIsOpen(false);
        setIsHovered(false);
      }
    };

    const handleEsc = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        setIsHovered(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEsc);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen]);

  // Proximity (Magnetic) Effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!widgetRef.current || isOpen) {
        setCursorDistance(Infinity);
        return;
      }
      const rect = widgetRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const distance = Math.sqrt(Math.pow(e.clientX - centerX, 2) + Math.pow(e.clientY - centerY, 2));
      setCursorDistance(distance);
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isOpen]);

  const isExpanded = isOpen;
  const isPreview = isHovered && !isOpen;
  const isNear = cursorDistance < 120 && !isOpen;
  const magneticScale = isNear ? 1.03 : 1;

  // Icons
  const StarIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
    </svg>
  );

  const CloseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18"></line>
      <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
  );

  const ArrowRightIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12"></line>
      <polyline points="12 5 19 12 12 19"></polyline>
    </svg>
  );

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 md:bottom-6 md:right-6 z-[999] flex flex-col items-center md:items-end pointer-events-none">
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="pointer-events-auto"
          >
            {/* Magnetic Wrapper */}
            <motion.div
              animate={{ scale: isExpanded ? 1 : magneticScale }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="relative origin-bottom md:origin-bottom-right"
            >
               {/* Main Widget Container */}
               <motion.div
                 ref={widgetRef}
                 layout
                 onClick={() => !isOpen && setIsOpen(true)}
                 onMouseEnter={() => !isOpen && setIsHovered(true)}
                 onMouseLeave={() => !isOpen && setIsHovered(false)}
                 initial={false}
                 animate={{ 
                   opacity: isOpen ? 1 : 0.8,
                   scale: isOpen ? 1 : 0.96,
                 }}
                 whileHover={!isOpen ? { opacity: 1, scale: 0.98 } : {}}
                 className={`
                   relative overflow-hidden cursor-pointer
                   bg-[rgba(10,10,10,0.75)] border border-[rgba(255,255,255,0.08)]
                   ${isOpen ? 'backdrop-blur-xl' : 'backdrop-blur-lg'}
                   ${isOpen ? 'w-[90vw] max-w-[340px] md:w-[320px] rounded-2xl p-5' : 'w-auto px-4 md:px-5 py-3 rounded-full'}
                 `}
                 style={{ 
                   // Apply subtle glow when near
                   boxShadow: isNear && !isOpen 
                     ? '0 0 20px rgba(200, 255, 0, 0.12), 0 8px 32px rgba(0,0,0,0.4)' 
                     : '0 8px 32px rgba(0,0,0,0.4)'
                 }}
                 transition={{ layout: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } }}
               >
                 {/* Header Row */}
                 <motion.div layout className="flex items-start justify-between">
                   <motion.div layout className="flex items-center gap-3">
                     <motion.div layout className="text-[var(--acid)] shrink-0 mt-0.5 flex items-center justify-center">
                       <StarIcon />
                     </motion.div>
                     
                     <motion.div layout className="flex flex-col justify-center">
                       <motion.div layout="position" className="relative h-[20px] overflow-hidden">
                         <AnimatePresence mode="popLayout">
                           <motion.span
                             key={isOpen ? "support" : "featured"}
                             initial={{ opacity: 0, y: 10 }}
                             animate={{ opacity: 1, y: 0 }}
                             exit={{ opacity: 0, y: -10 }}
                             transition={{ duration: 0.2 }}
                             className="text-sm font-medium text-[var(--white)] block whitespace-nowrap"
                           >
                             {isOpen ? "Support this project" : "Featured on Peerlist"}
                           </motion.span>
                         </AnimatePresence>
                       </motion.div>
                       
                       <AnimatePresence>
                         {(isPreview || isExpanded) && (
                           <motion.p
                             initial={{ opacity: 0, height: 0 }}
                             animate={{ opacity: 1, height: "auto" }}
                             exit={{ opacity: 0, height: 0 }}
                             transition={{ duration: 0.2 }}
                             className={`text-xs text-[var(--white)]/60 overflow-hidden ${isExpanded ? 'mt-1' : 'mt-0.5'}`}
                           >
                             If you liked this portfolio, consider upvoting
                           </motion.p>
                         )}
                       </AnimatePresence>
                     </motion.div>
                   </motion.div>

                   {/* Close Button only in Expanded state */}
                   <AnimatePresence>
                     {isExpanded && (
                       <motion.button
                         initial={{ opacity: 0, scale: 0.8 }}
                         animate={{ opacity: 1, scale: 1 }}
                         exit={{ opacity: 0, scale: 0.8 }}
                         onClick={(e) => {
                           e.stopPropagation();
                           setIsOpen(false);
                           setIsHovered(false);
                         }}
                         className="text-[var(--white)]/40 hover:text-[var(--acid)] transition-colors p-1 shrink-0 ml-2"
                         aria-label="Close"
                       >
                         <CloseIcon />
                       </motion.button>
                     )}
                   </AnimatePresence>
                 </motion.div>

                 {/* Expanded Content: Embed + CTA */}
                 <AnimatePresence>
                   {isExpanded && (
                     <motion.div
                       initial={{ opacity: 0, height: 0, marginTop: 0 }}
                       animate={{ opacity: 1, height: "auto", marginTop: 20 }}
                       exit={{ opacity: 0, height: 0, marginTop: 0 }}
                       transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                       className="overflow-hidden"
                     >
                        <div className="rounded-xl overflow-hidden bg-black/40 p-1.5 border border-white/5 shadow-inner">
                          <a href="https://peerlist.io/sparshdokania/project/sparsh-dokania--portfolio" target="_blank" rel="noreferrer" className="block relative group">
                            <div className="absolute inset-0 bg-[var(--acid)]/0 group-hover:bg-[var(--acid)]/5 transition-colors z-10 pointer-events-none rounded-lg"></div>
                            <img
                              src="https://peerlist.io/api/v1/projects/embed/PRJHOK86K9OJAO7ELIPR6GKLQ7RGBP?showUpvote=true&theme=dark"
                              alt="SPARSH DOKANIA — Portfolio"
                              style={{ width: "100%", height: "auto", display: "block" }}
                              className="rounded-lg"
                            />
                          </a>
                        </div>
                        
                        <a 
                          href="https://peerlist.io/sparshdokania/project/sparsh-dokania--portfolio" 
                          target="_blank" 
                          rel="noreferrer"
                          className="mt-4 flex items-center justify-center gap-2 w-full py-3 rounded-lg bg-[var(--acid)]/10 text-[var(--acid)] hover:bg-[var(--acid)] hover:text-[var(--black)] transition-all duration-300 text-sm font-semibold border border-[var(--acid)]/20"
                        >
                          Open on Peerlist 
                          <ArrowRightIcon />
                        </a>
                     </motion.div>
                   )}
                 </AnimatePresence>
               </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PeerlistWidget;
