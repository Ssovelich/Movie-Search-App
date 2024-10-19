import { fetchCastMovies } from "../../services/api";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "./MovieCast.module.css";
import Loader from "../Loader/Loader";

const defaultIMG =
  "https://dummyimage.com/100x200/6e6b6e/000000.png&text=NO+IMG";

const MovieCast = () => {
  const [cast, setCast] = useState(null);
  const [loading, setLoading] = useState(false);
  const { movieId } = useParams();

  useEffect(() => {
    const fetchCastMoviesHandler = async () => {
      try {
        // Показуємо лоадер
        setLoading(true);
        const data = await fetchCastMovies(movieId);
        // console.log(data.cast);
        setCast(data.cast);
      } catch (error) {
        console.log(error.message);
      } finally {
        // Приховуємо лоадер
        setLoading(false);
      }
    };
    fetchCastMoviesHandler();
  }, [movieId]);

  return (
    <div>
      {loading && <Loader />}

      {cast == 0 ? (
        <p style={{ textAlign: "center" }}>
          We don&apos;t have any cast for this movie.
        </p>
      ) : (
        <ul className={styles.list}>
          {cast?.length > 0 &&
            cast.map((actor) => (
              <li className={styles.listItem} key={actor.cast_id}>
                <img
                  className={styles.img}
                  src={
                    actor?.profile_path
                      ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
                      : defaultIMG
                  }
                  alt={actor.name}
                />
                <div className={styles.wrapInfo}>
                  <h2>{actor.name}</h2>
                  <h3>Character:</h3>
                  <p>{actor.character}</p>
                </div>
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};

export default MovieCast;
