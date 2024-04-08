import { CartContext } from "./Header";
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import search from "/src/assets/search.svg";
import { Link } from "react-router-dom";
import "/src/App.scss";
export default function Search({ toggleMenuClick }) {
  const { searchQuery, setSearchQuery, setItems, items } =
    React.useContext(CartContext);

  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    // Filter and sort data based on relevance
    const relevantSuggestions = items
      .filter((item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .sort(
        (a, b) =>
          b.title.toLowerCase().startsWith(searchQuery.toLowerCase()) -
          a.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      )
      .slice(0, 5);

    //console.log("suggestions", relevantSuggestions);
    setSuggestions(relevantSuggestions);
  }, [items, searchQuery]);

  const handleSearch = (event) => {
    event.preventDefault();
    if (suggestions.length > 0) {
      // Redirect to the first suggestion
      history.push(`/shop/${encodeURIComponent(suggestions[0].title)}`);
    }
  };

  return (
    <div id="search-container">
      <form className="searchbar-form" action="input" onSubmit={handleSearch}>
        <input
          type="text"
          name="search"
          id="searchbar"
          placeholder={`Search`}
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
        />

        <button className="search-button" type="submit">
          <img
            id="search-icon"
            src={search}
            alt="search"
            style={{ height: "100%" }}
          />
        </button>
      </form>
      {searchQuery && suggestions.length > 0 && (
        <ul className="autocomplete-list">
          {suggestions.map((item) => (
            <li
              key={item.id}
              onClick={() => setSearchQuery("")}
              className="list-item"
            >
              <Link
                className="list-item-link"
                to={`/shop/${encodeURIComponent(item.title)}`}
                onClick={toggleMenuClick}
              >
                <img className="search-img" src={item.image} alt={item.title} />
                <p className="list-item-text">{item.title}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/*
 return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {/* Render autocomplete suggestions }
      {searchQuery && suggestions.length > 0 && (
        <ul className="autocomplete-list">
          {suggestions.map((item) => (
            <li key={item.id}>
              <Link to={`/shop/${encodeURIComponent(item.title)}`}>
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
*/
