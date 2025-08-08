import { useAuth } from "../context/AuthContext";
import { addToCart } from "../services/cartService";

const DrugModal = ({ drug, onClose }) => {
  const { user } = useAuth();

  const handleAddToCart = async () => {
    try {
      await addToCart(user.id, drug.id);
      alert(`${drug.name} added to cart 🛒`);
    } catch (err) {
      console.error("Cart error:", err);
      alert("Failed to add to cart.");
    }
  };

  if (!drug) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>
          ✖
        </button>
        <h2>{drug.name}</h2>
        <p>
          <strong>Price:</strong> ₹{drug.price}
        </p>
        <p>
          <strong>Category:</strong> {drug.category}
        </p>
        <p>
          <strong>Description:</strong>{" "}
          {drug.description || "No description available."}
        </p>
        <button onClick={handleAddToCart}>🛒 Add to Cart</button>
      </div>
    </div>
  );
};
