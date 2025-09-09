import { useState } from 'react';
import { motion } from 'motion/react';
import { Heart, ShoppingCart, Trash2 } from 'lucide-react';
import { GlassCard } from './ui/glass-card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useCart } from '../contexts/CartContext';
import { Product } from '../types';

// Mock wishlist items (in a real app, this would come from context/API)
const mockWishlistItems: Product[] = [
  {
    id: '1',
    name: 'iPhone 14 Pro',
    description: 'The latest iPhone with pro camera system',
    price: 999,
    originalPrice: 1099,
    image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab',
    rating: 4.8,
    reviews: 1234,
    category: 'Electronics',
    inStock: true,
    featured: true
  },
  {
    id: '2',
    name: 'Nike Air Max 270',
    description: 'Comfortable running shoes with air cushioning',
    price: 129,
    originalPrice: 150,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff',
    rating: 4.6,
    reviews: 856,
    category: 'Footwear',
    inStock: true,
    featured: false
  },
  {
    id: '3',
    name: 'MacBook Pro 16"',
    description: 'Powerful laptop for professional work',
    price: 2399,
    originalPrice: 2499,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8',
    rating: 4.9,
    reviews: 567,
    category: 'Electronics',
    inStock: false,
    featured: true
  }
];

interface WishlistPageProps {
  onProductClick: (product: Product) => void;
}

export function WishlistPage({ onProductClick }: WishlistPageProps) {
  const [wishlistItems, setWishlistItems] = useState<Product[]>(mockWishlistItems);
  const { addItem } = useCart();

  const removeFromWishlist = (productId: string) => {
    setWishlistItems(items => items.filter(item => item.id !== productId));
  };

  const addToCart = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    addItem(product);
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <Heart className="h-16 w-16 mx-auto text-primary" />
        <h1 className="text-3xl font-bold">My Wishlist</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Keep track of products you love. Save items for later and never miss out on your favorites.
        </p>
      </motion.div>

      {wishlistItems.length > 0 ? (
        <>
          <div className="flex items-center justify-between">
            <p className="text-muted-foreground">
              {wishlistItems.length} item{wishlistItems.length !== 1 ? 's' : ''} in your wishlist
            </p>
            <Button variant="outline" size="sm">
              Share Wishlist
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishlistItems.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group cursor-pointer"
                onClick={() => onProductClick(product)}
              >
                <GlassCard className="overflow-hidden hover:shadow-lg transition-all duration-300">
                  <div className="relative">
                    <div className="aspect-square overflow-hidden">
                      <ImageWithFallback
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    
                    {!product.inStock && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <Badge variant="secondary" className="bg-red-500 text-white">
                          Out of Stock
                        </Badge>
                      </div>
                    )}

                    <Button
                      variant="outline"
                      size="icon"
                      className="absolute top-2 right-2 h-8 w-8 bg-white/90 hover:bg-white dark:bg-black/90 dark:hover:bg-black"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeFromWishlist(product.id);
                      }}
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>

                    {product.originalPrice && product.originalPrice > product.price && (
                      <Badge className="absolute top-2 left-2 bg-red-500 text-white">
                        {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                      </Badge>
                    )}
                  </div>

                  <div className="p-4 space-y-3">
                    <div>
                      <h3 className="font-semibold truncate">{product.name}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {product.description}
                      </p>
                    </div>

                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-lg">${product.price}</span>
                      {product.originalPrice && product.originalPrice > product.price && (
                        <span className="text-sm text-muted-foreground line-through">
                          ${product.originalPrice}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <span className="text-yellow-500">★</span>
                        <span>{product.rating}</span>
                        <span>({product.reviews})</span>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {product.category}
                      </Badge>
                    </div>

                    <Button
                      className="w-full"
                      disabled={!product.inStock}
                      onClick={(e) => addToCart(product, e)}
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                    </Button>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-12"
        >
          <GlassCard className="p-8 max-w-md mx-auto">
            <Heart className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">Your Wishlist is Empty</h3>
            <p className="text-muted-foreground mb-4">
              Start adding products to your wishlist by clicking the heart icon on any product!
            </p>
            <Button>Browse Products</Button>
          </GlassCard>
        </motion.div>
      )}
    </div>
  );
}