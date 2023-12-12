import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import "/src/scss/ItemPage.scss";

const ItemPage = () => {
  const { itemTitle } = useParams();
  console.log("itemTitle:", itemTitle);

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

  if (!item) {
    return <p>Loading...</p>;
  }

  return (
    <div className="item-page-container">
      <img className="item-image-page" src={item.image} alt={item.title} />
      <div className="item-text-container">
        <h2 className="item-title">{item.title}</h2>
        <button>Add to Cart</button>
        <p>About this item:</p>
        <p className="item-description">{item.description}</p>
      </div>

      {/* Add more details as needed */}
    </div>
  );
};

export default ItemPage;
