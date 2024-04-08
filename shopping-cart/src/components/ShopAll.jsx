import Header from "./Header";
import { useState, useEffect } from "react";
import "../App.scss";
import GetData from "./GetData";
export default function ShopAll() {
  const categories = [
    "men's clothing",
    "women's clothing",
    "jewelry",
    "electronics",
  ];
  return (
    <>
      <h1>All Items</h1>
      <GetData categories={categories} />
    </>
  );
}
