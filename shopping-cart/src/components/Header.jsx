import "../App.scss";
import shoppingcart from "../assets/shoppingcart.svg";
import search from "../assets/search.svg";

export default function Header() {
  const handleItemClick = (category) => {
    // Handle the click event for the dropdown items
    console.log(`Clicked on ${category}`);
    // Add your logic for handling the click event, such as navigating to a new page or updating state
  };

  /*
      <ul>
        <li>
          <Link href=""></Link>
        </li>
      </ul>





      <ul className="menu">
        <li>
          <a href="#">Home</a>
        </li>
        <li className="dropdown">
          <a href="#" className="dropbtn">
            Men
          </a>
          <div className="dropdown-content">
            <a href="#" onClick={() => handleItemClick("Men Clothes")}>
              Clothes
            </a>
            <a href="#" onClick={() => handleItemClick("Men Accessories")}>
              Accessories
            </a>
            {/* Add more categories as needed }
            </div>
            </li>
            <li className="dropdown">
              <a href="#" className="dropbtn">
                Women
              </a>
              <div className="dropdown-content">
                <a href="#" onClick={() => handleItemClick("Women Clothes")}>
                  Clothes
                </a>
                <a href="#" onClick={() => handleItemClick("Women Accessories")}>
                  Accessories
                </a>
                {/* Add more categories as needed }
              </div>
            </li>
            {/* Add more top-level menu items as needed }
          </ul>
          
  */

  return (
    <div id="header">
      <form className="searchbard-form" action="input">
        <input
          type="text"
          name="search"
          id="searchbar"
          placeholder={`Search`}
        />
      </form>
      <div className="logo-cart-container">
        <a className="logo-header-contianer" href="/">
          <img
            id="logo-header"
            src="src/assets/Retail-Junction-logos-diamond.jpeg"
            alt="logo"
          />
        </a>

        <a href="">
          <img className="cart" src={shoppingcart} alt="cart" />
        </a>
      </div>

      <div className="tabs">
        <div id="tab-container">
          <a href="shop-all">Shop All</a>
          <a href="mens-clothing">Men</a>
          <a href="women" className="women-tab">
            Women{" "}
            <img className="arrow-img" src="src/assets/arrow.svg" alt="arrow" />
          </a>
          <a href="electronics">Electronics</a>
        </div>
      </div>
    </div>
  );
}
