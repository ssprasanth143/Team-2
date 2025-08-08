import axios from "axios";

export const addToCart = (userId, drugId, quantity = 1) => {
  return axios.post(`http://localhost:8080/api/cart/add`, {
    userId,
    drugId,
    quantity,
  });
};

export const fetchCart = (userId) => {
  return axios.get(`http://localhost:8080/api/cart/${userId}`);
};

export const removeFromCart = (userId, drugId) => {
  return axios.delete(`http://localhost:8080/api/cart/${userId}/${drugId}`);
};

export const updateCartQuantity = (userId, drugId, quantity) => {
  return axios.put(`http://localhost:8080/api/cart/update`, {
    userId,
    drugId,
    quantity,
  });
};

export const placeOrder = (orderData) => {
  return axios.post(`http://localhost:8080/api/orders/place`, orderData);
};