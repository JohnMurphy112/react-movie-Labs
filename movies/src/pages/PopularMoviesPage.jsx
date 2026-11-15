import { getPopularMovies } from "../api/tmdb-api";
import PageTemplate from "../components/templateMovieListPage";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../components/spinner";
import AddToFavoritesIcon from "../components/cardIcons/addToFavorites";
import {  useState } from "react";
import Pagination from "@mui/material/Pagination";


const PopularMoviesPage = () => {
  const [page, setPage] = useState(1);
  const { data, error, isPending, isError } = useQuery({
    queryKey: ["popular",page],
    queryFn: () => getPopularMovies(page),
  });

  if (isPending) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const movies = data.results;


  return (
    <>
    <PageTemplate
      title="Popular Movies"
      movies={movies}


      action={(movie) => {
        return <AddToFavoritesIcon movie={movie} />;
      }}/>
            <Pagination
  count={data.total_pages} 
  page={page}
  onChange={(_, selectedPage) => setPage(selectedPage)}
      
     />
    </>
  );
};

export default PopularMoviesPage;