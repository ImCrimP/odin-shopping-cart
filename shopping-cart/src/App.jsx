import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.scss";
import Home from "./components/Home";
import Header from "./components/Header";
import { Link } from "react-router-dom";

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
