import React, { useEffect, useState } from "react";
import axios from "axios";

const TopSellingDrugs = () => {
  const [topDrugs, setTopDrugs] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/orders/top-selling")
      .then((response) => {
        setTopDrugs(response.data);
      })
      .catch((error) => {
        console.error("Error fetching top-selling drugs:", error);
      });
  }, []);

  return (
    <div>
      <h2>Top-Selling Drugs</h2>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ backgroundColor: "#f2f2f2" }}>
            <th style={{ padding: "8px", border: "1px solid #ddd" }}>
              Drug Name
            </th>
            <th style={{ padding: "8px", border: "1px solid #ddd" }}>
              Category
            </th>
            <th style={{ padding: "8px", border: "1px solid #ddd" }}>
              Units Sold
            </th>
            <th style={{ padding: "8px", border: "1px solid #ddd" }}>
              Total Revenue
            </th>
          </tr>
        </thead>
        <tbody>
          {topDrugs.map((drug, index) => (
            <tr key={index}>
              <td style={{ padding: "8px", border: "1px solid #ddd" }}>
                {drug.name}
              </td>
              <td style={{ padding: "8px", border: "1px solid #ddd" }}>
                {drug.category}
              </td>
              <td style={{ padding: "8px", border: "1px solid #ddd" }}>
                {drug.unitsSold}
              </td>
              <td style={{ padding: "8px", border: "1px solid #ddd" }}>
                ₹{drug.totalRevenue.toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TopSellingDrugs;
