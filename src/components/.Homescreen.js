import React, { useState, useEffect } from 'react';
import ProductList from './components/ProductList';// Adjust path as needed
import UserProfile from './components/UserProfile';

// Sample Data (replace with API calls)
const products = [
  { id: 1, name: 'Product A', price: 10, category: 'Snacks' },
  { id: 2, name: 'Product B', price: 20, category: 'Drinks' },
  { id: 3, name: 'Product C', price: 30, category: 'Vegetables' },
  // ... more products
];

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null); // Track user login status
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [selectedCategory, setSelectedCategory] = useState('All'); // Default filter

  useEffect(() => {
    // Filter products based on search term
    const filteredBySearch = products.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Filter products based on selected category
    let filteredByCategory;
    if (selectedCategory === 'All') {
      filteredByCategory = filteredBySearch;
    } else {
      filteredByCategory = filteredBySearch.filter(product => product.category === selectedCategory);
    }

    setFilteredProducts(filteredByCategory);
  }, [searchTerm, selectedCategory]);


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
    } else if(username === 'user' && password === 'password'){
        setUser({ username: 'user', isAdmin: false });
    }
    else{
        alert("Invalid Credentials");
    }
  };

  const handleLogout = () => {
    setUser(null);
  };

  const handleFilterCategory = (category) => {
    setSelectedCategory(category);
  }

  return (
    <div>
      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Filter */}
      <div>
          <button onClick={() => handleFilterCategory('All')}>All</button>
          <button onClick={() => handleFilterCategory('Electronics')}>Electronics</button>
          <button onClick={() => handleFilterCategory('Clothing')}>Clothing</button>
          {/* Add more filters as needed */}
      </div>

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
          <input type="text" placeholder="Username" id="username"/>
          <input type="password" placeholder="Password" id="password"/>
          <button onClick={() => handleLogin(document.getElementById("username").value, document.getElementById("password").value)}>Login</button>
        </div>
      )}
    </div>
  );
};

export default App;
