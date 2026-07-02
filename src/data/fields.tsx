export type FieldType = "number" | "select" | "segmented" | "slider";

export interface SelectOption {
  value: string;
  label: string;
}

export interface FieldConfig {
  name: string;
  label: string;
  helper: string;
  tooltip?: string;
  type: FieldType;
  placeholder?: string;
  unit?: string;
  options?: SelectOption[];
  min?: number;
  max?: number;
  step?: number;
  icon?: string;
}

export interface FormSection {
  title: string;
  description: string;
  icon: string;
  fields: FieldConfig[];
}

export const SECTIONS: FormSection[] = [
  {
    title: "Patient Information",
    description: "Basic demographics that influence baseline cardiovascular risk.",
    icon: "user",
    fields: [
      {
        name: "age",
        label: "Age",
        helper: "Patient age in years",
        type: "number",
        placeholder: "63",
        unit: "years",
        icon: "calendar",
      },
      {
        name: "sex",
        label: "Sex",
        helper: "Biological sex assigned at birth",
        type: "segmented",
        options: [
          { value: "1", label: "Male" },
          { value: "0", label: "Female" },
        ],
        icon: "user",
      },
    ],
  },
  {
    title: "Symptoms & Clinical Measurements",
    description: "Resting vitals and reported chest pain.",
    icon: "activity",
    fields: [
      {
        name: "cp",
        label: "Chest Pain Type",
        helper: "Type of chest pain reported",
        type: "select",
        options: [
          { value: "0", label: "Typical angina" },
          { value: "1", label: "Atypical angina" },
          { value: "2", label: "Non-anginal pain" },
          { value: "3", label: "Asymptomatic" },
        ],
        icon: "heartPulse",
      },
      {
        name: "trestbps",
        label: "Resting Blood Pressure",
        helper: "Systolic pressure measured at rest",
        type: "number",
        placeholder: "145",
        unit: "mmHg",
        icon: "gauge",
      },
      {
        name: "chol",
        label: "Serum Cholesterol",
        helper: "Total cholesterol in the blood",
        type: "number",
        placeholder: "233",
        unit: "mg/dL",
        icon: "droplet",
      },
      {
        name: "fbs",
        label: "Fasting Blood Sugar > 120 mg/dL",
        helper: "Is fasting blood sugar above 120 mg/dL?",
        type: "segmented",
        options: [
          { value: "1", label: "Yes" },
          { value: "0", label: "No" },
        ],
        icon: "droplet",
      },
    ],
  },
  {
    title: "ECG & Exercise",
    description: "Electrical activity and how the heart responds to exertion.",
    icon: "waveform",
    fields: [
      {
        name: "restecg",
        label: "Resting ECG",
        helper: "Resting electrocardiogram result",
        type: "select",
        options: [
          { value: "0", label: "Normal" },
          { value: "1", label: "ST-T wave abnormality" },
          { value: "2", label: "Left ventricular hypertrophy" },
        ],
        icon: "waveform",
      },
      {
        name: "thalach",
        label: "Maximum Heart Rate",
        helper: "Peak heart rate achieved during exercise",
        tooltip:
          "Highest heart rate reached during a stress test.",
        type: "number",
        placeholder: "150",
        unit: "bpm",
        icon: "heartPulse",
      },
      {
        name: "exang",
        label: "Exercise-Induced Angina",
        helper: "Did exercise trigger chest pain?",
        type: "segmented",
        options: [
          { value: "1", label: "Yes" },
          { value: "0", label: "No" },
        ],
        icon: "activity",
      },
      {
        name: "oldpeak",
        label: "ST Depression (Oldpeak)",
        helper: "ST depression induced by exercise vs. rest",
        tooltip:
          "How much the ST segment of the ECG drops during exercise compared to rest.",
        type: "slider",
        placeholder: "2.3",
        unit: "mm",
        min: 0,
        max: 6,
        step: 0.1,
        icon: "waveform",
      },
    ],
  },
  {
    title: "Vessel & Perfusion Imaging",
    description: "Findings from fluoroscopy and stress imaging.",
    icon: "scan",
    fields: [
      {
        name: "slope",
        label: "ST Segment Slope",
        helper: "Slope of the peak exercise ST segment",
        tooltip:
          "The shape of the ST segment at peak exercise.",
        type: "select",
        options: [
          { value: "0", label: "Upsloping" },
          { value: "1", label: "Flat" },
          { value: "2", label: "Downsloping" },
        ],
        icon: "trending",
      },
      {
        name: "ca",
        label: "Major Vessels (Fluoroscopy)",
        helper: "Number of major vessels with narrowing",
        tooltip:
          "How many major coronary vessels show significant narrowing on fluoroscopy.",
        type: "select",
        options: [
          { value: "0", label: "0 vessels" },
          { value: "1", label: "1 vessel" },
          { value: "2", label: "2 vessels" },
          { value: "3", label: "3 vessels" },
        ],
        icon: "scan",
      },
      {
        name: "thal",
        label: "Thalassemia / Perfusion",
        helper: "Thallium stress test result",
        tooltip:
          "Blood-flow result from a thallium stress test.",
        type: "select",
        options: [
          { value: "1", label: "Normal" },
          { value: "2", label: "Fixed defect" },
          { value: "3", label: "Reversible defect" },
        ],
        icon: "scan",
      },
    ],
  },
];


export const FIELD_NAMES = SECTIONS.flatMap((s) => s.fields.map((f) => f.name));

