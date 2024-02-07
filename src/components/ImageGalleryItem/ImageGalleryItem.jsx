import styles from "./ImageGalleryItem.module.css";
import PropTypes from "prop-types";

const ImageGalleryItem = ({ image, onClick }) => {
  const { id, webformatURL, tags } = image;

  return (
    <li className={styles.galleryItem} key={id}>
      <img
        src={webformatURL}
        alt={tags}
        className={styles.galleryItemImage}
        onClick={() => onClick(image)}
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  image: PropTypes.shape({
    id: PropTypes.string.isRequired, // Змінено на string
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
