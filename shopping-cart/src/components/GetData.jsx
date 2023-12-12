import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

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
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
};

/*
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiEndpoint);
        const jsonData = await response.json();
        console.log("JSON Data", jsonData);
        setData(jsonData);
        console.log("fetch Data", data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [apiEndpoint]);

  return { data, loading, error };
};
*/
// Example component using the custom hook
const GetData = ({ categories }) => {
  console.log("categories", categories);
  const apiEndpoints = categories.map(
    (category) => `https://fakestoreapi.com/products/category/${category}`
  );
  const { data, loading, error } = useDataFetching(apiEndpoints);

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
        <div className="item-container">
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
                <h5 className="item-price">${item.price}</h5>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GetData;
