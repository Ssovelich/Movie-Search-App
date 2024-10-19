import styles from "./MovieList.module.css";
import { Link, useLocation } from "react-router-dom";

const defaultIMG =
  "https://dummyimage.com/200x300/6e6b6e/000000.png&text=NO+IMG";

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
                  {movie.vote_average.toFixed(1)}/10
                </p>
                <p className={styles.rating}>{movie.release_date}</p>
                <p className={styles.title}>{movie.title}</p>
              </Link>
            </li>
          );
        })}
    </ul>
  );
};

export default MovieList;
