import { fetchLastSevenImg } from './fetchLastSevenImg';
import { getLastSevenDates } from '../getDates/getLastSevenDates';

jest.mock('../getDates/getLastSevenDates', () => ({
  getLastSevenDates: jest.fn(),
}));

global.fetch = jest.fn();

describe('fetchLastSevenImg', () => {
  const mockDates = [
    '2024-04-20',
    '2024-04-21',
    '2024-04-22',
    '2024-04-23',
    '2024-04-24',
    '2024-04-25',
    '2024-04-26',
  ];

  const mockResponse = { title: 'Test Image' };

  beforeEach(() => {
    (getLastSevenDates as jest.Mock).mockReturnValue(mockDates);
    (global.fetch as jest.Mock).mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockResponse),
      })
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch images for the last 7 dates', async () => {
    const result = await fetchLastSevenImg('TEST_KEY');

    expect(getLastSevenDates).toHaveBeenCalled();
    expect(global.fetch).toHaveBeenCalledTimes(7);
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('api_key=TEST_KEY')
    );
    expect(result).toEqual([
      mockResponse,
      mockResponse,
      mockResponse,
      mockResponse,
      mockResponse,
      mockResponse,
      mockResponse,
    ]);
  });
});
