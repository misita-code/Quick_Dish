import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { OrderProvider } from './context/OrderContext';
import { ProductProvider } from './context/ProductContext';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <ProductProvider>
      <OrderProvider>
        <App />
      </OrderProvider>
    </ProductProvider>
  </React.StrictMode>
);