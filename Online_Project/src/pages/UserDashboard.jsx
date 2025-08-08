// src/pages/UserDashboard.jsx
import { useEffect, useState } from "react";
import { fetchAllDrugs } from "../services/drugService";
import DrugCard from "../components/DrugCard";

const UserDashboard = () => {
  const [drugs, setDrugs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const loadDrugs = async () => {
      try {
        const response = await fetchAllDrugs();
        setDrugs(response.data);
      } catch (error) {
        console.error("Error fetching drugs:", error);
      }
    };

    loadDrugs();
  }, []);

  const filteredDrugs = drugs.filter((drug) =>
    drug.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <h2>Welcome to Your Dashboard 🧪</h2>
      <input
        type="text"
        placeholder="Search drugs..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <div className="drug-list">
        {filteredDrugs.map((drug) => (
          <DrugCard key={drug.id} drug={drug} />
        ))}
      </div>
    </div>
  );
};

export default UserDashboard;
