import { useState } from "react";
import "./App.scss";
import Header from "/src/components/Header";

function App() {
  async function getItemImg() {
    try {
      fetch("https://fakestoreapi.com/products/category/jewelry").then((res) =>
        res.json()
      );
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
