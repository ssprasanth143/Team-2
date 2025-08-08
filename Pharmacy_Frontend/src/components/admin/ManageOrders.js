import React, { useState, useEffect } from 'react';
import orderService from '../../services/orderService';

const ManageOrders = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await orderService.getAllOrders();
        setOrders(response.data);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchOrders();
  }, []);

  const handleUpdateOrderStatus = async (id, status) => {
    try {
      const response = await orderService.updateOrderStatus(id, status);
      setOrders(
        orders.map((order) => (order._id === id ? response.data : order))
      );
    } catch (error) {
      setError(error.message);
    }
  };

  const handleDeleteOrder = async (id) => {
    try {
      await orderService.deleteOrder(id);
      setOrders(orders.filter((order) => order._id !== id));
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="manage-orders-container">
      <h1>Manage Orders</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer Name</th>
            <th>Order Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td>{order._id}</td>
              <td>{order.customerName}</td>
              <td>{new Date(order.orderDate).toLocaleDateString()}</td>
              <td>
                <select
                  value={order.status}
                  onChange={(e) =>
                    handleUpdateOrderStatus(order._id, e.target.value)
                  }
                >
                  <option value="pending">Pending</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </td>
              <td>
                <button onClick={() => handleDeleteOrder(order._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageOrders;
