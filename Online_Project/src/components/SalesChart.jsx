import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const SalesChart = () => {
  const [monthlySales, setMonthlySales] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/orders/monthly-sales")
      .then((response) => {
        setMonthlySales(response.data);
      })
      .catch((error) => {
        console.error("Error fetching monthly sales:", error);
      });
  }, []);

  return (
    <div style={{ width: "100%", height: 400 }}>
      <h2>Monthly Sales Overview</h2>
      <ResponsiveContainer>
        <LineChart data={monthlySales}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="totalSales"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SalesChart;
