import api from './api';

// Create booking
export const createBooking = async (bookingData) => {
  const response = await api.post('/bookings', bookingData);
  return response.data;
};

// Get all bookings (user's or all for admin)
export const getBookings = async (status = '') => {
  const params = status ? `?status=${status}` : '';
  const response = await api.get(`/bookings${params}`);
  return response.data;
};

// Get single booking
export const getBooking = async (id) => {
  const response = await api.get(`/bookings/${id}`);
  return response.data;
};

// Update booking
export const updateBooking = async (id, data) => {
  const response = await api.put(`/bookings/${id}`, data);
  return response.data;
};

// Cancel booking
export const cancelBooking = async (id) => {
  const response = await api.put(`/bookings/${id}`, { status: 'cancelled' });
  return response.data;
};

// Delete booking (admin)
export const deleteBooking = async (id) => {
  const response = await api.delete(`/bookings/${id}`);
  return response.data;
};
