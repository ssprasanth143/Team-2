import React, { useState, useEffect } from 'react';
import drugService from '../../services/drugService';

const ManageDrugs = () => {
  const [drugs, setDrugs] = useState([]);
  const [error, setError] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [drugId, setDrugId] = useState("");

  useEffect(() => {
    const fetchDrugs = async () => {
      try {
        const response = await drugService.getAllDrugs();
        setDrugs(response.data);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchDrugs();
  }, []);

  const handleAddDrug = async (e) => {
    e.preventDefault();
    try {
      const response = await drugService.addDrug({ name, description, price });
      setDrugs([...drugs, response.data]);
      setName("");
      setDescription("");
      setPrice("");
    } catch (error) {
      setError(error.message);
    }
  };

  const handleEditDrug = async (e) => {
    e.preventDefault();
    try {
      const response = await drugService.updateDrug(drugId, {
        name,
        description,
        price,
      });
      setDrugs(
        drugs.map((drug) => (drug._id === drugId ? response.data : drug))
      );
      setIsEditing(false);
      setName("");
      setDescription("");
      setPrice("");
      setDrugId("");
    } catch (error) {
      setError(error.message);
    }
  };

  const handleDeleteDrug = async (id) => {
    try {
      await drugService.deleteDrug(id);
      setDrugs(drugs.filter((drug) => drug._id !== id));
    } catch (error) {
      setError(error.message);
    }
  };

  const handleEditClick = (drug) => {
    setIsEditing(true);
    setName(drug.name);
    setDescription(drug.description);
    setPrice(drug.price);
    setDrugId(drug._id);
  };

  return (
    <div className="manage-drugs-container">
      <h1>Manage Drugs</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={isEditing ? handleEditDrug : handleAddDrug}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
        />
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
        />
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Price"
        />
        <button type="submit">{isEditing ? "Update" : "Add"}</button>
        {isEditing && (
          <button type="button" onClick={() => setIsEditing(false)}>
            Cancel
          </button>
        )}
      </form>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {drugs.map((drug) => (
            <tr key={drug._id}>
              <td>{drug.name}</td>
              <td>{drug.description}</td>
              <td>{drug.price}</td>
              <td>
                <button onClick={() => handleEditClick(drug)}>Edit</button>
                <button onClick={() => handleDeleteDrug(drug._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageDrugs;
