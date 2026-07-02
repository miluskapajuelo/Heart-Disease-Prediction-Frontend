"use client";

import { Box } from "@chakra-ui/react";


export function AuroraBackground() {
  return (
    <Box aria-hidden position="absolute" inset={0} zIndex={0} pointerEvents="none" overflow="hidden">
      <style>{`
        .aurora-base {
          position:absolute; inset:-20%;
          background: linear-gradient(120deg,
            #DCEBFF 0%, #CFF6FF 28%, #e8f6f2 52%, #bacaef 76%, #eaecef 100%);
          background-size: 300% 300%;
          animation: auroraShift 4s ease-in-out infinite;
        }
        .aurora-blob { position:absolute; border-radius:9999px; filter: blur(60px); }
        .ab1 { width:46vw; height:46vw; max-width:560px; max-height:560px;
               background: radial-gradient(circle, rgba(76,154,240,.45), transparent 66%);
               top:-8%; left:-6%; animation: drift1 19s ease-in-out infinite; }
        .ab2 { width:40vw; height:40vw; max-width:480px; max-height:480px;
               background: radial-gradient(circle, rgba(34,211,238,.38), transparent 66%);
               top:6%; right:-8%; animation: drift2 24s ease-in-out infinite; }
        .ab3 { width:44vw; height:44vw; max-width:520px; max-height:520px;
               background: radial-gradient(circle, rgba(45,212,191,.34), transparent 68%);
               bottom:-18%; left:32%; animation: drift3 21s ease-in-out infinite; }

        @keyframes auroraShift {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes drift1 {0%,100%{transform:translate(0,0) scale(1)}50%{transform:translate(6%,4%) scale(1.08)}}
        @keyframes drift2 {0%,100%{transform:translate(0,0) scale(1)}50%{transform:translate(-5%,6%) scale(1.1)}}
        @keyframes drift3 {0%,100%{transform:translate(0,0) scale(1)}50%{transform:translate(4%,-5%) scale(1.06)}}

        @media (prefers-reduced-motion: reduce) {
          .aurora-base, .aurora-blob { animation: none !important; }
        }
      `}</style>

      <Box className="aurora-base" />
      <Box className="aurora-blob ab1" />
      <Box className="aurora-blob ab2" />
      <Box className="aurora-blob ab3" />

      {/* Velo blanco para que el texto oscuro siempre tenga contraste (accesibilidad) */}
      <Box position="absolute" inset={0} bg="whiteAlpha.400" />
    </Box>
  );
}
