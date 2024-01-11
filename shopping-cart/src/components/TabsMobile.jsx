import arrowImg from "../assets/arrow.svg";
import Search from "./Search";
export default function TabsMobile({
  renderLink,
  setWomenDropdownVisibility,
  isWomenDropdownVisible,
  showMenu,
  toggleMenuClick,
}) {
  return (
    <>
      <div
        className={`mobile-menu-container ${showMenu ? "active" : "inactive"}`}
      >
        <div className={`tabs-mobile `}>
          <div id="x-tab" onClick={toggleMenuClick}>
            X
          </div>
          <Search />
          <div id="tab-container-mobile">
            <div className="menu-tab" onClick={toggleMenuClick}>
              {renderLink("/shop-all", "Shop All")}
            </div>

            <div className="menu-tab" onClick={toggleMenuClick}>
              {renderLink("/mens-clothing", "Men")}
            </div>

            <div
              className={`women-container-menu ${
                isWomenDropdownVisible ? "visible" : ""
              }`}
              onClick={() =>
                setWomenDropdownVisibility(!isWomenDropdownVisible)
              }
            >
              <div id="women-tab" className="menu-tab">
                <div>Women</div>
                <img className="arrow-img" src={arrowImg} alt="arrow" />
              </div>

              <div className="dropdown-mobile">
                <div onClick={toggleMenuClick}>
                  {renderLink("/women", "All Women")}
                </div>
                <div onClick={toggleMenuClick}>
                  {renderLink("/women/womens-clothing", "Women Clothing")}
                </div>
                <div onClick={toggleMenuClick}>
                  {renderLink("/women/jewelery", "Jewelery")}
                </div>
              </div>
            </div>
            <div className="menu-tab" onClick={toggleMenuClick}>
              {renderLink("/electronics", "Electronics")}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
