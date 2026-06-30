interface PatientForm {
    age: string,
    sex: string,
    cp: string,
    trestbps: string,
    chol: string,
    fbs: string,
    restecg: string,
    thalach: string,
    exang: string,
    oldpeak: string,
    slope: string,
    ca: string,
    thal: string
  }

interface FieldConfig{
  name: keyof PatientForm,
  label: string
}

interface PredictionResult{
  probability: number,
  prediction:  number,
  risk_label:  string,
  risk_level:  string,
}