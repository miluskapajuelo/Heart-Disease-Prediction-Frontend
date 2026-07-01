/**
 * ============================================================================
 *  DESIGN SYSTEM — Heart Disease Risk Calculator
 * ============================================================================
 *  Color Palette Rationale (Clinical + Psychological):
 *
 *  brand (Deep Medical Blue)  → Blue conveys trust, calmness, and a
 *                                "medical-grade" feel. It is the dominant
 *                                color used in healthcare products such as
 *                                Epic, Philips, and One Medical. It helps
 *                                reduce patient anxiety when addressing a
 *                                sensitive topic like heart health.
 *
 *  cyan / teal (Accent)       → Accent colors used for AI-related elements
 *                                and data visualization. They communicate
 *                                technology, innovation, and precision
 *                                without being visually overwhelming.
 *
 *  Risk Scale (NEVER use pure red #FF0000, as it unnecessarily triggers alarm):
 *  riskLow      → Emerald  (#10B981)  Calm green, indicating everything is
 *                                     within a healthy range.
 *  riskModerate → Amber    (#F59E0B)  Amber signals attention is needed,
 *                                     but not panic.
 *  riskHigh     → Orange   (#F97316)  Orange communicates a significant
 *                                     concern without implying immediate danger.
 *  riskCritical → Soft Red (#E04F5F)  A softened red that conveys seriousness
 *                                     while maintaining a reassuring,
 *                                     human-centered experience.
 *
 *  Off-White background (#F7F9FC) combined with white cards creates a soft
 *  visual hierarchy, avoiding the harsh contrast of pure white backgrounds.
 *  Use a very dark gray (#1A2233) instead of absolute black for body text to
 *  reduce eye strain, following recommendations from Material Design 3 and
 *  IBM Carbon Design System.
 * ============================================================================
 */

import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

const config = defineConfig({
  theme: {
    tokens: {
      fonts: {
        // Plus Jakarta Sans: geométrica, humanista, moderna. Excelente
        // legibilidad en números (clave en un formulario clínico) y un
        // carácter cálido que evita el tono frío/corporativo.
        heading: { value: "var(--font-jakarta), system-ui, sans-serif" },
        body: { value: "var(--font-jakarta), system-ui, sans-serif" },
      },
      colors: {
        brand: {
          50: { value: "#E8F1FC" },
          100: { value: "#C7DDF7" },
          200: { value: "#9CC2F0" },
          300: { value: "#6BA3E6" },
          400: { value: "#3F84D8" },
          500: { value: "#1F6FCB" }, // Primary — Deep Medical Blue
          600: { value: "#155DB0" },
          700: { value: "#0E4A91" },
          800: { value: "#093A73" },
          900: { value: "#052B57" },
        },
      },
      radii: {
        // Border radius generoso (16px en cards) = lenguaje suave, premium,
        // alineado con Apple Health / Material 3.
        l1: { value: "10px" },
        l2: { value: "16px" },
        l3: { value: "24px" },
      },
      shadows: {
        // Sombras suaves y difusas (no duras) → sensación de elevación
        // calmada, no de alerta.
        card: { value: "0 1px 3px rgba(16,33,64,0.06), 0 8px 24px rgba(16,33,64,0.06)" },
        cardHover: { value: "0 2px 6px rgba(16,33,64,0.08), 0 16px 40px rgba(16,33,64,0.10)" },
      },
    },
    semanticTokens: {
      colors: {
        // Permite usar colorPalette="brand" en botones, sliders, etc.
        brand: {
          solid: { value: "{colors.brand.500}" },
          contrast: { value: "#FFFFFF" },
          fg: { value: "{colors.brand.700}" },
          muted: { value: "{colors.brand.100}" },
          subtle: { value: "{colors.brand.50}" },
          emphasized: { value: "{colors.brand.600}" },
          focusRing: { value: "{colors.brand.500}" },
        },
        // Superficies
        bg: {
          canvas: { value: "#F7F9FC" }, // Off-white
          surface: { value: "#FFFFFF" }, // Cards
        },
        fg: {
          DEFAULT: { value: "#1A2233" }, // Texto principal (no negro)
          muted: { value: "#5A6478" }, // Texto secundario / helper
        },
        // Escala clínica de riesgo (solid = relleno, subtle = fondo, fg = texto)
        riskLow: {
          solid: { value: "#10B981" },
          fg: { value: "#047857" },
          subtle: { value: "#D1FAE5" },
        },
        riskModerate: {
          solid: { value: "#F59E0B" },
          fg: { value: "#B45309" },
          subtle: { value: "#FEF3C7" },
        },
        riskHigh: {
          solid: { value: "#F97316" },
          fg: { value: "#C2410C" },
          subtle: { value: "#FFEDD5" },
        },
        riskCritical: {
          solid: { value: "#E04F5F" },
          fg: { value: "#B23241" },
          subtle: { value: "#FCE3E6" },
        },
      },
    },
  },
  globalCss: {
    "html, body": {
      bg: "bg.canvas",
      color: "fg",
    },
    // Accesibilidad: respeta a quien prefiere menos animación (WCAG 2.3.3).
    "@media (prefers-reduced-motion: reduce)": {
      "&*": {
        animationDuration: "0.01ms !important",
        transitionDuration: "0.01ms !important",
      },
    },
  },
});

export const system = createSystem(defaultConfig, config);
