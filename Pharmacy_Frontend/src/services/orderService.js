import axios from 'axios';

const api = axios.create({
  baseURL: 'https://your-backend-api.com/api',
});

const orderService = {
  createOrder: async (orderData) => {
    try {
      const token = localStorage.getItem("token");
      const response = await api.post("/orders", orderData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getUserOrders: async () => {
    const response = await api.get("/orders/user");
    return response;
  },

  getAllOrders: async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await api.get("/orders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getOrderById: async (id) => {
    try {
      const token = localStorage.getItem("token");
      const response = await api.get(`/orders/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  updateOrderStatus: async (id, status) => {
    try {
      const token = localStorage.getItem("token");
      const response = await api.put(
        `/orders/${id}/status`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  deleteOrder: async (id) => {
    try {
      const token = localStorage.getItem("token");
      await api.delete(`/orders/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      throw error;
    }
  },
};

export default orderService;