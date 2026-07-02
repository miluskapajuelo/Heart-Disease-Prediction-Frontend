"use client";

import { useEffect, useRef, useState } from "react";
import { Box, type BoxProps } from "@chakra-ui/react";

interface RevealProps extends BoxProps {
  /** retraso en ms para escalonar (stagger) */
  delay?: number;
  /** desplazamiento inicial en px */
  y?: number;
}

/**
 * Revela su contenido cuando entra en el viewport (IntersectionObserver):
 * fade + slide-up. Se dispara una sola vez. Respeta prefers-reduced-motion.
 */
export function Reveal({ children, delay = 0, y = 24, ...rest }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setVisible(true);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setVisible(true);
            io.disconnect();
          }
        });
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Box
      ref={ref}
      opacity={visible ? 1 : 0}
      transform={visible ? "translateY(0)" : `translateY(${y}px)`}
      transition="opacity 0.7s ease, transform 0.7s cubic-bezier(0.22,1,0.36,1)"
      style={{ transitionDelay: `${delay}ms` }}
      {...rest}
    >
      {children}
    </Box>
  );
}
