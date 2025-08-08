import React from "react";

const OrderDetails = ({ order }) => {
  return (
    <div>
      <h1>Order Details</h1>
      <p>
        <strong>Order ID:</strong> {order._id}
      </p>
      <p>
        <strong>Order Date:</strong>{" "}
        {new Date(order.orderDate).toLocaleDateString()}
      </p>
      <p>
        <strong>Status:</strong> {order.status}
      </p>
      <p>
        <strong>Total:</strong> {order.total}
      </p>
      <h2>Order Items:</h2>
      <ul>
        {order.items.map((item) => (
          <li key={item._id}>
            {item.name} x {item.quantity}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderDetails;
