import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert";
import { FaBars, FaTachometerAlt, FaPills, FaUsers, FaSignOutAlt, FaClipboardList } from "react-icons/fa";
import "../../styles/AdminSidebar.css";

function AdminSidebar({ collapsed: collapsedProp, setCollapsed: setCollapsedProp }) {
    const [internalCollapsed, internalSetCollapsed] = useState(true);
    const collapsed = collapsedProp !== undefined ? collapsedProp : internalCollapsed;
    const setCollapsed = setCollapsedProp !== undefined ? setCollapsedProp : internalSetCollapsed;
    const [active, setActive] = useState("Dashboard");
    const navigate = useNavigate();

    const handleClick = (name) => {
        setActive(name);
        if (name === "Logout") {
            Swal({
                title: "Are you sure?",
                text: "You will be logged out!",
                icon: "warning",
                buttons: ["Cancel", "Logout"],
                dangerMode: true,
            }).then((willLogout) => {
                if (willLogout) {
                    navigate("/");
                    Swal("Logged out successfully!", {
                        icon: "success",
                    });
                }
            });
        } else if (name === "Dashboard") {
            navigate("/admin");
        } else if (name === "Manage Drug") {
            navigate("/admin/drugs");
        } else if (name === "Manage Members") {
            navigate("/admin/members");
        } else if (name === "Add Drug") {
            navigate("/admin/add-drug");
        } else if (name === "Manage Orders") {
            navigate("/admin/manage-orders"); 
        }
    };

    return (
        <div className={`sidebar ${collapsed ? "collapsed" : ""}`} aria-label="Admin Sidebar">
            <div className="sidebar-header">
                {!collapsed && <h2>Admin Panel</h2>}
                <button className="toggle-btn" onClick={() => setCollapsed(!collapsed)} aria-label="Toggle Sidebar">
                    <FaBars />
                </button>
            </div>

            <nav className="sidebar-nav">
                <a
                    className={active === "Dashboard" ? "active" : ""}
                    onClick={() => handleClick("Dashboard")}
                    aria-label="Dashboard"
                    title={collapsed ? "Dashboard" : undefined}
                >
                    <FaTachometerAlt className="sidebar-icon" />
                    {!collapsed && <span>Dashboard</span>}
                </a>


                <a
                    className={active === "Manage Members" ? "active" : ""}
                    onClick={() => handleClick("Manage Members")}
                    aria-label="Manage Members"
                    title={collapsed ? "Manage Members" : undefined}
                >
                    <FaUsers className="sidebar-icon" />
                    {!collapsed && <span>Manage Members</span>}
                </a>
                <a
                    className={active === "Add Drug" ? "active" : ""}
                    onClick={() => handleClick("Add Drug")}
                    aria-label="Add Drug"
                    title={collapsed ? "Add Drug" : undefined}
                >
                    <FaPills className="sidebar-icon" />
                    {!collapsed && <span>Add Drug</span>}
                </a>
                <a
                    className={active === "Manage Drug" ? "active" : ""}
                    onClick={() => handleClick("Manage Drug")}
                    aria-label="Manage Drug"
                    title={collapsed ? "Manage Drug" : undefined}
                >
                    <FaPills className="sidebar-icon" />
                    {!collapsed && <span>Manage Drug</span>}
                </a>
                <a
                    className={active === "Manage Orders" ? "active" : ""}
                    onClick={() => handleClick("Manage Orders")}
                    aria-label="Manage Orders"
                    title={collapsed ? "Manage Orders" : undefined}
                >
                    <FaClipboardList className="sidebar-icon" />
                    {!collapsed && <span>Manage Orders</span>}
                </a>
                <a
                    onClick={() => handleClick("Logout")}
                    aria-label="Logout"
                    title={collapsed ? "Logout" : undefined}
                >
                    <FaSignOutAlt className="sidebar-icon" />
                    {!collapsed && <span>Logout</span>}
                </a>
            </nav>
        </div>
    );
}

export default AdminSidebar;
