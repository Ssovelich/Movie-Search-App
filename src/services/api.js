import axios from "axios";

const KEY =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ZDliNzQwMTdkMGMwNjJjYTdiODQ2MTAyOTMzZjY4YSIsIm5iZiI6MTcyOTA3NTYxMC40Mjg3MSwic3ViIjoiNjcwZjk2OTgwMTlmM2JjNWIxMWJlN2E5Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.LWncPPGQto2RWkVgz-dyeFT_a8kh51C_M2DEBRWtymc";

const moviesInstance = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
});

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${KEY}`,
  },
  params: {
    include_adult: "false",
  },
};

export const fetchTrendingMovies = async () => {
  const responseT = await moviesInstance.get("trending/movie/day", options);

  return responseT.data;
};

export const fetchSearchMovies = async (query) => {
  options.params.query = query;
  const response = await moviesInstance.get("search/movie", options);

  return response.data;
};

export const fetchDetailsMovie = async (id) => {
  const response = await moviesInstance.get(`movie/${id}`, options);

  return response.data;
};

export const fetchCastMovie = async (id) => {
  const response = await moviesInstance.get(`movie/${id}/credits`, options);

  return response.data;
};

export const fetchReviewsMovie = async (id) => {
  const response = await moviesInstance.get(`movie/${id}/reviews`, options);

  return response.data;
};
