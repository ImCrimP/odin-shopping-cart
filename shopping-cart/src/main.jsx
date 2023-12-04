import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import ShopAll from "./components/ShopAll.jsx";
import WomensClothing from "./components/WomensClothing.jsx";
import WomenAll from "./components/WomenAll.jsx";
import Jewelery from "./components/Jewelery.jsx";

import "./index.css";
import MensClothing from "./components/MensClothing.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "shopAll",
    element: <ShopAll />,
  },
  {
    path: "mensClothing",
    element: <MensClothing />,
  },
  {
    path: "women",
    element: <WomenAll />,
    children: [
      { path: "womensClothing", element: <WomensClothing /> },
      { path: "jewelery", element: <Jewelery /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
