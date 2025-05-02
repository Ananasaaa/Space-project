import './homepage.scss';
import { useGetSpaceImageQuery } from '../../redux/apiSlice';
import renderError from '../../utils/error/renderError';
import Loader from '../../components/common/loader/Loader';
import { useState, useEffect } from 'react';

import PhotoModal from '../../components/common/modal/PhotoModal';

import { fetchLastSevenImg } from '../../utils/fetch/fetchLastSevenImg';
import TodayImage from '../../components/home/TodayImage';
import GalleryView from '../../components/home/GalleryView';

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
      const results = await fetchLastSevenImg(process.env.REACT_APP_NASA_KEY!);
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

  const errorJSX = renderError(error);
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
        <TodayImage data={data} onOpenGallery={handleShowGallery} />
      ) : (
        <GalleryView
          photos={galleryPhotos}
          loading={galleryLoading}
          error={galleryError}
          likedPhotos={likedPhotos}
          onLike={toggleLike}
          onBack={handleBack}
          onOpenModal={setSelectedPhoto}
        />
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
