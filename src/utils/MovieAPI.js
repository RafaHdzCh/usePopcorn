import { API_KEY } from "../components/App";

export async function FetchMovies(query,controller) 
{
  const response = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`,{signal:controller.signal});
  
  if (!response.ok) 
  {
    throw new Error("Something went wrong...");
  }

  const data = await response.json();

  if (data.response === "False") 
    {
    throw new Error("Movie not found!");
  }

  return data.Search;
}