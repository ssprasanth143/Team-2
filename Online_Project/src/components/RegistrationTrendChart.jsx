import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const RegistrationTrendChart = () => {
  const [data, setData] = useState([]);
  const [role, setRole] = useState("CUSTOMER");

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/users/registration-trend/${role}`)
      .then((res) => setData(res.data))
      .catch((err) => console.error(err));
  }, [role]);

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  return (
    <div style={{ width: "100%", height: 400 }}>
      <h3>User Registration Trend ({role})</h3>
      <select value={role} onChange={handleRoleChange}>
        <option value="CUSTOMER">Customer</option>
        <option value="ADMIN">Admin</option>
        {/* Add more roles if needed */}
      </select>

      <ResponsiveContainer width="100%" height="90%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="registrations" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RegistrationTrendChart;
