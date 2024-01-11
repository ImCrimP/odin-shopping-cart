import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

// Custom hook for fetching data
const useDataFetching = (apiEndpoints) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data from all API endpoints concurrently
        const responses = await Promise.all(
          apiEndpoints.map((endpoint) => fetch(endpoint))
        );

        // Check if all responses are successful (status code 2xx)
        const allResponsesOk = responses.every((response) => response.ok);
        if (!allResponsesOk) {
          throw new Error("One or more API requests failed");
        }

        // Extract JSON data from each response
        const jsonDatas = await Promise.all(
          responses.map((response) => response.json())
        );

        // Combine the data from different endpoints into a single array
        const combinedData = jsonDatas.reduce(
          (accumulator, currentData) => [...accumulator, ...currentData],
          []
        );

        setData(combinedData);
      } catch (error) {
        setError(error);
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
};

const calculateRelevance = (item, query) => {
  const title = item.title.toLowerCase();

  // If the title starts with the query, give it higher relevance
  if (title.startsWith(query)) {
    return 2;
  }
  // If the title contains the query anywhere, give it medium relevance
  else if (title.includes(query)) {
    return 1;
  } else {
    // Otherwise, give it lower relevance
    return 0;
  }
};

const GetData = ({ categories, searchQuery }) => {
  const { data, loading, error } = useDataFetching(
    categories.map(
      (category) => `https://fakestoreapi.com/products/category/${category}`
    )
  );

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  // Use 'data' in your component as needed
  return (
    <div>
      <div className="grid-container">
        <div className="items-container">
          {data.map((item) => (
            <div className="item" key={item.id}>
              <Link to={`/shop/${encodeURIComponent(item.title)}`}>
                <div className="item-image-container">
                  <img
                    className="item-image"
                    src={item.image}
                    alt={item.title}
                  />
                </div>

                <h4 className="item-title">{item.title}</h4>
                <h5 className="item-price">${item.price.toFixed(2)}</h5>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GetData;
