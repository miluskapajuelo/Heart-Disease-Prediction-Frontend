"use client";

import { useState } from "react";
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  HStack,
  Icon,
  SimpleGrid,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Activity, AlertCircle, ArrowRight, RotateCcw, Sparkles } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { FieldInput } from "@/components/FieldInput";
import { ResultPanel } from "@/components/ResultPage";
import { SECTIONS, FIELD_NAMES, EXAMPLE_PATIENT } from "@/data/fields";
import type { PredictionResult } from "@/lib/risk";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

const initialForm: Record<string, string> = { ...EXAMPLE_PATIENT };
export default function CalculatorPage() {
  const [form, setForm] = useState<Record<string, string>>(initialForm);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  function handleChange(name: string, value: string) {
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  }

  function validate(): boolean {
    const next: Record<string, string> = {};
    for (const name of FIELD_NAMES) {
      const v = form[name];
      if (v === "" || v === undefined) next[name] = "This field is required";
      else if (isNaN(Number(v))) next[name] = "Must be a number";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit() {
    setApiError(null);
    if (!validate()) return;

    setLoading(true);
    setResult(null);
    try {
      const payload = Object.fromEntries(
        Object.entries(form).map(([k, v]) => [k, Number(v)])
      );
      const res = await fetch(`${API_URL}/predict`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`Error ${res.status}`);
      const data: PredictionResult = await res.json();
      setResult(data);
    } catch {
      setApiError(
        "We couldn't reach the prediction service. Make sure the API is running and try again."
      );
    } finally {
      setLoading(false);
    }
  }

  function handleReset() {
    setForm({ ...EXAMPLE_PATIENT });
    setErrors({});
    setResult(null);
    setApiError(null);
  }

  return (
    <Box minH="100vh">
      <SiteHeader />

      <Container maxW="1120px" px={{ base: 5, md: 8 }} py={{ base: 8, md: 12 }}>
        <VStack align="start" gap={2} mb={8}>
          <Heading fontSize={{ base: "3xl", md: "4xl" }} letterSpacing="-0.02em">
            Heart Disease Risk Calculator
          </Heading>
          <Text color="fg.muted" maxW="640px">
            Enter the patient&apos;s clinical measurements. Each field includes guidance — hover the
            info icon for the medical meaning. All fields are required.
          </Text>
        </VStack>

        <Flex direction={{ base: "column", xl: "row" }} gap={8} align="start">

          <VStack as="form" align="stretch" gap={6} flex="1.3" w="full"
            onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}
          >
            {SECTIONS.map((section) => (
              <Box
                key={section.title}
                bg="bg.surface"
                borderRadius="l2"
                boxShadow="card"
                p={{ base: 5, md: 7 }}
              >
                <VStack align="start" gap={1} mb={5}>
                  <Heading as="h2" fontSize="lg" letterSpacing="-0.01em">
                    {section.title}
                  </Heading>
                  <Text fontSize="sm" color="fg.muted">
                    {section.description}
                  </Text>
                </VStack>

                <SimpleGrid columns={{ base: 1, md: 2 }} gap={6}>
                  {section.fields.map((field) => (
                    <FieldInput
                      key={field.name}
                      field={field}
                      value={form[field.name] || ""}
                      placeholder={form[field.name] }
                      error={errors[field.name]}
                      onChange={handleChange}
                    />
                  ))}
                </SimpleGrid>
              </Box>
            ))}

            {apiError && (
              <HStack
                bg="riskCritical.subtle"
                color="riskCritical.fg"
                borderRadius="l2"
                p={4}
                gap={3}
                role="alert"
              >
                <Icon as={AlertCircle} boxSize={5} flexShrink={0} />
                <Text fontSize="sm">{apiError}</Text>
              </HStack>
            )}

            <HStack gap={3}>
              <Button
                type="submit"
                size="xl"
                colorPalette="brand"
                borderRadius="l2"
                px={8}
                loading={loading}
                loadingText="Analyzing"
                flex={{ base: 1, sm: "initial" }}
              >
                Calculate Risk
                <Icon as={ArrowRight} boxSize={5} />
              </Button>
              <Button
                type="button"
                size="xl"
                variant="ghost"
                borderRadius="l2"
                onClick={handleReset}
              >
                <Icon as={RotateCcw} boxSize={4} />
                Reset
              </Button>
            </HStack>
          </VStack>

          <Box flex="1" w="full" position={{ xl: "sticky" }} top={{ xl: "88px" }}>
            {loading ? (
              <LoadingState />
            ) : result ? (
              <ResultPanel result={result} />
            ) : (
              <EmptyState />
            )}
          </Box>
        </Flex>
      </Container>
    </Box>
  );
}

function EmptyState() {
  return (
    <VStack
      bg="bg.surface"
      borderRadius="l3"
      boxShadow="card"
      p={10}
      gap={4}
      textAlign="center"
      border="1px dashed"
      borderColor="blackAlpha.200"
    >
      <Flex w="64px" h="64px" align="center" justify="center" bg="brand.subtle" color="brand.500" borderRadius="full">
        <Icon as={Sparkles} boxSize={7} />
      </Flex>
      <Heading as="h3" fontSize="lg">
        Your result will appear here
      </Heading>
      <Text fontSize="sm" color="fg.muted" maxW="320px">
        Complete the patient information and select <strong>Calculate Risk</strong> to see the
        estimated cardiovascular risk.
      </Text>
    </VStack>
  );
}

function LoadingState() {
  return (
    <VStack bg="bg.surface" borderRadius="l3" boxShadow="card" p={10} gap={5} textAlign="center">
      <Spinner size="xl" color="brand.500" borderWidth="3px" />
      <VStack gap={1}>
        <HStack color="brand.600">
          <Icon as={Activity} boxSize={5} />
          <Text fontWeight="700">Analyzing clinical data…</Text>
        </HStack>
        <Text fontSize="sm" color="fg.muted">
          The model is computing the cardiovascular risk estimate.
        </Text>
      </VStack>
    </VStack>
  );
}
