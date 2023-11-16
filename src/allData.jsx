import { useState, useEffect } from "react";
import { api } from "./api";
import { shareddata } from "./shareddata";

export const useAllData = () => {
  const [allData, setAllData] = useState([]);
  const { apiData } = api();
  const { userData } = shareddata();

  // const { userData } = useUser();

  useEffect(() => {
    const apiTitle = apiData.map((e) => e.title);
    const datas = [...apiTitle, ...userData];
    setAllData(datas);
  }, [apiData, userData]);

  const forSearch = (i) => {
    if (!i) {
      return allData;
    }
    return allData.filter((item = item.includes(i)));
  };
  return { allData, setAllData, forSearch };
};
