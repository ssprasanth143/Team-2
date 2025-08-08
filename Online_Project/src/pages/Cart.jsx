import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Cart = () => {
  const { cartItems, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();

  const handleCheckout = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        'http://localhost:8080/api/cart/checkout',
        { items: cartItems.map(({ id, quantity }) => ({ drugId: id, quantity })) },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      clearCart();
      alert('Order placed successfully!');
      navigate('/user');
    } catch (error) {
      alert('Checkout failed. Please try again.');
    }
  };

  if (cartItems.length === 0) return <p>Your cart is empty.</p>;

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      <ul>
        {cartItems.map((item) => (
          <li key={item.id}>
            <strong>{item.name}</strong> – ₹{item.price} × {item.quantity}
            <button onClick={() => removeFromCart(item.id)}>Remove</button>
          </li>
        ))}
      </ul>
      <h3>Total: ₹{total}</h3>
      <button onClick={handleCheckout}>Checkout</button>
    </div>
  );
};

export default Cart;