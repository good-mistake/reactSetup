import React from "react";
import { shareddata } from "./shareddata";

const User = () => {
  const { userInput, inputs, handleKeyPress, click } = shareddata();

  return (
    <>
      <input
        type="text"
        id="todoInput"
        placeholder="Enter an Item"
        onKeyPress={handleKeyPress}
        onChange={inputs}
        value={userInput}
        className={userInput === "" ? "red" : ""}
      />
      <button className="enterBtn" onClick={click}>
        Enter
      </button>
    </>
  );
};

export default User;
