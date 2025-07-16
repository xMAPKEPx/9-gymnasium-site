import axios from 'axios';
import { API_URL, DEV_SERVER } from '../const/api_const';
import type { SchoolYear } from '../types/people';

export const api = axios.create({
  baseURL: API_URL ? API_URL : DEV_SERVER,
});

export const getAllNews = async () => {
  const response = await api.get('/api/newss?populate=Content_img');
  return response.data?.data;
};

export const getNews = async (documentId : string) => {
    const response = await api.get(`/api/newss/${documentId}?populate=Content_img`);
    return response.data?.data
}

export const getHomePage = async () => {
  // Строим populate для всех вложенных медиа
  const params = new URLSearchParams({
    'populate[Partners][populate]': 'Logo',
    'populate[Gifts][populate]': 'Photo',
    'populate[Resources][populate]': '*',
    'populate[Contacts][populate]': 'Logo',
  });
  const res = await api.get(`/api/home-page?${params.toString()}`);
  return res.data?.data;
};

export const getTimelines = async () => {
  const res = await api.get(
    '/api/timelines?populate[Events][populate]=*'
  );
  
  return res.data?.data;
};

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

// Получить список всех десятилетий (1930-2030)
export const getDecades = () => {
  const currentYear = new Date().getFullYear();
  const start = 1930;
  const end = Math.ceil(currentYear / 10) * 10;
  const decades = [];
  for (let year = start; year <= end; year += 10) {
    decades.push(year);
  }
  return decades;
};

// Получить года по десятилетию
export const getYearsByDecade = async (decade: number | string) => {
  const response = await api.get('/api/years');
  const years = response.data?.data || [];
  const d = Number(decade);
  return years.filter((y: { Year: number }) => Number(y.Year) >= d && Number(y.Year) < d + 10);
};

// Получить данные по году (и классам) по documentId
export const getYearById = async (documentId: string): Promise<SchoolYear | null> => {
  const response = await api.get(
    `/api/years/${documentId}?populate[Classes][populate][0]=Class_photo&populate[Classes][populate][1]=Class_persons.Photo`
  );
  return response.data?.data as SchoolYear;
};

