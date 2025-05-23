import { render } from '@testing-library/react';
import Newspage from './index';
import { useGetNasaNotificationsQuery } from '../../redux/apiSlice';

jest.mock('../../redux/apiSlice');

describe('Newspage component', () => {
  it('should render notifications correctly', () => {
    (useGetNasaNotificationsQuery as jest.Mock).mockReturnValue({
      data: [
        {
          messageID: '1',
          messageType: 'Test Type',
          messageIssueTime: '2024-04-24T12:00:00Z',
          messageBody:
            'Summary: Test summary text ## Notes: Notes: Some additional notes',
          messageURL: 'https://example.com/full-message',
        },
      ],
      isLoading: false,
      isError: false,
    });

    const { asFragment } = render(<Newspage />);
    expect(asFragment()).toMatchSnapshot();
  });
});
