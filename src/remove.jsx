import { useAllData } from "./allData";
import { useState, useEffect } from "react";
import { shareddata } from "./shareddata.jsx";
export const useRemoveBtn = (allData, setAllData, updateAllData) => {
  // const { allData, setAllData } = useAllData();
  const { userData, setUserData } = shareddata();

  const removeBtn = (itemToRemove) => {
    const remove = allData.filter((item) => item !== itemToRemove);
    setAllData(remove);
    const updatedUserData = userData.filter((e) => e !== itemToRemove);

    setUserData(updatedUserData);
    localStorage.setItem("userInput", JSON.stringify(updatedUserData));
    updateAllData(remove);
  };
  // const removedUserData = remove.filter((e) => userData.includes(e));
  // console.log(userData);

  return { removeBtn };
};
