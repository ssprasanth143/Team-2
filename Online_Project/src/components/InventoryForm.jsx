import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const InventoryForm = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    productName: "",
    category: "",
    quantity: "",
    price: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8080/api/inventory", formData)
      .then(() => {
        toast.success("Item added!");
        setFormData({ productName: "", category: "", quantity: "", price: "" });
        if (onSuccess) onSuccess();
      })
      .catch(() => toast.error("Failed to add item."));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="productName"
        value={formData.productName}
        onChange={handleChange}
        placeholder="Product Name"
      />
      <input
        name="category"
        value={formData.category}
        onChange={handleChange}
        placeholder="Category"
      />
      <input
        name="quantity"
        type="number"
        value={formData.quantity}
        onChange={handleChange}
        placeholder="Quantity"
      />
      <input
        name="price"
        type="number"
        value={formData.price}
        onChange={handleChange}
        placeholder="Price"
      />
      <button type="submit">Add Item</button>
    </form>
  );
};

export default InventoryForm;
