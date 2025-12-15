/**
 * Calculates cumulative sum for a specific data key
 */
const calculateCumulativeSum = (data: any[], dataKey: string, currentIndex: number): number => {
  return data.slice(0, currentIndex + 1).reduce((sum, item) => sum + (item[dataKey] || 0), 0);
};

/**
 * Transforms data array into cumulative data
 */
export const calculateCumulativeData = (data: any[], dataKeys: string[]) => {
  if (!data?.length || !dataKeys?.length) {
    return [];
  }

  return data.map((item, index, array) => {
    const cumulativeItem = { ...item };

    dataKeys.forEach(dataKey => {
      cumulativeItem[dataKey] = calculateCumulativeSum(array, dataKey, index);
    });

    return cumulativeItem;
  });
};
