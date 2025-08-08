import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const [category, setCategory] = useState("");

const fetchData = () => {
  if (!startDate || !endDate) return;
  const params = new URLSearchParams({
    start: startDate,
    end: endDate,
  });
  if (category) params.append("category", category);

  axios
    .get(`http://localhost:8080/api/analytics/top-orders?${params.toString()}`)
    .then((res) => setData(res.data))
    .catch((err) => console.error(err));
};

const TopSellingProductsChart = () => {
  const [data, setData] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const fetchData = () => {
    if (!startDate || !endDate) return;
    axios
      .get(
        `http://localhost:8080/api/analytics/top-orders?start=${startDate}&end=${endDate}`
      )
      .then((res) => setData(res.data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchData();
  }, [startDate, endDate]);

  const [summary, setSummary] = useState({ totalQuantity: 0, totalRevenue: 0 });

  const fetchSummary = () => {
    const params = new URLSearchParams({ start: startDate, end: endDate });
    if (category) params.append("category", category);

    axios
      .get(
        `http://localhost:8080/api/analytics/top-orders/summary?${params.toString()}`
      )
      .then((res) => setSummary(res.data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    if (startDate && endDate) {
      fetchData();
      fetchSummary();
    }
  }, [startDate, endDate, category]);

  return (
    <>
      <div style={{ marginBottom: "1rem" }}>
        <label>Category: </label>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">All</option>
          <option value="Painkillers">Painkillers</option>
          <option value="Supplements">Supplements</option>
          <option value="Skin Care">Skin Care</option>
          {/* Add more categories as needed */}
        </select>
      </div>
      <div>
        <h3>📊 Top Selling Products</h3>
        <div style={{ marginBottom: "1rem" }}>
          <label>Start Date: </label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <label style={{ marginLeft: "1rem" }}>End Date: </label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
        <div
          style={{
            marginTop: "2rem",
            padding: "1rem",
            background: "#f9f9f9",
            borderRadius: "8px",
          }}
        >
          <h4>📈 Summary</h4>
          <p>
            <strong>Total Quantity Sold:</strong> {summary.totalQuantity}
          </p>
          <p>
            <strong>Total Revenue:</strong> ₹{summary.totalRevenue.toFixed(2)}
          </p>
        </div>

        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="productName" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="totalQuantitySold" fill="#8884d8" />
            <Bar dataKey="totalRevenue" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};

export default TopSellingProductsChart;
