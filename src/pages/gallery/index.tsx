import { useState, useEffect } from 'react';
import { useGetMarsPhotosQuery } from '../../redux/apiSlice';
import '../gallery/photopage.scss';
import Loader from '../../components/common/loader/Loader';
import PhotoItem from '../../components/gallery/PhotoItem';

const backgroundStyle = {
  backgroundImage: `url(${process.env.PUBLIC_URL}/img/bg_photopage.jpg)`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
};

const Photopage = () => {
  const [sol, setSol] = useState(1000);
  const [inputValue, setInputValue] = useState('1000');

  const { data, error, isLoading } = useGetMarsPhotosQuery({
    sol: Number(sol),
    page: 1,
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      const parsed = parseInt(inputValue, 10);
      if (!isNaN(parsed)) {
        setSol(parsed);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [inputValue]);

  const photos = data?.photos || [];

  if (isLoading) {
    return (
      <div className="fullscreen-loader" style={backgroundStyle}>
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="photopage" style={backgroundStyle}>
        <div className="error">Error</div>
      </div>
    );
  }
  console.log('photos:', photos);

  return (
    <div className="photopage" style={backgroundStyle}>
      <div className="sol-block">
        <form className="sol-form" onSubmit={(e) => e.preventDefault()}>
          <label htmlFor="sol">Enter Sol (day on Mars):</label>
          <input
            id="sol"
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </form>

        {photos.length === 0 && !isLoading && !error && (
          <div className="no-photos">
            <p>No photos found for this Sol. Please try another day!</p>
          </div>
        )}
      </div>

      {photos.length > 0 && (
        <div className="photo-grid fade-in">
          {photos.slice(0, 5).map((photo: any) => (
            <PhotoItem key={photo.id} photo={photo} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Photopage;
