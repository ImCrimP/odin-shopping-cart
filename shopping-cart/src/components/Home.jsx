import GetData from "./GetData";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
export default function Home() {
  const { itemTitle } = useParams();

  const [itemMen, setItemMen] = useState(null);
  const [itemWomen, setItemWomen] = useState(null);
  const fetchItemDetails = async () => {
    try {
      const responsMen = await fetch(`https://fakestoreapi.com/products/2`);
      const itemsDataMen = await responsMen.json();
      setItemMen(itemsDataMen);

      const responseWomen = await fetch(`https://fakestoreapi.com/products/19`);
      const itemsDataWomen = await responseWomen.json();
      setItemWomen(itemsDataWomen);
    } catch (error) {
      console.error("Error fetching item details:", error);
    }
  };

  useEffect(() => {
    fetchItemDetails();
  }, []);

  if (!itemMen || !itemWomen) {
    return <p>Loading...</p>;
  }
  return (
    <div>
      <h1 className="featured">Featured Items</h1>
      <div className="home-page">
        <div className="home-container">
          <div className="home-img-text">
            <Link to="/mens-clothing" className="home-img-container">
              <img
                className="home-image"
                src={itemMen.image}
                alt={itemMen.title}
              />
              <p>Shop Men</p>
            </Link>
          </div>

          <div className="home-img-text">
            <Link to="/women/womens-clothing" className="home-img-container">
              <img
                className="home-image"
                src={itemWomen.image}
                alt={itemWomen.title}
              />
              <p>Shop Women</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
