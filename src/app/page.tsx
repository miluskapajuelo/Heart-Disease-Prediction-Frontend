"use client";
import { ChangeEvent, useState } from "react";
import {
  Box,
  Heading,
  Text,
  Button,
  SimpleGrid,
  Input,
} from "@chakra-ui/react";

const API_URL = process.env.NEXT_PUBLIC_API_URL


const FIELDS: FieldConfig[] = [
  { name: "age", label: "age" },
  { name: "sex", label: "sex (0=F, 1=M)" },
  { name: "cp", label: "Chest pain (0-3)" },
  { name: "trestbps", label: "Blood Pressure" },
  { name: "chol", label: "Cholesterol" },
  { name: "fbs", label: "Fasting Blood Sugar (0/1)" },
  { name: "restecg", label: "Resting ECG (0-2)" },
  { name: "thalach", label: "Maximum heart rate" },
  { name: "exang", label: "Exertional angina (0/1)" },
  { name: "oldpeak", label: "Oldpeak" },
  { name: "slope", label: "Slope (0-2)" },
  { name: "ca", label: "Vessels (ca 0-3)" },
  { name: "thal", label: "Thal (0-3)" },
];

export default function Home() {
  const [result, setResult] = useState<PredictionResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [form, setForm] = useState<PatientForm>({
    age: "",
    sex: "",
    cp: "",
    trestbps: "",
    chol: "",
    fbs: "",
    restecg: "",
    thalach: "",
    exang: "",
    oldpeak: "",
    slope: "",
    ca: "",
    thal: "",
  });

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(){
      setLoading(true)
      setError(null)
      setResult(null)

      try{
        const payload = Object.fromEntries(
          Object.entries(form).map(([key, value]) => [key, Number(value)])
        );

        const res = await fetch(`${API_URL}/predict`, {
          method : "POST",
          headers: {"Content-type":"application/json"},
          body: JSON.stringify(payload)
        })
        if(!res.ok) throw new Error(`Error ${res.status}`)

        const data: PredictionResult = await res.json()
        setResult(data)
      }
      catch(err){
        setError("The prediction could not be obtained")
      }
      finally{
        setLoading(false)
      }
  }

  return (
    <Box
      minH="100vh"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      p={8}
    >
      <Heading size="2xl">Heart Disease Risk Predictor</Heading>
      <SimpleGrid column={2} gap={4}>
        {FIELDS.map((f)=>(
          <Box key={f.name}>
            <Text mb={1} fontSize="sm">
              {f.label}
            </Text>
            <Input
              name={f.name}
              type="number"
              value={form[f.name]}
              onChange={handleChange}
        />
          </Box>
        ))}
      </SimpleGrid>
      <Button mt={6} colorPalette="blue" onClick={handleSubmit}>
        Predict risk
      </Button>
      {error && <Text mb={4} color="red.500">{error}</Text>}
      {result && (
        <Text mt={4} fontSize="lg">
          {result.risk_label} - {(result.probability * 100).toFixed(1)}%
        </Text>
      )}
    </Box>
  );
}
