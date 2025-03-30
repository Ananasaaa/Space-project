export interface WeatherData {
  sol: number;
  time: string;
  temperature: { low: number; high: number; average: number };
  pressure: { average: number; max: number; min: number };
  windspeed: { average: number; max: number; direction: string };
}

export const mockWeather: { sol_keys: string[]; [key: string]: any } = {
  sol_keys: ['1001', '1002', '1003'],
  '1001': {
    sol: 1001,
    time: '2025-03-30T00:00:00',
    temperature: { low: -75.0, high: -55.0, average: -65.0 },
    pressure: { average: 750.1, max: 755.0, min: 745.3 },
    windspeed: { average: 5.0, max: 7.0, direction: 'north' },
  },
  '1002': {
    sol: 1002,
    time: '2025-03-31T00:00:00',
    temperature: { low: -74.0, high: -56.0, average: -65.0 },
    pressure: { average: 748.2, max: 752.4, min: 744.1 },
    windspeed: { average: 6.0, max: 8.0, direction: 'south' },
  },
  '1003': {
    sol: 1003,
    time: '2025-04-01T00:00:00',
    temperature: { low: -72.0, high: -58.0, average: -65.0 },
    pressure: { average: 743.2, max: 759.4, min: 744.1 },
    windspeed: { average: 7.0, max: 6.0, direction: 'north' },
  },
};
