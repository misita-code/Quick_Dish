import { useEffect, useState } from "react";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/users/1")  // Assuming user ID 1
      .then(res => res.json())
      .then(data => setUser(data));

    fetch("http://localhost:3000/orders?userId=1") // Get orders for user ID 1
      .then(res => res.json())
      .then(data => setOrders(data));
  }, []);

  return (
    <div>
      <h2>User Profile</h2>
      {user && (
        <div>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Address:</strong> {user.address}</p>
        </div>
      )}
      <h3>Order History</h3>
      <ul>
        {orders.map(order => (
          <li key={order.id}>
            <strong>Order #{order.id}</strong> - {order.items.join(", ")} - <strong>{order.status}</strong>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserProfile;
