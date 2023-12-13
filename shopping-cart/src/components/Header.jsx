import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "../App.scss";
import shoppingcart from "../assets/shoppingcart.svg";
import search from "../assets/search.svg";
import logo from "../assets/Retail-Junction-logos_black.png";
import arrowImg from "../assets/arrow.svg";
import { Outlet } from "react-router-dom";

export const CartContext = React.createContext();

export default function Header() {
  const location = useLocation();
  const [itemsInCart, setItemsInCart] = useState([]);

  function addItemToCart(item) {
    setItemsInCart([...itemsInCart, item]);
    console.log("itemsInCart:", itemsInCart);
  }

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
    <CartContext.Provider value={{ addItemToCart, itemsInCart }}>
      <>
        <div id="header">
          <div className="logo-cart-container">
            <div className="logo-header-contianer">
              {renderLink("/", <img id="logo-header" src={logo} alt="logo" />)}
            </div>

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
              {renderLink(
                "/cart",
                <img className="cart" src={shoppingcart} alt="cart" />
              )}

              <div
                className={`${itemsInCart.length > 0 ? "items-cart" : "hide"}`}
              >
                {itemsInCart.length}
                {/*{itemsInCart.map((item, index) => (
                  <div key={index}>
                    
                    <p>{item.title}</p>
                    
                  </div>
                ))}*/}
              </div>
            </div>
          </div>

          <div className="tabs">
            <div id="tab-container">
              {renderLink("/shop-all", "Shop All", "Explore all products")}
              {renderLink("/mens-clothing", "Men", "Explore all products")}
              {/*<a className="main-tab tab" href="shop-all">
            Shop Allv
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
                <div id="women-tab">
                  {renderLink("/women", "Women")}
                  <img className="arrow-img" src={arrowImg} alt="arrow" />
                </div>

                {/*
            <a href="women" className="women-tab tab">
              Women{" "}
              <img
                className="arrow-img"
                src="src/assets/arrow.svg"
                alt="arrow"
              />
            </a>
        */}
                {/*} {isWomenDropdownVisible && (*/}
                <div className="dropdown-container">
                  {renderLink("/women/womens-clothing", "Women")}
                  {renderLink("/women/jewelery", "Jewelery")}

                  {/*<a className="dropdown tab" href="/women/womens-clothing">
                Women's Clothing
              </a>
              <a className="dropdown tab" href="/jewelery">
                Jewelry
              </a>/*]*/}
                </div>
                {/*)}*/}
              </div>
              <a className="tab main-tab" href="/electronics">
                Electronics
              </a>
            </div>
          </div>
        </div>
        <Outlet className="header-outlet" addItemToCart={addItemToCart} />
      </>
    </CartContext.Provider>
  );
}
