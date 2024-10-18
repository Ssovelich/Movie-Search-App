import styles from "./MovieList.module.css";
// import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import fetchTrendingMovies from "../../services/api";
// import fetchSearchMovies from "../../services/apiSearch";

const MovieList = ({ movies }) => {
  return (
    <ul className={styles.list}>
      {movies !== null &&
        movies.map((movie) => {
          return (
            <li className={styles.listItem} key={movie.id}>
              <Link className={styles.link} to={`movies/${movie.id}`}>
                <img
                  className={styles.img}
                  src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                  alt={movie.title}
                />
                <p className={styles.title}>{movie.title}</p>
              </Link>
            </li>
          );
        })}
    </ul>
  );
};

export default MovieList;
