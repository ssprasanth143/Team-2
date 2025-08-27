
import React, { useState } from 'react';
import AdminSidebar from '../Admin/AdminSidebar';
import { FaUserPlus } from 'react-icons/fa';
import '../../styles/AddMember.css';

function AddMember() {
    const [collapsed, setCollapsed] = useState(true);
    const [formData, setFormData] = useState({ name: '', email: '', role: '' });
    const [success, setSuccess] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleAddMember = (e) => {
        e.preventDefault();
        setSuccess(true);
        setFormData({ name: '', email: '', role: '' });
        setTimeout(() => setSuccess(false), 2000);
    };

    return (
        <div className="admin-dashboard-root">
            <AdminSidebar collapsed={collapsed} setCollapsed={setCollapsed} />
            <main
                className="admin-main-content"
                style={{ marginLeft: collapsed ? 60 : 250, width: `calc(100vw - ${collapsed ? 60 : 250}px)` }}
            >
                <header className="admin-header">
                    <div className="admin-title"><FaUserPlus style={{ marginRight: 8 }} /> Add Member</div>
                    <div className="admin-user">
                        <span className="admin-avatar">A</span>
                        <span>Admin</span>
                    </div>
                </header>

                <section className="add-member-section">
                    <form className="animated-form" onSubmit={handleAddMember}>
                        <h3 className="form-heading">Enter Member Details</h3>

                        <label htmlFor="name">Full Name</label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Enter Full Name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />

                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter Email-id"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />

                        <label htmlFor="role">Role</label>
                        <input
                            type="text"
                            name="role"
                            placeholder="Enter Role"
                            value={formData.role}
                            onChange={handleChange}
                            required
                        />

                        <button type="submit" className="submit-btn" >Add Member</button>
                        {success && <div className="success-msg">🎉 Member added successfully!</div>}
                    </form>
                </section>
            </main>
        </div>
    );
}

export default AddMember;
