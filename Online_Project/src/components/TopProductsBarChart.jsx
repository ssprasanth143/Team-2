import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";

const TopProductsBarChart = ({ startDate, endDate }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    if (!startDate || !endDate) return;
    axios
      .get(
        `http://localhost:8080/api/analytics/top-products?start=${startDate}&end=${endDate}&limit=5`
      )
      .then((res) => setData(res.data))
      .catch((err) => console.error(err));
  }, [startDate, endDate]);

  return (
    <div style={{ marginTop: "2rem" }}>
      <h3>🏆 Top 5 Products by Revenue</h3>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="productName" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="totalRevenue" fill="#8884d8" name="Revenue" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TopProductsBarChart;
