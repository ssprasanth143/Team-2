import React from "react";
import { Link } from "react-router-dom";
import authService from "../../services/authService";

const Dashboard = () => {
  const handleLogout = async () => {
    await authService.logout();
    window.location.href = "/login";
  };

  return (
    <div className="dashboard-container">
      <h1>Admin Dashboard</h1>
      <div className="dashboard-links">
        <Link to="/admin/users">Manage Users</Link>
        <Link to="/admin/drugs">Manage Drugs</Link>
        <Link to="/admin/orders">Manage Orders</Link>
      </div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;
