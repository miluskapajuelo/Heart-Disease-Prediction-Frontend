import {
  Field,
  Input,
  InputGroup,
  NativeSelect,
  SegmentGroup,
  Slider,
  HStack,
  Text,
  Icon,
  Box,
  IconButton
} from "@chakra-ui/react";
import { Info } from "lucide-react";
import { Tooltip } from '@/components/ui/tooltip';
import type { FieldConfig } from "@/data/fields";

interface FieldInputProps {
  field: FieldConfig;
  value: string;
  placeholder: string;
  error?: string;
  onChange: (name: string, value: string) => void;
}

export function FieldInput({ field, value, placeholder, error, onChange }: FieldInputProps) {
  return (
    <Field.Root invalid={!!error}>
      <Field.Label display="flex" alignItems="center" gap={1.5} fontWeight="600">
        {field.label}
        {field.unit && (
          <Text as="span" color="fg.muted" fontWeight="400" fontSize="sm">
            ({field.unit})
          </Text>
        )}
       {field.tooltip && 
       (<Tooltip content={field.tooltip} showArrow>
        <IconButton
            type="button"
            variant="ghost"
            aria-label={`More information about ${field.label}`}
            color="fg.muted"
            _hover={{ color: "brand.500" }}
            lineHeight="0"
          >
            <Icon as={Info} boxSize={4} />
          </IconButton>
        </Tooltip>)} 
          
      </Field.Label>

      {field.type === "number" && (
        <InputGroup endElement={field.unit ? <Text color="fg.muted" fontSize="sm">{field.unit}</Text> : undefined}>
          <Input
            type="number"
            inputMode="decimal"
            value={value}
            placeholder={field.placeholder}
            onChange={(e) => onChange(field.name, e.target.value)}
            borderRadius="l1"
            size="lg"
          />
        </InputGroup>
      )}

      {field.type === "select" && (
        <NativeSelect.Root size="lg">
          <NativeSelect.Field
            value={value}
            onChange={(e) => onChange(field.name, e.target.value)}
            borderRadius="l1"
          >
            <option value="" disabled>
              Select an option
            </option>
            {field.options?.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </NativeSelect.Field>
          <NativeSelect.Indicator />
        </NativeSelect.Root>
      )}

      {field.type === "segmented" && (
        <SegmentGroup.Root
          value={value}
          onValueChange={(e) => onChange(field.name, e.value ?? "")}
          size="lg"
        >
          <SegmentGroup.Indicator />
          <SegmentGroup.Items items={field.options ?? []} />
        </SegmentGroup.Root>
      )}

      {field.type === "slider" && (
        <Box w="full" pt={1}>
          <HStack justify="space-between" mb={2}>
            <Text fontSize="sm" color="fg.muted">
              {field.min} – {field.max} {field.unit}
            </Text>
            <Text fontSize="sm" fontWeight="700" color="brand.600">
              {value || field.placeholder || field.min}
            </Text>
          </HStack>
          <Slider.Root
            min={field.min}
            max={field.max}
            step={field.step}
            value={[value === "" ? Number(field.min) : Number(value)]}
            onValueChange={(e) => onChange(field.name, String(e.value[0]))}
            colorPalette="brand"
          >
            <Slider.Control>
              <Slider.Track>
                <Slider.Range />
              </Slider.Track>
              <Slider.Thumbs />
            </Slider.Control>
          </Slider.Root>
        </Box>
      )}

      {field.helper && !error && (
        <Field.HelperText color="fg.muted">{field.helper}</Field.HelperText>
      )}
      <Field.ErrorText>{error}</Field.ErrorText>
    </Field.Root>
  );
}
