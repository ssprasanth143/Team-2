import api from "./api";

export const fetchAllDrugs = () => api.get("/drugs");
export const fetchDrugById = (id) => api.get(`/drugs/${id}`);
