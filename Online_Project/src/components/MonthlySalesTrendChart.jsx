import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const MonthlySalesTrendChart = ({ startDate, endDate, category }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    if (!startDate || !endDate) return;
    const params = new URLSearchParams({ start: startDate, end: endDate });
    if (category) params.append("category", category);

    axios
      .get(
        `http://localhost:8080/api/analytics/monthly-sales?${params.toString()}`
      )
      .then((res) => setData(res.data))
      .catch((err) => console.error(err));
  }, [startDate, endDate, category]);

  return (
    <div style={{ marginTop: "2rem" }}>
      <h3>📊 Monthly Sales Trend</h3>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="totalQuantity"
            stroke="#8884d8"
            name="Quantity Sold"
          />
          <Line
            type="monotone"
            dataKey="totalRevenue"
            stroke="#82ca9d"
            name="Revenue"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MonthlySalesTrendChart;
