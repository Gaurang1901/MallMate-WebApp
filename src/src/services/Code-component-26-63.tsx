import { User } from '../types';
import { mockAPIRequest, getStoredData, storeData, generateId } from './api';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

// Mock users database
const MOCK_USERS_KEY = 'mock_users';
const AUTH_TOKEN_KEY = 'auth_token';
const CURRENT_USER_KEY = 'current_user';

const getUsers = (): User[] => getStoredData(MOCK_USERS_KEY, []);
const storeUsers = (users: User[]) => storeData(MOCK_USERS_KEY, users);

const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b120?w=150&h=150&fit=crop&crop=face',
  },
];

// Initialize mock users if not exists
if (getUsers().length === 0) {
  storeUsers(mockUsers);
}

export const authAPI = {
  async login(credentials: LoginCredentials): Promise<User> {
    const users = getUsers();
    const user = users.find(u => u.email === credentials.email);
    
    if (!user) {
      return mockAPIRequest(null as any, true, 'User not found');
    }
    
    // Mock password validation (in real app, this would be handled by backend)
    if (credentials.password.length < 6) {
      return mockAPIRequest(null as any, true, 'Invalid password');
    }
    
    const token = generateId();
    storeData(AUTH_TOKEN_KEY, token);
    storeData(CURRENT_USER_KEY, user);
    
    return mockAPIRequest(user);
  },

  async register(userData: RegisterData): Promise<User> {
    const users = getUsers();
    const existingUser = users.find(u => u.email === userData.email);
    
    if (existingUser) {
      return mockAPIRequest(null as any, true, 'User already exists');
    }
    
    const newUser: User = {
      id: generateId(),
      name: userData.name,
      email: userData.email,
      avatar: `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face`,
    };
    
    users.push(newUser);
    storeUsers(users);
    
    const token = generateId();
    storeData(AUTH_TOKEN_KEY, token);
    storeData(CURRENT_USER_KEY, newUser);
    
    return mockAPIRequest(newUser);
  },

  async logout(): Promise<void> {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    localStorage.removeItem(CURRENT_USER_KEY);
    return mockAPIRequest(undefined);
  },

  async checkAuthStatus(): Promise<User | null> {
    const token = localStorage.getItem(AUTH_TOKEN_KEY);
    const currentUser = getStoredData<User | null>(CURRENT_USER_KEY, null);
    
    if (!token || !currentUser) {
      return mockAPIRequest(null);
    }
    
    return mockAPIRequest(currentUser);
  },

  async forgotPassword(email: string): Promise<void> {
    const users = getUsers();
    const user = users.find(u => u.email === email);
    
    if (!user) {
      return mockAPIRequest(null as any, true, 'User not found');
    }
    
    // Simulate sending reset email
    return mockAPIRequest(undefined);
  },

  async resetPassword(token: string, newPassword: string): Promise<void> {
    // Simulate password reset
    if (newPassword.length < 6) {
      return mockAPIRequest(null as any, true, 'Password must be at least 6 characters');
    }
    
    return mockAPIRequest(undefined);
  },
};