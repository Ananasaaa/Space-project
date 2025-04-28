import '../modal/photoModal.scss';

interface PhotoModalProps {
  photo: {
    url: string;
    title: string;
    explanation?: string;
  };
  onClose: () => void;
}

const PhotoModal = ({ photo, onClose }: PhotoModalProps) => {
  if (!photo) return null;

  return (
    <div className="modal" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <img src={photo.url} alt={photo.title} />
        <h2>{photo.title}</h2>
        <p>{photo.explanation || 'No description available.'}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default PhotoModal;
