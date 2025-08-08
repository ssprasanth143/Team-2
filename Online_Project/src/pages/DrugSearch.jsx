import { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";

const DrugSearch = () => {
  const [drugs, setDrugs] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  useEffect(() => {
    const fetchDrugs = async () => {
      try {
        const response = await axiosInstance.get("/user/drugs");
        setDrugs(response.data);
        setFiltered(response.data);
      } catch (error) {
        console.error("Error fetching drugs:", error);
      }
    };
    fetchDrugs();
  }, []);

  useEffect(() => {
    const term = searchTerm.toLowerCase();
    const filteredList = drugs.filter(
      (drug) =>
        drug.name.toLowerCase().includes(term) &&
        (categoryFilter ? drug.category === categoryFilter : true)
    );
    setFiltered(filteredList);
  }, [searchTerm, categoryFilter, drugs]);

  return (
    <div className="drug-search">
      <h2>Browse Drugs</h2>
      <input
        type="text"
        placeholder="Search by name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <select
        value={categoryFilter}
        onChange={(e) => setCategoryFilter(e.target.value)}
      >
        <option value="">All Categories</option>
        <option value="Painkiller">Painkiller</option>
        <option value="Antibiotic">Antibiotic</option>
        <option value="Vitamin">Vitamin</option>
        {/* Add more categories as needed */}
      </select>
      <ul>
        {filtered.map((drug) => (
          <li key={drug.id}>
            <strong>{drug.name}</strong> - {drug.category} - ₹{drug.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DrugSearch;
