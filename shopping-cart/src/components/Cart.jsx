import React from "react";
import { CartContext } from "./Header";
export default function Cart() {
  const { itemsInCart } = React.useContext(CartContext);

  console.log(itemsInCart.length);
  console.log("itmes in cart", itemsInCart);
  return (
    <div className="cart-container">
      <h2>Cart</h2>
      <ul>
        {itemsInCart.map((item, index) => (
          <div key={index}>
            {item.title} - {item.price}
          </div>
        ))}
      </ul>
    </div>
  );
}
