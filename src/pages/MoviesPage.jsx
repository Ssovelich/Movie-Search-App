import SearchBar from "../components/SearchBar/SearchBar";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchSearchMovies } from "../services/api";
import MovieList from "../components/MovieList/MovieList";
import toast, { Toaster } from "react-hot-toast";
import Loader from "../components/Loader/Loader";
import ErrorMessage from "../components/ErrorMessage/ErrorMessage";

const MoviesPage = () => {
  const [movies, setMovies] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  //Зчитуємо значення пошуку з адреси і додаємо в query
  const query = searchParams.get("q");
  // console.log(query);

  const onSearch = (searchTerm) => {
    //Записуємо в обєкт searchParams значенни поля пошуку
    //при відправці форми змінюється одреса сторнки з урахуванням пошукового запиту
    setSearchParams({ q: searchTerm });
  };

  useEffect(() => {
    const fetchSearchMoviesHandler = async () => {
      try {
        // показуємо лоадер
        setLoading(true);
        const data = await fetchSearchMovies(query);
        const results = data.results;
        //якщо від сервера отримано порожні обєкт показємо повідомлення
        if (results.length === 0) {
          toast.error("Sorry there is no results with this query", {
            position: "top-right",
            style: {
              border: "1px solid #f52121",
              padding: "16px",
              color: "#f52121",
              height: "20px",
              fontWeight: "500",
              backgroundColor: "#fc9c9c",
            },
          });
          return;
        }
        setMovies(data.results);
      } catch (error) {
        setError(true);
        console.log(error.message);
      } finally {
        // //Приховуємо лоадер
        setLoading(false);
      }
    };
    if (query) {
      fetchSearchMoviesHandler();
    }
  }, [query]);

  return (
    <div>
      <Toaster />
      {<SearchBar onSearch={onSearch} />}
      {loading && <Loader />}
      {error ? <ErrorMessage /> : <MovieList movies={movies} />}
    </div>
  );
};

export default MoviesPage;
