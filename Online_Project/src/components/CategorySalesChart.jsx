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
  "#AA336A",
  "#9933FF",
];

const CategorySalesChart = () => {
  const [categorySales, setCategorySales] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/orders/category-sales")
      .then((response) => {
        setCategorySales(response.data);
      })
      .catch((error) => {
        console.error("Error fetching category sales:", error);
      });
  }, []);

  return (
    <div style={{ width: "100%", height: 400 }}>
      <h2>Category-wise Sales Distribution</h2>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={categorySales}
            dataKey="totalSales"
            nameKey="category"
            cx="50%"
            cy="50%"
            outerRadius={120}
            label
          >
            {categorySales.map((entry, index) => (
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

export default CategorySalesChart;
