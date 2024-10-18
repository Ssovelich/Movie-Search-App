import MovieList from "../components/MovieList/MovieList";
import { useState, useEffect } from "react";
import { fetchTrendingMovies } from "../services/api";
import Loader from "../components/Loader/Loader";

const HomePage = () => {
  const [movies, setMovies] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTrendingMoviesHandler = async () => {
      try {
        // Показуємо лоадер
        setLoading(true);
        const data = await fetchTrendingMovies();
        console.log(data.results);
        setMovies(data.results);
      } catch (error) {
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
      <h2>Trending today</h2>
      {loading && <Loader />}
      <MovieList movies={movies} />
    </div>
  );
};

export default HomePage;
