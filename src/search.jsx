import { useAllData } from "./allData.jsx";
import { useState, useEffect } from "react";
export default Search = ({ allData, onUpdateAllData }) => {
  const [search, setSearch] = useState([]);

  const searchInput = (e) => {
    const usersearch = e.target.value;
    if (usersearch > "") {
      const founded = allData.filter((i) => i.includes(usersearch));
      setSearch(founded);
    } else {
      setSearch([]);
      onUpdateAllData(allData);
    }
  };
  useEffect(() => {
    if (search.length > 0) {
      onUpdateAllData(search);
    }
  }, [allData]);

  return (
    <>
      {" "}
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
          {search.map((e, num) => {
            return <div key={num}>{e}</div>;
          })}
        </div>
      </div>
    </>
  );
};
