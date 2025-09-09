import { motion } from 'motion/react';
import { ArrowRight, Package } from 'lucide-react';
import { CategoryData } from '../types/navigation';
import { categories } from '../data/mockCategories';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { GlassCard } from './ui/glass-card';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface CategoriesPageProps {
  onCategoryClick: (categoryId: string) => void;
}

export function CategoriesPage({ onCategoryClick }: CategoriesPageProps) {
  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <h1 className="text-4xl font-bold">All Categories</h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Explore our complete range of product categories. From electronics to fashion, 
          we have everything you need.
        </p>
      </motion.div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {categories.map((category, index) => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            onClick={() => onCategoryClick(category.id)}
            className="cursor-pointer"
          >
            <GlassCard className="overflow-hidden group hover:shadow-2xl transition-all duration-500 h-full">
              <div className="relative h-64 overflow-hidden">
                <ImageWithFallback
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                
                {/* Featured badge */}
                {category.featured && (
                  <Badge className="absolute top-4 left-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                    Featured
                  </Badge>
                )}

                {/* Product count */}
                <Badge className="absolute top-4 right-4 bg-white/20 text-white backdrop-blur-sm">
                  <Package className="h-3 w-3 mr-1" />
                  {category.productCount.toLocaleString()}
                </Badge>

                {/* Category title overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h2 className="text-2xl font-bold mb-2">{category.name}</h2>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  {category.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="text-sm text-muted-foreground">
                    {category.productCount.toLocaleString()} products available
                  </div>
                  <Button 
                    size="sm"
                    className="group-hover:bg-gradient-to-r group-hover:from-blue-500 group-hover:to-purple-600 transition-all duration-300"
                    onClick={(e) => {
                      e.stopPropagation();
                      onCategoryClick(category.id);
                    }}
                  >
                    Browse
                    <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                  </Button>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>

      {/* Stats Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="mt-16"
      >
        <GlassCard className="p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">Why Shop by Category?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {categories.reduce((sum, cat) => sum + cat.productCount, 0).toLocaleString()}+
              </div>
              <p className="text-muted-foreground">Total Products</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600 mb-2">
                {categories.length}+
              </div>
              <p className="text-muted-foreground">Categories</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600 mb-2">24/7</div>
              <p className="text-muted-foreground">Customer Support</p>
            </div>
          </div>
        </GlassCard>
      </motion.div>
    </div>
  );
}