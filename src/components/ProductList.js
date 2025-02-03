import React, { useState, useEffect } from "react";

const ProductList = () => {
  const [products, setProducts] = useState([
    {
      id: 1,
      title: "Hamburger",
      price: 15.99,
      image: "https://themewagon.github.io/feane/images/f1.png",
      category: "Burgers"
    },
    {
      id: 2,
      title: "Pizza",
      price: 18.99,
      image: "https://themewagon.github.io/feane/images/f2.png",
      category: "Pizza"
    }
  ]);
  const [loading, setLoading] = useState(false);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://themewagon.github.io/feane/");
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="container">
      <div className="header-section">
        <h1>Product List</h1>
        <button 
          onClick={fetchProducts} 
          disabled={loading}
          className="fetch-button"
        >
          {loading ? "Fetching..." : "Refresh Products"}
        </button>
      </div>

      <div className="product-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img 
              src={product.image} 
              alt={product.title} 
              className="product-image"
            />
            <div className="product-details">
              <h3 className="product-title">{product.title}</h3>
              <p className="product-price">${product.price}</p>
              <p className="product-category">{product.category}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;