import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#AA66CC",
  "#FF4444",
];

const CategoryRevenuePieChart = ({ startDate, endDate }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    if (!startDate || !endDate) return;
    axios
      .get(
        `http://localhost:8080/api/analytics/category-revenue?start=${startDate}&end=${endDate}`
      )
      .then((res) => setData(res.data))
      .catch((err) => console.error(err));
  }, [startDate, endDate]);

  return (
    <div style={{ marginTop: "2rem" }}>
      <h3>🧁 Category-Wise Revenue</h3>
      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie
            data={data}
            dataKey="totalRevenue"
            nameKey="category"
            cx="50%"
            cy="50%"
            outerRadius={120}
            label
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CategoryRevenuePieChart;
