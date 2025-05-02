import './loader.scss';

const Loader = () => {
  return (
    <div className="fullscreen-loader">
      <div className="loader__spinner"></div>
      <p className="loader__text">Loading...</p>
    </div>
  );
};

export default Loader;
