import '../home/homepage.scss';
import { useGetSpaceImageQuery } from '../../redux/apiSlice';
import getError from '../../utils/getError';
import Loader from '../../components/loader/Loader';
import { useState, useEffect } from 'react';
import { getLastDates } from '../../utils/getLastDates';
import PhotoModal from '../../components/modal/PhotoModal';
import PhotoCards from '../../components/cards/PhotoCards';

const backgroundStyle = {
  backgroundImage: `url(${process.env.PUBLIC_URL}/img/bg_homepage.jpg)`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
};

const Homepage = () => {
  const { data, isLoading, error } = useGetSpaceImageQuery(undefined);

  const [showGallery, setShowGallery] = useState(false);
  const [galleryPhotos, setGalleryPhotos] = useState<any[]>([]);
  const [galleryLoading, setGalleryLoading] = useState(false);
  const [galleryError, setGalleryError] = useState<unknown>(null);
  const [likedPhotos, setLikedPhotos] = useState<string[]>([]);
  const [selectedPhoto, setSelectedPhoto] = useState<any>(null);

  useEffect(() => {
    const savedLikes = JSON.parse(localStorage.getItem('likedPhotos') || '[]');
    setLikedPhotos(savedLikes);
  }, []);

  const handleShowGallery = async () => {
    setShowGallery(true);
    setGalleryLoading(true);
    try {
      const dates = getLastDates();
      const requests = dates.map((date) =>
        fetch(
          `https://api.nasa.gov/planetary/apod?date=${date}&api_key=${process.env.REACT_APP_NASA_KEY}`
        ).then((res) => res.json())
      );
      const results = await Promise.all(requests);
      setGalleryPhotos(results);
    } catch (err) {
      setGalleryError(err);
    } finally {
      setGalleryLoading(false);
    }
  };

  const handleBack = () => {
    setShowGallery(false);
  };

  const toggleLike = (photoUrl: string) => {
    if (!photoUrl) return;
    let updatedLikes;
    if (likedPhotos.includes(photoUrl)) {
      updatedLikes = likedPhotos.filter((url) => url !== photoUrl);
    } else {
      updatedLikes = [...likedPhotos, photoUrl];
    }
    setLikedPhotos(updatedLikes);
    localStorage.setItem('likedPhotos', JSON.stringify(updatedLikes));
  };

  if (isLoading) {
    return (
      <div className="homepage" style={backgroundStyle}>
        <Loader />
      </div>
    );
  }

  const errorJSX = getError(error);
  if (errorJSX) {
    return (
      <div className="homepage" style={backgroundStyle}>
        {errorJSX}
      </div>
    );
  }

  return (
    <div className="homepage" style={backgroundStyle}>
      {!showGallery ? (
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
          <button className="gallery-button" onClick={handleShowGallery}>
            See last 7 days
          </button>
        </>
      ) : (
        <>
          <button className="gallery-button" onClick={handleBack}>
            Back to todays image
          </button>
          <h1>Last 7 Days Gallery</h1>
          {galleryLoading ? (
            <Loader />
          ) : galleryError ? (
            getError(galleryError)
          ) : (
            <div className="gallery">
              {galleryPhotos
                .filter((photo) => photo.media_type === 'image')
                .map((photo, index) =>
                  photo.url ? (
                    <PhotoCards
                      key={index}
                      photo={photo}
                      isLiked={likedPhotos.includes(photo.url)}
                      onLike={toggleLike}
                      onOpen={setSelectedPhoto}
                    />
                  ) : null
                )}
            </div>
          )}
        </>
      )}
      {selectedPhoto && (
        <PhotoModal
          photo={selectedPhoto}
          onClose={() => setSelectedPhoto(null)}
        />
      )}
    </div>
  );
};

export default Homepage;
