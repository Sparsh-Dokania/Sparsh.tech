import React, { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { motion, useAnimation } from "framer-motion";

export const SparklesCore = (props) => {
  const {
    id,
    className,
    background = "transparent",
    minSize = 0.4,
    maxSize = 1.4,
    speed = 1.8,
    particleColor = "#C8FF00",
    particleDensity = 120,
  } = props;

  const [init, setInit] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      // Use loadSlim exclusively for optimal portfolio performance
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  useEffect(() => {
    if (init) {
      controls.start({
        opacity: 1,
        transition: {
          duration: 1.5,
          ease: "easeOut",
        },
      });
    }
  }, [init, controls]);

  const [density, setDensity] = useState(particleDensity);

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Fallback density bounding for mobile if parent doesn't override
      if (window.innerWidth < 768) {
        setDensity(Math.min(particleDensity, 75));
      }
    }
  }, [particleDensity]);

  if (!init) {
    return <div className={className} />;
  }

  return (
    <motion.div animate={controls} initial={{ opacity: 0 }} className={className}>
      <Particles
        id={id || "tsparticles"}
        className="h-full w-full"
        options={{
          background: {
            color: {
              value: background,
            },
          },
          fullScreen: {
            enable: false,
            zIndex: 1,
          },
          fpsLimit: 90,
          interactivity: {
            events: {
              onClick: { enable: false },
              onHover: { enable: false },
              resize: true,
            },
          },
          particles: {
            color: {
              // Primary Acid Green, fallback subtle soft white scattered
              value: [particleColor, "rgba(242,237,228,0.55)"],
            },
            move: {
              enable: true,
              direction: "none",
              outModes: {
                default: "out",
              },
              random: true,
              speed: speed,
              straight: false,
            },
            number: {
              density: {
                enable: true,
                width: 400,
                height: 400,
              },
              value: density,
            },
            opacity: {
              value: { min: 0.15, max: 0.65 },
              animation: {
                enable: true,
                speed: 0.4,
                sync: false,
              },
            },
            shape: {
              type: "circle",
            },
            size: {
              value: { min: minSize, max: maxSize },
            },
          },
          detectRetina: true,
        }}
      />
    </motion.div>
  );
};
