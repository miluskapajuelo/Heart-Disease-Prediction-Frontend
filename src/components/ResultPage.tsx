"use client";

import {
  Box,
  Flex,
  Heading,
  HStack,
  Icon,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import {
  AlertTriangle,
  CheckCircle2,
  HeartPulse,
  Info,
  Stethoscope,
} from "lucide-react";
import { RiskPage } from '@/components/RiskPage';
import { Heartbeat } from "@/components/Heartbeat";
import { getRiskTier, RISK_SCALE, type PredictionResult, RISK_HEX } from "@/lib/risk";
import { useEffect } from "react";

export function ResultPanel({ result }: { result: PredictionResult }) {
  const tier = getRiskTier(result.probability);
  const positive = result.prediction === 1;
  const pct = Math.round(result.probability * 100);
  const solid = `${tier.key}.solid`;
  const hex = RISK_HEX[tier.key];


  return (
    <VStack
      className="result-card"
      align="stretch"
      gap={7}
      bg="bg.surface"
      borderRadius="l3"
      border="1px solid"
      borderColor="blackAlpha.100"
      boxShadow="card"
      p={{ base: 6, md: 8 }}
      overflow="hidden"
    >
      <style>{`
        @keyframes riseIn { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes cardIn { from { opacity: 0; transform: scale(0.98) translateY(10px); } to { opacity: 1; transform: scale(1) translateY(0); } }
        .result-card { animation: cardIn .5s cubic-bezier(0.22,1,0.36,1) both; }
        .rise { animation: riseIn .55s ease both; }
        @media (prefers-reduced-motion: reduce) {
          .result-card, .rise { animation: none !important; }
        }
      `}</style>


      <Box className="rise" style={{ animationDelay: "0.05s" }}>
        <Heartbeat color={hex} />
      </Box>

      <VStack className="rise" style={{ animationDelay: "0.12s" }} align="start" gap={1}>
        <Text fontSize="xs" fontWeight="700" letterSpacing="0.12em" textTransform="uppercase" color="fg.muted">
          Your estimate
        </Text>
        <Text fontSize={{ base: "2xl", md: "3xl" }} fontWeight="800" letterSpacing="-0.02em" lineHeight="1.15">
          {tier.headline}
        </Text>
      </VStack>

      <Flex className="rise" style={{ animationDelay: "0.2s" }} direction={{ base: "column", sm: "row" }} align="center" gap={8}>
        <RiskPage probability={result.probability} riskKey={tier.key} />

        <VStack align={{ base: "center", sm: "start" }} gap={3} flex="1">
          <VStack align={{ base: "center", sm: "start" }} gap={0.5}>
            <Text fontSize="xs" color="fg.muted" fontWeight="600" textTransform="uppercase" letterSpacing="0.08em">
              Risk level
            </Text>
            <Text fontSize="4xl" fontWeight="800" letterSpacing="-0.02em" color={solid} lineHeight="1.1">
              {tier.label}
            </Text>
          </VStack>
        </VStack>
      </Flex>


      <Text className="rise" style={{ animationDelay: "0.34s" }} fontSize="sm" color="fg.muted" lineHeight="1.6">
        {tier.interpretation}
      </Text>

      <HStack gap={2} pt={4} borderTop="1px solid" borderColor="blackAlpha.100" align="start">
        <Icon as={Info} boxSize={3.5} color="fg.muted" mt={0.5} />
        <Text fontSize="xs" color="fg.muted" lineHeight="1.5">
          Machine-learning estimate · not a diagnosis · does not replace a qualified healthcare provider.
        </Text>
      </HStack>
    </VStack>
  );
}
