import React, { useState, useEffect } from "react";
import axios from "axios";

const PlaceOrderForm = () => {
  const [customerName, setCustomerName] = useState("");
  const [drugs, setDrugs] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);

  // Fetch available drugs from backend
  useEffect(() => {
    axios
      .get("/api/drugs") // You’ll need to create this endpoint
      .then((res) => setDrugs(res.data))
      .catch((err) => console.error("Error fetching drugs:", err));
  }, []);

  const handleAddItem = (drugId, quantity) => {
    setSelectedItems((prev) => [...prev, { drugId, quantity }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const orderRequest = { customerName, items: selectedItems };

    try {
      const res = await axios.post("/api/orders/place", orderRequest);
      alert(res.data);
      setCustomerName("");
      setSelectedItems([]);
    } catch (err) {
      alert("Order failed: " + err.response?.data || err.message);
    }
  };

  return (
    <div>
      <h2>Place Order</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Customer Name"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          required
        />

        <h4>Select Drugs</h4>
        {drugs.map((drug) => (
          <div key={drug.id}>
            <span>
              {drug.name} - ₹{drug.price} (Stock: {drug.quantity})
            </span>
            <input
              type="number"
              min="1"
              max={drug.quantity}
              placeholder="Quantity"
              onChange={(e) => handleAddItem(drug.id, parseInt(e.target.value))}
            />
          </div>
        ))}

        <button type="submit">Place Order</button>
      </form>
    </div>
  );
};

export default PlaceOrderForm;
