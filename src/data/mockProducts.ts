import { Product } from '../types';

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Premium Wireless Headphones',
    description: 'High-quality wireless headphones with noise cancellation and premium sound quality. Perfect for music lovers and professionals.',
    price: 299.99,
    originalPrice: 399.99,
    image: 'https://images.unsplash.com/photo-1738520420654-87cd2ad005d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBlbGVjdHJvbmljcyUyMGdhZGdldHMlMjB0ZWNobm9sb2d5fGVufDF8fHx8MTc1NzM1MDEzNHww&ixlib=rb-4.1.0&q=80&w=400',
    category: 'Electronics',
    rating: 4.8,
    reviewCount: 1250,
    inStock: true,
    tags: ['wireless', 'noise-cancelling', 'premium']
  },
  {
    id: '2',
    name: 'Smart Fitness Watch',
    description: 'Advanced fitness tracker with heart rate monitoring, GPS, and smartphone connectivity.',
    price: 249.99,
    image: 'https://images.unsplash.com/photo-1738520420654-87cd2ad005d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBlbGVjdHJvbmljcyUyMGdhZGdldHMlMjB0ZWNobm9sb2d5fGVufDF8fHx8MTc1NzM1MDEzNHww&ixlib=rb-4.1.0&q=80&w=400',
    category: 'Electronics',
    rating: 4.6,
    reviewCount: 890,
    inStock: true,
    tags: ['fitness', 'smartwatch', 'health']
  },
  {
    id: '3',
    name: 'Designer Handbag',
    description: 'Luxury handbag crafted from premium leather with elegant design and spacious interior.',
    price: 399.99,
    originalPrice: 599.99,
    image: 'https://images.unsplash.com/photo-1665703156759-8b8f66ff0397?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwY2xvdGhpbmclMjBhY2Nlc3Nvcmllc3xlbnwxfHx8fDE3NTczNDIwODB8MA&ixlib=rb-4.1.0&q=80&w=400',
    category: 'Fashion',
    rating: 4.9,
    reviewCount: 456,
    inStock: true,
    tags: ['luxury', 'leather', 'designer']
  },
  {
    id: '4',
    name: 'Casual Sneakers',
    description: 'Comfortable and stylish sneakers perfect for everyday wear. Made with sustainable materials.',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1665703156759-8b8f66ff0397?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwY2xvdGhpbmclMjBhY2Nlc3Nvcmllc3xlbnwxfHx8fDE3NTczNDIwODB8MA&ixlib=rb-4.1.0&q=80&w=400',
    category: 'Fashion',
    rating: 4.4,
    reviewCount: 678,
    inStock: true,
    tags: ['sneakers', 'casual', 'sustainable']
  },
  {
    id: '5',
    name: 'Modern Floor Lamp',
    description: 'Contemporary floor lamp with adjustable brightness and sleek design. Perfect for modern homes.',
    price: 159.99,
    image: 'https://images.unsplash.com/photo-1634824506573-4a430d1d6111?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob21lJTIwZGVjb3IlMjBmdXJuaXR1cmV8ZW58MXx8fHwxNzU3MzQ5NDE0fDA&ixlib=rb-4.1.0&q=80&w=400',
    category: 'Home',
    rating: 4.5,
    reviewCount: 234,
    inStock: true,
    tags: ['lighting', 'modern', 'adjustable']
  },
  {
    id: '6',
    name: 'Yoga Mat Set',
    description: 'Premium yoga mat with carrying case and alignment guides. Non-slip surface for all yoga practices.',
    price: 49.99,
    originalPrice: 79.99,
    image: 'https://images.unsplash.com/photo-1710814824560-943273e8577e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcG9ydHMlMjBmaXRuZXNzJTIwZXF1aXBtZW50fGVufDF8fHx8MTc1NzI3MDc3N3ww&ixlib=rb-4.1.0&q=80&w=400',
    category: 'Sports',
    rating: 4.7,
    reviewCount: 543,
    inStock: true,
    tags: ['yoga', 'fitness', 'non-slip']
  },
  {
    id: '7',
    name: 'Portable Bluetooth Speaker',
    description: 'Compact wireless speaker with powerful sound and long battery life. Water-resistant design.',
    price: 79.99,
    image: 'https://images.unsplash.com/photo-1738520420654-87cd2ad005d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBlbGVjdHJvbmljcyUyMGdhZGdldHMlMjB0ZWNobm9sb2d5fGVufDF8fHx8MTc1NzM1MDEzNHww&ixlib=rb-4.1.0&q=80&w=400',
    category: 'Electronics',
    rating: 4.3,
    reviewCount: 789,
    inStock: false,
    tags: ['bluetooth', 'portable', 'water-resistant']
  },
  {
    id: '8',
    name: 'Decorative Throw Pillow',
    description: 'Soft and comfortable throw pillow with unique pattern. Perfect accent for your living space.',
    price: 24.99,
    image: 'https://images.unsplash.com/photo-1634824506573-4a430d1d6111?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob21lJTIwZGVjb3IlMjBmdXJuaXR1cmV8ZW58MXx8fHwxNzU3MzQ5NDE0fDA&ixlib=rb-4.1.0&q=80&w=400',
    category: 'Home',
    rating: 4.2,
    reviewCount: 156,
    inStock: true,
    tags: ['decorative', 'comfort', 'pattern']
  }
];

export const categories = ['All', 'Electronics', 'Fashion', 'Home', 'Sports'];

export const mockUser = {
  id: '1',
  name: 'John Doe',
  email: 'john.doe@example.com',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80'
};