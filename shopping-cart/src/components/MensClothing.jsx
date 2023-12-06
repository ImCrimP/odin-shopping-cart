import Header from "./Header";
import items from "./items";
import React, { useState, useEffect } from "react";

export default function MensClothing() {
  const [pageItems, setPageItems] = useState([]);

  return (
    <>
      <Header />
      <h2>Mens Clothing</h2>
    </>
  );
}
