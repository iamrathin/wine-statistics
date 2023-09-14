import WineData from "../interfaces/IWineData";

// Calculate the mean (average) of an array of numbers
export const calculateMean = (data: number[]): number => {
  const sum = data.reduce((acc, val) => acc + val, 0);
  return sum / data.length;
};

// Calculate the median (middle value) of an array of numbers
export const calculateMedian = (data: number[]): number => {
  const sortedData = [...data].sort((a, b) => a - b);
  const mid = Math.floor(data.length / 2);
  if (data.length % 2 === 0) {
    return (sortedData[mid - 1] + sortedData[mid]) / 2;
  }
  return sortedData[mid];
};

// Calculate the mode (most frequent value) of an array of numbers
export const calculateMode = (data: number[]): number => {
  const counts: Record<number, number> = {};
  let maxCount = 0;
  let mode = NaN;
  for (const num of data) {
    counts[num] = (counts[num] || 0) + 1;
    if (counts[num] > maxCount) {
      maxCount = counts[num];
      mode = num;
    }
  }
  return mode;
};


/**
 * Calculate statistics (mean, median, mode) for each class in the dataset.
 * @param wineData - Array of wine data objects.
 * @param dataByClass - Data grouped by class.
 * @param propertyKey - Property key to calculate statistics for.
 * @returns A record containing statistics for each class.
 */
export function calculateStatisticsByClass(
  wineData: WineData[],
  dataByClass: Record<number, number[]>,
  propertyKey: string
): Record<number, [number, number, number]> {
  const statisticsByClass: Record<number, [number, number, number]> = {};

  for (const alcoholClass in dataByClass) {
    const data = dataByClass[parseInt(alcoholClass)];
    statisticsByClass[parseInt(alcoholClass)] = [
      calculateMean(data),
      calculateMedian(data),
      calculateMode(data),
    ];
  }

  return statisticsByClass;
}
