import React, { useEffect } from "react";
import { useState } from "react";
export function App() {
  const [userInput, setUserInput] = useState([]);
  const [apiData, setApiData] = useState([]);
  const [userData, setUserData] = useState([]);
  const [allData, setAllData] = useState([]);
  const [search, setSearch] = useState([]);
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && userInput.trim() !== "") {
      const storage = [...userData, userInput];
      setUserData(storage);

      localStorage.setItem("userInput", JSON.stringify(storage));
      setUserInput("");
    }
  };
  const click = () => {
    if (userInput.trim() !== "") {
      const storage = [...userData, userInput];
      setUserData(storage);
      localStorage.setItem("userInput", JSON.stringify(storage));
      setUserInput("");
    }
  };
  const inputs = (e) => {
    setUserInput(e.target.value);
  };
  useEffect(() => {
    const get = async () => {
      fetch("https://jsonplaceholder.typicode.com/todos")
        .then((res) => {
          return res.json();
        })
        .then((i) => {
          setApiData(i);
        })
        .catch((e) => {
          console.log(e);
        });
    };
    get();
  }, []);
  useEffect(() => {
    setAllData([...apiData.map((e) => e.title), ...userData]);
  }, [apiData, userData]);
  console.log(allData);
  const searchInput = (e) => {
    usersearch = e.target.value;
    if (usersearch > "") {
      const founded = allData.filter((i) => i.includes(usersearch));
      setSearch(founded);
    } else {
      setSearch([]);
    }
  };
  useEffect(() => {
    const get = localStorage.getItem("userInput");
    if (get) {
      setUserData(JSON.parse(get));
    }
  }, []);
  return (
    <>
      {" "}
      <div className="container">
        <div className="searchContainer">
          <label htmlFor="search">Search : </label>
          <input
            type="text"
            className="searchInput"
            placeholder="Search"
            id="search"
            onChange={searchInput}
          />
          <div className="searchResults">
            {search.map((e) => {
              return <div>{e}</div>;
            })}
          </div>
        </div>

        <div>
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

          <ol className="todoItems">
            {allData.map((item, num) => {
              return (
                <li key={num} className="list">
                  {item}
                  <button
                    className="removeBtn"
                    onClick={(e) => {
                      allData.remove(e);
                    }}
                  >
                    Remove
                  </button>{" "}
                  <input type="checkbox" />
                </li>
              );
            })}
          </ol>

          <button className="enterAllBtn">Select All</button>
          <button className="finishBtn">Finished Selected</button>
          <button className="removeAllBtn">Remove Selected</button>
        </div>
      </div>
      <div className="finishedItems"></div>
    </>
  );
}
