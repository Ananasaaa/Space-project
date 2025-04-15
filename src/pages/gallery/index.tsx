/*import { useGetMarsPhotosQuery } from '../../redux/apiSlice';
import '../gallery/photopage.scss';

const backgroundStyle = {
  backgroundImage: `url(${process.env.PUBLIC_URL}/img/bg_photopage.jpg)`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
};

const Photopage = () => {
  const { data, error, isLoading } = useGetMarsPhotosQuery({
    sol: 4000,
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

export default Photopage;*/
import { useState } from 'react';
import { useGetMarsPhotosQuery } from '../../redux/apiSlice';
import '../gallery/photopage.scss';

const backgroundStyle = {
  backgroundImage: `url(${process.env.PUBLIC_URL}/img/bg_photopage.jpg)`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
};

const Photopage = () => {
  const [solInput, setSolInput] = useState('1000'); // строка из инпута
  const [sol, setSol] = useState(1000); // sol, по которому делаем запрос

  const { data, error, isLoading } = useGetMarsPhotosQuery({
    sol: Number(sol),
    page: 1,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSol(Number(solInput));
  };

  const photos = data?.photos || [];

  return (
    <div className="photopage" style={backgroundStyle}>
      <form onSubmit={handleSubmit} className="sol-form">
        <label htmlFor="sol">Enter Sol (day on Mars):</label>
        <input
          id="sol"
          type="text"
          value={solInput}
          onChange={(e) => setSolInput(e.target.value)}
        />
        <button type="submit">Load</button>
      </form>

      {isLoading && <div>Load photos...</div>}
      {error && <div>Ошибка при загрузке фото 😞</div>}
      {photos.length === 0 && !isLoading && !error && (
        <p>Нет фото для этого sol.</p>
      )}

      <div className="photo-grid">
        {photos.slice(0, 5).map((photo: any) => (
          <div className="photo-container" key={photo.id}>
            <h3>{photo.camera.full_name}</h3>
            <p>Sol: {photo.sol}</p>
            <p>Date on Earth: {photo.earth_date}</p>
            <img src={photo.img_src} alt={photo.camera.full_name} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Photopage;
