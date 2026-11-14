import { getMoviesNowPlaying } from "../api/tmdb-api";
import PageTemplate from "../components/templateMovieListPage";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../components/spinner";
import AddToFavoritesIcon from "../components/cardIcons/addToFavorites";

const MoviesPlayingNowPage= () => {
  const { data, error, isPending, isError } = useQuery({
    queryKey: ["now_playing"],
    queryFn: getMoviesNowPlaying,
  });

  if (isPending) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const movies = data.results;


  return (
    <PageTemplate
      title="Movies Playing Now!"
      movies={movies}
      action={(movie) => {
        return <AddToFavoritesIcon movie={movie} />;
      }}
    />
  );
};

export default MoviesPlayingNowPage;