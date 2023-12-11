// Layout.jsx
import React from "react";
import Header from "./Header";

const Layout = ({ children }) => {
  return (
    <div>
      <div id="content">{children}</div>
    </div>
  );
};

export default Layout;
