import { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { useParams, useNavigate } from "react-router-dom";

const EditDrugForm = () => {
  const { id } = useParams();
  const [form, setForm] = useState({
    name: "",
    category: "",
    description: "",
    price: "",
    quantity: "",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDrug = async () => {
      try {
        const response = await axiosInstance.get(`/admin/drugs/${id}`);
        setForm(response.data);
      } catch (error) {
        console.error("Error fetching drug:", error);
      }
    };
    fetchDrug();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.put(`/admin/drugs/${id}`, form);
      setMessage("Drug updated successfully!");
      setTimeout(() => navigate("/admin/manage-drugs"), 2000);
    } catch (error) {
      setMessage("Update failed. Try again.");
    }
  };

  return (
    <div className="edit-drug-form">
      <h2>Edit Drug Details</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" value={form.name} onChange={handleChange} required />
        <input
          name="category"
          value={form.category}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          required
        />
        <input
          name="price"
          type="number"
          value={form.price}
          onChange={handleChange}
          required
        />
        <input
          name="quantity"
          type="number"
          value={form.quantity}
          onChange={handleChange}
          required
        />
        <button type="submit">Update Drug</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default EditDrugForm;
