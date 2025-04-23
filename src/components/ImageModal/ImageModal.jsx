import { useEffect } from "react";
import Modal from "react-modal";
import s from "./ImageModal.module.css";

Modal.setAppElement("#root");

const ImageModal = ({ isOpen, onClose, photo }) => {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!photo) return null;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      closeTimeoutMS={300}
      overlayClassName={s.overlay}
      className={s.modal}
    >
      <div className={s.wrapper}>
        <img
          className={s.photo}
          src={photo.urls.regular}
          alt={photo.alt_description}
        />
        <div className={s.description}>
          {photo.description && <p>{photo.alt_description}</p>}
          <p>Author: {photo.user.name}</p>
          <p>Likes: {photo.likes}</p>
        </div>
      </div>
    </Modal>
  );
};

export default ImageModal;
