import { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (drug) => {
    setCartItems((prev) => {
      const exists = prev.find((item) => item.id === drug.id);
      if (exists) {
        return prev.map((item) =>
          item.id === drug.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prev, { ...drug, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => setCartItems([]);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);