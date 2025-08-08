import axiosInstance from '../utils/axiosInstance';

export const fetchWishlist = (userId) =>
  axiosInstance.get(`/wishlist/${userId}`);

export const addToWishlist = (userId, drugId) =>
  axiosInstance.post(`/wishlist/${userId}/${drugId}`);

export const removeFromWishlist = (userId, drugId) =>
  axiosInstance.delete(`/wishlist/${userId}/${drugId}`);