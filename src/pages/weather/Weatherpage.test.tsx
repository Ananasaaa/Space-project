import { render } from '@testing-library/react';
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

    const { asFragment } = render(<Weatherpage />);
    expect(asFragment()).toMatchSnapshot();
  });
});
