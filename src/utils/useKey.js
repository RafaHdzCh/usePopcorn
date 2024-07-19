import { useEffect } from "react";

export function useKey(key, Action)
{
  useEffect(function() 
  {
    function CallBack(event)
    {
      if(event.code.toLowerCase() === key.toLowerCase())
      {
        Action();
      }
    }
    
    document.addEventListener("keydown", CallBack);
    return function()
    {
      document.removeEventListener("keydown", CallBack);
    }
  }, [key, Action]);
}

