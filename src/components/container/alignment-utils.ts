/**
 * Utility functions for container alignment and spacing calculations
 */

// Types for better type safety
export interface AlignmentBase {
  justifyContent: string;
  alignItems: string;
}

export interface FlexStyles {
  display?: string;
  flexDirection?: string;
  flexWrap?: string;
  justifyContent?: string;
  alignItems?: string;
  alignContent?: string;
  gap?: string;
  rowGap?: string;
  columnGap?: string;
}

/**
 * Gets base alignment properties from alignment matrix
 */
export const getBaseAlignment = (alignmentMatrix: any, alignmentKey: string): AlignmentBase => {
  const base = alignmentMatrix?.[alignmentKey];
  return base || { justifyContent: "flex-start", alignItems: "stretch" };
};

/**
 * Swaps justify/align properties based on flex direction
 */
export const getDirectionalAlignment = (base: AlignmentBase, isRow: boolean) => ({
  justifyContent: isRow ? base.justifyContent : base.alignItems,
  alignItems: isRow ? base.alignItems : base.justifyContent,
});

/**
 * Formats numeric values to pixel strings
 */
export const formatPixelValue = (value: string | number | null | undefined): string | undefined => {
  if (!value || value === "auto") return undefined;
  return `${value}px`;
};

/**
 * Checks if a value is 'auto'
 */
export const isAutoValue = (value: string | number | undefined): boolean => value === "auto";

/**
 * Normalizes gap values, filtering out auto and invalid values
 */
export const normalizeGapValue = (value: string | number | undefined): string | number | null =>
  value && !isAutoValue(value) ? value : null;

/**
 * Creates base flex styles for alignment
 */
export const createBaseFlexStyles = (
  direction: string,
  hasWrap: boolean,
  justifyContent: string,
  alignItems: string
): FlexStyles => ({
  display: "flex",
  flexDirection: direction as any,
  flexWrap: hasWrap ? "wrap" : "nowrap",
  justifyContent,
  alignItems,
});

/**
 * Handles spacing logic when flex-wrap is disabled
 */
export const calculateNoWrapSpacing = (
  gap: string | number | undefined,
  normalizedGap: string | number | null,
  base: AlignmentBase,
  justifyContent: string,
  alignItems: string
): FlexStyles => {
  if (isAutoValue(gap)) {
    return {
      justifyContent: base.justifyContent,
      alignItems: base.alignItems,
    };
  }

  return {
    justifyContent,
    alignItems,
    gap: formatPixelValue(normalizedGap),
  };
};

/**
 * Handles spacing logic when flex-wrap is enabled
 */
export const calculateWrapSpacing = (
  gap: string | number | undefined,
  columngap: string | number | undefined,
  normalizedGap: string | number | null,
  normalizedColumnGap: string | number | null,
  normalizedRowGap: string | number | null,
  justifyContent: string,
  alignItems: string
): FlexStyles => {
  const gapIsAuto = isAutoValue(gap);
  const columnGapIsAuto = isAutoValue(columngap);

  // Both gaps are auto
  if (columnGapIsAuto && gapIsAuto) {
    return {
      justifyContent,
      alignContent: justifyContent,
    };
  }

  // Column gap is auto, row gap is fixed
  if (columnGapIsAuto && !gapIsAuto) {
    return {
      justifyContent,
      alignContent: alignItems,
      rowGap: formatPixelValue(normalizedRowGap),
    };
  }

  // Row gap is auto, column gap is fixed
  if (gapIsAuto && !columnGapIsAuto) {
    return {
      alignContent: "space-between",
      columnGap: formatPixelValue(normalizedColumnGap),
    };
  }

  // Both gaps have fixed values
  return calculateFixedGapSpacing(
    normalizedColumnGap,
    normalizedRowGap,
    justifyContent,
    alignItems
  );
};

/**
 * Calculates spacing when both gaps have fixed numeric values
 */
const calculateFixedGapSpacing = (
  normalizedColumnGap: string | number | null,
  normalizedRowGap: string | number | null,
  justifyContent: string,
  alignItems: string
): FlexStyles => {
  if (!normalizedColumnGap || !normalizedRowGap) {
    return {};
  }

  const baseStyles: FlexStyles = {
    alignContent: alignItems,
    justifyContent,
  };

  // If both gaps are equal, use shorthand
  if (normalizedColumnGap === normalizedRowGap) {
    return {
      ...baseStyles,
      gap: formatPixelValue(normalizedColumnGap),
    };
  }

  // Different values, use longhand
  return {
    ...baseStyles,
    gap: `${normalizedRowGap}px ${normalizedColumnGap}px`,
  };
};

/**
 * Main function to calculate alignment styles
 */
export const calculateAlignmentStyles = (
  alignmentMatrix: any,
  alignmentKey: string,
  direction: string,
  hasWrap: boolean
): FlexStyles => {
  const base = getBaseAlignment(alignmentMatrix, alignmentKey);
  const isRow = direction === "row";
  const { justifyContent, alignItems } = getDirectionalAlignment(base, isRow);

  return createBaseFlexStyles(direction, hasWrap, justifyContent, alignItems);
};

/**
 * Main function to calculate spacing styles
 */
export const calculateSpacingStyles = (
  alignmentMatrix: any,
  gap: string | number | undefined,
  columngap: string | number | undefined,
  alignment: string,
  direction: string,
  hasWrap: boolean
): FlexStyles => {
  const isRow = direction === "row";
  const base = getBaseAlignment(alignmentMatrix, alignment);
  const { justifyContent, alignItems } = getDirectionalAlignment(base, isRow);

  // Normalize all gap values
  const normalizedGap = normalizeGapValue(gap);
  const normalizedColumnGap = normalizeGapValue(columngap);
  const normalizedRowGap = hasWrap ? normalizedGap : null;

  // Choose appropriate spacing calculation based on wrap setting
  if (!hasWrap) {
    return calculateNoWrapSpacing(gap, normalizedGap, base, justifyContent, alignItems);
  }

  return calculateWrapSpacing(
    gap,
    columngap,
    normalizedGap,
    normalizedColumnGap,
    normalizedRowGap,
    justifyContent,
    alignItems
  );
};
