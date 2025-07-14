import axios from 'axios';
import { API_URL, DEV_SERVER } from '../const/api_const';

export const api = axios.create({
  baseURL: API_URL ? API_URL : DEV_SERVER,
});

export const getAllNews = async () => {
  const response = await api.get('/api/newss?populate=Content_img');
  return response.data;
};

export const getNews = async (documentId : string) => {
    const response = await api.get(`/api/newss/${documentId}?populate=Content_img`);
    return response.data
}

export const getHomePage = async () => {
  const res = await api.get('/api/home-page?populate=*');
  const data = res.data?.data;
  return data;
}

