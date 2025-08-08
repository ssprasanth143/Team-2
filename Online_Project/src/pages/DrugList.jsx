import { useState, useEffect } from "react";
import DrugCard from "./DrugCard";
import DrugModal from "./DrugModal"; // Assuming you’ve created this
import { fetchDrugs, fetchWishlist } from "../services/drugService";
import { useAuth } from "../context/AuthContext";
import "./DrugList.css";

const DrugList = () => {
  const { user } = useAuth();
  const [drugs, setDrugs] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [selectedDrug, setSelectedDrug] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const drugData = await fetchDrugs();
        const wishlistData = await fetchWishlist(user.id);
        setDrugs(drugData);
        setWishlist(wishlistData);
      } catch (err) {
        console.error("Error loading drugs:", err);
      }
    };
    loadData();
  }, [user.id]);

  const closeModal = () => setSelectedDrug(null);

  return (
    <div className="drug-list">
      {drugs.map((drug) => (
        <DrugCard
          key={drug.id}
          drug={drug}
          isWishedInitially={wishlist.includes(drug.id)}
          onClick={setSelectedDrug}
        />
      ))}

      {selectedDrug && <DrugModal drug={selectedDrug} onClose={closeModal} />}
    </div>
  );
};

export default DrugList;
