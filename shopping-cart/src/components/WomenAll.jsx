import GetData from "./GetData";
export default function WomenAll() {
  const categories = ["women's clothing", "jewelry"];
  return (
    <>
      <h1>All Women Items</h1>
      <GetData categories={categories} />
    </>
  );
}
