const ImageCard = ({ image }) => {
  return (
    <div>
      <img src={image.urls.regular} alt={image.alt_description || "Image"} />
    </div>
  );
};

export default ImageCard;
