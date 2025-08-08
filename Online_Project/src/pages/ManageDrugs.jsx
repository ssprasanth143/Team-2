import { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { useNavigate } from "react-router-dom";

const ManageDrugs = () => {
  const [drugs, setDrugs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDrugs = async () => {
      try {
        const response = await axiosInstance.get("/admin/drugs");
        setDrugs(response.data);
      } catch (error) {
        console.error("Error fetching drugs:", error);
      }
    };
    fetchDrugs();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/admin/drugs/${id}`);
      setDrugs((prev) => prev.filter((drug) => drug.id !== id));
    } catch (error) {
      console.error("Error deleting drug:", error);
    }
  };

  const handleEdit = (id) => {
    navigate(`/admin/edit-drug/${id}`);
  };

  return (
    <div className="manage-drugs">
      <h2>Manage Drugs</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Qty</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {drugs.map((drug) => (
            <tr key={drug.id}>
              <td>{drug.name}</td>
              <td>{drug.category}</td>
              <td>₹{drug.price}</td>
              <td>{drug.quantity}</td>
              <td>
                <button onClick={() => handleEdit(drug.id)}>Edit</button>
                <button onClick={() => handleDelete(drug.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageDrugs;
