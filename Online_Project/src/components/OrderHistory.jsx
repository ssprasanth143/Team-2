import React, { useEffect, useState } from "react";
import axios from "axios";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 5;

  useEffect(() => {
    axios
      .get("http://localhost:8080/history")
      .then((response) => {
        setOrders(response.data);
      })
      .catch((error) => {
        console.error("Error fetching order history:", error);
      });
  }, []);

  const calculateTotal = (items) => {
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const isWithinDateRange = (dateStr) => {
    const orderDate = new Date(dateStr);
    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;

    if (start && orderDate < start) return false;
    if (end && orderDate > end) return false;
    return true;
  };

  const filteredOrders = orders.filter(
    (order) =>
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) &&
      isWithinDateRange(order.orderDate)
  );

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(
    indexOfFirstOrder,
    indexOfLastOrder
  );
  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

  const exportToCSV = () => {
    const rows = [];

    filteredOrders.forEach((order) => {
      order.items.forEach((item) => {
        rows.push([
          order.orderId,
          order.customerName,
          order.orderDate,
          item.drugName,
          item.quantity,
          item.price,
          item.price * item.quantity,
        ]);
      });
    });

    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent +=
      "Order ID,Customer Name,Order Date,Drug Name,Quantity,Price,Total\n";
    rows.forEach((row) => {
      csvContent += row.join(",") + "\n";
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "order_history.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="order-history">
      <h2>Order History</h2>

      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Search by customer name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ padding: "8px", marginRight: "10px", width: "250px" }}
        />
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          style={{ padding: "8px", marginRight: "10px" }}
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          style={{ padding: "8px", marginRight: "10px" }}
        />
        <button onClick={exportToCSV} style={{ padding: "8px 16px" }}>
          Export CSV
        </button>
      </div>

      {currentOrders.map((order) => (
        <div key={order.orderId} className="order-card">
          <h3>Order ID: {order.orderId}</h3>
          <p>
            <strong>Customer:</strong> {order.customerName}
          </p>
          <p>
            <strong>Date:</strong> {order.orderDate}
          </p>

          <table>
            <thead>
              <tr>
                <th>Drug Name</th>
                <th>Quantity</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {order.items.map((item, index) => (
                <tr key={index}>
                  <td>{item.drugName}</td>
                  <td>{item.quantity}</td>
                  <td>₹{item.price}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <p style={{ marginTop: "10px", fontWeight: "bold" }}>
            Total Price: ₹{calculateTotal(order.items).toFixed(2)}
          </p>
        </div>
      ))}

      {/* Pagination Controls */}
      <div style={{ marginTop: "20px" }}>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => setCurrentPage(i + 1)}
            style={{
              padding: "6px 12px",
              marginRight: "5px",
              backgroundColor: currentPage === i + 1 ? "#007bff" : "#f0f0f0",
              color: currentPage === i + 1 ? "#fff" : "#000",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default OrderHistory;
