import React, { useState, useEffect } from "react";
import "../App.scss";

export default function items(section) {
  let itemsToSend = [];

  useEffect(() => {
    async function getItemInfo() {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        const data = await response.json();

        // Filter items based on the section
        const filteredItems = data
          .filter((item) => item.category === section)
          .map((item) => ({
            category: item.category,
            imageLink: item.image,
            title: item.title,
            price: item.price,
            rating: item.rating.rate,
            count: item.rating.count,
            description: item.description,
          }));

        // Update the state with the filtered items
        if (filteredItems.length > 0) {
          itemsToSend.push(filteredItems);
        }

        console.log(itemsToSend);
      } catch (error) {
        console.error(error);
      }
    }

    getItemInfo();
  }, [section]); // Add 'section' as a dependency to useEffect

  return itemsToSend;
}
