import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";
import moment from "moment";

const DailySalesLineChart = ({ startDate, endDate }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    if (!startDate || !endDate) return;
    axios
      .get(
        `http://localhost:8080/api/analytics/daily-sales?start=${startDate}&end=${endDate}`
      )
      .then((res) => {
        const formatted = res.data.map((item) => ({
          ...item,
          date: moment(item.date).format("DD MMM"),
        }));
        setData(formatted);
      })
      .catch((err) => console.error(err));
  }, [startDate, endDate]);

  return (
    <div style={{ marginTop: "2rem" }}>
      <h3>📈 Daily Sales Overview</h3>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="totalSales"
            stroke="#82ca9d"
            name="Sales"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DailySalesLineChart;
