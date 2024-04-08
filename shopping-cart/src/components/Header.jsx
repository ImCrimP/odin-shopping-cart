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
  const [initialOpen, setInitialOpen] = useState(false);
  const [womenHasBeenOpen, setWomenHasBeenOpen] = useState(false);

  useEffect(() => {
    searchLookup();
    getTotalCost();
    getNumItemsInCart();
    if (itemsInCart.length === 0) {
      setTotalCost(0);
    }
  }, [itemsInCart, quantity, totalCost]);

  async function searchLookup() {
    try {
      fetch("https://fakestoreapi.com/products")
        .then((res) => res.json())
        .then((json) => setItems(json));
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

  function addItemToCart(item, qty) {
    // Find the index of the item in the cart
    const index = itemsInCart.findIndex((cartItem) => cartItem === item);

    if (index !== -1) {
      // If the item is already in the cart, update the quantity
      const newQuantity = quantity[index] + parseInt(qty, 10); // Parse qty as an integer
      setQuantity([
        ...quantity.slice(0, index),
        newQuantity,
        ...quantity.slice(index + 1),
      ]);
    } else {
      // If the item is not in the cart, add it with the specified quantity
      setItemsInCart([...itemsInCart, item]);
      setQuantity([...quantity, parseInt(qty, 10)]); // Parse qty as an integer
    }

    // Update the total number of items in the cart
    setNumItemsInCart(numItemsInCart + parseInt(qty, 10)); // Parse qty as an integer
  }

  function getTotalCost() {
    let total = 0;
    if (itemsInCart.length === 0) {
      return 0;
    }
    for (let i = 0; i < itemsInCart.length; i++) {
      total += itemsInCart[i].price * quantity[i];
    }

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
    setShowMenu((prevShowMenu) => !prevShowMenu);
    document.body.classList.toggle("active");
    setInitialOpen(!initialOpen);
    setWomenHasBeenOpen(false);
    setIsWomenDropdownVisible(false);
  };

  const renderLink = (to, label, cN) => (
    <Link
      to={to}
      className={`main-tab tab ${cN} ${isActive(to) ? "active" : ""}`}
    >
      {label}
    </Link>
  );

  //Make div containers that can handle onClick events ?
  const [isWomenDropdownVisible, setIsWomenDropdownVisible] = useState(false);
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
                <img src={shoppingcart} alt="cart" />,
                "cart"
              )}

              <div
                className={`${itemsInCart.length > 0 ? "items-cart" : "hide"}`}
              >
                {numItemsInCart}
              </div>
            </div>
          </div>

          {window.innerWidth <= 768 && (
            <TabsMobile
              key={showMenu}
              id="phone-tabs"
              renderLink={renderLink}
              setIsWomenDropdownVisible={setIsWomenDropdownVisible}
              isWomenDropdownVisible={isWomenDropdownVisible}
              showMenu={showMenu}
              toggleMenuClick={toggleMenuClick}
              setShowMenu={setShowMenu}
              initialOpen={initialOpen}
              setInitialOpen={setInitialOpen}
              womenHasBeenOpen={womenHasBeenOpen}
              setWomenHasBeenOpen={setWomenHasBeenOpen}
            />
          )}

          {window.innerWidth > 768 && (
            <Tabs
              id="laptop-tabs"
              renderLink={renderLink}
              isWomenDropdownVisible={isWomenDropdownVisible}
              setIsWomenDropdownVisible={setIsWomenDropdownVisible}
            />
          )}
        </div>
        <Outlet className="header-outlet" addItemToCart={addItemToCart} />
      </>
    </CartContext.Provider>
  );
}
