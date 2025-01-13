import axios from 'axios';

const API_BASE_URL = 'https://inventory-backend-9xgv.onrender.com';

export const addItem = (item) => axios.post(`${API_BASE_URL}/add_item`, item);

export const getItems = () => axios.get(`${API_BASE_URL}/items`);

export const updateItem = (id, updatedItem) =>
    axios.put(`${API_BASE_URL}/update_item${id}`, updatedItem);

export const deleteItem = (id) => axios.delete(`${API_BASE_URL}/delete_item/${id}`);

export const searchItem = (query) =>
    axios.get(`${API_BASE_URL}/search_item`, { params: { query } });