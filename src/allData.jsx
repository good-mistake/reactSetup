import { useState, useEffect } from "react";
export const useAllData = () => {
  const [userInput, setUserInput] = useState([]);
  const [allData, setAllData] = useState([]);
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
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
  const listen = (updateAllDat) => {
    setUserData(updateAllDat);
    localStorage.setItem("userInput", JSON.stringify(updateAllDat));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/todos"
        );
        const data = await response.json();
        const apiTitle = data.map((e) => e.title);
        const storedUserData =
          JSON.parse(localStorage.getItem("userInput")) || [];
        const datas = [...apiTitle, ...storedUserData];
        if (storedUserData) {
          if (JSON.stringify(storedUserData) !== JSON.stringify(userData)) {
            setUserData(storedUserData);
          }
        }
        setAllData(datas);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching API data:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, [setUserData, userData, userInput]);

  const forSearch = (i) => {
    if (!i) {
      return allData;
    }
    return allData.filter((item) => item.includes(i));
  };
  return {
    allData,
    setAllData,
    forSearch,
    handleKeyPress,
    click,
    userData,
    setUserData,
    userInput,
    setUserInput,
    inputs,
    loading,
  };
};
