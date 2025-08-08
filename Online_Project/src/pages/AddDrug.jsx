import { useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { useNavigate } from "react-router-dom";

const AddDrug = () => {
  const [form, setForm] = useState({
    name: "",
    category: "",
    description: "",
    price: "",
    quantity: "",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post("/admin/add-drug", form);
      setMessage("Drug added successfully!");
      setTimeout(() => navigate("/admin"), 2000);
    } catch (error) {
      setMessage("Failed to add drug. Please try again.");
    }
  };

  return (
    <div className="add-drug-form">
      <h2>Add New Drug</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Drug Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          required
        />
        <input
          name="price"
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          required
        />
        <input
          name="quantity"
          type="number"
          placeholder="Quantity"
          value={form.quantity}
          onChange={handleChange}
          required
        />
        <button type="submit">Add Drug</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default AddDrug;
