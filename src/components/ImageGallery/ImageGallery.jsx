import ImageCard from "../ImageCard/ImageCard";

const ImageGallery = ({ photos }) => {
  if (!photos || photos.length === 0) return null;

  return (
    <ul>
      {photos.map((photo) => (
        <li key={photo.id}>
          <ImageCard src={photo.urls.small} alt={photo.alt_description} />
        </li>
      ))}
    </ul>
  );
};

export default ImageGallery;
