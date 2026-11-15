import { useParams } from 'react-router';

import PageTemplate from "../components/templateMoviePage";
import { getActorsMovies } from '../api/tmdb-api'
import { useQuery } from '@tanstack/react-query';
import Spinner from '../components/spinner';
import MovieListPageTemplate from "../components/templateMovieListPage";
import { getActor } from '../api/tmdb-api'

const ActorsAndMovies = () => {
  const { id } = useParams();

 const { data: credits, error, isPending, isError } =
  useQuery({
    queryKey: ["actorMovies", { id }],
    queryFn: getActorsMovies,
  });

const { data: actor, error: actorError, isPending: actorPending, isError: actorIsError } =
  useQuery({
    queryKey: ["actor", { id }],
    queryFn: getActor,
  });

  if (isPending) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }
   if (actorPending) {
    return <Spinner />;
  }

  if (actorError) {
    return <h1>{error.message}</h1>;
  }

 
  return (
  <>
    
    <section>
      {actor.profile_path && (
        <img
          src={`https://image.tmdb.org/t/p/w500/${actor.profile_path}`}
          alt={actor.name}
        />
      )}
      <h1>{actor.name}</h1>
      <p>{actor.biography}</p>
    </section>

    
    <MovieListPageTemplate
      title={`${actor.name}'s Movies`}
      movies={credits.cast}
      action={() => null}
    />
  </>
);
  
}
  export default ActorsAndMovies;