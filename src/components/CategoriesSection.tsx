import { ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { CategoryData } from '../types/navigation';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { GlassCard } from './ui/glass-card';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface CategoriesSectionProps {
  categories: CategoryData[];
  onCategoryClick: (categoryId: string) => void;
  onSeeAllClick: () => void;
}

export function CategoriesSection({ categories, onCategoryClick, onSeeAllClick }: CategoriesSectionProps) {
  const featuredCategories = categories.filter(cat => cat.featured).slice(0, 4);

  return (
    <section className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold mb-2">Shop by Category</h2>
          <p className="text-muted-foreground">
            Discover products across our diverse range of categories
          </p>
        </div>
        <Button 
          variant="outline" 
          onClick={onSeeAllClick}
          className="hidden md:flex items-center gap-2"
        >
          View All Categories
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {featuredCategories.map((category, index) => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            onClick={() => onCategoryClick(category.id)}
            className="cursor-pointer"
          >
            <GlassCard className="overflow-hidden group hover:shadow-2xl transition-all duration-500">
              <div className="relative h-48 overflow-hidden">
                <ImageWithFallback
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                
                {/* Product count badge */}
                <Badge className="absolute top-3 right-3 bg-white/20 text-white backdrop-blur-sm">
                  {category.productCount.toLocaleString()} items
                </Badge>

                {/* Category info overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <h3 className="text-xl font-semibold mb-1">{category.name}</h3>
                  <p className="text-sm text-gray-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {category.description}
                  </p>
                </div>
              </div>

              <div className="p-4">
                <Button 
                  className="w-full group-hover:bg-gradient-to-r group-hover:from-blue-500 group-hover:to-purple-600 transition-all duration-300"
                  onClick={(e) => {
                    e.stopPropagation();
                    onCategoryClick(category.id);
                  }}
                >
                  Shop {category.name}
                  <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>

      {/* See All Button for Mobile */}
      <div className="md:hidden flex justify-center">
        <Button 
          variant="outline" 
          onClick={onSeeAllClick}
          className="flex items-center gap-2"
        >
          View All Categories
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </section>
  );
}