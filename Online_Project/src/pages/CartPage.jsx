import React, { useEffect, useState } from "react";
import {
  fetchCart,
  removeFromCart,
  updateCartQuantity,
} from "../services/cartService";
import { useAuth } from "../context/AuthContext";

const CartPage = () => {
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const loadCart = async () => {
      try {
        const res = await fetchCart(user.id);
        setCartItems(res.data);
      } catch (err) {
        console.error("Error loading cart:", err);
      }
    };
    loadCart();
  }, [user.id]);

  const handleRemove = async (drugId) => {
    try {
      await removeFromCart(user.id, drugId);
      setCartItems(cartItems.filter((item) => item.drug.id !== drugId));
    } catch (err) {
      console.error("Error removing item:", err);
    }
  };

  const handleQuantityChange = async (drugId, newQty) => {
    if (newQty < 1) return;
    try {
      await updateCartQuantity(user.id, drugId, newQty);
      setCartItems(
        cartItems.map((item) =>
          item.drug.id === drugId ? { ...item, quantity: newQty } : item
        )
      );
    } catch (err) {
      console.error("Error updating quantity:", err);
    }
  };

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.drug.price * item.quantity,
    0
  );

  const handleCheckout = async () => {
    try {
      const orderData = {
        userId: user.id,
        items: cartItems.map((item) => ({
          drugId: item.drug.id,
          quantity: item.quantity,
        })),
        totalAmount: totalPrice,
      };

      await placeOrder(orderData);
      alert("Order placed successfully!");
      setCartItems([]); // Clear cart after order
    } catch (err) {
      console.error("Checkout failed:", err);
      alert("Failed to place order. Please try again.");
    }
  };

  return (
    <div className="cart-page">
      <h2>Your Cart 🛒</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul>
            {cartItems.map(({ drug, quantity }) => (
              <li key={drug.id}>
                <strong>{drug.name}</strong> - ₹{drug.price} × {quantity}
                <div>
                  <button
                    onClick={() => handleQuantityChange(drug.id, quantity - 1)}
                  >
                    -
                  </button>
                  <button
                    onClick={() => handleQuantityChange(drug.id, quantity + 1)}
                  >
                    +
                  </button>
                  <button onClick={() => handleRemove(drug.id)}>Remove</button>
                </div>
              </li>
            ))}
          </ul>
          <h3>Total: ₹{totalPrice}</h3>
          <button onClick={handleCheckout} className="checkout-btn">
            Proceed to Checkout
          </button>
        </>
      )}
    </div>
  );
};

export default CartPage;
