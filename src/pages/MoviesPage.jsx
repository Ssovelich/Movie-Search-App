import SearchBar from "../components/SearchBar/SearchBar";
import { useState, useEffect } from "react";
import { fetchSearchMovies } from "../services/api";
import MovieList from "../components/MovieList/MovieList";
import toast, { Toaster } from "react-hot-toast";
import Loader from "../components/Loader/Loader";

const MoviesPage = () => {
  const [movies, setMovies] = useState(null);
  const [query, setQuery] = useState(null);
  const [loading, setLoading] = useState(false);

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
      {<SearchBar setQuery={setQuery} />}
      {loading && <Loader />}
      <MovieList movies={movies} />
    </div>
  );
};

export default MoviesPage;
