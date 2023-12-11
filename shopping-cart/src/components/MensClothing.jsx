import GetData from "./GetData";

export default function MensClothing() {
  const categories = ["men's clothing"];
  return (
    <>
      <h2>Mens Clothing</h2>
      <GetData categories={categories} />
    </>
  );
}
