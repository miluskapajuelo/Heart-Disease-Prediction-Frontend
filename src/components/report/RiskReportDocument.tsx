import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { getRiskTier, RISK_HEX, type PredictionResult } from "@/lib/risk";

const MODEL_NAME = "XGBoost";
const MODEL_VERSION = "v1.0";
const DECISION_THRESHOLD = 0.5;

const MODEL_METRICS = [
  { label: "ROC-AUC", value: "0.894" },
  { label: "Recall (sensitivity)", value: "78.8%" },
  { label: "Precision", value: "86.7%" },
  { label: "Accuracy", value: "81.97%" },
];

const TOP_FEATURES = [
  { name: "Ischemia score", note: "Engineered ischemia feature" },
  { name: "Chest pain type (cp)", note: "The strongest individual clinical signal" },
  { name: "Estimated stroke volume", note: "Non-linear cardiac-efficiency proxy" },
  { name: "Thalassemia / perfusion (thal)", note: "Key diagnostic feature" },
  { name: "Sex", note: "Contributes to baseline risk" },
  { name: "ST segment slope", note: "Reflects ST-segment pattern under exertion" },
];

const LIMITATIONS = [
  "Trained on a small sample (302 patients) — estimates may not generalize to every population.",
  "No external validation dataset was used.",
  "Engineered clinical proxies (e.g. ischemia score) still require further clinical validation.",
  "False negatives remain a concern; a low-risk estimate does not rule out disease.",
  "This tool is not a certified medical device and does not replace clinical judgment.",
];

const styles = StyleSheet.create({
  page: { padding: 36, fontSize: 10.5, fontFamily: "Helvetica", color: "#1F2937" },

  // Header
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 10,
  },
  title: { fontSize: 19, fontFamily: "Helvetica-Bold", color: "#111827" },
  metaBlock: { alignItems: "flex-end" },
  metaText: { fontSize: 8.5, color: "#6B7280", marginBottom: 2 },
  disclaimerBanner: {
    flexDirection: "row",
    backgroundColor: "#FFF7ED",
    borderWidth: 1,
    borderColor: "#FDBA74",
    borderRadius: 4,
    paddingVertical: 7,
    paddingHorizontal: 10,
    marginBottom: 18,
  },
  disclaimerBannerText: {
    fontSize: 8.5,
    color: "#9A3412",
    lineHeight: 1.4,
  },

  // Generic section
  section: { marginBottom: 18 },
  sectionTitle: {
    fontSize: 11,
    fontFamily: "Helvetica-Bold",
    color: "#111827",
    marginBottom: 8,
    textTransform: "uppercase",
    letterSpacing: 0.6,
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
    marginBottom: 16,
  },

  // Risk summary
  summaryCard: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 6,
    overflow: "hidden",
  },
  summaryCell: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRightWidth: 1,
    borderRightColor: "#E5E7EB",
  },
  summaryCellLast: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 12,
  },
  summaryLabel: {
    fontSize: 7.5,
    color: "#6B7280",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  summaryValue: { fontSize: 16, fontFamily: "Helvetica-Bold" },
  headline: {
    fontSize: 13,
    fontFamily: "Helvetica-Bold",
    color: "#111827",
    marginTop: 12,
    marginBottom: 4,
  },
  interpretation: { fontSize: 10, lineHeight: 1.5, color: "#374151" },

  // Feature drivers
  featureRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  featureRank: {
    width: 18,
    fontSize: 9,
    fontFamily: "Helvetica-Bold",
    color: "#9CA3AF",
  },
  featureName: { flex: 1, fontSize: 9.5, fontFamily: "Helvetica-Bold", color: "#111827" },
  featureNote: { flex: 2, fontSize: 8.5, color: "#6B7280" },
  featureCaveat: {
    fontSize: 8,
    color: "#9CA3AF",
    marginTop: 6,
    fontStyle: "italic",
  },

  // Lists
  bulletRow: { flexDirection: "row", marginBottom: 5 },
  bulletMark: { width: 10, fontSize: 9.5, color: "#374151" },
  bulletText: { flex: 1, fontSize: 9.5, lineHeight: 1.45, color: "#374151" },

  // Model performance
  metricsRow: { flexDirection: "row", marginBottom: 14 },
  metricBox: { flex: 1, alignItems: "flex-start" },
  metricValue: { fontSize: 14, fontFamily: "Helvetica-Bold", color: "#111827" },
  metricLabel: { fontSize: 7.5, color: "#6B7280", marginTop: 2 },

  // Footer
  footer: {
    marginTop: 8,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
  },
  footerText: { fontSize: 8, color: "#9CA3AF", lineHeight: 1.5 },
});

