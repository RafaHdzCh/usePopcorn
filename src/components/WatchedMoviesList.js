import { WatchedMovie } from "./WatchedMovie";

export function WatchedMoviesList({ watched, OnDeleteWatched }) 
{
  return (
    <ul className="list">
      {watched.map((movie) => <WatchedMovie
        movie={movie}
        key={movie.imdbID}
        OnDeleteWatched={OnDeleteWatched} />
      )}
    </ul>
  );
}
