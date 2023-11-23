import React from "react";
import Search from "./search.jsx";
import User from "./User.jsx";
import useCheckBox from "./checkBox.jsx";

import { useAllData } from "./allData.jsx";
import { useRemoveBtn } from "./remove.jsx";
import RemoveAllBtn from "./removeAllBtn.jsx";
import FinishedBtn from "./FinishedBtn.jsx";
import { useEffect } from "react";

export function App() {
  const { allData, setAllData } = useAllData();
  const handleUpdateAllData = (updatedData) => {
    setAllData(updatedData);
  };
  const { removeBtn } = useRemoveBtn(allData, setAllData, handleUpdateAllData);
  const { checkboxes, handleCheckboxChange, checkit } = useCheckBox(allData);
  const handleInputChange = (item) => {
    handleCheckboxChange(item);
  };

  return (
    <>
      {" "}
      <div className="container">
        <Search allData={allData} onUpdateAllData={handleUpdateAllData} />
        <div>
          <User />
          <ol className="todoItems">
            {allData?.map((item, num) => {
              return (
                <li key={num} className="list">
                  {item}
                  <button
                    className="removeBtn"
                    onClick={() => {
                      removeBtn(item);
                    }}
                  >
                    Remove
                  </button>{" "}
                  <input
                    type="checkbox"
                    checked={checkboxes[item] || false}
                    onChange={(e) => handleInputChange(item)}
                  />
                </li>
              );
            })}
          </ol>
          <button onClick={checkit} className="selectAllBtn">
            Select All
          </button>
          <RemoveAllBtn
            checkboxes={checkboxes}
            onUpdateAllData={handleUpdateAllData}
            allData={allData}
            setAllData={setAllData}
          />
          <FinishedBtn
            checkboxes={checkboxes}
            onUpdateAllData={handleUpdateAllData}
            allData={allData}
            setAllData={setAllData}
          />
        </div>
      </div>
    </>
  );
}
