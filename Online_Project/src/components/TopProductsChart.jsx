import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";

const TopProductsChart = () => {
  const [topProducts, setTopProducts] = useState([]);

  useEffect(() => {
    fetch("/api/analytics/top-products")
      .then((res) => res.json())
      .then((data) => setTopProducts(data));
  }, []);

  return (
    <BarChart width={600} height={300} data={topProducts}>
      <XAxis dataKey="productName" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="totalQuantity" fill="#8884d8" />
    </BarChart>
  );
};

export default TopProductsChart;
