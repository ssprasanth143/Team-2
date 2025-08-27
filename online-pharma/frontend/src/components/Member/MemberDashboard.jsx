import React, { useState, useEffect } from "react";
import MemberSidebar from "./Membersidebar";
import "../../styles/MemberDashboard.css";
import { FaShoppingCart, FaClipboardList, FaPills } from "react-icons/fa";
import axios from "axios";
// import noImage from "../../assets/no-image.png"; 

const MemberDashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [medCount, setMedCount] = useState(0);
  const [orderCount, setOrderCount] = useState(0);
  const [cartCount, setCartCount] = useState(0);
  const [medicines, setMedicines] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [selectedQuantity, setSelectedQuantity] = useState(1);

  const memberId = localStorage.getItem("memberId");

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/medicines/available-count")
      .then((res) => setMedCount(res.data))
      .catch((err) => console.error("Error fetching medicine count:", err));

    axios
      .get(`http://localhost:8080/api/orders/count?memberId=${memberId}`)
      .then((res) => setOrderCount(res.data))
      .catch((err) => console.error("Error fetching order count:", err));

    axios
      .get(`http://localhost:8080/api/medicines/cart-count?memberId=${memberId}`)
      .then((res) => setCartCount(res.data))
      .catch((err) => console.error("Error fetching cart count:", err));

    axios
      .get("http://localhost:8080/api/medicines/all")
      .then((res) => setMedicines(res.data))
      .catch((err) => console.error("Error fetching medicine list:", err));
  }, [memberId]);

  const openCartModal = (medicine) => {
    setSelectedMedicine(medicine);
    setSelectedQuantity(1);
    setShowModal(true);
  };

  const confirmAddToCart = () => {
    if (!selectedMedicine) return;

    const cartItem = {
      memberId: memberId,
      medicineId: selectedMedicine.id,
      quantity: selectedQuantity,
    };

    axios
      .post("http://localhost:8080/api/cart/add", cartItem)
      .then(() => {
        alert("Added to cart successfully!");
        setShowModal(false);
        axios
          .get(
            `http://localhost:8080/api/medicines/cart-count?memberId=${memberId}`
          )
          .then((res) => setCartCount(res.data));
      })
      .catch((err) => {
        console.error("Error adding to cart:", err);
        alert("Failed to add to cart.");
      });
  };

  const stats = [
    {
      label: "Items in Cart",
      value: cartCount,
      icon: <FaShoppingCart style={{ color: "var(--member-primary)" }} />,
    },
    {
      label: "Orders Placed",
      value: orderCount,
      icon: <FaClipboardList style={{ color: "var(--member-secondary)" }} />,
    },
    {
      label: "Medicines Available",
      value: medCount,
      icon: <FaPills style={{ color: "#e67e22" }} />,
    },
  ];

  return (
    <div className="member-dashboard-root">
      <MemberSidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      <main
        className="member-main-content"
        style={{
          marginLeft: collapsed ? 60 : 240,
          width: `calc(100vw - ${collapsed ? 60 : 240}px)`,
        }}
      >
        <header className="member-header">
          <div className="member-title1">Welcome to Member Dashboard</div>
        </header>

        {/* Stats */}
        <section className="member-stats">
          {stats.map((stat) => (
            <div className="member-stat-card" key={stat.label}>
              <div style={{ fontSize: "2.2rem", marginBottom: 8 }}>
                {stat.icon}
              </div>
              <div className="member-stat-label">{stat.label}</div>
              <div className="member-stat-value">{stat.value}</div>
            </div>
          ))}
        </section>

        {/* Medicines Table */}
        <section className="medicine-table-section">
          <h2>All Medicines</h2>
          <div className="table-scroll-container">
            <table className="medicine-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Price</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {medicines.map((medicine) => (
                  <tr key={medicine.id}>
                    <td>{medicine.id}</td>
                    <td>
                      <img
                        src={`http://localhost:8080/api/medicines/${medicine.id}/image`}
                        alt={medicine.name}
                        style={{
                          width: "100px",
                          height: "100px",
                          objectFit: "cover",
                          borderRadius: "6px",
                        }}
                        onError={(e) => {
                          e.target.src = noImage; 
                        }}
                      />
                    </td>
                    <td>{medicine.name}</td>
                    <td>{medicine.description}</td>
                    <td>₹{medicine.price}</td>
                    <td>
                      <button
                        className="add-to-cart-btn"
                        onClick={() => openCartModal(medicine)}
                      >
                        Add to Cart
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>

      
      {showModal && selectedMedicine && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>{selectedMedicine.name}</h3>
            <p>Price: ₹{selectedMedicine.price}</p>

            <div style={{ margin: "15px 0" }}>
              <label>Quantity: </label>
              <input
                type="number"
                min="1"
                value={selectedQuantity}
                onChange={(e) =>
                  setSelectedQuantity(Number(e.target.value))
                }
              />
            </div>

            <div className="modal-buttons">
              <button className="confirm-btn" onClick={confirmAddToCart}>
                Confirm
              </button>
              <button
                className="cancel-btn"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MemberDashboard;
