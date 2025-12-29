import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// --- Customer Auth APIs ---

export const customerLogin = async (data: any) => {
  try {
    const response = await api.post('/auth/customer/login', data);
    return response.data;
  } catch (error: any) {
    throw error.response?.data || error.message;
  }
};

export const customerSignup = async (data: any) => {
  try {
    const response = await api.post('/auth/customer/signup', data);
    return response.data;
  } catch (error: any) {
    throw error.response?.data || error.message;
  }
};

// --- Merchant Auth APIs ---

export const merchantVerifyPhone = async (phone: string) => {
  try {
    const response = await api.post('/auth/merchant/verify-phone', { phone });
    return response.data;
  } catch (error: any) {
    throw error.response?.data || error.message;
  }
};

export const merchantLogin = async (data: any) => {
  try {
    const response = await api.post('/auth/merchant/login', data);
    return response.data;
  } catch (error: any) {
    throw error.response?.data || error.message;
  }
};

export const merchantSignup = async (data: any) => {
  try {
    const response = await api.post('/auth/merchant/signup', data);
    return response.data;
  } catch (error: any) {
    throw error.response?.data || error.message;
  }
};
