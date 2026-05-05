import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const PeerlistWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const popupRef = useRef(null);

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
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    const handleEsc = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false);
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
    <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-[999] flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={popupRef}
            initial={{ opacity: 0, scale: 0.9, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 15 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="w-[calc(100vw-32px)] md:w-[320px] mb-4 p-5 rounded-2xl bg-[var(--black)]/85 backdrop-blur-xl border border-white/10 shadow-[0_12px_40px_rgba(0,0,0,0.6)] overflow-hidden"
          >
            <div className="flex justify-between items-start mb-5">
              <div>
                <h3 className="text-[var(--white)] font-bold text-sm">Support this project</h3>
                <p className="text-[var(--white)]/60 text-xs mt-1.5 leading-relaxed pr-4">If you liked this portfolio, consider upvoting</p>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-[var(--white)]/40 hover:text-[var(--acid)] transition-colors p-1"
                aria-label="Close"
              >
                <CloseIcon />
              </button>
            </div>
            
            <div className="rounded-xl overflow-hidden bg-black/40 p-1.5 border border-white/5 shadow-inner">
              <a href="https://peerlist.io/sparshdokania/project/sparsh-dokania--portfolio" target="_blank" rel="noreferrer" className="block relative group">
                <div className="absolute inset-0 bg-[var(--acid)]/0 group-hover:bg-[var(--acid)]/5 transition-colors z-10 pointer-events-none rounded-lg"></div>
                <img
                  src="https://peerlist.io/api/v1/projects/embed/PRJHOK86K9OJAO7ELIPR6GKLQ7RGBP?showUpvote=true&theme=dark"
                  alt="SPARSH DOKANIA — Portfolio"
                  style={{ width: "100%", height: "auto" }}
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

      <AnimatePresence>
        {isVisible && !isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.div
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <motion.button
                onClick={() => setIsOpen(true)}
                initial={{ opacity: 0.85, scale: 1 }}
                whileHover={{ opacity: 1, scale: 1.05, y: -2 }}
                transition={{ duration: 0.2 }}
                className="flex items-center gap-2.5 px-4 md:px-5 py-3 rounded-full bg-[var(--black)]/80 backdrop-blur-md border border-white/10 text-[var(--white)] shadow-lg group hover:border-[var(--acid)]/30 hover:shadow-[0_4px_24px_rgba(200,255,0,0.15)] relative overflow-hidden cursor-none"
              >
                {/* Subtle continuous shimmer */}
                <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-transparent via-[var(--acid)]/10 to-transparent -translate-x-full group-hover:animate-shimmer"></div>
                
                <div className="relative z-10 text-[var(--acid)] animate-pulse-slow">
                  <StarIcon />
                </div>
                <span className="relative z-10 text-xs md:text-sm font-medium tracking-wide">Featured on Peerlist</span>
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PeerlistWidget;
