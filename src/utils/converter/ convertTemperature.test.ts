import { convertTemperature } from './convertTemperature';

describe('convertTemperature utility', () => {
  it('should return N/A if temperature is undefined', () => {
    expect(convertTemperature(undefined, 'C')).toBe('N/A');
    expect(convertTemperature(undefined, 'F')).toBe('N/A');
  });

  it('should return temperature in Celsius with °C', () => {
    expect(convertTemperature(25, 'C')).toBe('25°C');
    expect(convertTemperature(0, 'C')).toBe('0°C');
    expect(convertTemperature(-5.6, 'C')).toBe('-6°C');
  });

  it('should convert Celsius to Fahrenheit and add °F', () => {
    expect(convertTemperature(0, 'F')).toBe('32°F');
    expect(convertTemperature(25, 'F')).toBe('77°F');
    expect(convertTemperature(-10, 'F')).toBe('14°F');
  });
});
