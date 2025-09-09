import { useState } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { Product } from '../types';
import { ProductCard } from './ProductCard';
import { Button } from './ui/button';

interface ProductCarouselProps {
  title: string;
  subtitle?: string;
  products: Product[];
  onProductClick: (product: Product) => void;
  onSeeAllClick?: () => void;
}

export function ProductCarousel({ 
  title, 
  subtitle, 
  products, 
  onProductClick, 
  onSeeAllClick 
}: ProductCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerView = 4;
  const maxIndex = Math.max(0, products.length - itemsPerView);

  const goToPrevious = () => {
    setCurrentIndex(Math.max(0, currentIndex - 1));
  };

  const goToNext = () => {
    setCurrentIndex(Math.min(maxIndex, currentIndex + 1));
  };

  const canGoPrevious = currentIndex > 0;
  const canGoNext = currentIndex < maxIndex;

  return (
    <section className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold mb-2">{title}</h2>
          {subtitle && (
            <p className="text-muted-foreground">{subtitle}</p>
          )}
        </div>
        
        <div className="flex items-center gap-2">
          {onSeeAllClick && (
            <Button 
              variant="outline" 
              onClick={onSeeAllClick}
              className="hidden md:flex items-center gap-2"
            >
              View All
              <ArrowRight className="h-4 w-4" />
            </Button>
          )}
          
          {/* Navigation buttons */}
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={goToPrevious}
              disabled={!canGoPrevious}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={goToNext}
              disabled={!canGoNext}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Carousel */}
      <div className="relative overflow-hidden">
        <motion.div
          className="flex gap-6"
          animate={{
            x: -currentIndex * (100 / itemsPerView) + '%'
          }}
          transition={{ 
            type: 'spring', 
            damping: 30, 
            stiffness: 300 
          }}
          style={{
            width: `${(products.length / itemsPerView) * 100}%`
          }}
        >
          {products.map((product, index) => (
            <div
              key={product.id}
              className="flex-shrink-0"
              style={{ width: `${100 / products.length}%` }}
            >
              <ProductCard
                product={product}
                onClick={() => onProductClick(product)}
                layoutId={`carousel-${title}-${product.id}`}
              />
            </div>
          ))}
        </motion.div>
      </div>

      {/* Mobile View All Button */}
      {onSeeAllClick && (
        <div className="md:hidden flex justify-center">
          <Button 
            variant="outline" 
            onClick={onSeeAllClick}
            className="flex items-center gap-2"
          >
            View All
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      )}

      {/* Indicators */}
      <div className="flex justify-center space-x-2">
        {Array.from({ length: maxIndex + 1 }).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? 'bg-primary scale-125' 
                : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
            }`}
          />
        ))}
      </div>
    </section>
  );
}