import '../../pages/home/index';

interface TodayImageProps {
  data: any;
  onOpenGallery: () => void;
}

const TodayImage = ({ data, onOpenGallery }: TodayImageProps) => {
  return (
    <>
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
      <button className="gallery-button" onClick={onOpenGallery}>
        See last 7 days
      </button>
    </>
  );
};

export default TodayImage;
