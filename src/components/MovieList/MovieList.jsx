import { Link, useLocation } from "react-router-dom";
import styles from "./MovieList.module.css";
import { defaultIMG } from "../../services/defaultIMG.js";

const MovieList = ({ movies }) => {
  const location = useLocation();

  return (
    <ul className={styles.list}>
      {movies !== null &&
        //знак ? після movies означає: якщо є такий об'кт то виконуємо дію
        movies?.map((movie) => {
          return (
            <li className={styles.listItem} key={movie.id}>
              <Link
                state={{ from: location }}
                className={styles.link}
                to={`/movies/${movie.id}`}
              >
                <img
                  className={styles.img}
                  src={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
                      : defaultIMG
                  }
                  alt={movie.title}
                />
                <p className={styles.rating}>
                  {/* повертає число округлене до десятих */}
                  {movie.vote_average.toFixed(1)}/10
                </p>
                <p className={styles.rating}>
                  {/* повертає данні з рядка тільки з 1 по 4 символ */}
                  {movie.release_date.substring(0, 4)}
                </p>
                <p className={styles.title}>{movie.title}</p>
              </Link>
            </li>
          );
        })}
    </ul>
  );
};

export default MovieList;
