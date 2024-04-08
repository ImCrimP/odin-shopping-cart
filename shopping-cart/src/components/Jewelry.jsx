import GetData from "./GetData";
export default function Jewelery() {
  const categories = ["jewelery"];
  return (
    <>
      <h1>Jewelery</h1>
      <GetData categories={categories} />
    </>
  );
}
