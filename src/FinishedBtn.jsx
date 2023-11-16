import React from "react";
import { useState } from "react";
import { useAllData } from "./allData";
const FinishedBtn = ({ checkboxes, onUpdateAllData }) => {
  const [finished, setFinished] = useState({});
  const { allData, setAllData } = useAllData();
  const finish = () => {
    const selectedItems = Object.keys(checkboxes).filter(
      (key) => checkboxes[key]
    );
    if (selectedItems.length > 0) {
      const updatedAllData = allData.filter(
        (item) => !selectedItems.includes(item)
      );
      setFinished(selectedItems);
      setAllData(updatedAllData);
      onUpdateAllData(updatedAllData);
    }
  };
  return (
    <>
      <button className="finishBtn" onClick={finish}>
        Finished Selected
      </button>

      <div className="finishedItems">
        {Object.values(finished).map((item, index) => (
          <div key={index}>{item}</div>
        ))}
      </div>
    </>
  );
};

export default FinishedBtn;
