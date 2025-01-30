import React, { useState, useEffect } from 'react';
import ProductList from './components/ProductList';  // Adjust path as needed
import { fetchProducts } from './services/api';    // API call to get products
import UserProfile from './components/UserProfile'; // Assuming this is required

const HomeScreen = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null); // Track user login status
  const [selectedCategory, setSelectedCategory] = useState('All'); // Default filter

  // Fetch products from the API when the component mounts
  useEffect(() => {
    const loadProducts = async () => {
      const productData = await fetchProducts();
      setProducts(productData);
      setFilteredProducts(productData);  // Initializing filteredProducts with all products
    };
    loadProducts();
  }, []);

  // Filter products based on the search query and selected category
  useEffect(() => {
    let filteredBySearch = products.filter(product => 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (product.description && product.description.toLowerCase().includes(searchQuery.toLowerCase()))  // Make sure description exists
    );

    let filteredByCategory = selectedCategory === 'All' 
      ? filteredBySearch 
      : filteredBySearch.filter(product => product.category === selectedCategory);

    setFilteredProducts(filteredByCategory);
  }, [searchQuery, selectedCategory, products]);

  const handleAddToCart = (product) => {
    setCart([...cart, product]);
  };

  const handleRemoveFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const handleLogin = (username, password) => {
    // Replace with actual authentication logic
    if (username === 'admin' && password === 'password') {
      setUser({ username: 'admin', isAdmin: true });
    } else if (username === 'user' && password === 'password') {
      setUser({ username: 'user', isAdmin: false });
    } else {
      alert("Invalid Credentials");
    }
  };

  const handleLogout = () => {
    setUser(null);
  };

  const handleFilterCategory = (category) => {
    setSelectedCategory(category);
  };

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

        {/* Filter */}
        <div>
          <button onClick={() => handleFilterCategory('All')}>All</button>
          <button onClick={() => handleFilterCategory('Electronics')}>Electronics</button>
          <button onClick={() => handleFilterCategory('Clothing')}>Clothing</button>
          {/* Add more filters as needed */}
        </div>

        {/* Display filtered products */}
        <h2>Featured Products</h2>
        <ProductList products={filteredProducts} />

        {/* Product List */}
        <ul>
          {filteredProducts.map((product) => (
            <li key={product.id}>
              {product.name} - ${product.price}
              <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
            </li>
          ))}
        </ul>

        {/* Cart */}
        <h2>Cart</h2>
        <ul>
          {cart.map((item) => (
            <li key={item.id}>
              {item.name} - ${item.price}
              <button onClick={() => handleRemoveFromCart(item.id)}>Remove</button>
            </li>
          ))}
        </ul>

        {/* Login/Logout */}
        {user ? (
          <div>
            <p>Welcome, {user.username}!</p>
            {user.isAdmin && <p>Admin Dashboard Link (replace with actual link)</p>} {/* Conditional rendering for admin */}
            <button onClick={handleLogout}>Logout</button>
          </div>
        ) : (
          <div>
            <h2>Login</h2>
            <input type="text" placeholder="Username" id="username" />
            <input type="password" placeholder="Password" id="password" />
            <button onClick={() => handleLogin(document.getElementById("username").value, document.getElementById("password").value)}>Login</button>
          </div>
        )}
      </main>

      <footer className="home-footer">
        <p>&copy; 2025 My SPA App</p>
      </footer>
    </div>
  );
};

export default HomeScreen;
