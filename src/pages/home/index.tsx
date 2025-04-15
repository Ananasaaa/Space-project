import '../home/homepage.scss';
import { useGetSpaceImageQuery } from '../../redux/apiSlice';

const backgroundStyle = {
  backgroundImage: `url(${process.env.PUBLIC_URL}/img/bg_homepage.jpg)`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
};

const Homepage = () => {
  const { data, isLoading, error } = useGetSpaceImageQuery(undefined);

  if (isLoading) return <div>Загрузка...</div>;
  if (error) {
    if ('data' in error) {
      return <div>Ошибка: {JSON.stringify(error.data)}</div>;
    } else if ('status' in error) {
      return <div>Ошибка: Статус {error.status}</div>;
    }
    return <div>Произошла неизвестная ошибка</div>;
  }
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
