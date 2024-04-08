import arrowImg from "../assets/arrow.svg";
import Search from "./Search";
import { useState } from "react";
export default function TabsMobile({
  renderLink,
  setIsWomenDropdownVisible,
  isWomenDropdownVisible,
  showMenu,
  toggleMenuClick,
  setShowMenu,
  initalOpen,
  setInitialOpen,
  womenHasBeenOpen,
  setWomenHasBeenOpen,
}) {
  function womenOpen() {
    setIsWomenDropdownVisible(!isWomenDropdownVisible);
    setWomenHasBeenOpen(true);
  }
  return (
    <>
      <div
        className={`mobile-menu-container ${showMenu ? "active" : "inactive"}`}
      >
        <div className={`tabs-mobile `}>
          <div id="x-tab" onClick={toggleMenuClick}>
            X
          </div>
          <Search toggleMenuClick={toggleMenuClick} />
          <div id="tab-container-mobile">
            <div className="menu-tab" onClick={toggleMenuClick}>
              {renderLink("/shop-all", "Shop All")}
            </div>

            <div className="menu-tab" onClick={toggleMenuClick}>
              {renderLink("/mens-clothing", "Men")}
            </div>

            <div
              className={`women-container-menu ${
                isWomenDropdownVisible ? "visible" : "slide-up"
              }`}
              onClick={() => womenOpen()}
            >
              <div id="women-tab" className="menu-tab">
                <div>Women</div>
                <img className="arrow-img" src={arrowImg} alt="arrow" />
              </div>

              <div
                className={`dropdown-mobile ${
                  isWomenDropdownVisible && !initalOpen ? "women-visible" : ""
                } ${!isWomenDropdownVisible ? "women-hidden" : ""}`}
              >
                <div onClick={toggleMenuClick}>
                  {renderLink("/women", "All Women", "women-link")}
                </div>
                <div onClick={toggleMenuClick}>
                  {renderLink(
                    "/women/womens-clothing",
                    "Women Clothing",
                    "women-link"
                  )}
                </div>
                <div onClick={toggleMenuClick}>
                  {renderLink("/women/jewelry", "Jewelry", "women-link")}
                </div>
              </div>
            </div>
            <div
              className={`menu-tab electronics-tab ${
                isWomenDropdownVisible ? "electronics-down" : ""
              } ${
                !isWomenDropdownVisible && womenHasBeenOpen
                  ? "electronics-up"
                  : ""
              }`}
              onClick={toggleMenuClick}
            >
              {renderLink("/electronics", "Electronics")}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
