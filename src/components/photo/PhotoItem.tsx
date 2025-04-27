import { useState } from 'react';

interface PhotoItemProps {
  photo: {
    img_src: string;
    camera: { full_name: string };
    sol: number;
    earth_date: string;
  };
}

const PhotoItem = ({ photo }: PhotoItemProps) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="photo-container">
      {isLoading && <div className="mini-loader"></div>}

      <img
        src={photo.img_src.replace('http://', 'https://')}
        alt={photo.camera.full_name}
        loading="lazy"
        onLoad={() => setIsLoading(false)}
        style={{
          opacity: isLoading ? 0 : 1,
          transition: 'opacity 0.5s ease-in-out',
          width: '100%',
          height: 'auto',
          display: 'block',
        }}
      />

      <h3>{photo.camera.full_name}</h3>
      <p>Sol: {photo.sol}</p>
      <p>Date on Earth: {photo.earth_date}</p>
    </div>
  );
};

export default PhotoItem;
