import { useAllData } from "./allData";
export const useRemoveBtn = (allData, setAllData, updateAllData) => {
  const { userData, setUserData } = useAllData();

  const removeBtn = (itemToRemove) => {
    const remove = allData.filter((item) => item !== itemToRemove);
    setAllData(remove);
    const updatedUserData = userData.filter((e) => e !== itemToRemove);

    setUserData(updatedUserData);
    localStorage.setItem("userInput", JSON.stringify(updatedUserData));
    updateAllData(remove);
  };

  return { removeBtn };
};
