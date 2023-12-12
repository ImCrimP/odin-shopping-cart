import { useState } from "react";
import "./App.scss";
import Header from "./components/Header";

function App() {
  async function getItemImg() {
    try {
      fetch("https://fakestoreapi.com/products/category/jewelery")
        .then((res) => res.json())
        .then((json) => console.log(json));
    } catch (error) {
      console.log(error);
    }
  }

  getItemImg();
  return (
    <>
      <Header />
    </>
  );
}

export default App;
