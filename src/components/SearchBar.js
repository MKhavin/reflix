import React, { useEffect, useState } from "react";
import apiManager from "./util/TMDBAPIManager";
import "./css/SearchBar.css";

export default function SearchBar({ filmsListLoaded }) {
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (searchQuery) {
      apiManager.getFilmsDataByUsersQuery(searchQuery, filmsListLoaded);
    } else {
      apiManager.getFilmsData(filmsListLoaded);
    }
  }, [searchQuery]);

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search"
        name="search-query"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
  );
}
