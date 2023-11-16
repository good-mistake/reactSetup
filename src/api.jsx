import { useState, useEffect } from "react";
import { shareddata } from "./shareddata";
export const api = () => {
  const [apiData, setApiData] = useState([]);
  useEffect(() => {
    const get = async () => {
      await fetch("https://jsonplaceholder.typicode.com/todos")
        .then((res) => {
          return res.json();
        })
        .then((i) => {
          setApiData(i);
        })
        .catch((e) => {
          console.log(e);
        });
    };
    get();
  }, []);

  return { apiData, setApiData };
};
