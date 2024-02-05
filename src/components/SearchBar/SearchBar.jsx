import { useState, useEffect } from "react";
import axios from "axios";
import { ErrorMessage } from "../ErrorMessage/ErrorMessage";
import ImageGallery from "../ImageGallery/ImageGallery";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import css from "./SearchBar.module.css";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  const [error, setError] = useState(null);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [page, setPage] = useState(1);
  const [uniqueIds, setUniqueIds] = useState([]);

  const handleSearch = async () => {
    try {
      setLoading(true);
      setShowLoader(true);
      const response = await axios.get(
        "https://api.unsplash.com/search/photos",
        {
          params: {
            query,
            per_page: 9,
            client_id: "Ejbl26wSYPCwsZwT3as0PQ1cCitRW6ZYKYw8BWd_Luk",
            page,
          },
        }
      );

      const newImages = response.data.results.filter(
        (image) => !uniqueIds.includes(image.id)
      );

      onSearch(newImages);

      setTimeout(() => {
        setImages((prevImages) => [...prevImages, ...newImages]);
        setUniqueIds((prevIds) => [
          ...prevIds,
          ...newImages.map((image) => image.id),
        ]);
        setLoading(false);
        setShowLoader(false);
      }, 1000);
    } catch (error) {
      console.error("Error fetching images:", error);
      setError("Error fetching images. Please try again.");
      setLoading(false);
      setShowLoader(false);
    }
  };

  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
    handleSearch();
  };

  useEffect(() => {
    setShowLoader(true);
  }, [showLoader]);

  return (
    <>
      <div className={css.header}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter search keyword"
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <ImageGallery images={images} loading={loading} />
      {images.length > 0 && !loading && showLoader && (
        <LoadMoreBtn onClick={loadMore} />
      )}

      {error && <ErrorMessage message={error} />}
    </>
  );
};

export default SearchBar;
