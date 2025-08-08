import { useState } from "react";
import { addToWishlist, removeFromWishlist } from "../services/wishlistService";
import { useAuth } from "../context/AuthContext";
import "./DrugCard.css";

const DrugCard = ({ drug, isWishedInitially, onClick }) => {
  const { user } = useAuth();
  const [isWished, setIsWished] = useState(isWishedInitially);

  const handleWishlistToggle = async (e) => {
    e.stopPropagation(); // Prevent modal from opening when clicking the button
    try {
      if (isWished) {
        await removeFromWishlist(user.id, drug.id);
      } else {
        await addToWishlist(user.id, drug.id);
      }
      setIsWished(!isWished);
    } catch (err) {
      console.error("Wishlist error:", err);
    }
  };

  return (
    <div className="drug-card" onClick={() => onClick(drug)}>
      <h3>{drug.name}</h3>
      <p>₹{drug.price}</p>
      <p>{drug.category}</p>
      <div className="card-actions">
        <button onClick={handleWishlistToggle}>
          {isWished ? "💔 Remove" : "💖 Wishlist"}
        </button>
        {/* Optional: Add to Cart button can go here */}
      </div>
    </div>
  );
};

export default DrugCard;
