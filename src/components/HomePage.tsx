import { motion } from 'motion/react';
import { Product } from '../types';
import { herobanners, kpiCards, categories } from '../data/mockCategories';
import { HeroBanner } from './HeroBanner';
import { KPICards } from './KPICards';
import { CategoriesSection } from './CategoriesSection';
import { ProductCarousel } from './ProductCarousel';

interface HomePageProps {
  products: Product[];
  onProductClick: (product: Product) => void;
  onCategoryClick: (categoryId: string) => void;
  onNavigate: (page: string) => void;
}

export function HomePage({ 
  products, 
  onProductClick, 
  onCategoryClick, 
  onNavigate 
}: HomePageProps) {
  // Get featured products (products with originalPrice indicating they're on sale)
  const featuredProducts = products.filter(p => p.originalPrice).slice(0, 6);
  
  // Get new arrivals (latest products, simulated by taking products in reverse order)
  const newArrivals = [...products].reverse().slice(0, 6);

  return (
    <div className="space-y-16">
      {/* Hero Banner */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <HeroBanner 
          banners={herobanners} 
          onCategoryClick={onCategoryClick}
        />
      </motion.section>

      {/* KPI Cards */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <KPICards cards={kpiCards} />
      </motion.section>

      {/* Categories Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <CategoriesSection
          categories={categories}
          onCategoryClick={onCategoryClick}
          onSeeAllClick={() => onNavigate('categories')}
        />
      </motion.section>

      {/* Featured Products */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <ProductCarousel
          title="Featured Products"
          subtitle="Hand-picked deals and special offers just for you"
          products={featuredProducts}
          onProductClick={onProductClick}
          onSeeAllClick={() => onNavigate('products')}
        />
      </motion.section>

      {/* New Arrivals */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <ProductCarousel
          title="New Arrivals"
          subtitle="Latest products fresh from our suppliers"
          products={newArrivals}
          onProductClick={onProductClick}
          onSeeAllClick={() => onNavigate('products')}
        />
      </motion.section>
    </div>
  );
}