import React, { useEffect, useState } from "react";
import MemberSidebar from "./Membersidebar";
import "../../styles/Orders.css";
import axios from "axios";


const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/orders/all")
      .then((response) => setOrders(response.data))
      .catch((error) => console.error("Failed to fetch orders", error));
  }, []);

  return (
    <div className="orders-layout">
      <div className="orders-sidebar">
        <MemberSidebar />
      </div>

      <div className="orders-main">
        <header className="orders-header">
          <div className="orders-logo">
            
            <h2 className="heading1">My Orders</h2>
          </div>
        </header>

        <div className="orders-card">
          <div className="orders-table-scroll">
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Medicine Name</th>
                  <th>Quantity</th>
                  <th>Total Price</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order, idx) => (
                  <tr key={order.id}>
                    <td data-label="#"> {idx + 1} </td>
                    <td data-label="Medicine Name">{order.name}</td>
                    <td data-label="Quantity">{order.quantity}</td>
                    <td data-label="Total Price">₹{order.price}</td>
                    <td data-label="Status">{order.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;
