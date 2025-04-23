import s from "./ImageCard.module.css";

const ImageCard = ({ src, alt, onClick }) => {
  return (
    <div className={s.card} onClick={onClick}>
      <img src={src} alt={alt} />
    </div>
  );
};

export default ImageCard;
