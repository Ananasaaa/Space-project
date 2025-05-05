import './homepage.scss';
import {
  useGetSpaceImageQuery,
  useGetLastSevenImgQuery,
} from '../../redux/apiSlice';
import renderError from '../../utils/error/renderError';
import Loader from '../../components/common/loader/Loader';
import { useState, useEffect } from 'react';
import PhotoModal from '../../components/common/modal/PhotoModal';
import TodayImage from '../../components/home/TodayImage';
import GalleryView from '../../components/home/GalleryView';

const backgroundStyle = {
  backgroundImage: `url(${process.env.PUBLIC_URL}/img/bg_homepage.jpg)`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
};

const Homepage = () => {
  const [showGallery, setShowGallery] = useState(false);
  const [likedPhotos, setLikedPhotos] = useState<string[]>([]);
  const [selectedPhoto, setSelectedPhoto] = useState<any>(null);

  const {
    data: todayImage,
    isLoading: todayLoading,
    error: todayError,
  } = useGetSpaceImageQuery(undefined);

  const {
    data: lastSevenPhotos,
    isLoading: galleryLoading,
    error: galleryError,
  } = useGetLastSevenImgQuery(undefined, { skip: !showGallery });

  useEffect(() => {
    const savedLikes = JSON.parse(localStorage.getItem('likedPhotos') || '[]');
    setLikedPhotos(savedLikes);
  }, []);

  const handleShowGallery = () => {
    setShowGallery(true);
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

  if (todayLoading) {
    return (
      <div className="homepage" style={backgroundStyle}>
        <Loader />
      </div>
    );
  }

  const errorJSX = renderError(todayError);
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
        <TodayImage data={todayImage} onOpenGallery={handleShowGallery} />
      ) : (
        <GalleryView
          photos={lastSevenPhotos || []}
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
