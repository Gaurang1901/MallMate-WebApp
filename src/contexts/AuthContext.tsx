import React, { createContext, useContext, useState } from 'react';
import { User, AuthState } from '../types';
import { mockUser } from '../data/mockProducts';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (name: string, email: string, password: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
  });

  const login = async (email: string, password: string): Promise<boolean> => {
    // Mock login - in real app this would call an API
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
    
    if (email === mockUser.email && password === 'password') {
      setAuthState({
        user: mockUser,
        isAuthenticated: true,
      });
      return true;
    }
    return false;
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    // Mock registration - in real app this would call an API
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
    
    const newUser: User = {
      id: Date.now().toString(),
      name,
      email,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80'
    };
    
    setAuthState({
      user: newUser,
      isAuthenticated: true,
    });
    return true;
  };

  const logout = () => {
    setAuthState({
      user: null,
      isAuthenticated: false,
    });
  };

  return (
    <AuthContext.Provider value={{
      ...authState,
      login,
      logout,
      register,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}