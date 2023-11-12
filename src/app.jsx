import React, { useEffect } from "react";
import { useState } from "react";
export function App() {
  const [userInput, setUserInput] = useState([]);
  const [apiData, setApiData] = useState([]);
  const [userData, setUserData] = useState([]);
  const [allData, setAllData] = useState([]);
  const [search, setSearch] = useState([]);
  const [finished, setFinished] = useState({});
  const [checkboxes, setCheckboxes] = useState({});
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
  const removeBtn = (e) => {
    const removeFromApi = apiData.filter((item) => item.title !== e);
    setApiData(removeFromApi);
    const storedData = JSON.parse(localStorage.getItem("userInput")) || [];
    const removeFromStorage = storedData.filter((item) => item !== e);
    if (removeFromStorage.length > 0) {
      localStorage.setItem("userInput", JSON.stringify(removeFromStorage));
    } else {
      localStorage.clear("userInput");
    }
    setUserData(removeFromStorage);
  };

  const checkit = () => {
    const toggle = {};
    const allChecked = Object.values(checkboxes).every((value) => value);
    for (const item of allData) {
      toggle[item] = !allChecked;
    }
    setCheckboxes(toggle);
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
  useEffect(() => {
    const Checkboxes = {};
    for (const item of allData) {
      Checkboxes[item] = false;
    }
    setCheckboxes(Checkboxes);
  }, [allData]);

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
                    onClick={() => {
                      removeBtn(item);
                    }}
                  >
                    Remove
                  </button>{" "}
                  <input
                    type="checkbox"
                    checked={checkboxes[item] || false}
                    onChange={(e) => {
                      const checking = e.target.checked;
                      setCheckboxes((prev) => ({
                        ...prev,
                        [item]: checking,
                      }));
                    }}
                  />
                </li>
              );
            })}
          </ol>

          <button className="enterAllBtn" onClick={checkit}>
            Select All
          </button>
          <button
            className="finishBtn"
            onClick={() => {
              const selectedItems = Object.keys(checkboxes).filter(
                (key) => checkboxes[key]
              );
              if (selectedItems.length > 0) {
                const updatedFinished = { ...finished, ...checkboxes };
                setFinished(updatedFinished);

                const updatedAllData = allData.filter(
                  (item) => !selectedItems.includes(item)
                );
                setAllData(updatedAllData);
              }
            }}
          >
            Finished Selected
          </button>
          <button
            className="removeAllBtn"
            onClick={() => {
              const selectedItems = Object.keys(checkboxes).filter(
                (key) => checkboxes[key]
              );
              const updatedAllData = allData.filter(
                (item) => !selectedItems.includes(item)
              );
              setAllData(updatedAllData);
              const storedData =
                JSON.parse(localStorage.getItem("userInput")) || [];
              const updatedStoredData = storedData.filter(
                (item) => !selectedItems.includes(item)
              );
              if (updatedStoredData.length > 0) {
                localStorage.setItem(
                  "userInput",
                  JSON.stringify(updatedStoredData)
                );
              } else {
                localStorage.removeItem("userInput");
              }
            }}
          >
            Remove Selected
          </button>
        </div>
      </div>
      <div className="finishedItems">
        {Object.keys(finished).map((item, index) => (
          <div key={index}>{item}</div>
        ))}
      </div>
    </>
  );
}
