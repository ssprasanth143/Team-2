import React, { useState, useEffect } from "react";
import AdminSidebar from "./AdminSidebar";
import "../../styles/AdminDashboard.css";
import { FaUsers, FaPills, FaClipboardList, FaArrowRight } from "react-icons/fa";
import axios from "axios";

const quickLinks = [
    { label: "Manage Medicines", icon: <FaPills />, to: "#" },
    { label: "Manage Members", icon: <FaUsers />, to: "#" },
    { label: "View Orders", icon: <FaClipboardList />, to: "#" },
];

const AdminDashboard = () => {
    const [collapsed, setCollapsed] = useState(true);
    const [medicineCount, setMedicineCount] = useState(0);
    const [memberCount, setMemberCount] = useState(0);
    const [orderCount, setOrderCount] = useState(0);
    const [recentOrders, setRecentOrders] = useState([]);

    useEffect(() => {
        const fetchMedicineCount = async () => {
            try {
                const response = await axios.get("http://localhost:8080/api/medicines/count");
                setMedicineCount(response.data);
            } catch (error) {
                console.error("Error fetching medicine count:", error);
                setMedicineCount(0);
            }
        };

        const fetchMemberCount = async () => {
            try {
                const response = await axios.get("http://localhost:8080/api/members/count");
                setMemberCount(response.data);
            } catch (error) {
                console.error("Error fetching member count:", error);
                setMemberCount(0);
            }
        };

        const fetchOrderCountAndActivity = async () => {
            try {
                const response = await axios.get("http://localhost:8080/api/orders/all");
                setOrderCount(response.data.length);
                const sortedOrders = response.data
                    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) 
                    .slice(0, 5); 
                setRecentOrders(sortedOrders);
            } catch (error) {
                console.error("Error fetching order data:", error);
                setOrderCount(0);
                setRecentOrders([]);
            }
        };

        fetchMedicineCount();
        fetchMemberCount();
        fetchOrderCountAndActivity();
    }, []);

    const stats = [
        { label: "Total Members", value: memberCount, icon: <FaUsers style={{ color: "#c9e911ff" }} /> },
        { label: "Total Medicines", value: medicineCount, icon: <FaPills style={{ color: "#55bbeaff" }} /> },
        { label: "Total Orders", value: orderCount, icon: <FaClipboardList style={{ color: "#daa427ff" }} /> },
    ];

    return (
        <div className="admin-dashboard-root">
            <AdminSidebar collapsed={collapsed} setCollapsed={setCollapsed} />
            <main
                className="admin-main-content"
                style={{ marginLeft: collapsed ? 60 : 250, width: `calc(100vw - ${collapsed ? 60 : 250}px)` }}
            >
                <header className="admin-header3">
                    <div className="admin-title">Welcome to Admin Dashboard</div>
                    
                </header>

                <section className="admin-stats">
                    {stats.map((stat) => (
                        <div className="admin-stat-card" key={stat.label}>
                            <div style={{ fontSize: "2.2rem", marginBottom: 8 }}>{stat.icon}</div>
                            <div className="admin-stat-label">{stat.label}</div>
                            <div className="admin-stat-value">{stat.value}</div>
                        </div>
                    ))}
                </section>

                <section className="admin-quicklinks">
                    {quickLinks.map((link) => (
                        <a className="admin-quicklink-card" href={link.to} key={link.label}>
                            <span>{link.icon}</span>
                            <span>{link.label}</span>
                            <FaArrowRight style={{ marginLeft: 10, fontSize: "1.1rem" }} />
                        </a>
                    ))}
                </section>

                <section className="admin-activity">
                    <h2>Recent Orders</h2>
                    <ul>
                        {recentOrders.map((order) => (
                            <li key={order.id}>
                                <span className="activity-action">
                                    Order #{order.id} placed by Member #{order.memberId}
                                </span>
                               
                            </li>
                        ))}
                        {recentOrders.length === 0 && (
                            <li><span className="activity-action">No recent orders</span></li>
                        )}
                    </ul>
                </section>
            </main>
        </div>
    );
};

export default AdminDashboard;
