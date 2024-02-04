import { useState, useEffect } from "react";
import ImageGallery from "./ImageGallery/ImageGallery";
import { Audio } from "react-loader-spinner";
import ErrorMessage from "./ErrorMessage/ErrorMessage";
import LoadMoreBtn from "./LoadMoreBtn/LoadMoreBtn";
import ImageModal from "./ImageModal/ImageModal";
import axios from "axios";

const App = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const accessKey = "Adqo8IugaEIG925dxfmfY3wn_kkHcSO5rbp3UAn2Gww";
  const perPage = 10;

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get(
          `https://api.unsplash.com/photos?query=${searchTerm}&page=${page}&per_page=${perPage}&client_id=${accessKey}`
        );

        if (!response.data) {
          throw new Error("Failed to fetch images");
        }

        setImages((prevImages) => [...prevImages, ...response.data]);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching images:", error);
        setLoading(false);
        setError("Error loading images. Please try again.");
      }
    };

    fetchImages();
  }, [page, searchTerm]); // Забезпечте коректність залежностей для useEffect

  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const openModal = (imageUrl, alt) => {
    setSelectedImage({ imageUrl, alt });
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const handleSearchSubmit = (searchTerm) => {
    setImages([]); // Очистимо попередні зображення при новому пошуку
    setSearchTerm(searchTerm);
    setPage(1); // Скидаємо сторіну на першу при новому пошуку
  };

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSearchSubmit(e.target.elements.search.value);
        }}
      >
        <input type="text" name="search" placeholder="Enter search term" />
        <button type="submit">Search</button>
      </form>
      {error ? (
        <ErrorMessage message={error} />
      ) : (
        <>
          <ImageGallery images={images} onImageClick={openModal} />
          {loading && (
            <Audio
              height="80"
              width="80"
              radius="9"
              color="green"
              ariaLabel="three-dots-loading"
              wrapperStyle
              wrapperClass
            />
          )}
          {images.length > 0 && !loading && <LoadMoreBtn onClick={loadMore} />}
          <ImageModal
            isOpen={!!selectedImage}
            onRequestClose={closeModal}
            imageUrl={selectedImage?.imageUrl}
            alt={selectedImage?.alt}
          />
        </>
      )}
      {/* Додайте інші елементи, які можуть бути в компоненті */}
    </div>
  );
};

export default App;
