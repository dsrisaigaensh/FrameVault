import axios from 'axios';

const API_BASE_URL = 'http://localhost:4000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const loginUser = async (email, password) => {
  const response = await api.get(`/users?email=${email}&password=${password}`);
  return response.data[0];
};

export const getAlbums = async (userId) => {
  const response = await api.get(`/albums?userId=${userId}`);
  return response.data;
};

export const getAlbumById = async (id) => {
  const response = await api.get(`/albums/${id}`);
  return response.data;
};

export const createAlbum = async (albumData) => {
  const response = await api.post('/albums', albumData);
  return response.data;
};

export const deleteAlbum = async (id) => {
  const response = await api.delete(`/albums/${id}`);
  return response.data;
};

export const getPhotosByAlbum = async (albumId) => {
  const response = await api.get(`/photos?albumId=${albumId}`);
  return response.data;
};

export const createPhoto = async (photoData) => {
  const response = await api.post('/photos', photoData);
  return response.data;
};

export const deletePhoto = async (id) => {
  const response = await api.delete(`/photos/${id}`);
  return response.data;
};

export const createShare = async (shareData) => {
  const response = await api.post('/shares', shareData);
  return response.data;
};

export const getShareByToken = async (token) => {
  const response = await api.get(`/shares?token=${token}`);
  return response.data[0];
};

export default api;
