import { useGetMarsPhotosQuery } from '../../redux/apiSlice';
import '../gallery/photopage.scss';

const backgroundStyle = {
  backgroundImage: `url(${process.env.PUBLIC_URL}/img/bg_photopage.jpg)`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
};

const Photopage = () => {
  const { data, error, isLoading } = useGetMarsPhotosQuery({
    sol: 1001,
    page: 1,
  });

  console.log('Photos from API:', data?.photos);

  if (isLoading) return <div>Loading photos...</div>;
  if (error) return <div>Failed to load photos 😞</div>;

  const photos = data?.photos || [];

  return (
    <div className="photopage" style={backgroundStyle}>
      {photos.length === 0 && <p>No photos found.</p>}

      {photos.slice(0, 5).map((photo: any) => (
        <div className="photo-container" key={photo.id}>
          <h3>{photo.camera.full_name}</h3>
          <p>Sol: {photo.sol}</p>
          <p>Date on Earth: {photo.earth_date}</p>
          <img src={photo.img_src} alt={photo.camera.full_name} />
        </div>
      ))}
    </div>
  );
};

export default Photopage;
