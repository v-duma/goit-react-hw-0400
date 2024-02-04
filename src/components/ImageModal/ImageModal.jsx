import { useState, useEffect } from "react";
import Modal from "react-modal";

const ImageModal = ({ isOpen, onRequestClose, imageUrl, alt }) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  useEffect(() => {
    // Скидання стану isImageLoaded при кожному відкритті модального вікна
    setIsImageLoaded(false);
  }, [isOpen]);

  const handleImageLoad = () => {
    setIsImageLoaded(true);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Image Modal"
      overlayClassName="modal-overlay"
      className="modal-content"
    >
      <div>
        {isImageLoaded ? (
          <img src={imageUrl} alt={alt} onLoad={handleImageLoad} />
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </Modal>
  );
};

export default ImageModal;
