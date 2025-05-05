import Loader from '../common/loader/Loader';
import PhotoCards from './PhotoCards';
import renderError from '../../utils/error/renderError';

interface GalleryViewProps {
  photos: any[];
  loading: boolean;
  error: unknown;
  likedPhotos: string[];
  onLike: (url: string) => void;
  onBack: () => void;
  onOpenModal: (photo: any) => void;
}

const GalleryView = ({
  photos,
  loading,
  error,
  likedPhotos,
  onLike,
  onBack,
  onOpenModal,
}: GalleryViewProps) => {
  return (
    <>
      <button className="gallery-button" onClick={onBack}>
        Back to todays image
      </button>
      <h1>Last 7 Days Gallery</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        renderError(error)
      ) : (
        <div className="gallery">
          {photos
            .filter((photo) => photo.media_type === 'image')
            .map((photo, index) =>
              photo.url ? (
                <PhotoCards
                  key={index}
                  photo={photo}
                  isLiked={likedPhotos.includes(photo.url)}
                  onLike={onLike}
                  onOpen={onOpenModal}
                />
              ) : null
            )}
        </div>
      )}
    </>
  );
};

export default GalleryView;
