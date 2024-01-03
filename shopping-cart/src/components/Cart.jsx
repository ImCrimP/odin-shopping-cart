import React from "react";
import { CartContext } from "./Header";
import "/src/scss/Cart.scss";
export default function Cart() {
  const {
    itemsInCart,
    quantity,
    totalCost,
    increaseQuantity,
    decreaseQuantity,
    removeItem,
  } = React.useContext(CartContext);

  console.log(itemsInCart.length);
  console.log("itmes in cart", itemsInCart);
  if (itemsInCart.length === 0) {
    return <h1>Your cart is empty</h1>;
  }
  return (
    <div className="cart-container">
      <h2>Cart</h2>
      <div className="cart-items">
        {itemsInCart.map((item, index) => (
          <div className="item-container" key={index}>
            <div className="img-container">
              <img
                className="item-image-cart"
                src={item.image}
                alt={item.title}
              />
            </div>
            <p className="item-title">{item.title}</p>
            <p>${item.price.toFixed(2)}</p>
            <div className="button-container">
              <div className="quantity-container">
                <button onClick={() => decreaseQuantity(index)}>-</button>
                <p>{quantity[index]}</p>
                <button onClick={() => increaseQuantity(index)}>+</button>
              </div>
              <button onClick={() => removeItem(index)}>Remove</button>
            </div>
          </div>
        ))}
        <p>Total Cost: ${totalCost.toFixed(2)}</p>
      </div>
    </div>
  );
}
