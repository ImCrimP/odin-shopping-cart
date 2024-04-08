import GetData from "./GetData";
export default function Jewelry() {
  const categories = ["jewelery"];
  return (
    <>
      <h1>Jewelry</h1>
      <GetData categories={categories} />
    </>
  );
}
