import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const DrugDetails = () => {
  const { id } = useParams();
  const [drug, setDrug] = useState(null);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDrugById = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:8080/api/drugs/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setDrug(response.data);
      } catch (error) {
        console.error("Failed to fetch drug:", error);
      }
    };
    fetchDrugById();
  }, [id]);

  const addToCart = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:8080/api/cart/add",
        { drugId: id },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setMessage("Added to cart!");
    } catch (error) {
      setMessage("Failed to add to cart");
    }
  };

  if (!drug) return <p>Loading...</p>;

  return (
    <div className="drug-details-container">
      <h2>{drug.name}</h2>
      <p>{drug.description}</p>
      <p>Price: ₹{drug.price}</p>
      <p>Category: {drug.category}</p>
      <button onClick={addToCart}>Add to Cart</button>
      {message && <p>{message}</p>}
      <button onClick={() => navigate("/user")}>Back to Dashboard</button>
    </div>
  );
};

export default DrugDetails;
