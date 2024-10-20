import MovieList from "../components/MovieList/MovieList";
import { useState, useEffect } from "react";
import { fetchTrendingMovies } from "../services/api";
import Loader from "../components/Loader/Loader";
import ErrorMessage from "../components/ErrorMessage/ErrorMessage";

const HomePage = () => {
  const [movies, setMovies] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchTrendingMoviesHandler = async () => {
      try {
        // Показуємо лоадер
        setLoading(true);
        const data = await fetchTrendingMovies();
        console.log(data.results);
        setMovies(data.results);
      } catch (error) {
        setError(true);
        console.log(error.message);
      } finally {
        // Приховуємо лоадер
        setLoading(false);
      }
    };
    fetchTrendingMoviesHandler();
  }, []);

  return (
    <div>
      <h2 style={{ textAlign: "center" }}>Trending today</h2>
      {loading && <Loader />}
      {error ? <ErrorMessage /> : <MovieList movies={movies} />}
    </div>
  );
};

export default HomePage;
