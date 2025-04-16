import { useEffect, useState } from "react";
import { fetchPhotos } from "./services/api";
import SearchBar from "./components/SearchBar/SearchBar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import { Toaster } from "react-hot-toast";
import { RingLoader } from "react-spinners";

import "./App.css";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";

function App() {
  const [photos, setPhotos] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState(false);
  const PER_PAGE = 12;

  useEffect(() => {
    if (!query) return;

    const getPhotos = async () => {
      try {
        setLoading(true);
        const data = await fetchPhotos(query, page);
        setPhotos((prev) => (page === 1 ? data : [...prev, ...data]));

        if (data.length < PER_PAGE) {
          setHasMore(false);
        } else {
          setHasMore(true);
        }
      } catch (error) {
        console.log(error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    getPhotos();
  }, [query, page]);

  const handleSearchSubmit = (searchQuery) => {
    setQuery(searchQuery);
    setPage(1);
    setHasMore(true);
    setError(false);
  };

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <>
      <Toaster position="top-right" />
      <SearchBar onSubmit={handleSearchSubmit} />

      {error ? (
        <ErrorMessage />
      ) : (
        <>
          <ImageGallery photos={photos} />
          {loading && <RingLoader color="#646cffaa" size={100} />}
          {photos.length > 0 && hasMore && !loading && (
            <LoadMoreBtn onClick={handleLoadMore} />
          )}
        </>
      )}
    </>
  );
}

export default App;
