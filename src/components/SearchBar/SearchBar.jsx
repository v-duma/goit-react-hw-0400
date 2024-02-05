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
  const [page, setPage] = useState(1);
  const [uniqueIds, setUniqueIds] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
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

      setImages((prevImages) => [...prevImages, ...newImages]);
      setUniqueIds((prevIds) => [
        ...prevIds,
        ...newImages.map((image) => image.id),
      ]);
      setLoading(false);
      setPage((prevPage) => prevPage + 1);
    } catch (error) {
      console.error("Error fetching images:", error);
      setError("Error fetching images. Please try again.");
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(false);
  }, [images]);

  return (
    <>
      <form className={css.form} onSubmit={handleSearch}>
        <label>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter search keyword"
          />
        </label>
        <button type="submit">Search</button>
      </form>
      <ImageGallery images={images} loading={loading} />
      {images.length > 0 && !loading && <LoadMoreBtn onClick={handleSearch} />}

      {error && <ErrorMessage message={error} />}
    </>
  );
};

export default SearchBar;
