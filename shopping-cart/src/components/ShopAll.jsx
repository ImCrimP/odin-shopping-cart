import Header from "./Header";
import { useState, useEffect } from "react";
import "../App.scss";
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
      console.log(error);
    }
  }
  */

  const [storeItems, setStoreItems] = useState([
    {
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
        //console.log(data);

        // Map over the data and create a new array of items with the required properties
        const items = data.map((item) => ({
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

  console.log(storeItems);

  function handleClick() {
    return;
  }

  return (
    <>
      <Header />
      <h1>All Items</h1>
      <div className="item-container">
        {storeItems.map((item, index) => (
          <div className="item" key={index} onClick={() => handleClick}>
            <div className="item-image-container">
              <img
                className="item-image"
                src={item.imageLink}
                alt={item.title}
              />
            </div>

            <h4 className="item-title">{item.title}</h4>
            <h5 className="item-price">${item.price}</h5>
          </div>
        ))}
      </div>
    </>
  );
}
