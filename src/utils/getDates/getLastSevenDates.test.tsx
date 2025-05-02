import { getLastSevenDates } from './getLastSevenDates';

describe('getLastSevenDates', () => {
  it('should return an array of 7 dates in YYYY-MM-DD format', () => {
    const dates = getLastSevenDates();

    expect(dates).toHaveLength(7);
    dates.forEach((dateStr) => {
      expect(typeof dateStr).toBe('string');
      expect(dateStr).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    });

    const today = new Date().toISOString().split('T')[0];
    expect(dates[0]).toBe(today);
  });
});
