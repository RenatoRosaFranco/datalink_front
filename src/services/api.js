import axios from 'axios';

const API_URL = 'http://localhost:3000/api/v1';

export const fetchData = async (endpoint) => {
  try {
    const response = await axios.get(`${API_URL}/${endpoint}`);
    return response.data;
  } catch (error) {
    throw new Error('Error fetching data:', error);
  }
}