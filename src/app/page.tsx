"use client";
import {
  chakra,
 Box,
  Button,
  Container,
  Flex,
  Heading,
  HStack,
  Icon,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import NextLink from "next/link";
import {
  Activity,
  ArrowRight,
  HeartPulse,
} from "lucide-react";
import {SiteHeader} from './../components/SiteHeader'


export default function Home() {

  return (
    <Box minH="100vh">
      <SiteHeader />
     
      <Box
        bgGradient="to-b"
        gradientFrom="brand.50"
        gradientTo="bg.canvas"
      >
        <Container maxW="1120px" px={{base: 5, md: 8}} py={{base:14, md:20}}>
        <Flex direction={{base:"column", lg:"row"}} align="center" gap={{base:10, lg:16}}>
          <VStack align="start" gap={6} flex="1">

              <Heading
                pt={20}
                as="h1"
                fontSize={{ base: "4xl", md: "6xl" }}
                lineHeight="1.05"
                letterSpacing="-0.03em"
                fontWeight="800"
              >
                Understand heart disease risk with clarity
              </Heading>

              <Text fontSize={{ base: "lg", md: "xl" }} color="fg.muted" maxW="540px">
                A machine-learning tool that turns routine clinical measurements into a clear,
                interpretable cardiovascular risk estimate — to support, never replace, a clinician&apos;s judgment.
              </Text>

              <HStack gap={4} pt={2}>
                <Button asChild size="xl" colorPalette="brand" borderRadius="l2" px={8}>
                  <NextLink href="/calculator">
                    Calculate Risk
                    <Icon as={ArrowRight} boxSize={5} />
                  </NextLink>
                </Button>
              </HStack>
            </VStack>

            <Box flex="1" w="full" maxW="480px">
              <HeroVisual />
            </Box>
          </Flex>
        </Container>
    <Container maxW="1120px" px={{ base: 5, md: 8 }} py={{ base: 14, md: 20 }}>
        <VStack
          bg="brand.700"
          color="white"
          borderRadius="l3"
          p={{ base: 8, md: 12 }}
          gap={5}
          textAlign="center"
        >
          <Heading fontSize={{ base: "2xl", md: "3xl" }} letterSpacing="-0.02em">
            Ready to estimate cardiovascular risk?
          </Heading>
          <Text color="brand.100" maxW="560px">
            Takes about a minute. Remember: this is a research and educational tool — results are an
            estimate and do not replace professional medical evaluation.
          </Text>
          <Button asChild size="xl" bg="white" color="brand.700" borderRadius="l2" px={8} _hover={{ bg: "brand.50" }}>
            <NextLink href="/calculator">
              Open the Risk Calculator
              <Icon as={ArrowRight} boxSize={5} />
            </NextLink>
          </Button>
        </VStack>
    </Container>

      <Box as="footer" borderTop="1px solid" borderColor="blackAlpha.100" py={6}>
        <Container maxW="1120px" px={{ base: 5, md: 8 }}>
          <Text fontSize="xs" color="fg.muted" textAlign="center">
            CardioPredictor is a machine-learning research tool and is not a medical device. It does not
            provide a diagnosis. Always consult a qualified healthcare professional.
          </Text>
        </Container>
      </Box>
    </Box>
    </Box>
  );
}


function HeroVisual() {
  return (
    <Box
      bg="bg.surface"
      borderRadius="l3"
      boxShadow="cardHover"
      p={8}
      position="relative"
      overflow="hidden"
    >
      <Flex justify="space-between" align="center" mb={6}>
        <HStack gap={2} color="brand.600">
          <Icon as={Activity} boxSize={5} />
          <Text fontWeight="700">Live signal</Text>
        </HStack>
        <Icon as={HeartPulse} boxSize={7} color="riskCritical.solid" />
      </Flex>

      <chakra.svg  as="svg" viewBox="0 0 400 120" w="full" h="120px">
        <polyline
          points="0,60 60,60 80,60 95,20 110,100 130,60 200,60 220,60 235,30 250,90 268,60 400,60"
          fill="none"
          stroke="#1F6FCB"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </chakra.svg >

      <SimpleGrid columns={3} gap={4} mt={6}>
        {[
          { k: "Inputs", v: "13" },
          { k: "ROC-AUC", v: "0.90" },
          { k: "Latency", v: "<1s" },
        ].map((m) => (
          <VStack key={m.k} gap={0} bg="brand.50" borderRadius="l1" py={3}>
            <Text fontSize="2xl" fontWeight="800" color="brand.700">
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
