import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "../App.scss";
import shoppingcart from "../assets/shoppingcart.svg";

import logo from "../assets/Retail-Junction-logos_black.png";
import arrowImg from "../assets/arrow.svg";
import { Outlet } from "react-router-dom";
import Search from "./Search";
import menu from "../assets/menu.svg";
import Tabs from "./Tabs";
import TabsMobile from "./TabsMobile";

export const CartContext = React.createContext();

export default function Header() {
  const location = useLocation();
  const [items, setItems] = useState([]);
  const [itemsInCart, setItemsInCart] = useState([]);
  const [numItemsInCart, setNumItemsInCart] = useState(0);
  const [quantity, setQuantity] = useState([]);
  const [totalCost, setTotalCost] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    searchLookup();
    getTotalCost();
    getNumItemsInCart();
    if (itemsInCart.length === 0) {
      setTotalCost(0);
    }
  }, [itemsInCart, quantity, totalCost]);

  useEffect(() => {
    console.log("searchQuery", searchQuery);
  }, [searchQuery]);

  async function searchLookup() {
    try {
      fetch("https://fakestoreapi.com/products")
        .then((res) => res.json())
        .then((json) => setItems(json));
      //console.log("items", items);
    } catch (error) {
      setError(error);
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  const calculateRelevance = (item) => {
    const title = item.title.toLowerCase();
    const query = searchQuery.toLowerCase();

    // If the title starts with the query, give it higher relevance
    if (title.startsWith(query)) {
      return 2;
    }
    // If the title contains the query anywhere, give it medium relevance
    else if (title.includes(query)) {
      return 1;
    } else {
      // Otherwise, give it lower relevance
      return 0;
    }
  };

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

  const handleSearch = (event) => {
    event.preventDefault();
    history.push(`/search/${encodeURIComponent(searchQuery)}`);
  };

  const isActive = (path) => {
    // Check if the current location matches the given path
    return location.pathname === path;
  };

  const toggleMenuClick = () => {
    console.log("before toggle: ", showMenu);
    setShowMenu((prevShowMenu) => !prevShowMenu);
    console.log("menu clicked: ", showMenu);
    document.body.classList.toggle("active");
  };

  useEffect(() => {
    /*
    console.log("after toggle: ", showMenu);
    if (showMenu) {
      document.body.classList.add("menu-open");
    } else {
      document.body.classList.remove("menu-open");
    } */
  }, [showMenu]);

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
        setSearchQuery,
        setItems,
        items,
        searchQuery,
        totalCost,
        itemsInCart,
        quantity,
        numItemsInCart,
      }}
    >
      <>
        <div id="header">
          <div className="logo-cart-container">
            <div className="menu-container">
              <div className="menu-icon-container">
                <img
                  className="menu-icon"
                  src={menu}
                  alt="menu"
                  onClick={toggleMenuClick}
                />
              </div>
            </div>
            <div className="logo-header-container">
              {renderLink(
                "/",
                <img id="logo-header" src={logo} alt="logo" />,
                "home"
              )}
            </div>

            <Search />

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
              </div>
            </div>
          </div>

          {/*
          <div className="tabs">
            <div id="tab-container">
              {renderLink("/shop-all", "Shop All", "Explore all products")}
              {renderLink("/mens-clothing", "Men", "Explore all products")}

              <div
                className="women-container"
                onMouseEnter={() => setWomenDropdownVisibility(true)}
                onMouseLeave={() => setWomenDropdownVisibility(false)}
              >
                <div id="women-tab">
                  {renderLink("/women", "Women")}
                  <img className="arrow-img" src={arrowImg} alt="arrow" />
                </div>

                <div className="dropdown-container">
                  {renderLink("/women/womens-clothing", "Women Clothing")}
                  {renderLink("/women/jewelery", "Jewelery")}
                </div>
              </div>
              {renderLink("/electronics", "Electronics")}
            </div>
          </div>
  */}

          {window.innerWidth <= 768 && (
            <TabsMobile
              key={showMenu}
              id="phone-tabs"
              renderLink={renderLink}
              setWomenDropdownVisibility={setWomenDropdownVisibility}
              isWomenDropdownVisible={isWomenDropdownVisible}
              showMenu={showMenu}
              toggleMenuClick={toggleMenuClick}
              setShowMenu={setShowMenu}
            />
          )}

          {window.innerWidth > 768 && (
            <Tabs
              id="laptop-tabs"
              renderLink={renderLink}
              isWomenDropdownVisible={isWomenDropdownVisible}
              setWomenDropdownVisibility={setWomenDropdownVisibility}
            />
          )}
        </div>
        <Outlet className="header-outlet" addItemToCart={addItemToCart} />
      </>
    </CartContext.Provider>
  );
}
