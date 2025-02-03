import React, { useState } from 'react';
import { useAdmin } from '../AdminContext';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  
  const { users, orders, menuItems, setMenuItems, updateOrder } = useAdmin();

  const handleAddMenuItem = () => {
    const newItem = {
      id: menuItems.length + 1,
      title: "New Item",
      price: 0.00,
      image: "https://themewagon.github.io/feane/images/f1.png",
      category: "Other"
    };
    setMenuItems([...menuItems, newItem]);
  };

  const handleDeleteMenuItem = (id) => {
    setMenuItems(menuItems.filter(item => item.id !== id));
  };

  const handleUpdateOrderStatus = (orderId, newStatus) => {
    updateOrder(orderId, { status: newStatus });
  };

  // Stats for the overview section
  const stats = {
    totalOrders: orders.length,
    totalRevenue: orders.reduce((acc, order) => acc + (order.total || 0), 0),
    activeUsers: users.length,
    menuItems: menuItems.length
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="dashboard-stats">
            <div className="stat-card">
              <h3>Total Orders</h3>
              <p>{stats.totalOrders}</p>
            </div>
            <div className="stat-card">
              <h3>Revenue</h3>
              <p>${stats.totalRevenue.toFixed(2)}</p>
            </div>
            <div className="stat-card">
              <h3>Active Users</h3>
              <p>{stats.activeUsers}</p>
            </div>
            <div className="stat-card">
              <h3>Menu Items</h3>
              <p>{stats.menuItems}</p>
            </div>
          </div>
        );
      case 'orders':
        return (
          <div className="orders-section">
            <h2>Orders Management</h2>
            <div className="orders-list">
              {orders.map(order => (
                <div key={order.id} className="order-card">
                  <h3>Order #{order.id}</h3>
                  <p>Customer: {order.customerName}</p>
                  <p>Items: {order.items.map(item => item.name).join(", ")}</p>
                  <p>Total: ${order.total?.toFixed(2) || '0.00'}</p>
                  <select 
                    value={order.status}
                    onChange={(e) => handleUpdateOrderStatus(order.id, e.target.value)}
                    className="status-select"
                  >
                    <option value="pending">Pending</option>
                    <option value="preparing">Preparing</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
              ))}
            </div>
          </div>
        );
      case 'menu':
        return (
          <div className="menu-section">
            <h2>Menu Management</h2>
            <button className="add-item-btn" onClick={handleAddMenuItem}>
              Add New Item
            </button>
            <div className="menu-grid">
              {menuItems.map(item => (
                <div key={item.id} className="menu-card">
                  <img src={item.image} alt={item.title} className="menu-image" />
                  <div className="menu-details">
                    <h3>{item.title}</h3>
                    <p>${item.price.toFixed(2)}</p>
                    <p>{item.category}</p>
                    <button 
                      className="delete-btn"
                      onClick={() => handleDeleteMenuItem(item.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'users':
        return (
          <div className="users-section">
            <h2>User Management</h2>
            <div className="users-list">
              {users.map(user => (
                <div key={user.id} className="user-card">
                  <h3>{user.name || 'No Name'}</h3>
                  <p>Email: {user.email || 'No Email'}</p>
                  <p>Phone: {user.phone || 'No Phone'}</p>
                  <p>Address: {user.address || 'No Address'}</p>
                  <p>Role: {user.role || 'customer'}</p>
                </div>
              ))}
            </div>
          </div>
        );
      default:
        return <div>Select a tab</div>;
    }
  };

  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <h1>Admin Dashboard</h1>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="dashboard-navigation">
        <button
          className={`nav-btn ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button
          className={`nav-btn ${activeTab === 'orders' ? 'active' : ''}`}
          onClick={() => setActiveTab('orders')}
        >
          Orders
        </button>
        <button
          className={`nav-btn ${activeTab === 'menu' ? 'active' : ''}`}
          onClick={() => setActiveTab('menu')}
        >
          Menu
        </button>
        <button
          className={`nav-btn ${activeTab === 'users' ? 'active' : ''}`}
          onClick={() => setActiveTab('users')}
        >
          Users
        </button>
      </div>

      <div className="dashboard-content">
        {renderContent()}
      </div>
    </div>
  );
};

export default AdminDashboard;