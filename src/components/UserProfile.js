import React, { useState } from 'react';
import { useAdmin } from '../AdminContext';
import './UserProfile.css';

function UserProfile() {
  const { addUser, updateUser, orders } = useAdmin();
  const [user, setUser] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    preferences: {
      vegetarian: false,
      allergies: [],
      dietaryRestrictions: '',
      favoriteCategories: []
    }
  });

  const [isEditing, setIsEditing] = useState(true);
  const [editedUser, setEditedUser] = useState(user);

  // Filter orders for this user
  const userOrders = orders.filter(order => order.userId === user.id);

  const handleEdit = () => {
    setIsEditing(true);
    setEditedUser(user);
  };

  const handleSave = () => {
    if (user.id) {
      updateUser(user.id, editedUser);
    } else {
      addUser(editedUser);
    }
    setUser(editedUser);
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.startsWith('preferences.')) {
      const preferenceKey = name.split('.')[1];
      setEditedUser(prev => ({
        ...prev,
        preferences: {
          ...prev.preferences,
          [preferenceKey]: type === 'checkbox' ? checked : value
        }
      }));
    } else {
      setEditedUser(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleAllergyAdd = (allergy) => {
    if (allergy && !editedUser.preferences.allergies.includes(allergy)) {
      setEditedUser(prev => ({
        ...prev,
        preferences: {
          ...prev.preferences,
          allergies: [...prev.preferences.allergies, allergy]
        }
      }));
    }
  };

  const handleAllergyRemove = (allergyToRemove) => {
    setEditedUser(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        allergies: prev.preferences.allergies.filter(allergy => allergy !== allergyToRemove)
      }
    }));
  };

  const handleFavoriteCategoryToggle = (category) => {
    setEditedUser(prev => {
      const categories = prev.preferences.favoriteCategories;
      const updatedCategories = categories.includes(category)
        ? categories.filter(c => c !== category)
        : [...categories, category];

      return {
        ...prev,
        preferences: {
          ...prev.preferences,
          favoriteCategories: updatedCategories
        }
      };
    });
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getOrderStatusColor = (status) => {
    const statusColors = {
      pending: 'bg-yellow-100 text-yellow-800',
      preparing: 'bg-blue-100 text-blue-800',
      completed: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800'
    };
    return statusColors[status.toLowerCase()] || 'bg-gray-100 text-gray-800';
  };

  const foodCategories = [
    'Pizza', 'Burgers', 'Asian', 'Mexican', 'Italian', 
    'Desserts', 'Beverages', 'Vegetarian', 'Seafood'
  ];

  return (
    <div className="user-profile">
      <div className="profile-header">
        <h2>User Profile</h2>
        {!isEditing ? (
          <button onClick={handleEdit} className="edit-btn">Edit Profile</button>
        ) : (
          <button onClick={handleSave} className="save-btn">Save Changes</button>
        )}
      </div>

      <div className="profile-section">
        <h3>Personal Information</h3>
        <div className="profile-info">
          {isEditing ? (
            <>
              <div className="form-group">
                <label>Name:</label>
                <input
                  type="text"
                  name="name"
                  value={editedUser.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label>Email:</label>
                <input
                  type="email"
                  name="email"
                  value={editedUser.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label>Phone:</label>
                <input
                  type="tel"
                  name="phone"
                  value={editedUser.phone}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label>Address:</label>
                <textarea
                  name="address"
                  value={editedUser.address}
                  onChange={handleChange}
                  placeholder="Enter your delivery address"
                  className="form-textarea"
                />
              </div>

              <div className="preferences-section">
                <h4>Dietary Preferences</h4>
                <div className="form-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="preferences.vegetarian"
                      checked={editedUser.preferences.vegetarian}
                      onChange={handleChange}
                    />
                    Vegetarian
                  </label>
                </div>

                <div className="form-group">
                  <label>Dietary Restrictions:</label>
                  <textarea
                    name="preferences.dietaryRestrictions"
                    value={editedUser.preferences.dietaryRestrictions}
                    onChange={handleChange}
                    placeholder="Enter any dietary restrictions"
                    className="form-textarea"
                  />
                </div>

                <div className="form-group">
                  <label>Allergies:</label>
                  <div className="allergies-container">
                    {editedUser.preferences.allergies.map((allergy, index) => (
                      <span key={index} className="allergy-tag">
                        {allergy}
                        <button
                          onClick={() => handleAllergyRemove(allergy)}
                          className="remove-allergy"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                    <input
                      type="text"
                      placeholder="Add allergy"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          handleAllergyAdd(e.target.value);
                          e.target.value = '';
                        }
                      }}
                      className="allergy-input"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Favorite Categories:</label>
                  <div className="categories-grid">
                    {foodCategories.map((category) => (
                      <button
                        key={category}
                        onClick={() => handleFavoriteCategoryToggle(category)}
                        className={`category-btn ${
                          editedUser.preferences.favoriteCategories.includes(category)
                            ? 'active'
                            : ''
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <p><strong>Name:</strong> {user.name || 'Not provided'}</p>
              <p><strong>Email:</strong> {user.email || 'Not provided'}</p>
              <p><strong>Phone:</strong> {user.phone || 'Not provided'}</p>
              <p><strong>Address:</strong> {user.address || 'Not provided'}</p>
              
              <div className="preferences-display">
                <h4>Dietary Preferences</h4>
                <p>
                  <strong>Vegetarian:</strong> {user.preferences.vegetarian ? 'Yes' : 'No'}
                </p>
                <p>
                  <strong>Dietary Restrictions:</strong>{' '}
                  {user.preferences.dietaryRestrictions || 'None specified'}
                </p>
                <p>
                  <strong>Allergies:</strong>{' '}
                  {user.preferences.allergies.length > 0
                    ? user.preferences.allergies.join(', ')
                    : 'None specified'}
                </p>
                <p>
                  <strong>Favorite Categories:</strong>{' '}
                  {user.preferences.favoriteCategories.length > 0
                    ? user.preferences.favoriteCategories.join(', ')
                    : 'None specified'}
                </p>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="profile-section">
        <h3>Order History</h3>
        <div className="order-history">
          {userOrders.length > 0 ? (
            userOrders.map(order => (
              <div key={order.id} className="order-card">
                <div className="order-header">
                  <span className="order-date">
                    {formatDate(order.date)}
                  </span>
                  <span className={`order-status ${getOrderStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                </div>
                <div className="order-items">
                  {order.items.map((item, index) => (
                    <div key={index} className="order-item">
                      <span className="item-name">{item.name}</span>
                      <span className="item-quantity">×{item.quantity}</span>
                      <span className="item-price">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                <div className="order-footer">
                  <div className="order-total">
                    <span>Total:</span>
                    <span className="total-amount">${order.total.toFixed(2)}</span>
                  </div>
                  {order.status === 'completed' && (
                    <button className="reorder-btn">Reorder</button>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p className="no-orders">No orders yet</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserProfile;