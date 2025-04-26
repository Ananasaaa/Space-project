import { render, screen } from '@testing-library/react';
import Weatherpage from './index';
import { useGetMarsWeatherQuery } from '../../redux/apiSlice';

jest.mock('../../redux/apiSlice');

describe('Weatherpage component', () => {
  it('should render weather cards correctly', () => {
    (useGetMarsWeatherQuery as jest.Mock).mockReturnValue({
      data: {
        sol_keys: ['1000'],
        '1000': {
          First_UTC: '2024-04-25T12:00:00Z',
          AT: { av: -65, mn: -80, mx: -50 },
          PRE: { av: 750 },
          WD: { most_common: { compass_point: 'N' } },
        },
      },
      isLoading: false,
      isError: false,
    });

    render(<Weatherpage />);

    expect(screen.getByText('Weather on Mars')).toBeInTheDocument();
    expect(screen.getByText('Sol 1000')).toBeInTheDocument();
    expect(screen.getByText('4/25/2024')).toBeInTheDocument(); // дата в формате MM/DD/YYYY
    expect(screen.getByText('Max: -50°C')).toBeInTheDocument();
    expect(screen.getByText('Min: -80°C')).toBeInTheDocument();
    expect(screen.getByText('Average: -65°C')).toBeInTheDocument();
    expect(screen.getByText('Pressure: 750 Pa')).toBeInTheDocument();
    expect(screen.getByText('Wind direction: N')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /Switch to/i })
    ).toBeInTheDocument();
  });
});
