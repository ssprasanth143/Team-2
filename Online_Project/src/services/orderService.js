import api from './api';

export const addToCart = (drugId) =>
  api.post('/cart/add', { drugId });

export const checkoutCart = (items) =>
  api.post('/cart/checkout', { items });