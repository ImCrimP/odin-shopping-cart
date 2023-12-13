import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import ShopAll from "./components/ShopAll.jsx";
import WomensClothing from "./components/WomensClothing.jsx";
import WomenAll from "./components/WomenAll.jsx";
import Jewelery from "./components/Jewelery.jsx";
import Electronics from "./components/Electronics.jsx";
import "./index.css";
import MensClothing from "./components/MensClothing.jsx";
import Home from "./components/Home.jsx";
import ItemPage from "./components/ItemPage.jsx";
import Cart from "./components/Cart.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/shop-all",
        element: <ShopAll />,
      },
      {
        path: "/mens-clothing",
        element: <MensClothing />,
      },
      {
        path: "/women",
        element: <WomenAll />,
      },

      {
        path: "women/womens-clothing",
        element: <WomensClothing />,
      },

      {
        path: "/women/jewelery",
        element: <Jewelery />,
      },
      {
        path: "/electronics",
        element: <Electronics />,
      },
      {
        path: "/shop/:itemTitle",
        element: <ItemPage />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
