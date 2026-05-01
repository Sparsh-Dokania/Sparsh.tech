import { motion, useReducedMotion } from "framer-motion";
import { createElement, useMemo } from "react";

const MotionSpan = motion.span;

function TextReveal({
  as: Element = "p",
  children,
  className = "",
  delay = 0,
  stagger = 0.02,
  offset = 14,
}) {
  const shouldReduceMotion = useReducedMotion();
  const text = String(children ?? "");
  const tokens = useMemo(() => text.match(/\S+|\s+/g) ?? [], [text]);
  let wordIndex = -1;

  return createElement(
    Element,
    { className, "aria-label": text },
    tokens.map((token, index) => {
      if (/^\s+$/.test(token)) {
        return token;
      }

      wordIndex += 1;

      return createElement(
        MotionSpan,
        {
          key: `${token}-${index}`,
          "aria-hidden": true,
          className: "inline-block will-change-[transform,filter,opacity]",
          initial: shouldReduceMotion
            ? { opacity: 1 }
            : { opacity: 0, y: offset, filter: "blur(10px)" },
          whileInView: shouldReduceMotion
            ? { opacity: 1 }
            : { opacity: 1, y: 0, filter: "blur(0px)" },
          viewport: { amount: 0.35 },
          transition: {
            duration: shouldReduceMotion ? 0 : 0.55,
            delay: shouldReduceMotion ? 0 : delay + wordIndex * stagger,
            ease: [0.16, 1, 0.3, 1],
          },
        },
        token,
      );
    }),
  );
}

export default TextReveal;
