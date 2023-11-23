import { useState, useEffect } from "react";

export const api = () => {
  const [apiData, setApiData] = useState([]);
  useEffect(() => {
    const get = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/todos"
        );
        const data = await response.json();
        setApiData(data);
      } catch (error) {
        console.error("Error fetching API data:", error);
      }
    };
    get();
  }, []);

  return { apiData };
};
