import { useState, useEffect } from "react";
import "../App.scss";
import shoppingcart from "../assets/shoppingcart.svg";
import search from "../assets/search.svg";

export default function Header() {
  /*
  const [page, setPage] = useState("");
  const [storeItems, setStoreItems] = useState([
    {
      category: "",
      imageLink: "",
      title: "",
      price: 0,
      rating: 0,
      count: 0,
      description: "",
    },
  ]);

  const [filteredItems, setFilteredItems] = useState([]);

  const [pageItems, setPageItems] = useState([
    {
      category: "",
      imageLink: "",
      title: "",
      price: 0,
      rating: 0,
      count: 0,
      description: "",
    },
  ]);

  const filterByTab = (tab) => {
    // If tab is not provided, reset to all items
    if (!tab) {
      setFilteredItems(storeItems);
    } else {
      // Use filter to select only items with the target category
      const filteredItems = storeItems.filter((item) => item.category === tab);
      setFilteredItems(filteredItems);
    }
    console.log("filtered", filteredItems);
  };

  useEffect(() => {
    async function getItemInfo() {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        const data = await response.json();
        console.log("data", data);

        // Map over the data and create a new array of items with the required properties
        const items = data.map((item) => ({
          category: item.category,
          imageLink: item.image,
          title: item.title,
          price: item.price,
          rating: item.rating.rate,
          count: item.rating.count,
          description: item.description,
        }));

        // Update the state with the new items array
        setStoreItems(items);
        setFilteredItems(items);
        //console.log(storeItems);
      } catch (error) {
        console.error(error);
      }
    }
    getItemInfo();
  }, []);
*/
  /*function filterByTab(tab) {
    for (let i = 0; i < storeItems.length; i++) {
      if (storeItems[i].category == tab) {
        setPageItems(storeItems[i]);
      }
    }
  }

  const handleItemClick = (category) => {
    // Handle the click event for the dropdown items
    console.log(`Clicked on ${category}`);
    // Add your logic for handling the click event, such as navigating to a new page or updating state
  };
*/
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
          


           onClick={() => filterByTab("men's clothing")}
  */
  const [isWomenDropdownVisible, setWomenDropdownVisibility] = useState(false);
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
          <a data-section="men's clothing" href="mens-clothing">
            Men
          </a>
          <div className="women-container">
            <a
              href="women"
              className="women-tab"
              onMouseEnter={() => setWomenDropdownVisibility(true)}
              onMouseLeave={() => setWomenDropdownVisibility(false)}
            >
              Women{" "}
              <img
                className="arrow-img"
                src="src/assets/arrow.svg"
                alt="arrow"
              />
            </a>
            {isWomenDropdownVisible && (
              <div className="dropdown-container">
                <a className="dropdown" href="womens-clothing">
                  Women's Clothing
                </a>
                <a className="dropdown" href="jewelry">
                  Jewelry
                </a>
              </div>
            )}
          </div>
          <a href="electronics">Electronics</a>
        </div>
      </div>
    </div>
  );
}
