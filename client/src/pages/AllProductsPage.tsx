import { useState, useEffect } from "react";

import ProductCard from "../components/ProductCard";
import { Product } from "../../../types";

function AllProductsPage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadedProducts, setLoadedProducts] = useState([]);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetch("http://localhost:5000/products")
      .then((res) => res.json())
      .then((data) => {
        setIsLoaded(true);
        setLoadedProducts(data);
      })
      .catch((error: Error) => {
        setIsLoaded(true);
        setError(error);
      })
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div>
        {loadedProducts.map((product: Product) => (
          <ProductCard
            key={product.id}
            image={product.image}
            name={product.name}
            available={product.available}
            url={product.url}
            updated={product.updated}
          />
        ))}
      </div>
    );
  }
}

export default AllProductsPage;
