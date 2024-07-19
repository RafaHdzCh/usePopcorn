import { FetchMovies } from "./MovieAPI";
import { useState, useEffect } from "react";

export function useMovies(query)
{
  const [error, SetError] = useState("");
  const [movies, SetMovies] = useState([]);
  const [isLoading, SetIsLoading] = useState(false);

  useEffect(function SearchAbortController()
  {
    const controller = new AbortController();

    async function FetchData() 
    {
      if (!query) 
        {
        SetMovies([]);
        SetError("");
        return;
      }

      SetIsLoading(true);
      try 
      {
        const data = await FetchMovies(query,controller);
        SetMovies(data);
        SetError("");
      } 
      catch (error) 
      {
        if(error.name !== "AbortError")
        {
          SetError(error.message);
        }
      } 
      finally 
      {
        SetIsLoading(false);
      }
    }
    FetchData();

    return function()
    {
      controller.abort();
    }
  }, [query]);

  return {movies,isLoading, error}
}