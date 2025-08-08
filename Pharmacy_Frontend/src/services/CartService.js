import api from './api';

const cartService = {
  getCart: async () => {
    const response = await api.get('/cart');
    return response;
  },
  addToCart: async (productId, quantity) => {
    const response = await api.post('/cart', { productId, quantity });
    return response;
  },
  removeItem: async (id) => {
    const response = await api.delete(`/cart/${id}`);
    return response;
  },
  updateQuantity: async (id, quantity) => {
    const response = await api.patch(`/cart/${id}`, { quantity });
    return response;
  },
  checkout: async () => {
    const response = await api.post('/checkout');
    return response;
  },
};

export default cartService;
