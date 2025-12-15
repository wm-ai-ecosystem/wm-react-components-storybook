export interface ChartTooltipProps {
  active?: boolean;
  payload?: Array<{
    value: number;
    name: string;
    color: string;
    dataKey: string;
  }>;
  label?: string | number;
  xDataKeyArr?: string[];
  numberFormat?: string;
}

export const getHeaderLabel = (
  label: string | number | undefined,
  xDataKeyArr?: string[]
): string => {
  if (label === undefined) return "";

  // If label is a number, use it as array index
  if (typeof label === "number") {
    return xDataKeyArr?.[label] || String(label);
  }

  // Try parsing string as number for array index
  const numericIndex = parseInt(label, 10);
  if (!isNaN(numericIndex) && xDataKeyArr) {
    return xDataKeyArr[numericIndex] || label;
  }

  // Fallback to label as string
  return String(label);
};
