export type PageType = 'home' | 'products' | 'category' | 'product-detail' | 'orders' | 'order-detail' | 'wishlist' | 'profile' | 'categories' | 'about' | 'contact' | 'faq' | 'terms' | 'privacy';

export interface NavigationState {
  currentPage: PageType;
  selectedCategory?: string;
  selectedProductId?: string;
}

export interface CategoryData {
  id: string;
  name: string;
  description: string;
  image: string;
  productCount: number;
  featured: boolean;
}

export interface HeroBanner {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  cta: string;
  link: string;
}

export interface KPICard {
  id: string;
  title: string;
  value: string;
  description: string;
  icon: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}