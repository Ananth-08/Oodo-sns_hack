import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API_BASE = `${BACKEND_URL}/api`;

// Create axios instance
const apiClient = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Destinations API
export const destinationsAPI = {
  // Get all destinations with optional filters
  getAll: async (filters = {}) => {
    try {
      const params = new URLSearchParams();
      if (filters.location) params.append('location', filters.location);
      if (filters.search) params.append('search', filters.search);
      
      const response = await apiClient.get(`/destinations?${params.toString()}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching destinations:', error);
      throw error;
    }
  },

  // Get single destination by ID
  getById: async (id) => {
    try {
      const response = await apiClient.get(`/destinations/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching destination ${id}:`, error);
      throw error;
    }
  },

  // Create new destination (admin)
  create: async (destinationData) => {
    try {
      const response = await apiClient.post('/destinations', destinationData);
      return response.data;
    } catch (error) {
      console.error('Error creating destination:', error);
      throw error;
    }
  },
};

// Itineraries API
export const itinerariesAPI = {
  // Get all itineraries
  getAll: async () => {
    try {
      const response = await apiClient.get('/itineraries');
      return response.data;
    } catch (error) {
      console.error('Error fetching itineraries:', error);
      throw error;
    }
  },

  // Get single itinerary by ID (with populated destinations)
  getById: async (id) => {
    try {
      const response = await apiClient.get(`/itineraries/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching itinerary ${id}:`, error);
      throw error;
    }
  },

  // Create new itinerary
  create: async (itineraryData) => {
    try {
      const response = await apiClient.post('/itineraries', itineraryData);
      return response.data;
    } catch (error) {
      console.error('Error creating itinerary:', error);
      throw error;
    }
  },

  // Delete itinerary
  delete: async (id) => {
    try {
      const response = await apiClient.delete(`/itineraries/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting itinerary ${id}:`, error);
      throw error;
    }
  },
};

export default apiClient;
