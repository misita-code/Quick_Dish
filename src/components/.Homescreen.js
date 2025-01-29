import React, { useState, useEffect } from 'react';
import ProductList from './components/ProductList';  // Assuming you already have this component
import { fetchProducts } from './services/api';    // API call to get products

const HomeScreen = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);

  // Fetch products from the API when the component mounts
  useEffect(() => {
    const loadProducts = async () => {
      const productData = await fetchProducts();
      setProducts(productData);
      setFilteredProducts(productData);  // Initializing filteredProducts with all products
    };

    loadProducts();
  }, []);

  // Filter products based on the search query
  useEffect(() => {
    const filtered = products.filter(product => 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchQuery, products]);

  return (
    <div>
      <header className="home-header">
        <h1>Welcome to My SPA!</h1>
      </header>

      <main className="home-main">
        {/* Search Bar */}
        <div className="search-container">
          <input
            type="text"
            placeholder="Search for products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Display filtered products */}
        <h2>Featured Products</h2>
        <ProductList products={filteredProducts} />
      </main>

      <footer className="home-footer">
        <p>&copy; 2025 My SPA App</p>
      </footer>
    </div>
  );
}

export default HomeScreen;
