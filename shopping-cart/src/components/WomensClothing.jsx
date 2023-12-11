import GetData from "./GetData";
export default function WomensClothing() {
  const categories = ["women's clothing"];
  return (
    <>
      <h1>Women's Clothing</h1>
      <GetData categories={categories} />
    </>
  );
}
