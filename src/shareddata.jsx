import { useState, useEffect } from "react";
import { useAllData } from "./allData";
export const shareddata = () => {
  const [userInput, setUserInput] = useState([]);
  const [userData, setUserData] = useState([]);

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && userInput.trim() !== "") {
      const updatedUserData = [...userData, userInput.trim()];

      setUserInput("");
      listen(updatedUserData);
    }
  };
  const click = () => {
    if (userInput.trim() !== "") {
      const updatedUserData = [...userData, userInput.trim()];

      setUserInput("");
      listen(updatedUserData);
    }
  };
  const inputs = (e) => {
    setUserInput(e.target.value);
  };
  const listen = (updatedUserData) => {
    setUserData(updatedUserData);
    localStorage.setItem("userInput", JSON.stringify(updatedUserData));
  };
  const get = JSON.parse(localStorage.getItem("userInput"));
  useEffect(() => {
    if (get) {
      if (JSON.stringify(get) !== JSON.stringify(userData)) {
        setUserData(get);
      }
    }
    console.log(get);
  }, [userData, userInput, get]);

  return { setUserData, userData, handleKeyPress, click, inputs, userInput };
};
