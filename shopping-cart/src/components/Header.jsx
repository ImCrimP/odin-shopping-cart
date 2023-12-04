export default function Header() {
  const handleItemClick = (category) => {
    // Handle the click event for the dropdown items
    console.log(`Clicked on ${category}`);
    // Add your logic for handling the click event, such as navigating to a new page or updating state
  };

  return (
    <div id="header">
      <img
        id="logo-header"
        src="src/assets/Retail-Junction-logos-diamond.jpeg"
        alt="logo"
      />
      <div className="tabs">
        <div id="tab-container">
          <a>Shop All</a>
          <a>Men</a>
          <a>
            Women <img src="src/assets/arrow.svg" alt="arrow" />
          </a>
          <a>Electronics</a>
        </div>
      </div>

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
            {/* Add more categories as needed */}
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
            {/* Add more categories as needed */}
          </div>
        </li>
        {/* Add more top-level menu items as needed */}
      </ul>
    </div>
  );
}
