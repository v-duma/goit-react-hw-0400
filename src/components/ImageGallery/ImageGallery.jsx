const ImageGallery = ({ images, onImageClick }) => {
  if (!images || images.length === 0) {
    // Повертаємо null, якщо немає зображень
    return null;
  }

  return (
    <ul>
      {images.map((image) => (
        <li key={image.id}>
          <div
            onClick={() =>
              onImageClick(image.urls.small, image.alt_description || "Image")
            }
          >
            <img
              src={image.urls.small}
              alt={image.alt_description || "Image"}
            />
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ImageGallery;
