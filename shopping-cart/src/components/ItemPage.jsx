import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import "/src/scss/ItemPage.scss";
import { CartContext } from "./Header";

const ItemPage = () => {
  const { itemTitle } = useParams();
  console.log("itemTitle:", itemTitle);
  const { addItemToCart } = React.useContext(CartContext);

  const [item, setItem] = useState(null);

  useEffect(() => {
    const fetchItemDetails = async () => {
      try {
        const response = await fetch(
          `https://fakestoreapi.com/products?title=${itemTitle}`
        );
        const itemsData = await response.json();
        console.log("itemsData:", itemsData);
        const foundItem = itemsData.find((item) => item.title === itemTitle);

        console.log("foundItem:", foundItem);

        setItem(foundItem);
      } catch (error) {
        console.error("Error fetching item details:", error);
      }
    };

    fetchItemDetails();
  }, [itemTitle]);

  //function addToCart(item) {}

  if (!item) {
    return <p>Loading...</p>;
  }

  return (
    <div className="item-page-container">
      <img className="item-image-page" src={item.image} alt={item.title} />
      <div
        className={`item-text-container
      ${window.innerWidth <= 768 ? `item-text-container-mobile` : ""}`}
      >
        <h2 className="item-title">{item.title}</h2>
        <div className="item-quantity">
          <button onClick={() => addItemToCart(item)}>Add to Cart</button>
        </div>

        <p>About this item:</p>

        <p className="item-description">{item.description}</p>
      </div>

      {/* Add more details as needed */}
    </div>
  );
};

export default ItemPage;
