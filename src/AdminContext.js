import React, { createContext, useContext, useState } from 'react';

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [menuItems, setMenuItems] = useState([
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

  const addUser = (user) => {
    const newUser = {
      id: users.length + 1,
      ...user,
      role: 'customer'
    };
    setUsers(prevUsers => [...prevUsers, newUser]);
  };

  const updateUser = (userId, updatedData) => {
    setUsers(prevUsers =>
      prevUsers.map(user =>
        user.id === userId ? { ...user, ...updatedData } : user
      )
    );
  };

  const addOrder = (order) => {
    setOrders(prevOrders => [...prevOrders, order]);
  };

  const updateOrder = (orderId, updatedData) => {
    setOrders(prevOrders =>
      prevOrders.map(order =>
        order.id === orderId ? { ...order, ...updatedData } : order
      )
    );
  };

  return (
    <AdminContext.Provider value={{
      users,
      orders,
      menuItems,
      addUser,
      updateUser,
      addOrder,
      updateOrder,
      setMenuItems
    }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};