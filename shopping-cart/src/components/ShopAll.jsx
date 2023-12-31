import Header from "./Header";
import { useState, useEffect } from "react";
import "../App.scss";
import GetData from "./GetData";
export default function ShopAll() {
  /*
  let storeItems = useState[{
    imageLink: "",
    title: "",
    price: 0,
    rating: 0,
    count: 0,
    description: "",
  }]
  async function getItemImg() {
    try {
      fetch("https://fakestoreapi.com/products")
        .then((res) => res.json())
        .then((json) => {
          console.log(json);
          for(let i=0; i<json.length; i++){
            
          }
        });
    } catch (error) {
      consolae.log(error);
    }
  }
  

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
        //console.log(storeItems);
      } catch (error) {
        console.error(error);
      }
    }
    getItemInfo();
  }, []);

  console.log("store items", storeItems);

  function handleClick() {
    return;
  }
  */

  const categories = [
    "men's clothing",
    "women's clothing",
    "jewelery",
    "electronics",
  ];
  return (
    <>
      <h1>All Items</h1>
      <GetData categories={categories} />
    </>
  );
}
