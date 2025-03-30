import { mockRoverPhoto } from '../mocks/mockRoverPhoto';
import '../styles/photopage.scss';

const backgroundStyle = {
  backgroundImage: `url(${process.env.PUBLIC_URL}/img/bg_photopage.jpg)`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
};

const Photopage = () => {
  return (
    <div className="photopage" style={backgroundStyle}>
      {mockRoverPhoto.photos.map((photo) => (
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
