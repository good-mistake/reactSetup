import { useState, useEffect } from "react";

export const shareddata = () => {
  const [userData, setUserData] = useState([]);
  useEffect(() => {
    const get = localStorage.getItem("userInput");
    if (get) {
      const parsedData = JSON.parse(get);
      if (JSON.stringify(parsedData) !== JSON.stringify(userData)) {
        setUserData(parsedData);
      }
    }

    const handeUpdate = () => {
      const getUpdate = localStorage.getItem("userInput");
      if (getUpdate) {
        const parsedUpdate = JSON.parse(get);
        setUserData(parsedUpdate);
      }
    };
    window.addEventListener("ListentoUpdate", handeUpdate);

    return () => {
      window.removeEventListener("localStorageUpdated", handeUpdate);
    };
  }, [userData]);
  // console.log(userData);
  return { setUserData, userData };
};
