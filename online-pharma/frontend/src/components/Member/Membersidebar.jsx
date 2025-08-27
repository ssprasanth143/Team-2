import React, { useState } from "react";
import {
  FaUser,
  FaShoppingCart,
  FaClipboardList,
  FaTachometerAlt,
  FaSignOutAlt,
  FaBars,
} from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../../styles/MemberSidebar.css";

const MemberSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showConfirm, setShowConfirm] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const menu = [
    { label: "Dashboard", path: "/member", icon: <FaTachometerAlt /> },
    { label: "Profile", path: "/member/profile", icon: <FaUser /> },
    { label: "Cart", path: "/member/cart", icon: <FaShoppingCart /> },
    { label: "Orders", path: "/member/orders", icon: <FaClipboardList /> },
  ];

  const handleLogout = () => {
    localStorage.removeItem("memberId");
    navigate("/login");
  };

  return (
    <aside className={`member-sidebar ${collapsed ? "collapsed" : ""}`}>
      <div className="sidebar-header">
        {!collapsed && <h2 className="sidebar-title">Member</h2>}
        <button
          className="collapse-btn"
          onClick={() => setCollapsed(!collapsed)}
          title={collapsed ? "Expand Sidebar" : "Collapse Sidebar"}
        >
          <FaBars />
        </button>
      </div>

      <nav className="sidebar-nav">
        {menu.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`sidebar-link ${location.pathname === item.path ? "active" : ""}`}
          >
            <span className="icon">{item.icon}</span>
            {!collapsed && <span className="label">{item.label}</span>}
          </Link>
        ))}

        <button className="sidebar-link logout-button" onClick={() => setShowConfirm(true)}>
          <span className="icon">
            <FaSignOutAlt />
          </span>
          {!collapsed && <span className="label">Logout</span>}
        </button>
      </nav>

      {showConfirm && (
        <div className="logout-modal-backdrop">
          <div className="logout-modal">
            <h3>Confirm Logout</h3>
            <p>Are you sure you want to logout?</p>
            <div className="logout-modal-actions">
              <button className="modal-btn cancel" onClick={() => setShowConfirm(false)}>
                Cancel
              </button>
              <button className="modal-btn confirm" onClick={handleLogout}>
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
};

export default MemberSidebar;
