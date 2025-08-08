import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";



ReactDOM.createRoot(document.getElementById("root")).render(
<BrowserRouter>
    <WishlistProvider>
    <CartProvider>
       <App />
    </CartProvider>
    </WishlistProvider>
</BrowserRouter>
);