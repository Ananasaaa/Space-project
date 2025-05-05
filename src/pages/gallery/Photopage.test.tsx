import { render } from '@testing-library/react';
import Photopage from './index';
import { useGetMarsPhotosQuery } from '../../redux/apiSlice';

jest.mock('../../redux/apiSlice');

describe('Photopage component', () => {
  it('should render photos correctly', () => {
    (useGetMarsPhotosQuery as jest.Mock).mockReturnValue({
      data: {
        photos: [
          {
            id: '1',
            camera: { full_name: 'Test Camera' },
            sol: 1000,
            earth_date: '2024-04-20',
            img_src: 'https://example.com/photo.jpg',
          },
        ],
      },
      isLoading: false,
      error: null,
    });

    const { asFragment } = render(<Photopage />);
    expect(asFragment()).toMatchSnapshot();
  });
});
