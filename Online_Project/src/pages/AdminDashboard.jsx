import { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import TopProductsChart from "../components/dashboard/TopProductsChart";
import LowStockTable from "../components/dashboard/LowStockTable";
import RestockForm from "../components/inventory/RestockForm";
import TopSellingProductsChart from "../components/TopSellingProductsChart";
import ExportTopOrdersCSV from "../components/ExportTopOrdersCSV";

import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";

const AdminDashboard = () => {
  const [inventoryStats, setInventoryStats] = useState([]);
  const [orderStats, setOrderStats] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const drugsRes = await axiosInstance.get("/admin/drugs");
        const ordersRes = await axiosInstance.get("/admin/orders");

        // 📦 Inventory by Category
        const categoryMap = {};
        drugsRes.data.forEach((drug) => {
          categoryMap[drug.category] =
            (categoryMap[drug.category] || 0) + drug.quantity;
        });
        const inventory = Object.entries(categoryMap).map(
          ([category, quantity]) => ({
            category,
            quantity,
          })
        );
        setInventoryStats(inventory);

        // 📋 Orders by Status
        const statusMap = {};
        ordersRes.data.forEach((order) => {
          statusMap[order.status] = (statusMap[order.status] || 0) + 1;
        });
        const statuses = Object.entries(statusMap).map(([status, count]) => ({
          status,
          count,
        }));
        setOrderStats(statuses);
      } catch (err) {
        console.error("Dashboard fetch error:", err);
      }
    };
    fetchDashboardData();
  }, []);

  const COLORS = ["#00C49F", "#0088FE", "#FFBB28", "#FF8042", "#A28EFF"];

  return (
    <div className="admin-dashboard">
      <h2>📊 Admin Dashboard</h2>

      <section>
        <h3>Inventory by Category</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={inventoryStats}>
            <XAxis dataKey="category" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="quantity" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </section>

      <section>
        <h3>Order Status Overview</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={orderStats}
              dataKey="count"
              nameKey="status"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {orderStats.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
          <TopProductsChart />
          <LowStockTable />
          <RestockForm />
          <TopSellingProductsChart />
          <ExportTopOrdersCSV />
        </ResponsiveContainer>
      </section>
    </div>
  );
};

export default AdminDashboard;
