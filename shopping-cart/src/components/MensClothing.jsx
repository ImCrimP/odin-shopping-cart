import GetData from "./GetData";

export default function MensClothing() {
  const categories = ["men's clothing"];
  return (
    <>
      <h1>Mens Clothing</h1>
      <GetData categories={categories} />
    </>
  );
}
