export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  tags: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

export interface CartState {
  items: CartItem[];
  total: number;
  itemCount: number;
}

export type Theme = 'light' | 'dark';

export type ViewMode = 'grid' | 'list';

export interface FilterState {
  category: string;
  priceRange: [number, number];
  rating: number;
  inStock: boolean;
}