import { Box } from "./Box";
import { Logo } from "./Logo";
import { Main } from "./Main";
import { useState } from "react";
import { NavBar } from "./NavBar";
import { Loader } from "./Loader";
import { SearchBar } from "./SearchBar";
import { MovieList } from "./MovieList";
import { ErrorMessage } from "./ErrorMessage";
import { MovieDetails } from "./MovieDetails";
import { useMovies } from "../utils/useMovies";
import { WatchedSummary } from "./WatchedSummary";
import { NumberOfResults } from "./NumberOfResults";
import { WatchedMoviesList } from "./WatchedMoviesList";
import { useLocalStorageState } from "../utils/useLocalStorageState";

export const API_KEY = "f8dc2545";
export const average = (arr) => arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

export default function App() 
{
  const [query, SetQuery] = useState("");
  const [selectedId, SetSelectedID] = useState(null);
  const [watched, SetWatched] = useLocalStorageState([], "watched");
  const {movies, isLoading, error} = useMovies(query);
  
  /*
    useEffect(function()
    {
      console.log("After initial render")
    }, [])
    useEffect(function()
    {
      console.log("After every render")
    })
    useEffect(function()
    {
      console.log("On query")
    }, [query])
    console.log("During render")
  */
 
  function HandleSelectMovie(id)
  {
    SetSelectedID(selectedId => id === selectedId ? null : id);
  }  

  function HandleCloseMovie()
  {
    SetSelectedID(null)
  }

  function HandleAddWatchedMovie(movie)
  {
    SetWatched(watched=>[...watched, movie]);
  }

  function HandleDeleteWatched(id)
  {
    SetWatched(watched => watched.filter(movie => movie.imdbID !== id));
  }

  return (
    <>
      <NavBar>
        <Logo/>
        <SearchBar query={query} SetQuery={SetQuery}/>
        <NumberOfResults movies={movies}/>
      </NavBar>

      <Main>
        <Box>
          {isLoading && <Loader />}
          {!isLoading && !error && (<MovieList movies={movies} OnSelectMovie={HandleSelectMovie}/>)}
          {error && <ErrorMessage message={error} />}
        </Box>

        <Box>
          {
            selectedId ? 
            <MovieDetails 
              selectedId={selectedId}
              OnCloseMovie={HandleCloseMovie}
              OnAddWatchedMovie={HandleAddWatchedMovie}
              watched={watched}
            />
            :
            <>
              <WatchedSummary watched={watched} />
              <WatchedMoviesList watched={watched} OnDeleteWatched={HandleDeleteWatched}/>
            </>
          }
        </Box>
      </Main>
    </>
  );
}