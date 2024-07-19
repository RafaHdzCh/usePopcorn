import { useRef } from "react";
import { useKey } from "../utils/useKey";

export function SearchBar({ query, SetQuery }) 
{
  const inputElement = useRef(null);
  useKey("Enter", function()
  {
    if(document.activeElement === inputElement.current) return;
    inputElement.current.focus();
    SetQuery("");
  });
    
  return (
    <input
      className="search"
      type="text"
      placeholder="Search..."
      value={query}
      onChange={(e) => SetQuery(e.target.value)}
      ref={inputElement}
    />
  );
}
