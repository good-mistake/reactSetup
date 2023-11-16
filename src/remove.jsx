import { api } from "./api";
import { shareddata } from "./shareddata";
import { useAllData } from "./allData";
import { useState } from "react";
export const useRemoveBtn = (updateAllData) => {
  // const { apiData, setApiData } = api();
  const { userData, setUserData } = shareddata();
  const { allData, setAllData } = useAllData();
  const [newUserState, setNewUserState] = useState([]);
  // const [removedItem, setRemovedItem] = useState([]);
  const removeBtn = (itemToRemove) => {
    //   const removeFromApi = apiData.filter((item) => item.title !== itemToRemove);

    //   // const storedData = JSON.parse(localStorage.getItem("userInput")) || [];
    //   const removeFromStorage = userData.filter((item) => item !== itemToRemove);
    //   if (removeFromStorage.length > 0) {
    //     localStorage.setItem("userInput", JSON.stringify(removeFromStorage));
    //   } else {
    //     localStorage.removeItem("userInput");
    //   }
    //   const updatedApi = removeFromApi.map((item) => item.title);

    //   setApiData(removeFromApi);
    //   setUserData(removeFromStorage);
    //   updateAllData(updatedApi, removeFromStorage);
    const remove = allData.filter((item) => item !== itemToRemove);

    // for (let item of remove) {
    //   if (userData.includes(item)) {
    //     setNewUserState((e) => [...e, item]);
    //     console.log(newUserState);
    //   }
    // }
    setNewUserState([]);
    remove.map((e) => {
      if (userData.includes(e)) {
        setNewUserState((item) => [...item, e]);
        localStorage.setItem("userInput", JSON.stringify(newUserState));
        console.log(newUserState);
      }
    });
    setAllData(remove);
    updateAllData(allData);
    // console.log(allData);
    // console.log(remove);
  };

  return { removeBtn };
};
