export const convertTemperature = (
  tempC: number | undefined,
  unit: 'C' | 'F'
): string => {
  if (tempC === undefined) return 'N/A';

  const temp = unit === 'C' ? tempC : (tempC * 9) / 5 + 32;
  return `${Math.round(temp)}°${unit}`;
};
