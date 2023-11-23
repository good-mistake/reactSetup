import React from "react";
import { useState } from "react";
const FinishedBtn = ({ checkboxes, onUpdateAllData, allData, setAllData }) => {
  const [finished, setFinished] = useState({});
  //   const { allData, setAllData } = useAllData();
  const finish = () => {
    const selectedItems = Object.keys(checkboxes).filter(
      (key) => checkboxes[key]
    );
    if (selectedItems.length > 0) {
      const updatedAllData = allData
        ? allData.filter((item) => !selectedItems.includes(item))
        : [];
      console.log(selectedItems);
      setFinished((prevFinished) => {
        return { ...prevFinished, ...selectedItems };
      });

      setAllData(updatedAllData);
      onUpdateAllData(updatedAllData);
    }
    console.log(typeof onUpdateAllData);
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
