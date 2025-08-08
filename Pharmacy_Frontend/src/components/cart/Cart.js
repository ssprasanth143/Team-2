import React, { useState, useEffect } from 'react';
import cartService from '../../services/cartService';
import { Link, useNavigate } from 'react-router-dom';

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await cartService.getCart();
        setCart(response.data);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchCart();
  }, []);

  const handleRemoveItem = async (id) => {
    try {
      await cartService.removeItem(id);
      setCart(cart.filter((item) => item._id !== id));
    } catch (error) {
      setError(error.message);
    }
  };

  const handleUpdateQuantity = async (id, quantity) => {
    try {
      await cartService.updateQuantity(id, quantity);
      setCart(
        cart.map((item) => (item._id === id ? { ...item, quantity } : item))
      );
    } catch (error) {
      setError(error.message);
    }
  };

  const handleCheckout = async () => {
    try {
      await cartService.checkout();
      navigate("/checkout/success");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="cart-container">
      <h1>Cart</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Total</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item) => (
              <tr key={item._id}>
                <td>{item.product.name}</td>
                <td>
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) =>
                      handleUpdateQuantity(item._id, e.target.valueAsNumber)
                    }
                  />
                </td>
                <td>{item.product.price}</td>
                <td>{item.product.price * item.quantity}</td>
                <td>
                  <button onClick={() => handleRemoveItem(item._id)}>
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={3}>Total:</td>
              <td>
                {cart.reduce(
                  (total, item) => total + item.product.price * item.quantity,
                  0
                )}
              </td>
              <td>
                <button onClick={handleCheckout}>Checkout</button>
              </td>
            </tr>
          </tfoot>
        </table>
      )}
      <Link to="/products">Continue Shopping</Link>
    </div>
  );
};

export default Cart;
