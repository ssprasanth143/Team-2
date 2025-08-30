import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminSidebar from '../Admin/AdminSidebar';

import '../../styles/ManageMembers.css';

function ManageMembers() {
    const [collapsed, setCollapsed] = useState(true);
    const [members, setMembers] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        mobile: '',
        address: '',
        password: '',
        dob: '', 
    });

    useEffect(() => {
        fetchMembers();
    }, []);

    const fetchMembers = async () => {
        try {
            const res = await axios.get('http://localhost:8080/api/members');
            setMembers(res.data);
        } catch (err) {
            console.error('Error fetching members:', err);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/api/members/${id}`);
            setMembers(prev => prev.filter(m => m.id !== id));
        } catch (error) {
            console.error('Delete failed:', error);
        }
    };

    const handleStatusChange = async (id, newStatus) => {
        try {
            const res = await axios.put(`http://localhost:8080/api/members/${id}/status`, null, {
                params: { status: newStatus }
            });
            setMembers(prev =>
                prev.map(member =>
                    member.id === id ? res.data : member
                )
            );
        } catch (error) {
            console.error('Status update failed:', error);
        }
    };

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:8080/api/members', formData);
            setMembers(prev => [...prev, res.data]);
            setFormData({
                name: '',
                email: '',
                mobile: '',
                address: '',
                password: '',
                dob: '',
            });
            setShowForm(false);
        } catch (err) {
            console.error('Error adding member:', err);
            alert("Failed to add member. Please check the form fields.");
        }
    };

    const getStatus = (member) => {
        if (member.disabled === true) return 'Declined';
        if (member.disabled === false) return 'Approved';
        return 'Pending';
    };

    return (
        <div className="admin-dashboard-root">
            <AdminSidebar collapsed={collapsed} setCollapsed={setCollapsed} />
            <main
                className="admin-main-content"
                style={{ marginLeft: collapsed ? 60 : 250, width: `calc(100vw - ${collapsed ? 60 : 250}px)` }}
            >
                <header className="admin-header2">
                    <div className="admin-title">Manage Members</div>
                   
                </header>

                <section className="manage-members-section">
                    <div className="top-bar">
                        <button className="add-btn" onClick={() => setShowForm(!showForm)}>
                            {showForm ? 'Cancel' : 'Add Member'}
                        </button>
                    </div>

                    {showForm && (
                        <div className="modal-overlay">
                            <div className="modal-content">
                                <h2>Add New Member</h2>
                                <form className="member-form" onSubmit={handleSubmit}>
                                    <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
                                    <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
                                    <input type="text" name="mobile" placeholder="Mobile" value={formData.mobile} onChange={handleChange} required />
                                    <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} required />
                                    <input type="date" name="dob" placeholder="Date of Birth" value={formData.dob} onChange={handleChange} required />
                                    <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
                                    <div className="modal-actions">
                                        <button type="submit" className="submit-btn">Submit</button>
                                        <button type="button" className="cancel-btn" onClick={() => setShowForm(false)}>Cancel</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}

                    <table className="member-table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Mobile</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {members.length === 0 ? (
                                <tr><td colSpan="5">No members found.</td></tr>
                            ) : (
                                members.map(member => (
                                    <tr key={member.id}>
                                        <td>{member.name}</td>
                                        <td>{member.email}</td>
                                        <td>{member.mobile}</td>
                                        <td>
                                            <span className={`status-pill status-${getStatus(member).toLowerCase()}`}>
                                                {getStatus(member)}
                                            </span>
                                        </td>
                                        <td>
                                            <div className="action-buttons">
                                                <button className="action-btn accept-btn" onClick={() => handleStatusChange(member.id, 'Approved')}>Accept</button>
                                                <button className="action-btn decline-btn" onClick={() => handleStatusChange(member.id, 'Declined' )}>Decline</button>
                                                <button className="action-btn delete-btn" onClick={() => handleDelete(member.id)}>Delete</button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </section>
            </main>
        </div>
    );
}

export default ManageMembers;
