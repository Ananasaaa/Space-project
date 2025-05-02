import './photoCards.scss';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

interface PhotoCardProps {
  photo: {
    url: string;
    title: string;
    date: string;
  };
  isLiked: boolean;
  onLike: (photoUrl: string) => void;
  onOpen: (photo: any) => void;
}

const PhotoCards = ({ photo, isLiked, onLike, onOpen }: PhotoCardProps) => {
  return (
    <div className="photo-card">
      <img
        src={photo.url}
        alt={photo.title}
        onClick={() => onOpen(photo)}
        style={{ cursor: 'pointer' }}
      />
      <h2>{photo.title}</h2>
      <p>{photo.date}</p>
      <button
        className={`like-button ${isLiked ? 'liked' : ''}`}
        onClick={() => onLike(photo.url)}
      >
        {isLiked ? <FaHeart /> : <FaRegHeart />}
      </button>
    </div>
  );
};

export default PhotoCards;
