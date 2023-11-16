import { useAllData } from "./allData";
import React from "react";
export default RemoveAllBtn = ({ checkboxes, onUpdateAllData }) => {
  const { allData, setAllData } = useAllData();
  const removeAll = () => {
    const selectedItems = Object.keys(checkboxes).filter(
      (key) => checkboxes[key]
    );
    const updatedAllData = allData.filter(
      (item) => !selectedItems.includes(item)
    );
    setAllData(updatedAllData);
    const storedData = JSON.parse(localStorage.getItem("userInput")) || [];
    const updatedStoredData = storedData.filter(
      (item) => !selectedItems.includes(item)
    );
    if (updatedStoredData.length > 0) {
      localStorage.setItem("userInput", JSON.stringify(updatedStoredData));
    } else {
      localStorage.removeItem("userInput");
    }
    onUpdateAllData(updatedAllData);
  };
  return (
    <button className="removeAllBtn" onClick={removeAll}>
      Remove Selected
    </button>
  );
};
