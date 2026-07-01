"use client";

import { useEffect, useState } from "react";
import { Box, Text, VStack } from "@chakra-ui/react";
import type { RiskKey } from '../lib/risk'

const COLORS: Record<RiskKey, string> = {
  riskLow: "#10B981",
  riskModerate: "#F59E0B",
  riskHigh: "#F97316",
  riskCritical: "#E04F5F",
};

interface RiskGaugeProps {
  probability: number; // 0..1
  riskKey: RiskKey;
  label?: string;
}

/**
 * Gauge circular (anillo de 270°) dibujado en SVG puro — sin dependencias.
 * Anima el llenado al montar. Accesible vía role="img" + aria-label.
 */
export function RiskPage({ probability, riskKey }: RiskGaugeProps) {
  const size = 240;
  const stroke = 18;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const arcFraction = 0.75; // 270° visible
  const arcLength = circumference * arcFraction;
  const pct = Math.round(probability * 100);
  const color = COLORS[riskKey];

  // Animación: empieza vacío y se llena al valor real.
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setProgress(probability), 120);
    return () => clearTimeout(t);
  }, [probability]);

  const dash = arcLength * progress;
  const gap = circumference - dash;

  return (
    <VStack gap={1}>
      <Box
        position="relative"
        w={`${size}px`}
        h={`${size}px`}
        role="img"
        // aria-label={`Estimated risk ${label}, probability ${pct} percent`}
      >
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          // Rota para que el hueco de 90° quede abajo y centrado.
          style={{ transform: "rotate(135deg)" }}
        >
          {/* Pista de fondo */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="#EAEFF6"
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={`${arcLength} ${circumference - arcLength}`}
          />
          {/* Progreso */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={`${dash} ${gap}`}
            style={{ transition: "stroke-dasharray 1.1s cubic-bezier(0.22,1,0.36,1)" }}
          />
        </svg>
        {/* Texto central */}
        <VStack
          position="absolute"
          inset={0}
          justify="center"
          gap={0}
        >
          <Text fontSize="5xl" fontWeight="800" lineHeight="1" color="fg">
            {pct}%
          </Text>
          <Text fontSize="sm" color="fg.muted" fontWeight="500">
            probability
          </Text>
        </VStack>
      </Box>
    </VStack>
  );
}
