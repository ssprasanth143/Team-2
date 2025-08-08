import { useState, useEffect } from "react";
import { fetchAllDrugs } from "../services/drugService";
import "./SearchBar.css";

const SearchBar = ({ onSelect }) => {
  const [query, setQuery] = useState("");
  const [matches, setMatches] = useState([]);
  const [drugs, setDrugs] = useState([]);

  useEffect(() => {
    const loadDrugs = async () => {
      try {
        const res = await fetchAllDrugs();
        setDrugs(res.data);
      } catch (err) {
        console.error("Error fetching drugs:", err);
      }
    };
    loadDrugs();
  }, []);

  useEffect(() => {
    if (query.trim() === "") {
      setMatches([]);
      return;
    }
    const filtered = drugs.filter((d) =>
      d.name.toLowerCase().includes(query.toLowerCase())
    );
    setMatches(filtered.slice(0, 5)); // Limit suggestions
  }, [query, drugs]);

  return (
    <div className="search-bar">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search drugs..."
      />
      {matches.length > 0 && (
        <ul className="suggestion-list">
          {matches.map((drug) => (
            <li key={drug.id} onClick={() => onSelect(drug)}>
              {drug.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
