import { useEffect, useRef, useState } from "react";
import { fetchPhotos } from "./services/api";
import SearchBar from "./components/SearchBar/SearchBar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import { Toaster } from "react-hot-toast";
import { RingLoader } from "react-spinners";

import "./App.css";
import ImageModal from "./components/ImageModal/ImageModal";

function App() {
  const [photos, setPhotos] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const galleryRef = useRef(null);

  useEffect(() => {
    if (!query) return;

    const getPhotos = async () => {
      try {
        setLoading(true);
        const { photos: newPhotos, totalPages } = await fetchPhotos(
          query,
          page
        );
        setPhotos((prev) => (page === 1 ? newPhotos : [...prev, ...newPhotos]));

        setHasMore(page < totalPages);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    getPhotos();
  }, [query, page]);

  useEffect(() => {
    if (page === 1 || !galleryRef.current) return;

    galleryRef.current.scrollTo({
      top: galleryRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [photos, page]);

  const handleSearchSubmit = (searchQuery) => {
    setQuery(searchQuery);
    setPage(1);
    setHasMore(true);
    setError(false);
  };

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handlePhotoClick = (photo) => {
    setSelectedPhoto(photo);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPhoto(null);
  };

  return (
    <>
      <Toaster position="top-right" />
      <SearchBar onSubmit={handleSearchSubmit} />

      {error ? (
        <ErrorMessage />
      ) : (
        <>
          <ImageGallery
            photos={photos}
            onPhotoClick={handlePhotoClick}
            galleryRef={galleryRef}
          />
          {loading && (
            <RingLoader
              color="#646cffaa"
              size={50}
              cssOverride={{
                margin: "0 auto",
              }}
            />
          )}
          {photos.length > 0 && hasMore && !loading && (
            <LoadMoreBtn onClick={handleLoadMore} />
          )}
        </>
      )}

      <ImageModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        photo={selectedPhoto}
      />
    </>
  );
}

export default App;
