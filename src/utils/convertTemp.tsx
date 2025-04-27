export const convertTemp = (
  tempC: number | undefined,
  unit: 'C' | 'F'
): string => {
  if (tempC === undefined) return 'N/A';
  return unit === 'C' ? `${tempC}°C` : `${(tempC * 9) / 5 + 32}°F`;
};
