import { render, screen } from '@testing-library/react';
import renderError from './renderError';

describe('renderError utility', () => {
  it('should return null if error is falsy', () => {
    const result = renderError(null);
    expect(result).toBeNull();
  });

  it('should render error with data field', () => {
    const error = { data: { message: 'Something went wrong' } };
    render(<>{renderError(error)}</>);
    expect(screen.getByText(/Something went wrong/)).toBeInTheDocument();
  });

  it('should render error with status field', () => {
    const error: unknown = { status: 404 };
    render(<>{renderError(error)}</>);
    expect(screen.getByText(/Status 404/)).toBeInTheDocument();
  });

  it('should render unknown error if error shape is unrecognized', () => {
    const error = { message: 'Unusual error' };
    render(<>{renderError(error)}</>);
    expect(screen.getByText(/An unknown error occurred/)).toBeInTheDocument();
  });
});
