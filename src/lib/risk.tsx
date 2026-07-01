
export interface PredictionResult {
  probability: number; // 0..1
  prediction: number; // 0 | 1
  risk_label: string;
  risk_level: string;
}

export type RiskKey = "riskLow" | "riskModerate" | "riskHigh" | "riskCritical";

export const RISK_SCALE: { key: RiskKey; label: string }[] = [
  { key: "riskLow", label: "Low" },
  { key: "riskModerate", label: "Moderate" },
  { key: "riskHigh", label: "High" },
  { key: "riskCritical", label: "Very High" },
];

// Valores hex (para SVG/animaciones que no pueden leer tokens de Chakra).
export const RISK_HEX: Record<RiskKey, string> = {
  riskLow: "#10B981",
  riskModerate: "#F59E0B",
  riskHigh: "#F97316",
  riskCritical: "#E04F5F",
};

export interface RiskTier {
  key: RiskKey;
  order: number; // 0..3 (posición en la escala)
  label: string;
  headline: string; // titular humano y empático
  interpretation: string; // una sola línea
  recommendations: string[]; // frases cortas
}

export function getRiskTier(probability: number): RiskTier {
  if (probability < 0.25) {
    return {
      key: "riskLow",
      order: 0,
      label: "Low",
      headline: "The signs look reassuring",
      interpretation: "Low estimated probability of cardiovascular disease. Reassuring, not a clearance.",
      recommendations: ["Heart-healthy diet", "Regular exercise", "Routine check-ups"],
    };
  }
  if (probability < 0.5) {
    return {
      key: "riskModerate",
      order: 1,
      label: "Moderate",
      headline: "A few things worth watching",
      interpretation: "Some risk factors present. Clinical review recommended.",
      recommendations: ["Discuss with a clinician", "Monitor BP & cholesterol", "Lifestyle changes"],
    };
  }
  if (probability < 0.75) {
    return {
      key: "riskHigh",
      order: 2,
      label: "High",
      headline: "Worth a closer look, together",
      interpretation: "Elevated probability. Should be reviewed by a healthcare provider.",
      recommendations: ["Consult a cardiologist", "Monitor BP & cholesterol", "Lifestyle changes"],
    };
  }
  return {
    key: "riskCritical",
    order: 3,
    label: "Very High",
    headline: "Let's follow up soon",
    interpretation: "High probability. Please seek timely medical evaluation.",
    recommendations: ["Seek prompt evaluation", "Cardiology referral", "Monitor closely"],
  };
}
