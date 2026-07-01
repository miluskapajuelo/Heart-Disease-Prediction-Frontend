import { useState } from "react";
import { Box, Flex, HStack, Icon, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import {
  Activity,
  BarChart3,
  BrainCircuit,
  ChevronDown,
  Database,
  Filter,
  Layout,
  Lightbulb,
  Server,
  Sigma,
  Sparkles,
  Split,
  Target,
} from "lucide-react";

interface Step {
  icon: React.ElementType;
  title: string;
  back: string;
  highlight?: boolean;
}

const STEPS: Step[] = [
  { icon: Database, title: "Raw data", back: "Kaggle/UCI heart dataset, deduplicated to 302 unique patients. Binary target: disease vs. no disease." },
  { icon: BarChart3, title: "Exploratory analysis", back: "Explored every variable — distributions, relationship to the target, and outliers — before modeling." },
  { icon: Split, title: "Train / Val / Test split", back: "Split first, so preprocessing never sees the test data. The key guard against data leakage." },
  { icon: Sigma, title: "Preprocessing", back: "Impossible zeros → NaN, then median imputation fitted only on the training set and applied to the rest." },
  { icon: Sparkles, title: "Feature engineering", back: "Two clinical proxies — ischemia_score and est_stroke_volume — capturing patterns beyond the raw columns." },
  { icon: Filter, title: "Feature selection", back: "Correlation, multicollinearity, VIF and ablation trimmed the set to the 6 most useful features." },
  { icon: Target, title: "Model training", back: "Logistic Regression, Random Forest and XGBoost tuned with 5-fold stratified GridSearchCV on ROC-AUC." },
  { icon: Activity, title: "Evaluation", back: "Compared on accuracy, ROC-AUC, recall, precision, F1 and the CV-to-test generalization gap." },
  { icon: Lightbulb, title: "SHAP explainability", back: "Explained predictions globally and per-patient, confirming the engineered features add real signal." },
  { icon: BrainCircuit, title: "Final model — XGBoost", back: "Best ROC-AUC (0.894) with an acceptable gap. Serialized as .pkl for production inference." },
];

export function PipelineFlow() {
  const [flipped, setFlipped] = useState<Set<number>>(new Set());

  const toggle = (i: number) =>
    setFlipped((prev) => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });

  return (
    <VStack align="stretch" gap={6} w="full">
      <style>{`
        .flip { perspective: 1200px; height: 200px; }
        .flip-inner {
          position: relative; width: 100%; height: 100%;
          transform-style: preserve-3d;
          transition: transform .6s cubic-bezier(.22,1,.36,1);
        }
        .flip:hover .flip-inner, .flip.is-flipped .flip-inner { transform: rotateY(180deg); }
        .flip-face {
          position: absolute; inset: 0;
          -webkit-backface-visibility: hidden; backface-visibility: hidden;
          display: flex; flex-direction: column;
          border-radius: 16px; overflow: hidden;
        }
        .flip-back { transform: rotateY(180deg); }
        @media (prefers-reduced-motion: reduce) {
          .flip-inner { transition: none; }
        }
      `}</style>

      <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} gap={4}>
        {STEPS.map((step, i) => (
          <Box
            key={step.title}
            className={`flip ${flipped.has(i) ? "is-flipped" : ""}`}
            role="button"
            tabIndex={0}
            aria-label={`Step ${i + 1}: ${step.title}. Activate to read more.`}
            cursor="pointer"
            onClick={() => toggle(i)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                toggle(i);
              }
            }}
          >
            <Box className="flip-inner">
              {/* FRONT */}
              <Box
                className="flip-face"
                bg={step.highlight ? "brand.400" : "bg.surface"}
                color={step.highlight ? "white" : "fg"}
                border="1px solid"
                borderColor={step.highlight ? "brand.700" : "blackAlpha.100"}
                boxShadow="card"
                p={5}
                justifyContent="space-between"
              >
                <Flex justify="space-between" align="start">
                  <Flex
                    w="44px"
                    h="44px"
                    align="center"
                    justify="center"
                    bg={step.highlight ? "whiteAlpha.200" : "brand.subtle"}
                    color={step.highlight ? "white" : "brand.600"}
                    borderRadius="l1"
                  >
                    <Icon as={step.icon} boxSize={5} />
                  </Flex>
                  <Text fontSize="3xl" fontWeight="800" lineHeight="1" color={step.highlight ? "whiteAlpha.400" : "blackAlpha.200"}>
                    {String(i + 1).padStart(2, "0")}
                  </Text>
                </Flex>
                <VStack align="start" gap={1}>
                  <Text fontWeight="700" fontSize="md" lineHeight="1.2">
                    {step.title}
                  </Text>
                  <Text fontSize="xs" color={step.highlight ? "brand.100" : "fg.muted"} fontWeight="500">
                    Hover or tap to read →
                  </Text>
                </VStack>
              </Box>

              {/* BACK */}
              <Box
                className="flip-face flip-back"
                bg="brand.600"
                color="white"
                boxShadow="card"
                p={5}
                justifyContent="center"
              >
                <Text fontSize="xs" fontWeight="700" textTransform="uppercase" letterSpacing="0.08em" color="brand.100" mb={2}>
                  Step {String(i + 1).padStart(2, "0")}
                </Text>
                <Text fontSize="sm" lineHeight="1.55">
                  {step.back}
                </Text>
              </Box>
            </Box>
          </Box>
        ))}
      </SimpleGrid>

      {/* Deploy strip */}
      <Flex direction={{ base: "column", sm: "row" }} align="stretch" gap={3} pt={2}>
        <DeployCard icon={Server} title="FastAPI" detail="POST /predict — serves the model" />
        <Flex align="center" justify="center" color="brand.400">
          <Icon as={ChevronDown} boxSize={6} transform={{ sm: "rotate(-90deg)" }} />
        </Flex>
        <DeployCard icon={Layout} title="Next.js UI" detail="Form → risk result" />
      </Flex>

    </VStack>
  );
}

function DeployCard({ icon, title, detail }: { icon: React.ElementType; title: string; detail: string }) {
  return (
    <HStack flex="1" align="center" gap={3} bg="bg.surface" border="1px solid" borderColor="blackAlpha.100" borderRadius="l2" boxShadow="card" p={4}>
      <Flex flexShrink={0} w="40px" h="40px" align="center" justify="center" bg="brand.subtle" color="brand.600" borderRadius="l1">
        <Icon as={icon} boxSize={5} />
      </Flex>
      <VStack align="start" gap={0}>
        <Text fontWeight="700" fontSize="sm">{title}</Text>
        <Text fontSize="xs" color="fg.muted">{detail}</Text>
      </VStack>
    </HStack>
  );
}
