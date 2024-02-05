import { useState } from "react";
import SearchBar from "./SearchBar/SearchBar";
import ImageGallery from "./ImageGallery/ImageGallery";
import "./App.css";

const App = () => {
  const [images, setImages] = useState([]);

  const handleSearch = (results) => {
    setImages(results);
  };

  return (
    <div className="appDiv">
      <SearchBar key="searchBar" onSearch={handleSearch} />
      <div className="ImageList">
        <ImageGallery images={images} />
      </div>
    </div>
  );
};

export default App;
