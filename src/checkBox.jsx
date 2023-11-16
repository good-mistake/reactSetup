import { useState, useEffect } from "react";
import { useAllData } from "./allData";

const useCheckBox = () => {
  const { allData } = useAllData();
  const [checkboxes, setCheckboxes] = useState({});

  useEffect(() => {
    const initialCheckboxes = {};
    for (const item of allData) {
      initialCheckboxes[item] = false;
    }
    setCheckboxes(initialCheckboxes);
  }, [allData]);

  const handleCheckboxChange = (item) => {
    setCheckboxes((prev) => ({
      ...prev,
      [item]: !prev[item],
    }));
  };

  const checkit = () => {
    setCheckboxes((prevCheckboxes) => {
      const updatedCheckboxes = {};
      const allSelected = Object.values(prevCheckboxes).every((value) => value);

      for (const item of allData) {
        updatedCheckboxes[item] = !allSelected;
      }

      return updatedCheckboxes;
    });
  };

  return {
    checkboxes,
    handleCheckboxChange,
    checkit,
    setCheckboxes,
  };
};

export default useCheckBox;
