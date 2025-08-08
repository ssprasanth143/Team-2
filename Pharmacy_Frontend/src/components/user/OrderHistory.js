import React, { useState, useEffect } from 'react';
import orderService from '../../services/orderService';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await orderService.getUserOrders();
        setOrders(response.data);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchOrders();
  }, []);

return (
  <div className="order-history-container">
    <h1>Order History</h1>
    {error && <p style={{ color: "red" }}>{error}</p>}
    <table>
      <thead>
        <tr>
          <th>Order ID</th>
          <th>Order Date</th>
          <th>Status</th>
          <th>Total</th>
          <th>Details</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order) => (
          <tr key={order._id}>
            <td>{order._id}</td>
            <td>{new Date(order.orderDate).toLocaleDateString()}</td>
            <td>{order.status}</td>
            <td>{order.total}</td>
            <td>
              <Link to={`/orders/${order._id}`}>View Details</Link>
            </td>

            <td>
              <button>View Details</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
};

export default OrderHistory;