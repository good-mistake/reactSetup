import React from "react";

const User = ({ handleKeyPress, click, inputs, userInput }) => {
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
      <button
        className="enterBtn"
        onClick={click} /*disabled={userInput === ""}*/
      >
        Enter
      </button>
    </>
  );
};

export default User;
