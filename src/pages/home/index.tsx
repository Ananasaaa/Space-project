import '../home/homepage.scss';
import { useGetSpaceImageQuery } from '../../redux/apiSlice';
import { JSX } from 'react/jsx-runtime';

const backgroundStyle = {
  backgroundImage: `url(${process.env.PUBLIC_URL}/img/bg_homepage.jpg)`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
};

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

const Homepage = () => {
  const { data, isLoading, error } = useGetSpaceImageQuery(undefined);

  if (isLoading) return <div>Loading...</div>;
  const errorJSX = getError(error);
  if (errorJSX) return errorJSX;

  return (
    <div className="homepage" style={backgroundStyle}>
      <h1>Space Image of the Day Viewer</h1>
      <div className="image-container">
        <h2>{data?.title}</h2>
        <p>{data?.date}</p>
        <img src={data?.url} alt={data?.title} className="image" />
        <p className="description">{data?.explanation}</p>
      </div>
    </div>
  );
};

export default Homepage;
