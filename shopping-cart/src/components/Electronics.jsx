import GetData from "./GetData";

export default function Electronics() {
  const categories = ["electronics"];
  return (
    <>
      <h1>Electronics</h1>
      <GetData categories={categories} />
    </>
  );
}
