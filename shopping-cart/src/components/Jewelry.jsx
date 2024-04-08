import GetData from "./GetData";
export default function Jewelry() {
  const categories = ["jewelry"];
  return (
    <>
      <h1>Jewelry</h1>
      <GetData categories={categories} />
    </>
  );
}
