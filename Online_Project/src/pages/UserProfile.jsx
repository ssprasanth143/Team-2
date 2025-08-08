import { useEffect, useState } from 'react';
import axiosInstance from '../utils/axiosInstance';
import { useAuth } from '../contexts/AuthContext'; // Assuming you're using a context for auth

const UserProfile = () => {
  const [orders, setOrders] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchUserOrders = async () => {
      try {
        const response = await axiosInstance.get(`/user/orders/${user.username}`);
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching user orders:', error);
      }
    };
    fetchUserOrders();
  }, [user.username]);

  return (
    <div className="user-profile">
      <h2>Welcome, {user.username}!</h2>
      <h3>Your Orders</h3>
      {orders.length === 0 ? (
        <p>You haven't placed any orders yet.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Drug</th>
              <th>Quantity</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={index}>
                <td>{order.drugName}</td>
                <td>{order.quantity}</td>
                <td>{new Date(order.date).toLocaleDateString()}</td>
                <td>{order.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserProfile;