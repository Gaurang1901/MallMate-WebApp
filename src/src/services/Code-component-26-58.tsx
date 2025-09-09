// Base API configuration and utilities
export const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://api.mallmate.com';

export interface APIResponse<T> {
  data: T;
  message?: string;
  status: number;
}

export interface APIError {
  message: string;
  status: number;
  code?: string;
}

// Simulated network delay for realistic API behavior
export const simulateNetworkDelay = (min = 300, max = 1500): Promise<void> => {
  const delay = Math.random() * (max - min) + min;
  return new Promise(resolve => setTimeout(resolve, delay));
};

// Mock API error generator
export const createMockError = (message: string, status = 400): APIError => ({
  message,
  status,
  code: `ERROR_${status}`,
});

// Generic API request simulator
export const mockAPIRequest = async <T>(
  data: T,
  shouldFail = false,
  errorMessage = 'Request failed'
): Promise<T> => {
  await simulateNetworkDelay();
  
  if (shouldFail) {
    throw createMockError(errorMessage);
  }
  
  return data;
};

// Request headers
export const getAuthHeaders = (): Record<string, string> => {
  const token = localStorage.getItem('auth_token');
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

// Local storage utilities
export const getStoredData = <T>(key: string, defaultValue: T): T => {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : defaultValue;
  } catch {
    return defaultValue;
  }
};

export const storeData = <T>(key: string, data: T): void => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error('Failed to store data:', error);
  }
};

// Generate unique IDs
export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};