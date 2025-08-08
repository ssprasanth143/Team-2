import React, { useEffect, useState } from "react";
import axios from "axios";
import { CSVLink } from "react-csv";

const ExportTopOrdersCSV = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/analytics/top-orders")
      .then((response) => setData(response.data))
      .catch((error) => console.error("Error fetching top orders:", error));
  }, []);

  const headers = [
    { label: "Product Name", key: "productName" },
    { label: "Category", key: "category" },
    { label: "Total Quantity Sold", key: "totalQuantitySold" },
    { label: "Total Revenue", key: "totalRevenue" },
  ];

  return (
    <div style={{ marginTop: "1rem" }}>
      <CSVLink
        data={data}
        headers={headers}
        filename="top-selling-products.csv"
        className="btn btn-primary"
      >
        📤 Export Top Orders as CSV
      </CSVLink>
    </div>
  );
};

export default ExportTopOrdersCSV;
