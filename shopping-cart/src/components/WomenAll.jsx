import GetData from "./GetData";
export default function WomenAll() {
  const categories = ["women's clothing", "jewelery"];
  return (
    <>
      <h1>All Women Items</h1>
      <GetData categories={categories} />
    </>
  );
}
