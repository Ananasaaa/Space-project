import { Link } from 'react-router-dom';
import '../styles/navbar.scss';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar__left">
        <Link to="/" className="navbar__title">
          Space Explorer
        </Link>
      </div>
      <ul className="navbar__list">
        <li className="navbar__item">
          <Link to="/" className="navbar__link">
            Home
          </Link>
        </li>
        <li>
          <Link to="/news" className="navbar__link">
            News
          </Link>
        </li>
        <li>
          <Link to="/gallery" className="navbar__link">
            Gallery
          </Link>
        </li>
        <li>
          <Link to="/weather" className="navbar__link">
            Weather
          </Link>
        </li>
      </ul>
    </nav>
  );
};
export default Navbar;
