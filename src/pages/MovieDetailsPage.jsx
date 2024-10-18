import { useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";
import MovieCast from "../components/MovieCast/MovieCast";
import MovieReviews from "../components/MovieReviews/MovieReviews";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  // console.log("params:", params);
  return (
    <div>
      <NavLink to="/">Go back</NavLink>
      <p>MovieDetailsPage id: {movieId}</p>
      <NavLink to="/movies/:movieId/cast">Cast</NavLink>
      <NavLink to="/movies/:movieId/reviews">Reviews</NavLink>
      <MovieCast />
      <MovieReviews />
    </div>
  );
};

export default MovieDetailsPage;
