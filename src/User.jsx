import { useState, useEffect } from "react";
import React from "react";
import { shareddata } from "./shareddata";
const User = () => {
  const [userInput, setUserInput] = useState([]);
  const { setUserData, userData } = shareddata();

  const listen = (e) => {
    localStorage.setItem("userInput", JSON.stringify(e));
    const event = new Event("ListentoUpdate");
    window.dispatchEvent(event);
  };

  // useEffect(() => {
  //   localStorage.setItem("userInput", JSON.stringify(storage));
  // }, [userData, userInput]);

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && userInput.trim() !== "") {
      setUserData([...userData, userInput]);
      setUserInput("");
      listen([...userData, userInput]);
    }
  };
  const click = () => {
    if (userInput.trim() !== "") {
      setUserData([...userData, userInput]);
      setUserInput("");
      listen([...userData, userInput]);
    }
  };
  const inputs = (e) => {
    setUserInput(e.target.value);
  };
  const setUserUpdate = (i) => {
    setUserData(i);
  };
  return (
    <>
      {" "}
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
