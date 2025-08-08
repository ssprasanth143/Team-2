import React, { useState } from 'react';
import cartService from '../../services/cartService';

const CheckOut = () => {
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleCheckout = async (e) => {
    e.preventDefault();
    try {
      await cartService.checkout({ address, paymentMethod });
      setSuccess("Order placed successfully!");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="checkout-container">
      <h1>Checkout</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
      <form onSubmit={handleCheckout}>
        <label>Address:</label>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Enter your address"
        />
        <label>Payment Method:</label>
        <select
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
        >
          <option value="">Select payment method</option>
          <option value="cash">Cash</option>
          <option value="card">Card</option>
          <option value="online">Online</option>
        </select>
        <button type="submit">Place Order</button>
      </form>
    </div>
  );
};

export default CheckOut;
