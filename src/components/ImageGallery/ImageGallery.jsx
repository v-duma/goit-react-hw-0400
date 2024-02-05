import { useState } from "react";
import { Loader } from "../Loader/Loader";
import ImageModal from "../ImageModal/ImageModal";

const ImageGallery = ({ images, loading }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState({});

  const openModal = (image) => {
    setSelectedImage(image);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setSelectedImage({});
    setModalIsOpen(false);
  };

  return (
    <>
      <ul>
        {images.map((image) => (
          <li key={image.id}>
            <img
              src={image.urls.small}
              alt={image.alt_description}
              onClick={() => openModal(image)}
            />
          </li>
        ))}
      </ul>
      {loading && <Loader />}
      <ImageModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        imageUrl={selectedImage.urls?.regular}
        altDescription={selectedImage.alt_description}
      />
    </>
  );
};

export default ImageGallery;
