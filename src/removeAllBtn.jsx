import { useAllData } from "./allData";
import React, { useState, useEffect } from "react";

export default RemoveAllBtn = ({
  checkboxes,
  onUpdateAllData,
  allData,
  setAllData,
}) => {
  // const { allData, setAllData } = useAllData();

  const removeAll = () => {
    const itemsToRemove = Object.keys(checkboxes).filter(
      (key) => checkboxes[key]
    );
    console.log(allData);
    const updatedAllData = allData.filter(
      (item) => !itemsToRemove.includes(item)
    );
    const storedData = JSON.parse(localStorage.getItem("userInput")) || [];
    const updatedStoredData = storedData.filter(
      (item) => !itemsToRemove.includes(item)
    );
    if (updatedStoredData.length > 0) {
      localStorage.setItem("userInput", JSON.stringify(updatedStoredData));
    } else {
      localStorage.removeItem("userInput");
    }
    setAllData(updatedAllData);
    onUpdateAllData(updatedAllData);
  };

  return (
    <button className="removeAllBtn" onClick={removeAll}>
      Remove Selected
    </button>
  );
};
