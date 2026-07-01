"use client";

import {
  Box,
  Container,
  Flex,
  Heading,
  HStack,
  Icon,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import { PipelineFlow } from "@/components/PipelineFlow";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/icons";
import {
  Activity,
  BarChart3,
  CheckCircle2,
  Database,
  Eraser,
  ExternalLink,
  Filter,
  FlaskConical,
  GraduationCap,
  Layers,
  Lightbulb,
  Mail,
  ScanSearch,
  ShieldAlert,
  Sigma,
  Sparkles,
  Split,
  Target,
} from "lucide-react";
import NextLink from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { ZoomableFigure } from "@/components/ZoomableFigure";

/* ============================================================
 *  ⬇️  EDITA AQUÍ TUS DATOS DE CONTACTO
 * ============================================================ */
const CONTACT = {
  name: "Jhoselyn Pajuelo",
  role: "Software Engineer",
  email: "miluskapajuelo@gmail.com",
  github: "https://github.com/miluskapajuelo",
  repo: "https://github.com/miluskapajuelo/Heart-disease-prediction-end-to-end-ML-Pipeline",
  linkedin: "https://www.linkedin.com/in/miluskapajuelo",
  data: "https://www.kaggle.com/datasets/johnsmith88/heart-disease-dataset/",
};

// ── Datos (fieles al README) ─────────────────────────────────────────
const HEADLINE_STATS = [
  { value: "302", label: "Unique patients" },
  { value: "0.894", label: "Test ROC-AUC" },
  { value: "78.8%", label: "Recall (sensitivity)" },
  { value: "6", label: "Final features" },
];

const PIPELINE = [
  {
    icon: Split,
    title: "Split",
    desc: "Stratified train / validation / test before any preprocessing.",
  },
  {
    icon: Eraser,
    title: "Clean",
    desc: "Physiologically impossible zeros (chol, trestbps, thalach) → NaN.",
  },
  {
    icon: Sigma,
    title: "Impute",
    desc: "Median imputation, fitted on the training set only.",
  },
  {
    icon: Sparkles,
    title: "Engineer",
    desc: "Composite clinical features from imputed data.",
  },
  {
    icon: Filter,
    title: "Select",
    desc: "Correlation, multicollinearity, VIF & ablation → 6 features.",
  },
  {
    icon: Target,
    title: "Train",
    desc: "GridSearchCV (StratifiedKFold, 5-fold) · scaling for LogReg.",
  },
];

const METRICS = [
  {
    model: "XGBoost",
    acc: "81.97%",
    auc: "0.894",
    recall: "0.788",
    prec: "0.867",
    f1: "0.825",
    gap: "0.050",
    best: true,
  },
  {
    model: "Logistic Regression",
    acc: "81.97%",
    auc: "0.889",
    recall: "0.788",
    prec: "0.867",
    f1: "0.825",
    gap: "0.045",
  },
  {
    model: "Random Forest",
    acc: "81.97%",
    auc: "0.875",
    recall: "0.818",
    prec: "0.844",
    f1: "0.831",
    gap: "0.063",
  },
];

const SHAP_TABLE = [
  { f: "cp", v: 22.5, note: "Chest pain type — the strongest signal" },
  { f: "ischemia_score", v: 17.6, note: "Engineered ischemia feature" },
  { f: "est_stroke_volume", v: 15.1, note: "Non-linear cardiac efficiency" },
  { f: "thal", v: 13.7, note: "Key diagnostic feature" },
  { f: "sex", v: 8.8, note: "Contributed to predictions" },
  { f: "slope", v: 6.5, note: "ST-segment pattern" },
];

const SKILLS = [
  "End-to-end supervised ML pipeline",
  "Data-leakage prevention",
  "Clinical feature engineering",
  "Model comparison & selection",
  "Cross-validation & gap analysis",
  "SHAP explainability",
  "Reproducible, modular code",
  "Clear communication of limitations",
];

const LIMITATIONS = [
  "Small sample size (302 patients)",
  "Limited demographic information",
  "No external validation dataset",
  "False negatives remain a concern",
  "Engineered proxies need further validation",
];

// EDA figures (referenciadas por nombre — copia los PNG a public/figures/)
const NUM = ["age", "chol", "oldpeak", "thalach", "trestbps"];
const CAT = ["cp", "thal", "ca", "slope", "sex", "exang", "restecg", "fbs"];

const NUM_DIST = NUM.map((f) => ({
  src: `/figures/num_${f}_distribution.png`,
  cap: `${f} — distribution`,
}));
const NUM_TARGET = NUM.map((f) => ({
  src: `/figures/num_${f}_target_analysis.png`,
  cap: `${f} vs. target`,
}));
const OUTLIERS = NUM.map((f) => ({
  src: `/figures/outliers_strip_${f}.png`,
  cap: `${f} — outlier strip plot`,
}));
const CAT_DIST = CAT.map((f) => ({
  src: `/figures/cat_${f}_distribution.png`,
  cap: `${f} — distribution`,
}));
const CAT_TARGET = CAT.map((f) => ({
  src: `/figures/cat_${f}_target_analysis.png`,
  cap: `${f} by target`,
}));

const CORR_FIGS = [
  {
    src: "/figures/correlation_analysis.png",
    cap: "Feature correlation with the target.",
  },
];

export default function ResearchPage() {
  return (
    <Box minH="100vh">
      <SiteHeader />

      <Box bgGradient="to-b" gradientFrom="brand.50" gradientTo="bg.canvas">
        <Container
          maxW="1000px"
          px={{ base: 5, md: 8 }}
          py={{ base: 12, md: 16 }}
        >
          <VStack align="start" gap={5}>
            <Heading
              as="h1"
              fontSize={{ base: "3xl", md: "5xl" }}
              letterSpacing="-0.03em"
              lineHeight="1.1"
            >
              ML Research Documentation
            </Heading>
            <Text fontSize={{ base: "md", md: "lg" }} color="fg.muted">
              An end-to-end machine-learning project on the Kaggle/UCI
              heart-disease dataset, built around real-world engineering
              practices: leakage prevention, clinical feature engineering, model
              comparison, and explainability.
            </Text>

            <HStack gap={3} wrap="wrap" pt={1}>
              <ContactChip
                icon={LinkedInIcon}
                label="LinkedIn"
                href={CONTACT.linkedin}
              />
              <ContactChip
                icon={Mail}
                label={CONTACT.email}
                href={`mailto:${CONTACT.email}`}
              />
              <ContactChip
                icon={ExternalLink}
                label="View project"
                href={CONTACT.repo}
              />
              <ContactChip
                icon={Database}
                label="Kaggle dataset"
                href={CONTACT.data}
              />
            </HStack>

            <SimpleGrid columns={{ base: 2, md: 4 }} gap={4} w="full">
              {HEADLINE_STATS.map((s) => (
                <VStack
                  key={s.label}
                  align="start"
                  gap={0}
                  bg="bg.surface"
                  borderRadius="l2"
                  border="1px solid"
                  borderColor="blackAlpha.100"
                  p={5}
                  boxShadow="card"
                >
                  <Text
                    fontSize="4xl"
                    fontWeight="800"
                    color="brand.700"
                    letterSpacing="-0.02em"
                  >
                    {s.value}
                  </Text>
                  <Text fontSize="sm" color="fg.muted" fontWeight="600">
                    {s.label}
                  </Text>
                </VStack>
              ))}
            </SimpleGrid>
          </VStack>
        </Container>
      </Box>

      <Container maxW="1000px" px={{ base: 5, md: 8 }} py={{ base: 10, md: 5 }}>
        <VStack align="stretch" gap={20}>
          <SectionBlock eyebrow="Pipeline" title="10 step workflow">
            <Text color="fg.muted" lineHeight="1.7">
              From raw CSV to a model served in production, the project follows
              ten deliberate steps. The guiding principle runs through all of
              them: <strong>split the data before touching it</strong>, so
              nothing from the validation or test set ever leaks into
              preprocessing or training. Hover or tap any card to see what
              happens at each stage.
            </Text>
            <PipelineFlow />
          </SectionBlock>
          <SectionBlock eyebrow="The data" title="Kaggle Heart Disease Dataset">
            <Text color="fg.muted" lineHeight="1.7">
              The study uses the Kaggle/UCI heart-disease dataset, deduplicated
              to <strong>302 unique patients</strong>. It is framed as binary
              classification (0 = no disease, 1 = disease). Because missing a
              sick patient is costlier than a false alarm,{" "}
              <strong>recall</strong> is the priority metric.
            </Text>
            <FigureGrid
              figures={[
                {
                  src: "/figures/target_distribution.png",
                  cap: "Target distribution — near-balanced classes.",
                },
                {
                  src: "/figures/split_class_balance.png",
                  cap: "Class balance preserved across train / val / test (stratified).",
                },
              ]}
              columns={{ base: 1, md: 2 }}
            />
          </SectionBlock>

          <SectionBlock eyebrow="Exploratory analysis" title="Numeric features">
            <Text color="fg.muted" lineHeight="1.7">
              Before modeling, each variable was explored for distribution,
              relationship with the target, and outliers. Click any figure to
              enlarge.
            </Text>

            <SubLabel>Numeric features — distributions</SubLabel>
            <FigureGrid
              figures={NUM_DIST}
              columns={{ base: 1, sm: 2, md: 3 }}
            />

            <SubLabel>Numeric features — relationship with target</SubLabel>
            <FigureGrid
              figures={NUM_TARGET}
              columns={{ base: 1, sm: 2, md: 3 }}
            />

            <SubLabel>Outlier detection</SubLabel>
            <FigureGrid
              figures={OUTLIERS}
              columns={{ base: 1, sm: 2, md: 3 }}
            />
          </SectionBlock>

          <SectionBlock
            eyebrow="Exploratory analysis"
            title="Categorical features"
          >
            <SubLabel>Categorical features — distributions</SubLabel>
            <FigureGrid
              figures={CAT_DIST}
              columns={{ base: 2, sm: 3, md: 4 }}
            />

            <SubLabel>Categorical features — by target</SubLabel>
            <FigureGrid
              figures={CAT_TARGET}
              columns={{ base: 2, sm: 3, md: 4 }}
            />
          </SectionBlock>
          <SectionBlock eyebrow="Exploratory analysis" title="Correlation">
            <SubLabel>Correlation with target</SubLabel>
            
            <FigureGrid figures={CORR_FIGS} columns={{ base: 1, md: 1 }} />
          </SectionBlock>

          <SectionBlock eyebrow="Preprocessing" title="Data Engineering">
            <Box
              bg="brand.700"
              color="white"
              borderRadius="l2"
              p={{ base: 6, md: 7 }}
            >
              <HStack gap={2} mb={4} color="brand.100">
                <Icon as={Sparkles} boxSize={5} />
                <Text
                  fontWeight="700"
                  textTransform="uppercase"
                  letterSpacing="0.06em"
                  fontSize="sm"
                >
                  Engineered clinical features
                </Text>
              </HStack>
              <SimpleGrid columns={{ base: 1, md: 2 }} gap={5}>
                <VStack align="start" gap={1.5}>
                  <Text fontWeight="700">ischemia_score</Text>
                  <Box
                    as="code"
                    fontSize="sm"
                    bg="whiteAlpha.200"
                    px={3}
                    py={2}
                    borderRadius="md"
                    w="full"
                  >
                    oldpeak + exang + (ca / 3)
                  </Box>
                  <Text fontSize="sm" color="brand.100">
                    Combines multiple indicators of cardiac stress.
                  </Text>
                </VStack>
                <VStack align="start" gap={1.5}>
                  <Text fontWeight="700">est_stroke_volume</Text>
                  <Box
                    as="code"
                    fontSize="sm"
                    bg="whiteAlpha.200"
                    px={3}
                    py={2}
                    borderRadius="md"
                    w="full"
                  >
                    (trestbps / thalach) × (age / 50)
                  </Box>
                  <Text fontSize="sm" color="brand.100">
                    Approximates cardiovascular efficiency under stress.
                  </Text>
                </VStack>
              </SimpleGrid>
              <Text fontSize="sm" color="brand.100" mt={4}>
                Validated with correlation analysis, multicollinearity checks,
                VIF and ablation tests — both engineered features ranked among
                the top predictors.
              </Text>
            </Box>
          </SectionBlock>

          <SectionBlock
            eyebrow="The results"
            title="XGBoost selected"
          >
            <Text color="fg.muted" lineHeight="1.7">
             ROC curves on the held-out test set — all three models clearly beat the random baseline, with XGBoost achieving the highest AUC (0.894).
            
            </Text>
            <FigureGrid
              figures={[
                {
                  src: "/figures/roc_curves_all_models.png",
                  cap: "ROC curves — all three models on the held-out test set.",
                },
              ]}
              columns={{ base: 1, md: 1 }}
            />

            <Box
              bg="bg.surface"
              borderRadius="l2"
              border="1px solid"
              borderColor="blackAlpha.100"
              boxShadow="card"
              overflow="hidden"
            >
              <Box overflowX="auto">
                <Box minW="640px">
                  <Flex
                    bg="blackAlpha.50"
                    px={5}
                    py={3}
                    fontWeight="700"
                    fontSize="xs"
                    color="fg.muted"
                    textTransform="uppercase"
                    letterSpacing="0.04em"
                  >
                    <Text flex="2.2">Model</Text>
                    <Text flex="1" textAlign="right">
                      Accuracy
                    </Text>
                    <Text flex="1" textAlign="right">
                      ROC-AUC
                    </Text>
                    <Text flex="1" textAlign="right">
                      Recall
                    </Text>
                    <Text flex="1" textAlign="right">
                      Precision
                    </Text>
                    <Text flex="1" textAlign="right">
                      F1
                    </Text>
                    <Text flex="1" textAlign="right">
                      CV Gap
                    </Text>
                  </Flex>
                  {METRICS.map((r) => (
                    <Flex
                      key={r.model}
                      px={5}
                      py={4}
                      align="center"
                      borderTop="1px solid"
                      borderColor="blackAlpha.100"
                      bg={r.best ? "brand.50" : undefined}
                      fontSize="sm"
                    >
                      <HStack flex="2.2" gap={2}>
                        <Text fontWeight={r.best ? "700" : "500"}>
                          {r.model}
                        </Text>
                        {r.best && (
                          <HStack
                            gap={1}
                            color="riskLow.fg"
                            fontSize="xs"
                            fontWeight="700"
                          >
                            <Icon as={CheckCircle2} boxSize={4} />
                            <Text>Selected</Text>
                          </HStack>
                        )}
                      </HStack>
                      <Text
                        flex="1"
                        textAlign="right"
                        fontVariantNumeric="tabular-nums"
                      >
                        {r.acc}
                      </Text>
                      <Text
                        flex="1"
                        textAlign="right"
                        fontWeight="700"
                        fontVariantNumeric="tabular-nums"
                      >
                        {r.auc}
                      </Text>
                      <Text
                        flex="1"
                        textAlign="right"
                        fontVariantNumeric="tabular-nums"
                      >
                        {r.recall}
                      </Text>
                      <Text
                        flex="1"
                        textAlign="right"
                        fontVariantNumeric="tabular-nums"
                      >
                        {r.prec}
                      </Text>
                      <Text
                        flex="1"
                        textAlign="right"
                        fontVariantNumeric="tabular-nums"
                      >
                        {r.f1}
                      </Text>
                      <Text
                        flex="1"
                        textAlign="right"
                        color="fg.muted"
                        fontVariantNumeric="tabular-nums"
                      >
                        {r.gap}
                      </Text>
                    </Flex>
                  ))}
                </Box>
              </Box>
            </Box>
            <Text fontSize="sm" color="fg.muted" lineHeight="1.6">
              XGBoost was selected for the strongest ROC-AUC with an acceptable
              generalization gap (0.050). Random Forest showed the widest gap
              (0.063), a sign of mild overfitting.
            </Text>

          </SectionBlock>
          <SectionBlock
            eyebrow="The results"
            title="Confusion Matrix"
          >
             <Text fontSize="sm" color="fg.muted" mt={3} lineHeight="1.6">
                The model correctly identified <strong>26 of 33</strong>{" "}
                patients with heart disease (recall 78.8%), but missed{" "}
                <strong>7</strong> — an important limitation in a screening
                context.
              </Text>
             <SubLabel> XGBoost (test set)</SubLabel>
              <ConfusionMatrix />
             </SectionBlock>

          {/* ── EXPLAINABILITY ── */}
          <SectionBlock
            eyebrow="Explainability"
            title="Why the model decides what it decides"
          >
            <FigureGrid
              figures={[
                {
                  src: "/figures/shap_bar.png",
                  cap: "Global feature importance (mean |SHAP|).",
                },
                {
                  src: "/figures/shap_beeswarm.png",
                  cap: "Beeswarm — direction & magnitude per feature.",
                },
                {
                  src: "/figures/shap_force_patient_0.png",
                  cap: "Force plot — one patient explained.",
                },
              ]}
              columns={{ base: 1, md: 3 }}
            />

            {/* SHAP importance table with bars */}
            <VStack
              align="stretch"
              gap={3}
              bg="bg.surface"
              borderRadius="l2"
              border="1px solid"
              borderColor="blackAlpha.100"
              boxShadow="card"
              p={{ base: 5, md: 6 }}
            >
              {SHAP_TABLE.map((s) => (
                <Box key={s.f}>
                  <Flex justify="space-between" mb={1}>
                    <Text fontWeight="600" fontSize="sm">
                      <Box
                        as="code"
                        bg="blackAlpha.100"
                        px={1.5}
                        borderRadius="sm"
                      >
                        {s.f}
                      </Box>{" "}
                      <Text as="span" color="fg.muted" fontWeight="400">
                        — {s.note}
                      </Text>
                    </Text>
                    <Text
                      fontWeight="700"
                      fontSize="sm"
                      fontVariantNumeric="tabular-nums"
                    >
                      {s.v}%
                    </Text>
                  </Flex>
                  <Box
                    h="6px"
                    bg="blackAlpha.100"
                    borderRadius="full"
                    overflow="hidden"
                  >
                    <Box
                      h="full"
                      w={`${(s.v / 22.5) * 100}%`}
                      bg="brand.500"
                      borderRadius="full"
                    />
                  </Box>
                </Box>
              ))}
            </VStack>
            <Box
              bg="bg.surface"
              borderRadius="l2"
              border="1px solid"
              borderColor="blackAlpha.100"
              boxShadow="card"
              p={{ base: 5, md: 6 }}
            >
              <Flex
                direction={{ base: "column", md: "row" }}
                gap={6}
                align={{ md: "center" }}
              >
                <Box flex="1">
                  <ZoomableFigure
                    src="/figures/inference.png"
                    cap="Inference on an example patient."
                  />
                </Box>
                <VStack flex="1.3" align="start" gap={2}>
                  <HStack gap={2} color="brand.600">
                    <Icon as={ScanSearch} boxSize={5} />
                    <Text
                      fontWeight="700"
                      textTransform="uppercase"
                      letterSpacing="0.06em"
                      fontSize="sm"
                    >
                      Counterintuitive finding
                    </Text>
                  </HStack>
                  <Text color="fg.muted" lineHeight="1.7" fontSize="sm">
                    <Box
                      as="code"
                      bg="blackAlpha.100"
                      px={1.5}
                      borderRadius="sm"
                    >
                      ischemia_score
                    </Box>{" "}
                    has a
                    <strong>
                      {" "}
                      negative correlation with the target (−0.637)
                    </strong>{" "}
                    — higher composite ischemia correlates with <em>
                      lower
                    </em>{" "}
                    disease probability here. This likely reflects selection
                    bias in the Cleveland cohort (severely ischemic patients
                    filtered before enrollment). It&apos;s a known dataset
                    limitation, not a modeling error — surfacing it is part of
                    honest analysis.
                  </Text>
                </VStack>
              </Flex>
            </Box>
          </SectionBlock>

          <Box
            bg="bg.surface"
            borderRadius="l3"
            border="1px solid"
            borderColor="brand.200"
            boxShadow="card"
            p={{ base: 6, md: 8 }}
          >
            <VStack align="start" gap={4}>
              <HStack
                bg="brand.muted"
                color="brand.fg"
                px={3}
                py={1.5}
                borderRadius="full"
                fontSize="xs"
                fontWeight="700"
              >
                <Icon as={GraduationCap} boxSize={4} />
                <Text textTransform="uppercase" letterSpacing="0.06em">
                  After the project · self-study
                </Text>
              </HStack>
              <Heading
                as="h2"
                fontSize={{ base: "2xl", md: "3xl" }}
                letterSpacing="-0.02em"
              >
                Going further: nested CV, Optuna &amp; statistical testing
              </Heading>
              <Text color="fg.muted" lineHeight="1.7" maxW="760px">
                As a follow-up learning exercise, I revisited model selection
                with <strong>nested cross-validation</strong> (unbiased
                generalization estimate), <strong>Optuna</strong> (Bayesian TPE
                search) and <strong>paired statistical tests</strong> (Wilcoxon
                + t-test). Across 15 outer folds the three models were{" "}
                <strong>statistically tied</strong> (ROC-AUC ≈ 0.90, every pair{" "}
                <em>p</em> &gt; 0.3) — meaning the simpler logistic regression
                would be an equally defensible choice. The lesson: when models
                tie, favor the simplest, and back the decision with a test.
              </Text>
            </VStack>
          </Box>

          <SimpleGrid columns={{ base: 1, md: 2 }} gap={6}>
            <VStack
              align="stretch"
              gap={4}
              bg="bg.surface"
              borderRadius="l2"
              border="1px solid"
              borderColor="blackAlpha.100"
              boxShadow="card"
              p={{ base: 5, md: 6 }}
            >
              <HStack gap={2} color="brand.600">
                <Icon as={CheckCircle2} boxSize={5} />
                <Text
                  fontWeight="700"
                  textTransform="uppercase"
                  letterSpacing="0.06em"
                  fontSize="sm"
                >
                  Skills demonstrated
                </Text>
              </HStack>
              <Flex gap={2} wrap="wrap">
                {SKILLS.map((s) => (
                  <Text
                    key={s}
                    fontSize="sm"
                    fontWeight="500"
                    px={3}
                    py={1.5}
                    border="1px solid"
                    borderColor="blackAlpha.200"
                    borderRadius="full"
                  >
                    {s}
                  </Text>
                ))}
              </Flex>
            </VStack>

            <VStack
              align="stretch"
              gap={4}
              bg="bg.surface"
              borderRadius="l2"
              border="1px solid"
              borderColor="blackAlpha.100"
              boxShadow="card"
              p={{ base: 5, md: 6 }}
            >
              <HStack gap={2} color="riskModerate.fg">
                <Icon as={ShieldAlert} boxSize={5} />
                <Text
                  fontWeight="700"
                  textTransform="uppercase"
                  letterSpacing="0.06em"
                  fontSize="sm"
                >
                  Limitations
                </Text>
              </HStack>
              <VStack align="stretch" gap={2}>
                {LIMITATIONS.map((l) => (
                  <HStack key={l} align="start" gap={2.5}>
                    <Box
                      w="6px"
                      h="6px"
                      mt={2}
                      borderRadius="full"
                      bg="riskModerate.solid"
                      flexShrink={0}
                    />
                    <Text fontSize="sm" color="fg.muted">
                      {l}
                    </Text>
                  </HStack>
                ))}
              </VStack>
            </VStack>
          </SimpleGrid>

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
              Let&apos;s talk
            </Heading>
            <Text color="brand.100" maxW="560px">
              {CONTACT.name} · {CONTACT.role}. Explore the full code on GitHub
              or reach out directly.
            </Text>
            <HStack gap={3} wrap="wrap" justify="center">
              <CtaLink
                icon={GitHubIcon}
                label="View on GitHub"
                href={CONTACT.repo}
                solid
              />
              <CtaLink
                icon={LinkedInIcon}
                label="LinkedIn"
                href={CONTACT.linkedin}
              />
              <CtaLink
                icon={Mail}
                label="Email"
                href={`mailto:${CONTACT.email}`}
              />
            </HStack>
          </VStack>
        </VStack>
      </Container>

      <Box
        as="footer"
        borderTop="1px solid"
        borderColor="blackAlpha.100"
        py={6}
      >
        <Container maxW="1000px" px={{ base: 5, md: 8 }}>
          <Text fontSize="xs" color="fg.muted" textAlign="center">
            Research conducted on a public heart-disease dataset for educational
            purposes. Not a medical device and not validated for clinical use.
          </Text>
        </Container>
      </Box>
    </Box>
  );
}

function SectionBlock({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <VStack as="section" align="stretch" gap={6}>
      <VStack align="start" gap={2}>
        <HStack gap={2} color="brand.600">
          <Text
            fontSize="sm"
            fontWeight="700"
            textTransform="uppercase"
            letterSpacing="0.08em"
          >
            {eyebrow}
          </Text>
        </HStack>
        <Heading
          as="h2"
          fontSize={{ base: "2xl", md: "3xl" }}
          letterSpacing="-0.02em"
        >
          {title}
        </Heading>
      </VStack>
      {children}
    </VStack>
  );
}

function SubLabel({ children }: { children: React.ReactNode }) {
  return (
    <Text fontSize="sm" fontWeight="700" color="fg" mt={2}>
      {children}
    </Text>
  );
}

function FigureGrid({
  figures,
  columns,
}: {
  figures: { src: string; cap: string }[];
  columns: Record<string, number> | number;
}) {
  return (
    <SimpleGrid columns={columns} gap={5}>
      {figures.map((f) => (
        <ZoomableFigure key={f.src} src={f.src} cap={f.cap} />
      ))}
    </SimpleGrid>
  );
}

function ContactChip({
  icon: IconComponent,
  label,
  href,
}: {
  icon: React.ElementType;
  label: string;
  href: string;
}) {
  return (
    <HStack
      gap={2}
      px={3}
      py={2}
      bg="bg.surface"
      border="1px solid"
      borderColor="border.muted"
      borderRadius="full"
      fontSize="sm"
      fontWeight="600"
      transition="all 0.2s"
      _hover={{ borderColor: "brand.400", color: "brand.600" }}
      asChild
    >
      <NextLink href={href} target="_blank" rel="noopener noreferrer">
        <Icon boxSize={4} asChild>
          <IconComponent />
        </Icon>
        <Text>{label}</Text>
      </NextLink>
    </HStack>
  );
}

export function CtaLink({
  icon: IconComponent,
  label,
  href,
  solid,
}: {
  icon: React.ComponentType<any>; // Cambiado a ComponentType para aceptar Lucide y SVGs personalizados
  label: string;
  href: string;
  solid?: boolean;
}) {
  return (
    <HStack
      gap={2}
      px={5}
      py={3}
      borderRadius="md" // Cambiado l2 por md (v3 usa tokens estándar: sm, md, lg)
      fontWeight="700"
      fontSize="sm"
      bg={solid ? "white" : "white/10"} // Cambiado whiteAlpha.200 por la sintaxis v3 color/opacidad
      color={solid ? "brand.700" : "white"}
      transition="all 0.2s"
      _hover={{
        transform: "translateY(-1px)",
        bg: solid ? "brand.50" : "white/20", // Cambiado whiteAlpha.300 por white/20
      }}
      asChild
    >
      <NextLink href={href} target="_blank" rel="noopener noreferrer">
        {/* CORRECCIÓN 1: El Icon ahora solo envuelve al vector gráfico */}
        <Icon size="sm" asChild>
          <IconComponent />
        </Icon>

        {/* CORRECCIÓN 2: El texto va afuera del componente Icon, al mismo nivel */}
        <Text>{label}</Text>
      </NextLink>
    </HStack>
  );
}

function ConfusionMatrix() {
  const cell = (
    label: string,
    value: number,
    tone: "good" | "warn" | "bad",
  ) => {
    const bg =
      tone === "good"
        ? "riskLow.subtle"
        : tone === "warn"
          ? "riskModerate.subtle"
          : "riskCritical.subtle";
    const fg =
      tone === "good"
        ? "riskLow.fg"
        : tone === "warn"
          ? "riskModerate.fg"
          : "riskCritical.fg";
    return (
      <VStack bg={bg} color={fg} borderRadius="l1" py={5} gap={0}>
        <Text fontSize="3xl" fontWeight="800">
          {value}
        </Text>
        <Text fontSize="xs" fontWeight="600">
          {label}
        </Text>
      </VStack>
    );
  };
  return (
    <Box>
      <SimpleGrid columns={2} gap={3} maxW="440px">
        {cell("True Negative", 24, "good")}
        {cell("False Positive", 4, "warn")}
        {cell("False Negative", 7, "bad")}
        {cell("True Positive", 26, "good")}
      </SimpleGrid>
      <HStack gap={4} mt={2} maxW="440px" fontSize="xs" color="fg.muted">
        <Text flex="1" textAlign="center">
          ← Predicted No Disease
        </Text>
        <Text flex="1" textAlign="center">
          Predicted Disease →
        </Text>
      </HStack>
    </Box>
  );
}
