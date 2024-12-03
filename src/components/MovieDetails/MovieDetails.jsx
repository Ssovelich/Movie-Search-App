import { useState, useEffect } from "react";
import clsx from "clsx";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { FaPlay } from "react-icons/fa";

import { fetchDetailsMovie } from "../../services/api";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import styles from "./MovieDetails.module.css";
import { defaultIMG } from "../../services/defaultIMG.js";
import StarRating from "../StarRating/StarRating.jsx";
import ScrollToTopBtn from "../ScrollToTop/ScrollToTopBtn.jsx";

const buildStylesClasses = ({ isActive }) =>
  clsx(styles.link, isActive && styles.active);

const MovieDetails = ({ id }) => {
  const [detailsMovie, setDetailsMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  //location інформація про сторінку на які знаходимось
  const location = useLocation();
  // console.log(location.state.from);

  useEffect(() => {
    const fetchDetailsMoviesHandler = async () => {
      try {
        // Показуємо лоадер
        setLoading(true);
        const data = await fetchDetailsMovie(id);
        // console.log(data);
        setDetailsMovie(data);
      } catch (error) {
        setError(true);
        console.log(error.message);
      } finally {
        // Приховуємо лоадер
        setLoading(false);
      }
    };
    fetchDetailsMoviesHandler();
  }, [id]);

  //якщо перешли за скопійованим посиланням і немає данних про
  //попередню сторінку, то перейди на сторінку movies
  const backUrl = location.state?.from || "/movies";
  //location.state інформація про сторінку з якої перейшли
  const goBack = () => navigate(backUrl);

  return (
    <>
      <button className={styles.btn} onClick={goBack}>
        ⇐ Go back
      </button>
      {loading && <Loader />}
      {error ? (
        <ErrorMessage />
      ) : (
        <>
          <div className={styles.wrap}>
            <div className={styles.wrapImg}>
              <img
                className={styles.img}
                src={
                  detailsMovie?.poster_path
                    ? `https://image.tmdb.org/t/p/w200${detailsMovie?.poster_path}`
                    : defaultIMG
                }
                alt={id.title}
              />
              <a
                className={styles.play}
                href={`https://www.youtube.com/results?search_query=${
                  detailsMovie?.title
                    .split("") // Розбиваємо текст на масив символів
                    .filter((char) => /[a-zA-Zа-яА-Я0-9 ]/.test(char)) // Залишаємо лише літери, цифри та пробіли
                    .join("") // Збираємо назад у строку
                    .replace(/ /g, "+") // Замінюємо пробіли на '+'
                }+${detailsMovie?.release_date.substring(0, 4)}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaPlay className={styles.playIcon} />
              </a>
            </div>
            <div className={styles.wrapInfo}>
              <h2 className={styles.title}>{detailsMovie?.title}</h2>
              <p className={styles.release}>
                Release:&nbsp;{detailsMovie?.release_date}
              </p>
              <p className={styles.release}>
                Country:&nbsp;{detailsMovie?.origin_country}
              </p>
              <p className={styles.release}>
                Runtime:&nbsp;{detailsMovie?.runtime}min
              </p>
              <div className={styles.wrapRate}>
                <p className={styles.rate}>
                  User Score:&nbsp;
                  {Math.round(detailsMovie?.vote_average * 10)}%
                </p>
                <StarRating
                  rating={Math.round(detailsMovie?.vote_average) / 2}
                  totalStars={5}
                />
              </div>

              <h3 className={styles.overviewTitle}>Overview</h3>
              <p className={styles.overview}>{detailsMovie?.overview}</p>
              <h3 className={styles.genresTitle}>Genres</h3>
              <p className={styles.genres}>
                {detailsMovie?.genres.map((genre) => genre.name).join(" ")}
              </p>
            </div>
          </div>
          <div className={styles.moreInfo}>
            <h3 className={styles.moreInfoTitle}>Additional information</h3>
            <div className={styles.linksInfo}>
              <NavLink
                state={{ from: backUrl }}
                className={buildStylesClasses}
                to={`/movies/${id}/cast`}
              >
                Cast
              </NavLink>
              <NavLink
                state={{ from: backUrl }}
                className={buildStylesClasses}
                to={`/movies/${id}/reviews`}
              >
                Reviews
              </NavLink>
            </div>
            <ScrollToTopBtn />
          </div>
        </>
      )}
    </>
  );
};

export default MovieDetails;
