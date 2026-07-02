"use client";

import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  HStack,
  Icon,
  Image,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import NextLink from "next/link";
import {
  Activity,
  ArrowRight,
  BrainCircuit,
  ClipboardList,
  Database,
  HeartPulse,
  Lock,
  ShieldCheck,
  Stethoscope,
  Zap,
} from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { Heartbeat } from "@/components/Heartbeat";
import { AuroraBackground } from "@/components/AuroraBackground";
import { Reveal } from "@/components/Reveal";
import { Parallax } from "@/components/Parallax";
import { Tilt3D } from "@/components/View3D";


const STEPS = [
  {
    icon: ClipboardList,
    title: "Complete patient information",
    body: "Enter routine clinical measurements — the same data a cardiology workup already collects.",
  },
  {
    icon: BrainCircuit,
    title: "Machine learning analyzes the data",
    body: "A validated model weighs the inputs against patterns learned from clinical records.",
  },
  {
    icon: HeartPulse,
    title: "Receive a cardiovascular risk estimate",
    body: "Get a clear, interpretable probability with context — never a diagnosis.",
  },
];

const TRUST = [
  {
    icon: Database,
    title: "Medical data driven",
    body: "Built on real clinical variables used in cardiology assessments.",
  },
  {
    icon: BrainCircuit,
    title: "Machine learning",
    body: "A rigorously evaluated model with cross-validated performance.",
  },
  {
    icon: Zap,
    title: "Fast prediction",
    body: "Results in moments, right when the conversation is happening.",
  },
  {
    icon: Lock,
    title: "Secure information",
    body: "Inputs are used only to compute your estimate.",
  },
  {
    icon: ShieldCheck,
    title: "Evidence based",
    body: "Grounded in established cardiovascular risk factors.",
  },
];

// 👇 Agrega estas imágenes en public/images/ (o cambia las rutas)
const CARE_IMAGES = [
  {
    src: "/figures/care-1.png",
    alt: "A doctor reviewing heart results with a patient",
    speed: 0.20,
    h: "240px",

  },
  {
    src: "/figures/care-2.png",
    alt: "Stethoscope and heart-rate reading",
    speed: 0.24,
    h: "200px",
  },
  {
    src: "/figures/care-2.png",
    alt: "A person enjoying a healthy, active lifestyle",
    speed: -0.20,
    h: "240px",
  },
];

