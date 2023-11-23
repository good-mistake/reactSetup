import { useState, useEffect } from "react";
import { api } from "./api";
import { shareddata } from "./shareddata";
export const useAllData = () => {
  const [allData, setAllData] = useState([]);
  const { userData } = shareddata();
  const { apiData } = api();

  useEffect(() => {
    // const apiTitle = apiData.map((e) => e.title);
    const datas = [...apiData.map((e) => e.title), ...userData];
    setAllData(datas);
  }, [apiData, userData]);

  const forSearch = (i) => {
    if (!i) {
      return allData;
    }
    return allData.filter((item) => item.includes(i));
  };
  return { allData, setAllData, forSearch };
};
