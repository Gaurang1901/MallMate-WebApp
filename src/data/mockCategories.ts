import { CategoryData, HeroBanner, KPICard } from '../types/navigation';

export const herobanners: HeroBanner[] = [
  {
    id: '1',
    title: 'Latest Electronics & Gadgets',
    subtitle: 'Discover cutting-edge technology with up to 50% off on premium electronics',
    image: 'https://images.unsplash.com/photo-1582018960590-f3bc3ea25c04?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBlbGVjdHJvbmljcyUyMGJhbm5lcnxlbnwxfHx8fDE3NTczNTIwNTh8MA&ixlib=rb-4.1.0&q=80&w=1080',
    cta: 'Shop Electronics',
    link: 'electronics'
  },
  {
    id: '2',
    title: 'Fashion & Style Collection',
    subtitle: 'Elevate your wardrobe with our curated fashion collection this season',
    image: 'https://images.unsplash.com/photo-1464854860390-e95991b46441?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwc2hvcHBpbmclMjBiYW5uZXJ8ZW58MXx8fHwxNzU3Mjk3Mzg2fDA&ixlib=rb-4.1.0&q=80&w=1080',
    cta: 'Shop Fashion',
    link: 'fashion'
  },
  {
    id: '3',
    title: 'Luxury Home Collection',
    subtitle: 'Transform your space with premium home decor and furniture pieces',
    image: 'https://images.unsplash.com/photo-1740664651822-3a02ec12c121?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBsaWZlc3R5bGUlMjBiYW5uZXJ8ZW58MXx8fHwxNzU3MzUyMDY0fDA&ixlib=rb-4.1.0&q=80&w=1080',
    cta: 'Shop Home',
    link: 'home'
  }
];

export const kpiCards: KPICard[] = [
  {
    id: '1',
    title: 'Total Products',
    value: '10,000+',
    description: 'Premium products across all categories',
    icon: 'package',
    trend: { value: 12, isPositive: true }
  },
  {
    id: '2',
    title: 'Happy Customers',
    value: '50,000+',
    description: 'Satisfied customers worldwide',
    icon: 'users',
    trend: { value: 8, isPositive: true }
  },
  {
    id: '3',
    title: 'Free Shipping',
    value: 'Worldwide',
    description: 'On orders above $50',
    icon: 'truck',
  },
  {
    id: '4',
    title: 'Customer Rating',
    value: '4.9/5',
    description: 'Based on 25,000+ reviews',
    icon: 'star',
    trend: { value: 2, isPositive: true }
  },
  {
    id: '5',
    title: 'Categories',
    value: '20+',
    description: 'Diverse product categories',
    icon: 'grid',
  }
];

export const categories: CategoryData[] = [
  {
    id: 'electronics',
    name: 'Electronics',
    description: 'Latest gadgets, smartphones, laptops, and tech accessories',
    image: 'https://images.unsplash.com/photo-1582018960590-f3bc3ea25c04?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBlbGVjdHJvbmljcyUyMGJhbm5lcnxlbnwxfHx8fDE3NTczNTIwNTh8MA&ixlib=rb-4.1.0&q=80&w=400',
    productCount: 2500,
    featured: true
  },
  {
    id: 'fashion',
    name: 'Fashion',
    description: 'Trendy clothing, shoes, accessories for men and women',
    image: 'https://images.unsplash.com/photo-1665703156759-8b8f66ff0397?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwY2xvdGhpbmclMjBhY2Nlc3Nvcmllc3xlbnwxfHx8fDE3NTczNDIwODB8MA&ixlib=rb-4.1.0&q=80&w=400',
    productCount: 3200,
    featured: true
  },
  {
    id: 'home',
    name: 'Home & Living',
    description: 'Furniture, decor, kitchen essentials, and home appliances',
    image: 'https://images.unsplash.com/photo-1634824506573-4a430d1d6111?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob21lJTIwZGVjb3IlMjBmdXJuaXR1cmV8ZW58MXx8fHwxNzU3MzQ5NDE0fDA&ixlib=rb-4.1.0&q=80&w=400',
    productCount: 1800,
    featured: true
  },
  {
    id: 'sports',
    name: 'Sports & Fitness',
    description: 'Workout gear, sports equipment, and fitness accessories',
    image: 'https://images.unsplash.com/photo-1710814824560-943273e8577e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcG9ydHMlMjBmaXRuZXNzJTIwZXF1aXBtZW50fGVufDF8fHx8MTc1NzI3MDc3N3ww&ixlib=rb-4.1.0&q=80&w=400',
    productCount: 1200,
    featured: true
  },
  {
    id: 'beauty',
    name: 'Beauty & Care',
    description: 'Skincare, makeup, fragrances, and personal care products',
    image: 'https://images.unsplash.com/photo-1556228578-dd672d3a6b8c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWF1dHklMjBjYXJlJTIwcHJvZHVjdHN8ZW58MXx8fHwxNzU3MzUyMTEwfDA&ixlib=rb-4.1.0&q=80&w=400',
    productCount: 950,
    featured: false
  },
  {
    id: 'automotive',
    name: 'Automotive',
    description: 'Car accessories, tools, and automotive maintenance products',
    image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhdXRvbW90aXZlJTIwYWNjZXNzb3JpZXN8ZW58MXx8fHwxNzU3MzUyMTE2fDA&ixlib=rb-4.1.0&q=80&w=400',
    productCount: 750,
    featured: false
  }
];