export default function Home() {
  return (
    <Box minH="100vh">
      <SiteHeader />
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        minH={{ base: "auto", lg: "calc(100dvh - 64px)" }}
      >
        <AuroraBackground />
        <Container
          maxW="1420px"
          px={{ base: 5, md: 8 }}
          py={{ base: 16, md: 24 }}
          position="relative"
          zIndex={1}
        >
          <Flex
            direction={{ base: "column", lg: "row" }}
            align="center"
            gap={{ base: 12, lg: 16 }}
          >
            <VStack align="start" gap={6} flex="1">
              <Heading
                as="h1"
                fontSize={{ base: "5xl", md: "7xl" }}
                lineHeight="1.0"
                letterSpacing="-0.04em"
                fontWeight="800"
              >
                Your heart,{" "}
                <Box
                  as="span"
                  bgGradient="to-r"
                  gradientFrom="brand.500"
                  gradientTo="cyan.500"
                  bgClip="text"
                >
                  understood.
                </Box>
              </Heading>

              <Text
                fontSize={{ base: "lg", md: "xl" }}
                color="fg.muted"
                maxW="520px"
              >
                A friendly machine-learning tool that turns routine measurements
                into a clear cardiovascular risk estimate.
              </Text>

              <HStack gap={3} pt={2} wrap="wrap">
                <Button
                  asChild
                  size="xl"
                  colorPalette="brand"
                  borderRadius="l2"
                  px={8}
                >
                  <NextLink href="/calculator">
                    Calculate Risk
                    <Icon as={ArrowRight} boxSize={5} />
                  </NextLink>
                </Button>
                <Button
                  asChild
                  size="xl"
                  variant="ghost"
                  colorPalette="brand"
                  borderRadius="l2"
                >
                  <NextLink href="/research">Explore the research</NextLink>
                </Button>
              </HStack>
            </VStack>

            <Box flex="1" w="full" maxW="480px">
              <HeroVisual />
            </Box>
          </Flex>
        </Container>
      </Box>

      <Container
        maxW="1420px"
        px={{ base: 5, md: 8 }}
        // py={{ base: 16, md: 24 }}
        minH={{ base: "auto", lg: "calc(70dvh - 64px)" }}
      >
        <Flex
          direction={{ base: "column", lg: "row" }}
          gap={{ base: 12, lg: 16 }}
          align="start"
        >
          <VStack flex="1" align="start" gap={6} w="full">
            <Reveal>
              <VStack align="start" gap={3}>
                <Text
                  color="brand.600"
                  fontWeight="700"
                  letterSpacing="0.04em"
                  textTransform="uppercase"
                  fontSize="sm"
                >
                  How it works
                </Text>
                <Heading
                  fontSize={{ base: "3xl", md: "4xl" }}
                  letterSpacing="-0.02em"
                >
                  Three simple steps
                </Heading>
              </VStack>
            </Reveal>

            <VStack align="stretch" gap={4} w="full">
              {STEPS.map((s, i) => (
                <Reveal key={s.title} delay={i * 120}>
                  <HStack
                    align="start"
                    gap={4}
                    bg="bg.surface"
                    p={6}
                    borderRadius="l2"
                    boxShadow="card"
                  >
                    <Flex
                      flexShrink={0}
                      w="48px"
                      h="48px"
                      align="center"
                      justify="center"
                      bg="brand.subtle"
                      color="brand.600"
                      borderRadius="l1"
                    >
                      <Icon as={s.icon} boxSize={6} />
                    </Flex>
                    <VStack align="start" gap={1}>
                      <Text fontSize="xs" fontWeight="700" color="brand.400">
                        Step {i + 1}
                      </Text>
                      <Heading as="h3" fontSize="lg" letterSpacing="-0.01em">
                        {s.title}
                      </Heading>
                      <Text fontSize="sm" color="fg.muted">
                        {s.body}
                      </Text>
                    </VStack>
                  </HStack>
                </Reveal>
              ))}
            </VStack>
          </VStack>
          <Box flex="1" w="full">
            <SimpleGrid columns={2} gap={4} pt={{ base: 0, md: 20 }}>
              <VStack gap={4}>
                <Parallax speed={CARE_IMAGES[0].speed} w="full">
                  <ImageCard {...CARE_IMAGES[0]} />
                </Parallax>
              </VStack>
              <VStack gap={4} pt={{ base: 0, md: 12 }}>
                <Parallax speed={CARE_IMAGES[2].speed} w="full">
                  <ImageCard {...CARE_IMAGES[2]} />
                </Parallax>
              </VStack>
              
            </SimpleGrid>
          </Box>
        </Flex>
      </Container>
      <Box
      >
        <Container
          maxW="1420px"
          px={{ base: 5, md: 8 }}
          py={{ base: 16, md: 40 }}
        >
          <Reveal>
            <VStack gap={3} mb={12} >
              <Text
                color="brand.600"
                fontWeight="700"
                letterSpacing="0.04em"
                textTransform="uppercase"
                fontSize="sm"
              >
                More
              </Text>
              <Heading
                fontSize={{ base: "2xl", md: "4xl" }}
                letterSpacing="-0.02em"
              >
                Designed for humans
              </Heading>
            </VStack>
          </Reveal>

          <SimpleGrid columns={{ base: 1, sm: 2, lg: 3 }} gap={6}>
            {TRUST.map((t, i) => (
              <Reveal key={t.title} delay={i * 100}>
                <HStack
                  align="start"
                  gap={4}
                  bg="bg.surface"
                  p={6}
                  borderRadius="l2"
                  boxShadow="card"
                  h="full"
                >
                  <Flex
                    flexShrink={0}
                    w="44px"
                    h="44px"
                    align="center"
                    justify="center"
                    bg="brand.subtle"
                    color="brand.600"
                    borderRadius="l1"
                  >
                    <Icon as={t.icon} boxSize={5} />
                  </Flex>
                  <VStack align="start" gap={1}>
                    <Heading as="h3" fontSize="md">
                      {t.title}
                    </Heading>
                    <Text fontSize="sm" color="fg.muted">
                      {t.body}
                    </Text>
                  </VStack>
                </HStack>
              </Reveal>
            ))}
          </SimpleGrid>
        </Container>
      </Box>

      <Container
        maxW="1420px"
        px={{ base: 5, md: 8 }}
        py={{ base: 16, md: 24 }}
      >
        <Reveal>
          <VStack
            bg="brand.700"
            color="white"
            borderRadius="l3"
            p={{ base: 8, md: 12 }}
            gap={5}
            textAlign="center"
          >
            <Heading
              fontSize={{ base: "2xl", md: "3xl" }}
              letterSpacing="-0.02em"
            >
              Ready to estimate cardiovascular risk?
            </Heading>
            <Text color="brand.100" maxW="560px">
              Takes about a minute. Remember: this is a research and educational
              tool, results are an estimate and do not replace professional
              medical evaluation.
            </Text>
            <Button
              asChild
              size="xl"
              bg="white"
              color="brand.700"
              borderRadius="l2"
              px={8}
              _hover={{ bg: "brand.50" }}
            >
              <NextLink href="/calculator">
                Open the Risk Calculator
                <Icon as={ArrowRight} boxSize={5} />
              </NextLink>
            </Button>
          </VStack>
        </Reveal>
      </Container>

      <Box
        as="footer"
        borderTop="1px solid"
        borderColor="blackAlpha.100"
        py={6}
      >
        <Container maxW="1420px" px={{ base: 5, md: 8 }}>
          <Text fontSize="xs" color="fg.muted" textAlign="center">
            CardioPredictor is a machine-learning research tool and is not a
            medical device. It does not provide a diagnosis.
          </Text>
        </Container>
      </Box>
    </Box>
  );
}


