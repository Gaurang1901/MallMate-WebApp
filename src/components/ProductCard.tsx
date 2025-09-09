import { Star, ShoppingCart, Heart } from 'lucide-react';
import { motion } from 'motion/react';
import { Product } from '../types';
import { useCart } from '../contexts/CartContext';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { GlassCard } from './ui/glass-card';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ProductCardProps {
  product: Product;
  onClick: () => void;
  layoutId?: string;
}

export function ProductCard({ product, onClick, layoutId }: ProductCardProps) {
  const { addItem, getItemQuantity } = useCart();
  const quantity = getItemQuantity(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem(product);
  };

  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <motion.div
      layoutId={layoutId}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className="cursor-pointer"
      onClick={onClick}
    >
      <GlassCard className="overflow-hidden group hover:shadow-xl transition-all duration-300">
        <div className="relative">
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            className="aspect-square overflow-hidden"
          >
            <ImageWithFallback
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </motion.div>
          
          {/* Overlay badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {!product.inStock && (
              <Badge variant="destructive" className="text-xs">
                Out of Stock
              </Badge>
            )}
            {discountPercentage > 0 && (
              <Badge className="bg-green-500 text-white text-xs">
                -{discountPercentage}%
              </Badge>
            )}
          </div>

          {/* Wishlist button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="absolute top-2 right-2 p-2 rounded-full bg-white/20 dark:bg-black/20 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <Heart className="h-4 w-4" />
          </motion.button>
        </div>

        <div className="p-4">
          <div className="flex items-start justify-between mb-2">
            <h3 className="font-medium text-sm line-clamp-2 flex-1 mr-2">
              {product.name}
            </h3>
            <div className="flex items-center text-xs text-muted-foreground">
              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-1" />
              <span>{product.rating}</span>
              <span className="ml-1">({product.reviewCount})</span>
            </div>
          </div>

          <p className="text-xs text-muted-foreground line-clamp-2 mb-3">
            {product.description}
          </p>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-semibold">${product.price}</span>
              {product.originalPrice && (
                <span className="text-sm text-muted-foreground line-through">
                  ${product.originalPrice}
                </span>
              )}
            </div>

            <Button
              size="sm"
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className="shrink-0 h-8 px-3"
            >
              <ShoppingCart className="h-3 w-3 mr-1" />
              {quantity > 0 ? quantity : 'Add'}
            </Button>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1 mt-3">
            {product.tags.slice(0, 2).map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
}