import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminSidebar from './AdminSidebar';

import '../../styles/ManageDrug.css';
import Swal from 'sweetalert2';

function ManageDrug() {
    const [collapsed, setCollapsed] = useState(true);
    const [medicines, setMedicines] = useState([]);
    const [editingMedicine, setEditingMedicine] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        fetchMedicines();
    }, []);

    const fetchMedicines = async () => {
        try {
            const res = await axios.get('http://localhost:8080/api/medicines/all');
            setMedicines(res.data);
        } catch (err) {
            console.error('Error fetching medicines:', err);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/api/medicines/${id}`);
            setMedicines(prev => prev.filter(m => m.id !== id));
        } catch (err) {
            console.error('Error deleting medicine:', err);
        }
    };

    const handleEditClick = (medicine) => {
        setEditingMedicine({
            id: medicine.id,
            name: medicine.name,
            company: medicine.company,
            type: medicine.type,
            price: medicine.price,
            availableQuantity: medicine.availableQuantity,
            rating: medicine.rating,
            description: medicine.description,
            banned: medicine.banned,
            imageUrl: medicine.imageUrl
        });
        setShowModal(true);
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditingMedicine(prev => ({ ...prev, [name]: value }));
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:8080/api/medicines/${editingMedicine.id}`, editingMedicine, {
                headers: { 'Content-Type': 'application/json' }
            });

            setShowModal(false);
            setEditingMedicine(null);
            fetchMedicines();

            Swal.fire({
                icon: 'success',
                title: 'Medicine updated successfully!',
                timer: 1500,
                showConfirmButton: false
            });
        } catch (err) {
            console.error('Update error:', err);
            Swal.fire({
                icon: 'error',
                title: 'Update failed',
                text: 'Please check the medicine ID and try again.'
            });
        }
    };

    return (
        <div className="admin-dashboard-root">
            <AdminSidebar collapsed={collapsed} setCollapsed={setCollapsed} />
            <main
                className="admin-main-content"
                style={{ marginLeft: collapsed ? 60 : 250, width: `calc(100vw - ${collapsed ? 60 : 250}px)` }}
            >
                

                <section>
                    <table className="drug-table">
                        <thead >
                            <tr>
                                <th>ID</th>
                                <th>Medicine Name</th>
                                <th>Company</th>
                                <th>Type</th>
                                <th>Price</th>
                                <th>Stock</th>
                                <th>Rating</th>
                                <th>Description</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody><br></br><br></br><br></br>
                            {medicines.length === 0 ? (
                                <tr>
                                    <td colSpan="9" className="no-data">No medicines found.</td>
                                </tr>
                                
                            ) : (
                                medicines.map((medicine) => (
                                    <tr key={medicine.id}>
                                        <td>{medicine.id}</td>
                                        <td>{medicine.name}</td>
                                        <td>{medicine.company}</td>
                                        <td>{medicine.type}</td>
                                        <td>₹{medicine.price.toFixed(2)}</td>
                                        <td>{medicine.availableQuantity}</td>
                                        <td>{medicine.rating}</td>
                                        <td style={{ maxWidth: 200 }}>{medicine.description}</td>
                                        <td>
                                            <button onClick={() => handleEditClick(medicine)} className="edit-btn">Edit</button>
                                            <button onClick={() => handleDelete(medicine.id)} className="delete-btn">Delete</button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </section>
            </main>

            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h3>Edit Medicine</h3>
                        <form onSubmit={handleUpdate}>
                            <input type="text" name="name" value={editingMedicine.name} onChange={handleEditChange} required />
                            <input type="text" name="company" value={editingMedicine.company} onChange={handleEditChange} required />
                            <input type="text" name="type" value={editingMedicine.type} onChange={handleEditChange} required />
                            <input type="number" name="price" value={editingMedicine.price} onChange={handleEditChange} required />
                            <input type="number" name="availableQuantity" value={editingMedicine.availableQuantity} onChange={handleEditChange} required />
                            <input type="number" name="rating" value={editingMedicine.rating} onChange={handleEditChange} min="1" max="5" required />
                            <textarea name="description" value={editingMedicine.description} onChange={handleEditChange} rows="3" required />

                            <div className="modal-actions">
                                <button type="submit" className="update-btn">Update</button>
                                <button type="button" onClick={() => setShowModal(false)} className="cancel-btn">Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ManageDrug;
