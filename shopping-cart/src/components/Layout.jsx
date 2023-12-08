// Layout.jsx
import React from "react";
import Header from "./Header";

const Layout = ({ children }) => {
  return (
    <div>
      <Header />
      <div id="content">{children}</div>
    </div>
  );
};

export default Layout;
