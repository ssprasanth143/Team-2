import { useEffect, useState } from 'react';
import { fetchWishlist, removeFromWishlist } from '../services/wishlistService';
import { useAuth } from '../context/AuthContext';

const Wishlist = () => {
  const { user } = useAuth(); // Ensure user has `id` or `username`
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const loadWishlist = async () => {
      try {
        const res = await fetchWishlist(user.id);
        setWishlist(res.data);
      } catch (err) {
        console.error('Error fetching wishlist:', err);
      }
    };
    loadWishlist();
  }, [user.id]);

  const handleRemove = async (drugId) => {
    try {
      await removeFromWishlist(user.id, drugId);
      setWishlist(prev => prev.filter(item => item.drugId !== drugId));
    } catch (err) {
      console.error('Error removing item:', err);
    }
  };

  return (
    <div className="wishlist-page">
      <h2>Your Wishlist 💖</h2>
      {wishlist.length === 0 ? (
        <p>No items yet.</p>
      ) : (
        <ul>
          {wishlist.map(item => (
            <li key={item.drugId}>
              <strong>{item.drugName}</strong>
              <button onClick={() => handleRemove(item.drugId)}>Remove</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Wishlist;