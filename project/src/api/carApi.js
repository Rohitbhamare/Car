import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const predictCarPrice = async (carData) => {
  try {
    const response = await api.post('/predict', carData);
    return response.data;
  } catch (error) {
    console.error('Error predicting car price:', error);
    throw error;
  }
};

export const getCarMakes = async () => {
  try {
    const response = await api.get('/car-makes');
    return response.data;
  } catch (error) {
    console.error('Error fetching car makes:', error);
    throw error;
  }
};

export const getCarModels = async (make) => {
  try {
    const response = await api.get(`/car-models/${make}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching car models:', error);
    throw error;
  }
};

export const getLocations = async () => {
  try {
    const response = await api.get('/locations');
    return response.data;
  } catch (error) {
    console.error('Error fetching locations:', error);
    throw error;
  }
};