import React from "react";
import Search from "./search.jsx";
import User from "./User.jsx";
import useCheckBox from "./checkBox.jsx";
import { api } from "./api.jsx";
import { useAllData } from "./allData.jsx";
import { useRemoveBtn } from "./remove.jsx";
import RemoveAllBtn from "./removeAllBtn.jsx";
import FinishedBtn from "./FinishedBtn.jsx";
export function App() {
  // const { handleKeyPress, userInput, setUserInput, click } = useUser();

  const { removeBtn } = useRemoveBtn((updatedAllData) => {
    setAllData(updatedAllData);
  });
  const onUpdateAll = (updatedAllData) => {
    setAllData(updatedAllData);
  };
  const { allData, setAllData } = useAllData();
  const { checkboxes, handleCheckboxChange, checkit } = useCheckBox();
  const handleInputChange = (item) => {
    handleCheckboxChange(item);
  };

  return (
    <>
      {" "}
      <div className="container">
        <Search allData={allData} onUpdateAllData={onUpdateAll} />
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
          <RemoveAllBtn checkboxes={checkboxes} onUpdateAllData={onUpdateAll} />
          <FinishedBtn checkboxes={checkboxes} onUpdateAllData={onUpdateAll} />
        </div>
      </div>
    </>
  );
}