function flagColor(hex: string) {
  return { color: hex };
}

export function RiskReportDocument({ result }: { result: PredictionResult }) {
  const tier = getRiskTier(result.probability);
  const pct = Math.round(result.probability * 100);
  const hex = RISK_HEX[tier.key];
  const generatedAt = new Date();
  const diseaseDetected = result.prediction === 1;

  return (
    <Document title="Heart Disease Risk Report" author={MODEL_NAME}>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.headerRow}>
          <Text style={styles.title}>Heart Disease Risk Report</Text>
          <View style={styles.metaBlock}>
            <Text style={styles.metaText}>
              Generated {generatedAt.toLocaleDateString()} · {generatedAt.toLocaleTimeString()}
            </Text>
            <Text style={styles.metaText}>
              Model: {MODEL_NAME} {MODEL_VERSION}
            </Text>
          </View>
        </View>


        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Risk summary</Text>
          <View style={styles.summaryCard}>
            <View style={styles.summaryCell}>
              <Text style={styles.summaryLabel}>Probability</Text>
              <Text style={[styles.summaryValue, flagColor(hex)]}>{pct}%</Text>
            </View>
            <View style={styles.summaryCell}>
              <Text style={styles.summaryLabel}>Category</Text>
              <Text style={[styles.summaryValue, flagColor(hex)]}>{tier.label}</Text>
            </View>
            <View style={styles.summaryCell}>
              <Text style={styles.summaryLabel}>Model prediction</Text>
              <Text style={styles.summaryValue}>
                {diseaseDetected ? "Detected" : "Not detected"}
              </Text>
            </View>
            <View style={styles.summaryCellLast}>
              <Text style={styles.summaryLabel}>Decision threshold</Text>
              <Text style={styles.summaryValue}>{DECISION_THRESHOLD.toFixed(2)}</Text>
            </View>
          </View>

          <Text style={styles.headline}>{tier.headline}</Text>
          <Text style={styles.interpretation}>{tier.interpretation}</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Why the model estimates this risk</Text>
          {TOP_FEATURES.map((f, i) => (
            <View key={f.name} style={styles.featureRow}>
              <Text style={styles.featureRank}>{i + 1}</Text>
              <Text style={styles.featureName}>{f.name}</Text>
              <Text style={styles.featureNote}>{f.note}</Text>
            </View>
          ))}
          <Text style={styles.featureCaveat}>
            Ranked by global feature importance (SHAP) across all model predictions —
            the clinical variables the model relies on most heavily overall, not a
            per-patient breakdown of this specific estimate.
          </Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recommendations</Text>
          {tier.recommendations.map((rec) => (
            <View key={rec} style={styles.bulletRow}>
              <Text style={styles.bulletMark}>•</Text>
              <Text style={styles.bulletText}>{rec}</Text>
            </View>
          ))}
          <View style={styles.bulletRow}>
            <Text style={styles.bulletMark}>•</Text>
            <Text style={styles.bulletText}>
              Seek prompt medical attention for chest pain, shortness of breath, or
              other new or worsening cardiovascular symptoms, regardless of this
              estimate.
            </Text>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Model performance & limitations</Text>
          <View style={styles.metricsRow}>
            {MODEL_METRICS.map((m) => (
              <View key={m.label} style={styles.metricBox}>
                <Text style={styles.metricValue}>{m.value}</Text>
                <Text style={styles.metricLabel}>{m.label}</Text>
              </View>
            ))}
          </View>
          {LIMITATIONS.map((l) => (
            <View key={l} style={styles.bulletRow}>
              <Text style={styles.bulletMark}>•</Text>
              <Text style={styles.bulletText}>{l}</Text>
            </View>
          ))}
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Heart Disease Risk Report · generated {generatedAt.toISOString()} · model{" "}
            {MODEL_NAME} {MODEL_VERSION}, decision threshold {DECISION_THRESHOLD.toFixed(2)}.
            Machine-learning estimate only not a diagnosis, not a certified medical
            device, and not a substitute for professional medical advice.
          </Text>
        </View>
      </Page>
    </Document>
  );
}
