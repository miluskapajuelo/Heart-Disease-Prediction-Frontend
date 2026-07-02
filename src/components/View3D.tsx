"use client";

import { useRef, useState } from "react";
import { Box, type BoxProps } from "@chakra-ui/react";

interface Tilt3DProps extends BoxProps {
  /** inclinación máxima en grados */
  max?: number;
}

/**
 * Efecto 3D: la tarjeta se inclina siguiendo el cursor (rotateX/rotateY con
 * perspectiva) y muestra un "glare" (reflejo) que sigue al mouse.
 * Respeta prefers-reduced-motion (se desactiva).
 */
export function Tilt3D({ children, max = 10, ...rest }: Tilt3DProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [t, setT] = useState({ rx: 0, ry: 0, gx: 50, gy: 50, active: false });

  const reduce = () =>
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el || reduce()) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width; // 0..1
    const py = (e.clientY - r.top) / r.height; // 0..1
    setT({
      rx: -(py - 0.5) * max * 2,
      ry: (px - 0.5) * max * 2,
      gx: px * 100,
      gy: py * 100,
      active: true,
    });
  };

  const onLeave = () => setT({ rx: 0, ry: 0, gx: 50, gy: 50, active: false });

  return (
    <Box
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      position="relative"
      style={{
        transform: `perspective(900px) rotateX(${t.rx}deg) rotateY(${t.ry}deg) scale(${t.active ? 1.03 : 1})`,
        transition: t.active ? "transform 0.08s ease-out" : "transform 0.5s cubic-bezier(0.22,1,0.36,1)",
        willChange: "transform",
      }}
      {...rest}
    >
      {children}

      {/* Reflejo que sigue al cursor */}
      <Box
        position="absolute"
        inset={0}
        pointerEvents="none"
        borderRadius="inherit"
        style={{
          background: `radial-gradient(circle at ${t.gx}% ${t.gy}%, rgba(255,255,255,0.4), transparent 45%)`,
          opacity: t.active ? 1 : 0,
          transition: "opacity 0.3s ease",
          mixBlendMode: "soft-light",
        }}
      />
    </Box>
  );
}
