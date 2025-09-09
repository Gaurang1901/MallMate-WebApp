import { useState } from 'react';
import { Grid, List, Filter } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Product, ViewMode, FilterState } from '../types';
import { categories } from '../data/mockProducts';
import { ProductCard } from './ProductCard';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { GlassCard } from './ui/glass-card';
import { Slider } from './ui/slider';
import { Switch } from './ui/switch';
import { Label } from './ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from './ui/collapsible';

interface ProductGridProps {
  products: Product[];
  onProductClick: (product: Product) => void;
  searchQuery: string;
}

export function ProductGrid({ products, onProductClick, searchQuery }: ProductGridProps) {
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    category: 'All',
    priceRange: [0, 1000],
    rating: 0,
    inStock: false,
  });

  // Filter products based on search query and filters
  const filteredProducts = products.filter((product) => {
    const matchesSearch = !searchQuery || 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory = filters.category === 'All' || product.category === filters.category;
    const matchesPrice = product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1];
    const matchesRating = product.rating >= filters.rating;
    const matchesStock = !filters.inStock || product.inStock;

    return matchesSearch && matchesCategory && matchesPrice && matchesRating && matchesStock;
  });

  const gridCols = viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1';

  return (
    <div className="space-y-6">
      {/* Toolbar */}
      <GlassCard className="p-4">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <h2 className="font-semibold">
              {searchQuery ? `Search results for "${searchQuery}"` : 'All Products'}
            </h2>
            <Badge variant="secondary">
              {filteredProducts.length} products
            </Badge>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
            >
              <Filter className="h-4 w-4" />
            </Button>

            <div className="flex border rounded-md p-1">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
                className="px-2"
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
                className="px-2"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Filters */}
        <Collapsible open={isFilterOpen} onOpenChange={setIsFilterOpen}>
          <CollapsibleContent>
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="border-t border-white/20 pt-4 mt-4"
            >
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* Category Filter */}
                <div className="space-y-2">
                  <Label>Category</Label>
                  <Select
                    value={filters.category}
                    onValueChange={(value) => setFilters(prev => ({ ...prev, category: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Price Range Filter */}
                <div className="space-y-2">
                  <Label>Price Range: ${filters.priceRange[0]} - ${filters.priceRange[1]}</Label>
                  <Slider
                    value={filters.priceRange}
                    onValueChange={(value) => setFilters(prev => ({ ...prev, priceRange: value as [number, number] }))}
                    max={1000}
                    min={0}
                    step={10}
                    className="mt-2"
                  />
                </div>

                {/* Rating Filter */}
                <div className="space-y-2">
                  <Label>Minimum Rating: {filters.rating} stars</Label>
                  <Slider
                    value={[filters.rating]}
                    onValueChange={(value) => setFilters(prev => ({ ...prev, rating: value[0] }))}
                    max={5}
                    min={0}
                    step={0.5}
                    className="mt-2"
                  />
                </div>

                {/* Stock Filter */}
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="in-stock"
                      checked={filters.inStock}
                      onCheckedChange={(checked) => setFilters(prev => ({ ...prev, inStock: checked }))}
                    />
                    <Label htmlFor="in-stock">In Stock Only</Label>
                  </div>
                </div>
              </div>

              {/* Clear Filters */}
              <div className="flex justify-end mt-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setFilters({
                    category: 'All',
                    priceRange: [0, 1000],
                    rating: 0,
                    inStock: false,
                  })}
                >
                  Clear Filters
                </Button>
              </div>
            </motion.div>
          </CollapsibleContent>
        </Collapsible>
      </GlassCard>

      {/* Products Grid */}
      <AnimatePresence mode="wait">
        {filteredProducts.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center py-12"
          >
            <GlassCard className="p-8">
              <p className="text-muted-foreground">
                No products found. Try adjusting your search or filters.
              </p>
            </GlassCard>
          </motion.div>
        ) : (
          <motion.div
            key={viewMode}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`grid ${gridCols} gap-6`}
          >
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onClick={() => onProductClick(product)}
                layoutId={`product-${product.id}`}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}