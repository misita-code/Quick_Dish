import { useEffect, useState } from "react";

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/orders")
      .then((res) => res.json())
      .then((data) => setOrders(data));
  }, []);

  const updateOrderStatus = (id, newStatus) => {
    fetch(`http://localhost:3000/orders/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    })
      .then((res) => res.json())
      .then((updatedOrder) => {
        setOrders(orders.map(order => 
          order.id === id ? { ...order, status: newStatus } : order
        ));
      });
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <h3>Orders</h3>
      <ul>
        {orders.map(order => (
          <li key={order.id}>
            <strong>Order #{order.id}</strong> - {order.items.join(", ")} - 
            <strong> {order.status}</strong>
            <button onClick={() => updateOrderStatus(order.id, "Completed")}>Mark as Completed</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;
