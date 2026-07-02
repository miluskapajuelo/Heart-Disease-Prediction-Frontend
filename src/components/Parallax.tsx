"use client";

import { useEffect, useRef, useState } from "react";
import { Box, type BoxProps } from "@chakra-ui/react";

interface ParallaxProps extends BoxProps {
  /** cuánto se mueve respecto al scroll (ej. 0.15 lento, 0.4 marcado; negativo invierte) */
  speed?: number;
}

/**
 * Mueve su contenido verticalmente según su posición relativa al centro del
 * viewport → efecto parallax al hacer scroll. Usa requestAnimationFrame para
 * fluidez. Respeta prefers-reduced-motion.
 */
export function Parallax({ children, speed = 0.15, ...rest }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    let raf = 0;
    const update = () => {
      const rect = el.getBoundingClientRect();
      const viewportCenter = window.innerHeight / 2;
      const elCenter = rect.top + rect.height / 2;
      setOffset((viewportCenter - elCenter) * speed);
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [speed]);

  return (
    <Box ref={ref} style={{ transform: `translate3d(0, ${offset}px, 0)` }} willChange="transform" {...rest}>
      {children}
    </Box>
  );
}
