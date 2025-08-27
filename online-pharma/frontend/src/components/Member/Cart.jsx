import React, { useEffect, useState } from "react";
import MemberSidebar from "./Membersidebar";
import { FaShoppingCart, FaTrashAlt } from "react-icons/fa";
import axios from "axios";
import "../../styles/Cart.css";
import { initiatePayment } from "./RazorpayPayment";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const memberId = localStorage.getItem("memberId");

  const loadCart = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/cart/all");
      setCart(res.data);
    } catch (error) {
      console.error("Failed to fetch cart items", error);
    }
  };

  const handleRemove = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/cart/delete/${id}`);
      loadCart();
    } catch (error) {
      console.error("Failed to delete cart item", error);
    }
  };

  const placeOrder = async () => {
    initiatePayment({
      amount: totalPrice,
      onSuccess: async (response) => {
        try {
          const orderData = cart.map((item) => ({
            memberId: memberId,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            status: "placed",
          }));

          await axios.post("http://localhost:8080/api/orders/place", orderData);
          await axios.delete("http://localhost:8080/api/cart/clear/" + memberId);

          alert("Payment & Order placed successfully! ID: " + response.razorpay_payment_id);
          loadCart();
        } catch (error) {
          console.error("Failed to place order", error);
          alert("Something went wrong while placing the order.");
        }
      },
    });
  };

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  useEffect(() => {
    loadCart();
  }, []);

  return (
    <div className="cart-layout">
      <div className="cart-sidebar">
        <MemberSidebar />
      </div>

      <div className="cart-main">
        <header className="cart-header">
         
          <h1 className="heading">My Cart</h1>
        </header>

        {cart.length === 0 ? (
          <p className="empty-cart">No items in cart.</p>
        ) : (
          <div className="cart-card">
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Medicine</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((item, index) => (
                    <tr key={item.id}>
                      <td>{index + 1}</td>
                      <td>{item.name}</td>
                      <td>₹{item.price}</td>
                      <td>{item.quantity}</td>
                      <td>₹{item.price * item.quantity}</td>
                      <td>
                        <button
                          className="remove-btn"
                          onClick={() => handleRemove(item.id)}
                        >
                          <FaTrashAlt />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="cart-total">Total Price: ₹{totalPrice}</div>

            <div className="cart-actions">
              <button className="place-order-btn" onClick={placeOrder}>
                Pay ₹{totalPrice} / Place Order
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
