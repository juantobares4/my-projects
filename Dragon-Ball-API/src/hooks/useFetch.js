import { useEffect, useState } from "react";

export const useFetch = (apiUrl) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => setData(data.items))
      .catch((error) => setError(error))

  }, [apiUrl])

  return { data, error }

};  

