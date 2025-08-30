import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminSidebar from './AdminSidebar';

import '../../styles/ManageOrder.css';
import Swal from 'sweetalert2';

function ManageOrder() {
    const [collapsed, setCollapsed] = useState(true);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const res = await axios.get('http://localhost:8080/api/orders/all', {
                headers: { 'Content-Type': 'application/json' }
            });
            setOrders(res.data);
        } catch (err) {
            console.error('Error fetching orders:', err);
        }
    };

    const handleAccept = async (id) => {
        try {
            await axios.put(`http://localhost:8080/api/orders/${id}/status`,
                { status: 'Accepted' },
                { headers: { 'Content-Type': 'application/json' } }
            );
            Swal.fire({
                icon: 'success',
                title: 'Order accepted!',
                timer: 1500,
                showConfirmButton: false
            });
            fetchOrders();
        } catch (err) {
            console.error('Error accepting order:', err);
            Swal.fire({
                icon: 'error',
                title: 'Failed to accept order',
                text: err.response?.data?.message || 'Please try again.'
            });
        }
    };

    const handleDecline = async (id) => {
        try {
            await axios.put(`http://localhost:8080/api/orders/${id}/status`,
                { status: 'Declined' },
                { headers: { 'Content-Type': 'application/json' } }
            );
            Swal.fire({
                icon: 'success',
                title: 'Order declined!',
                timer: 1500,
                showConfirmButton: false
            });
            fetchOrders();
        } catch (err) {
            console.error('Error declining order:', err);
            Swal.fire({
                icon: 'error',
                title: 'Failed to decline order',
                text: err.response?.data?.message || 'Please try again.'
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
                <header className="admin-header">
                    <div className="admin-title">Manage Orders</div>
                </header>

                <section className="table-wrapper">
                    
                    <div className="table-responsive">
                        
                        <table className="order-table">
                            
                            <thead>
                                <tr>
                                    <th>Order ID</th>
                                    <th>Member ID</th>
                                    <th>Product</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.length === 0 ? (
                                    <tr>
                                        <td colSpan="7" className="no-data">No orders found.</td>
                                    </tr>
                                ) : (
                                    orders.map((order) => (
                                        <tr key={order.id}>
                                            <td>{order.id}</td>
                                            <td>{order.memberId}</td>
                                            <td>{order.name}</td>
                                            <td>₹{order.price.toFixed(2)}</td>
                                            <td>{order.quantity}</td>
                                            <td>
                                                <span className={`status-${order.status.toLowerCase()}`}>
                                                    {order.status}
                                                </span>
                                            </td>
                                            <td>
                                                <button
                                                    onClick={() => handleAccept(order.id)}
                                                    className="accept-btn"
                                                    disabled={order.status === 'Accepted'}
                                                >
                                                    Accept
                                                </button>
                                                <button
                                                    onClick={() => handleDecline(order.id)}
                                                    className="decline-btn"
                                                    disabled={order.status === 'Declined'}
                                                >
                                                    Decline
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </section>
            </main>
        </div>
    );
}

export default ManageOrder;