function ImageCard({ src, alt, h }: { src: string; alt: string; h: string }) {
  return (
     <Tilt3D w="full" h={h} borderRadius="l2" overflow="hidden" boxShadow="cardHover" bg="brand.100">
       <Image src={src} alt={alt} w="full" h="full" objectFit="cover" />
    <Box
        position="absolute"
        inset={0}
        pointerEvents="none"
        bgGradient="to-br"
        gradientFrom="whiteAlpha.500"
        gradientTo="transparent"
      />
     
    </Tilt3D>
  );
}

function HeroVisual() {
  return (
    <Box
      bg="bg.surface"
      borderRadius="l3"
      boxShadow="cardHover"
      p={7}
      position="relative"
      overflow="hidden"
    >
      <Flex justify="space-between" align="center" mb={4}>
        <HStack gap={2} color="brand.600">
          <Icon as={Activity} boxSize={5} />
          <Text fontWeight="700">Live signal</Text>
        </HStack>
      </Flex>

      <Heartbeat color="#1F6FCB" />

      <SimpleGrid columns={3} gap={3} mt={5}>
        {[
          { k: "Inputs", v: "13", c: "brand" },
          { k: "ROC-AUC", v: "0.90", c: "brand" },
          { k: "Latency", v: "<1s", c: "brand" },
        ].map((m) => (
          <VStack key={m.k} gap={0} bg={`${m.c}.50`} borderRadius="l1" py={3}>
            <Text fontSize="2xl" fontWeight="800" color={`${m.c}.700`}>
              {m.v}
            </Text>
            <Text fontSize="xs" color="fg.muted" fontWeight="600">
              {m.k}
            </Text>
          </VStack>
        ))}
      </SimpleGrid>
    </Box>
  );
}
