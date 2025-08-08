import React, { useEffect, useState } from "react";

const LowStockTable = () => {
  const [lowStock, setLowStock] = useState([]);

  useEffect(() => {
    fetch("/api/inventory/low-stock?threshold=10")
      .then((res) => res.json())
      .then((data) => setLowStock(data));
  }, []);

  return (
    <div>
      <h3>🛑 Low Stock Alerts</h3>
      <table>
        <thead>
          <tr>
            <th>Product</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {lowStock.map((item, idx) => (
            <tr key={idx}>
              <td>{item.productName}</td>
              <td>{item.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LowStockTable;
