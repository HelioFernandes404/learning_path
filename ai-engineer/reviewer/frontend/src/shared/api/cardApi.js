import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000',
});

export const cardApi = {
  getCards: () => api.get('/cards'),
  getTodayCards: () => api.get('/cards/today'),
  createCard: (cardData) => api.post('/cards', cardData), // Updated to accept cardData object
  updateCard: (id, question) => api.put(`/cards/${id}`, { question }),
  deleteCard: (id) => api.delete(`/cards/${id}`),
  reviewCard: (id, success) => api.post(`/cards/${id}/review`, { success }),
  
  // Months
  getMonths: () => api.get('/months'),
  createMonth: (monthData) => api.post('/months', monthData),
  deleteMonth: (id) => api.delete(`/months/${id}`),
  
  // Check-ins
  getTodayCheckIn: () => api.get('/checkins/today'),
  submitCheckIn: (answers) => api.post('/checkins', { answers }),
};

export default api;