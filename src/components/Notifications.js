import React, { useState, useEffect } from 'react';

const Notifications = ({ userId }) => {
  const [notifications, setNotifications] = useState([]);

  // Simulate fetching notifications from an API
  useEffect(() => {
    // Replace this with an actual API call
    const fetchNotifications = async () => {
      const mockNotifications = [
        { id: 1, message: 'Your order has been placed!', date: '2023-10-01' },
        { id: 2, message: 'Special offer: 20% off on all pizzas!', date: '2023-10-02' },
      ];
      setNotifications(mockNotifications);
    };

    fetchNotifications();
  }, [userId]);

  return (
    <div className="notifications">
      <h3>Notifications</h3>
      {notifications.length > 0 ? (
        <ul>
          {notifications.map((notification) => (
            <li key={notification.id}>
              <p>{notification.message}</p>
              <small>{notification.date}</small>
            </li>
          ))}
        </ul>
      ) : (
        <p>No new notifications.</p>
      )}
    </div>
  );
};

export default Notifications;