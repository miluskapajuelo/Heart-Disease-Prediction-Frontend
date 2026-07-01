"use client";

import { Box, Flex, Icon } from "@chakra-ui/react";
import { Heart } from "lucide-react";

/**
 * Monitor de latido en vivo: una línea ECG con un "pulso" que viaja
 * continuamente (como un monitor cardíaco real) + un corazón que late.
 * Aporta movimiento y calidez sin imágenes externas.
 * Respeta prefers-reduced-motion.
 */
export function Heartbeat({ color }: { color: string }) {
  const ecg =
    "0,32 30,32 45,32 52,10 60,54 68,32 92,32 128,32 144,32 151,12 159,50 167,32 200,32 250,32 266,32 273,10 281,54 289,32 320,32";

  return (
    <Flex align="center" gap={4} w="full">
      <style>{`
        @keyframes ecgScan { from { stroke-dashoffset: 0; } to { stroke-dashoffset: -1046; } }
        @keyframes beat {
          0%, 100% { transform: scale(1); }
          12% { transform: scale(1.18); }
          24% { transform: scale(1); }
          36% { transform: scale(1.10); }
          50% { transform: scale(1); }
        }
        @media (prefers-reduced-motion: reduce) {
          .ecg-scan { animation: none !important; opacity: 0.8 !important; }
          .heart-beat { animation: none !important; }
        }
      `}</style>

      <Box flex="1" minW={0}>
        <Box as="svg" w="full" h="56px" asChild >
          <svg viewBox="0 0 320 64" preserveAspectRatio="none">
          <polyline
            points={ecg}
            fill="none"
            stroke={color}
            strokeOpacity={0.18}
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Pulso que viaja */}
          <polyline
            className="ecg-scan"
            points={ecg}
            fill="none"
            stroke={color}
            strokeWidth={3}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="26 1020"
            style={{ animation: "ecgScan 2.6s linear infinite" }}
          />
           </svg>
        </Box>
      </Box>

      <Box
        className="heart-beat"
        color={color}
        style={{ animation: "beat 1.4s ease-in-out infinite", transformOrigin: "center" }}
        lineHeight="0"
      >
        <Icon as={Heart} boxSize={7} fill="currentColor" />
      </Box>
    </Flex>
  );
}
