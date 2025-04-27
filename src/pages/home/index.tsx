import '../home/homepage.scss';
import { useGetSpaceImageQuery } from '../../redux/apiSlice';
import getError from '../../utils/getError';
import Loader from '../../components/loader/Loader';

const backgroundStyle = {
  backgroundImage: `url(${process.env.PUBLIC_URL}/img/bg_homepage.jpg)`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
};

const Homepage = () => {
  const { data, isLoading, error } = useGetSpaceImageQuery(undefined);

  if (isLoading) {
    return (
      <div className="homepage" style={backgroundStyle}>
        <Loader />
      </div>
    );
  }

  const errorJSX = getError(error);
  if (errorJSX) {
    return (
      <div className="homepage" style={backgroundStyle}>
        {errorJSX}
      </div>
    );
  }

  return (
    <div className="homepage" style={backgroundStyle}>
      <h1>Space Image of the Day Viewer</h1>
      <div className="image-container fade-in">
        <h2>{data?.title}</h2>
        <p>{data?.date}</p>
        <img
          src={data?.url}
          alt={data?.title}
          loading="lazy"
          className="image"
        />
        <p className="description">{data?.explanation}</p>
      </div>
    </div>
  );
};

export default Homepage;
