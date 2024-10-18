import axios from "axios";

const KEY =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ZDliNzQwMTdkMGMwNjJjYTdiODQ2MTAyOTMzZjY4YSIsIm5iZiI6MTcyOTA3NTYxMC40Mjg3MSwic3ViIjoiNjcwZjk2OTgwMTlmM2JjNWIxMWJlN2E5Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.LWncPPGQto2RWkVgz-dyeFT_a8kh51C_M2DEBRWtymc";

axios.defaults.baseURL = "https://api.themoviedb.org/3/";
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${KEY}`,
  },
  params: {},
};

export const fetchTrendingMovies = async () => {
  const responseT = await axios.get("trending/movie/day", options);

  return responseT.data;
};

export const fetchSearchMovies = async (query) => {
  options.params.query = query;
  const response = await axios.get("search/movie", options);

  return response.data;
};
