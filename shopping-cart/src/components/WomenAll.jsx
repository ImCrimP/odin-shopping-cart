import Header from "./Header";
import { Outlet } from "react-router-dom";
export default function WomenAll() {
  return (
    <>
      <Header />
      <h1>All Women Items</h1>
      <Outlet />
    </>
  );
}
