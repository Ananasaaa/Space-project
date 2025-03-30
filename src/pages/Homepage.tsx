import { mockImage } from '../mocks/mockImg';
import '../styles/homepage.scss';

const backgroundStyle = {
  backgroundImage: `url(${process.env.PUBLIC_URL}/img/bg_homepage.jpg)`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
};

const Homepage = () => {
  return (
    <div className="homepage" style={backgroundStyle}>
      <h1>Space Image of the Day Viewer</h1>
      <div className="image-container">
        <h2>{mockImage.title}</h2>
        <p>{mockImage.date}</p>
        <img src={mockImage.url} alt={mockImage.title} className="image" />
        <p className="description">{mockImage.explanation}</p>
      </div>
    </div>
  );
};

export default Homepage;
