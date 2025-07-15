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

export const postVisit = async (visitData: {
  Full_name: string;
  Graduate_year: number;
  Date: string;
  Time: string;
}) => {
  const response = await api.post('/api/visits', visitData);
  return response.data;
}

export const postMemory = async (memoryData: {
  Full_name: string;
  Graduate_year: number;
  Section: string;
  Story: string;
  Photo?: File | null;
}) => {
  const formData = new FormData();
  formData.append('Full_name', memoryData.Full_name);
  formData.append('Graduate_year', String(memoryData.Graduate_year));
  formData.append('Section', memoryData.Section);
  formData.append('Story', memoryData.Story);
  if (memoryData.Photo) {
    formData.append('Photo', memoryData.Photo);
  }
  const response = await api.post('/api/memories', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};

