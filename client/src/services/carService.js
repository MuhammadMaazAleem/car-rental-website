import api from './api';

// Get all cars with filters
export const getCars = async (filters = {}) => {
  const params = new URLSearchParams(filters).toString();
  const response = await api.get(`/cars?${params}`);
  return response.data;
};

// Get single car
export const getCar = async (id) => {
  const response = await api.get(`/cars/${id}`);
  return response.data;
};

// Create car (admin)
export const createCar = async (carData) => {
  const response = await api.post('/cars', carData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  return response.data;
};

// Update car (admin)
export const updateCar = async (id, carData) => {
  const response = await api.put(`/cars/${id}`, carData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  return response.data;
};

// Delete car (admin)
export const deleteCar = async (id) => {
  const response = await api.delete(`/cars/${id}`);
  return response.data;
};
