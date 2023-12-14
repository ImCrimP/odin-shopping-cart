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
  const [numItemsInCart, setNumItemsInCart] = useState(0);
  const [quantity, setQuantity] = useState([]);
  const [totalCost, setTotalCost] = useState(0);

  useEffect(() => {
    getTotalCost();
    getNumItemsInCart();
    if (itemsInCart.length === 0) {
      setTotalCost(0);
    }
  }, [itemsInCart, quantity, totalCost]);

  function increaseQuantity(index) {
    const newQuantity = quantity[index] + 1;
    setQuantity([
      ...quantity.slice(0, index),
      newQuantity,
      ...quantity.slice(index + 1),
    ]);
  }

  function removeItem(index) {
    setItemsInCart([
      ...itemsInCart.slice(0, index),
      ...itemsInCart.slice(index + 1),
    ]);
    setQuantity([...quantity.slice(0, index), ...quantity.slice(index + 1)]);
  }

  function decreaseQuantity(index) {
    if (quantity[index] > 1) {
      const newQuantity = quantity[index] - 1;
      setQuantity([
        ...quantity.slice(0, index),
        newQuantity,
        ...quantity.slice(index + 1),
      ]);
    }
  }

  function getNumItemsInCart() {
    let total = 0;
    if (itemsInCart.length === 0) {
      return 0;
    }
    for (let i = 0; i < itemsInCart.length; i++) {
      total += quantity[i];
    }
    setNumItemsInCart(total);
  }

  function addItemToCart(item) {
    if (itemsInCart.includes(item)) {
      const index = itemsInCart.indexOf(item);
      const newQuantity = quantity[index] + 1;
      setQuantity([
        ...quantity.slice(0, index),
        newQuantity,
        ...quantity.slice(index + 1),
      ]);
    } else {
      setItemsInCart([...itemsInCart, item]);
      setQuantity([...quantity, 1]);
    }

    setNumItemsInCart(numItemsInCart + 1);
    console.log("quantity:", quantity);
    console.log("num items:", numItemsInCart);
    console.log("itemsInCart:", itemsInCart);
  }

  function getTotalCost() {
    let total = 0;
    if (itemsInCart.length === 0) {
      return 0;
    }
    for (let i = 0; i < itemsInCart.length; i++) {
      total += itemsInCart[i].price * quantity[i];
      console.log(`total after ${i} items: ${total}`);
    }

    console.log("total:", total);
    setTotalCost(total);
  }

  const isActive = (path) => {
    // Check if the current location matches the given path
    return location.pathname === path;
  };

  const renderLink = (to, label, id) => (
    <Link
      to={to}
      id={id}
      className={`main-tab tab ${isActive(to) ? "active" : ""}`}
    >
      {label}
    </Link>
  );

  //Make div containers that can handle onClick events ?
  const [isWomenDropdownVisible, setWomenDropdownVisibility] = useState(false);
  return (
    <CartContext.Provider
      value={{
        addItemToCart,
        increaseQuantity,
        decreaseQuantity,
        removeItem,
        totalCost,
        itemsInCart,
        quantity,
        numItemsInCart,
      }}
    >
      <>
        <div id="header">
          <div className="logo-cart-container">
            <div className="logo-header-contianer">
              {renderLink(
                "/",
                <img id="logo-header" src={logo} alt="logo" />,
                "home"
              )}
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
                <img className="cart" src={shoppingcart} alt="cart" />,
                "cart"
              )}

              <div
                className={`${itemsInCart.length > 0 ? "items-cart" : "hide"}`}
              >
                {numItemsInCart}
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
                  {renderLink("/women/womens-clothing", "Women Clothing")}
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
              {renderLink("/electronics", "Electronics")}
            </div>
          </div>
        </div>
        <Outlet className="header-outlet" addItemToCart={addItemToCart} />
      </>
    </CartContext.Provider>
  );
}
