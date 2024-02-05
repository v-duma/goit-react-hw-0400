import Modal from "react-modal";
import "./ImageModal.css";

const ImageModal = ({ isOpen, onRequestClose, imageUrl, altDescription }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Image Modal"
      className="image-modal"
      overlayClassName="image-modal-overlay"
    >
      <img src={imageUrl} alt={altDescription} style={{ width: "100%" }} />
    </Modal>
  );
};

export default ImageModal;
