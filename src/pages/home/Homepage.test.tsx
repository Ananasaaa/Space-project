import { render } from '@testing-library/react';
import Homepage from './index';
import { useGetSpaceImageQuery } from '../../redux/apiSlice';

jest.mock('../../redux/apiSlice');

describe('Homepage component', () => {
  it('should render the title, date, image, and description without redux store', () => {
    (useGetSpaceImageQuery as jest.Mock).mockReturnValue({
      data: {
        title: 'Test Space Image',
        date: '2024-04-26',
        url: 'https://example.com/image.jpg',
        explanation: 'Test explanation about the space image.',
      },
      isLoading: false,
      error: null,
    });

    const { asFragment } = render(<Homepage />);
    expect(asFragment()).toMatchSnapshot();
  });
});
