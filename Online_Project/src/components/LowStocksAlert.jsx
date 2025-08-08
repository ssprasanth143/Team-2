import React, { useEffect, useState } from "react";
import axios from "axios";

const LowStockAlerts = () => {
  const [lowStockDrugs, setLowStockDrugs] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/inventory/low-stock")
      .then((response) => {
        setLowStockDrugs(response.data);
      })
      .catch((error) => {
        console.error("Error fetching low stock drugs:", error);
      });
  }, []);

  return (
    <div>
      <h2>⚠️ Low Stock Alerts</h2>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ backgroundColor: "#ffe6e6" }}>
            <th style={{ padding: "8px", border: "1px solid #ddd" }}>
              Drug Name
            </th>
            <th style={{ padding: "8px", border: "1px solid #ddd" }}>
              Category
            </th>
            <th style={{ padding: "8px", border: "1px solid #ddd" }}>
              Current Stock
            </th>
            <th style={{ padding: "8px", border: "1px solid #ddd" }}>
              Threshold
            </th>
          </tr>
        </thead>
        <tbody>
          {lowStockDrugs.map((drug, index) => (
            <tr key={index}>
              <td style={{ padding: "8px", border: "1px solid #ddd" }}>
                {drug.name}
              </td>
              <td style={{ padding: "8px", border: "1px solid #ddd" }}>
                {drug.category}
              </td>
              <td style={{ padding: "8px", border: "1px solid #ddd" }}>
                {drug.stock}
              </td>
              <td style={{ padding: "8px", border: "1px solid #ddd" }}>
                {drug.threshold}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LowStockAlerts;
