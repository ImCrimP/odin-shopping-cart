import React from "react";
import { Link, useLocation, useHistory } from "react-router-dom";
import { GetData } from "./GetData";

const SearchResult = () => {
  const location = useLocation();
  const history = useHistory(); // Ensure you have access to history

  const { searchQuery } = useParams();

  const handleSearch = (event) => {
    event.preventDefault();
    history.push(`/search/${encodeURIComponent(searchQuery)}`);
  };

  return (
    <div>
      <h2>Search Results for: {searchQuery}</h2>
      <form onSubmit={handleSearch}>{/* Your search form here */}</form>
      <GetData categories={[searchQuery]} searchQuery={searchQuery} />
    </div>
  );
};

export default SearchResult;
