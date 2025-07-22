import React, { createContext, useEffect, useState } from 'react'

import { useFetch } from '../hooks/useFetch.js' 

export const CharactersContext = createContext(null);

export const CharactersProvider = ({ children }) => {
  const API_URL = import.meta.env.VITE_BASE_URL;
  
  const [characters, setCharacters] = useState([]);
  const { data, error } = useFetch(API_URL);

  useEffect(() => {
    setCharacters(data);

  }, [data]);
  
  return(
    <CharactersContext.Provider value={{ characters, error }}>
      { children }   
    </CharactersContext.Provider>
  ); 

};
