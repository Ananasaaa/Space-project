import { JSX } from 'react';

const getError = (error: unknown): JSX.Element | null => {
  if (!error) return null;

  if (typeof error === 'object' && error !== null) {
    if ('data' in error) {
      return <div>Error: {JSON.stringify(error.data)}</div>;
    }
    if ('status' in error) {
      return <div>Error: Status {(error as { status: number }).status}</div>;
    }
  }

  return <div>An unknown error occurred</div>;
};
export default getError;
