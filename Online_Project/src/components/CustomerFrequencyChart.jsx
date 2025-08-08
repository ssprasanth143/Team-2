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

const CustomerFrequencyChart = ({ startDate, endDate }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    if (!startDate || !endDate) return;
    axios
      .get(
        `http://localhost:8080/api/analytics/customer-frequency?start=${startDate}&end=${endDate}&limit=10`
      )
      .then((res) => setData(res.data))
      .catch((err) => console.error(err));
  }, [startDate, endDate]);

  return (
    <div style={{ marginTop: "2rem" }}>
      <h3>👥 Top Customers by Order Frequency</h3>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="customerName" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="orderCount" fill="#FF8042" name="Orders" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomerFrequencyChart;
