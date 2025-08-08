import React, { useEffect, useState } from "react";
import axios from "axios";
import InventoryForm from '../components/InventoryForm';
import EditInventoryForm from "../components/EditInventoryForm";



const InventoryDashboard = () => {
  const [inventory, setInventory] = useState([]);
  const [threshold, setThreshold] = useState(10); // for low-stock filtering
  <InventoryForm onSuccess={fetchInventory} />
  const [editingItemId, setEditingItemId] = useState(null);



  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = () => {
    axios
      .get("http://localhost:8080/api/inventory")
      .then((res) => setInventory(res.data))
      .catch((err) => console.error(err));
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:8080/api/inventory/${id}`)
      .then(() => fetchInventory())
      .catch((err) => console.error(err));
  };

  const handleReduceStock = (id, quantity) => {
    axios
      .post(
        `http://localhost:8080/api/inventory/${id}/reduce-stock?quantity=${quantity}`
      )
      .then(() => fetchInventory())
      .catch((err) => console.error(err));
  };

  {
    editingItemId && (
      <EditInventoryForm
        itemId={editingItemId}
        onSuccess={() => {
          fetchInventory();
          setEditingItemId(null);
        }}
        onCancel={() => setEditingItemId(null)}
      />
    );
  }

  return (
    <div style={{ padding: "2rem" }}>
      <h2>📦 Inventory Dashboard</h2>
      <p>Manage stock levels and view low-stock alerts.</p>

      <label>
        Low-stock threshold:
        <input
          type="number"
          value={threshold}
          onChange={(e) => setThreshold(e.target.value)}
          style={{ marginLeft: "1rem" }}
        />
      </label>

      <table
        border="1"
        cellPadding="10"
        style={{ marginTop: "2rem", width: "100%" }}
      >
        <thead>
          <tr>
            <th>Product</th>
            <th>Category</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Low Stock?</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {inventory.map((item) => (
            <tr
              key={item.id}
              style={{
                backgroundColor:
                  item.quantity < threshold ? "#ffe0e0" : "white",
              }}
            >
              <td>{item.productName}</td>
              <td>{item.category}</td>
              <td>{item.quantity}</td>
              <td>₹{item.price}</td>
              <td>{item.quantity < threshold ? "⚠️ Yes" : "✅ No"}</td>
              <td>
                <button onClick={() => handleReduceStock(item.id, 1)}>
                  Reduce Stock
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  style={{ marginLeft: "1rem" }}
                >
                  Delete
                </button>
                <button onClick={() => setEditingItemId(item.id)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InventoryDashboard;