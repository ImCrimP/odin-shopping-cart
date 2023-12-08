import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "../App.scss";
import shoppingcart from "../assets/shoppingcart.svg";
import search from "../assets/search.svg";
import logo from "../assets/Retail-Junction-logos_black.png";

export default function Header() {
  const location = useLocation();

  const isActive = (path) => {
    // Check if the current location matches the given path
    return location.pathname === path;
  };

  const renderLink = (to, label) => (
    <Link to={to} className={`main-tab tab ${isActive(to) ? "active" : ""}`}>
      {label}
    </Link>
  );

  //Make div containers that can handle onClick events ?
  const [isWomenDropdownVisible, setWomenDropdownVisibility] = useState(false);
  return (
    <div id="header">
      <div className="logo-cart-container">
        <a className="logo-header-contianer" href="/">
          <img id="logo-header" src={logo} alt="logo" />
        </a>

        <div id="search-container">
          <form className="searchbard-form" action="input">
            <input
              type="text"
              name="search"
              id="searchbar"
              placeholder={`Search`}
            />
          </form>

          <img
            id="search-icon"
            src={search}
            alt="search"
            style={{ height: "100%" }}
          />
        </div>

        <div className="cart-icon-container">
          <a href="">
            <img className="cart" src={shoppingcart} alt="cart" />
          </a>
          <div id="items-cart">6</div>
        </div>
      </div>

      <div className="tabs">
        <div id="tab-container">
          {renderLink("/shop-all", "Shop All", "Explore all products")}
          {renderLink("/mens-clothing", "Men", "Explore all products")}
          {/*<a className="main-tab tab" href="shop-all">
            Shop All
          </a>
          <a
            className="main-tab tab"
            data-section="men's clothing"
            href="mens-clothing"
          >
            Men
          </a>*/}
          <div
            className="women-container"
            onMouseEnter={() => setWomenDropdownVisibility(true)}
            onMouseLeave={() => setWomenDropdownVisibility(false)}
          >
            <a href="women" className="women-tab tab">
              Women{" "}
              <img
                className="arrow-img"
                src="src/assets/arrow.svg"
                alt="arrow"
              />
            </a>
            {/*} {isWomenDropdownVisible && (*/}
            <div className="dropdown-container">
              <a className="dropdown tab" href="/womens-clothing">
                Women's Clothing
              </a>
              <a className="dropdown tab" href="/jewelry">
                Jewelry
              </a>
            </div>
            {/*)}*/}
          </div>
          <a className="tab main-tab" href="/electronics">
            Electronics
          </a>
        </div>
      </div>
    </div>
  );
}
