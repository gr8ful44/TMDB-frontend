import { useEffect } from "react";
import { useState } from "react";

function useLocalStorage(key, initValue) {
   const [value, setValue] = useState(() => {
      try {
         const localValue = localStorage.getItem(key);
         return localValue ? JSON.parse(localValue) : initValue;
      } catch (err) {
         console.log(err);
         return initValue;
      }
   });

   useEffect(() => {
      localStorage.setItem(key, JSON.stringify(value));
   }, [key,value]);

   return [value, setValue];
}

export default useLocalStorage;
