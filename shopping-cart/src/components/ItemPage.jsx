import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import "/src/scss/ItemPage.scss";
import { CartContext } from "./Header";

const ItemPage = () => {
  const { itemTitle } = useParams();
  console.log("itemTitle:", itemTitle);
  const { addItemToCart } = React.useContext(CartContext);

  const [item, setItem] = useState(null);

  /*
  const qty = document.getElementById("qty");
  let quantity = qty.value;
  console.log("qty:", quantity);
  */

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
        className={`
      ${
        window.innerWidth <= 768
          ? `item-text-container-mobile`
          : "item-text-container"
      }`}
      >
        <h2 className="item-title">{item.title}</h2>
        <span className="price-span">${item.price.toFixed(2)}</span>
        <div className="item-quantity">
          <select id="qty">
            <option value="1">Quantity: 1</option>
            <option value="2">Quantity: 2</option>
            <option value="3">Quantity: 3</option>
            <option value="4">Quantity: 4</option>
            <option value="5">Quantity: 5</option>
            <option value="6">Quantity: 6</option>
            <option value="7">Quantity: 7</option>
            <option value="8">Quantity: 8</option>
            <option value="9">Quantity: 9</option>
            <option value="10">Quantity: 10</option>
          </select>
          <button
            className="add-to-cart"
            onClick={() => {
              const qty = document.getElementById("qty");
              const quantity = qty.value;
              console.log("qty:", quantity);
              addItemToCart(item, quantity);
            }}
          >
            Add to Cart
          </button>
        </div>

        <p className="about">About this item:</p>

        <p className="item-description">{item.description}</p>
      </div>

      {/* Add more details as needed */}
    </div>
  );
};

export default ItemPage;
