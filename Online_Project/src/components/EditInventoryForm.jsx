import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const EditInventoryForm = ({ itemId, onSuccess }) => {
  const [formData, setFormData] = useState({
    productName: "",
    category: "",
    quantity: "",
    price: "",
  });

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/inventory/${itemId}`)
      .then((res) => setFormData(res.data))
      .catch(() => toast.error("Failed to fetch item."));
  }, [itemId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:8080/api/inventory/${itemId}`, formData)
      .then(() => {
        toast.success("Item updated!");
        if (onSuccess) onSuccess();
      })
      .catch(() => toast.error("Update failed."));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="productName"
        value={formData.productName}
        onChange={handleChange}
      />
      <input
        name="category"
        value={formData.category}
        onChange={handleChange}
      />
      <input
        name="quantity"
        type="number"
        value={formData.quantity}
        onChange={handleChange}
      />
      <input
        name="price"
        type="number"
        value={formData.price}
        onChange={handleChange}
      />
      <button type="submit">Update</button>
    </form>
  );
};

export default EditInventoryForm;
