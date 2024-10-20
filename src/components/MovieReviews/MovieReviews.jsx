import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { fetchReviewsMovie } from "../../services/api";
import styles from "./MovieReviews.module.css";
import Loader from "../Loader/Loader";
import { defaultIMG } from "../../services/defaultIMG.js";

const MovieReviews = () => {
  const [reviews, setReviews] = useState(null);
  const [loading, setLoading] = useState(false);
  const { movieId } = useParams();

  useEffect(() => {
    const fetchReviewsMoviesHandler = async () => {
      try {
        // Показуємо лоадер
        setLoading(true);
        const data = await fetchReviewsMovie(movieId);
        // console.log(data.results);
        setReviews(data.results);
      } catch (error) {
        console.log(error.message);
      } finally {
        // Приховуємо лоадер
        setLoading(false);
      }
    };
    fetchReviewsMoviesHandler();
  }, [movieId]);

  return (
    <div>
      {loading && <Loader />}
      {reviews == 0 ? (
        <p style={{ textAlign: "center" }}>
          We don&apos;t have any reviews for this movie.
        </p>
      ) : (
        <ul className={styles.list}>
          {reviews?.length > 0 &&
            reviews.map((review) => (
              <li className={styles.item} key={review.id}>
                <div className={styles.wrap}>
                  <img
                    className={styles.img}
                    src={
                      review?.author_details.avatar_path
                        ? `https://image.tmdb.org/t/p/w200${review.author_details.avatar_path}`
                        : defaultIMG
                    }
                    alt={review.author}
                  />
                  <div className={styles.textInfo}>
                    <p>Author:&nbsp;{review.author}</p>
                    <p>Updated:&nbsp;{review.updated_at}</p>
                  </div>
                </div>
                <p className={styles.content}>{review.content}</p>
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};

export default MovieReviews;
