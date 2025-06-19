import React, { useState } from 'react';
import {
  Box,
  Drawer,
  IconButton,
  Typography,
  Slider,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Button,
  Divider,
  useTheme,
  useMediaQuery,
  Chip,
  Menu,
  MenuItem,
} from '@mui/material';
import {
  X,
  SlidersHorizontal,
  ArrowUpDown,
} from 'lucide-react';

interface FilterOptions {
  priceRange: [number, number];
  categories: string[];
  brands: string[];
  rating: number | null;
  availability: boolean;
}

interface ProductFiltersProps {
  onFilterChange: (filters: FilterOptions) => void;
  onSortChange: (sortBy: string) => void;
  onSearch: (query: string) => void;
}

const ProductFilters: React.FC<ProductFiltersProps> = ({
  onFilterChange,
  onSortChange,
  // onSearch,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // State
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({
    priceRange: [0, 1000],
    categories: [],
    brands: [],
    rating: null,
    availability: false,
  });
  const [sortAnchorEl, setSortAnchorEl] = useState<null | HTMLElement>(null);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  // Mock data - replace with your actual data
  const categories = ['Electronics', 'Clothing', 'Books', 'Home & Kitchen'];
  const brands = ['Apple', 'Samsung', 'Nike', 'Adidas'];
  const sortOptions = [
    { label: 'Price: Low to High', value: 'price_asc' },
    { label: 'Price: High to Low', value: 'price_desc' },
    { label: 'Newest First', value: 'newest' },
    { label: 'Most Popular', value: 'popular' },
    { label: 'Best Rating', value: 'rating' },
  ];

  // Handlers
  const handleFilterChange = (newFilters: Partial<FilterOptions>) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  const handleSortClick = (event: React.MouseEvent<HTMLElement>) => {
    setSortAnchorEl(event.currentTarget);
  };

  const handleSortSelect = (value: string) => {
    onSortChange(value);
    setSortAnchorEl(null);
  };

  const handleFilterToggle = (category: string, value: string) => {
    const currentFilters = filters[category as keyof FilterOptions] as string[];
    const updatedFilters = currentFilters.includes(value)
      ? currentFilters.filter((item) => item !== value)
      : [...currentFilters, value];
    
    handleFilterChange({ [category]: updatedFilters });
  };

  const handlePriceChange = (_event: Event, newValue: number | number[]) => {
    handleFilterChange({ priceRange: newValue as [number, number] });
  };

  const handleClearFilters = () => {
    const clearedFilters: FilterOptions = {
      priceRange: [0, 1000],
      categories: [],
      brands: [],
      rating: null,
      availability: false,
    };
    setFilters(clearedFilters);
    setActiveFilters([]);
    onFilterChange(clearedFilters);
  };

  // Filter Drawer Content
  const FilterContent = () => (
    <Box sx={{ p: 2, width: { xs: '100%', sm: 320 } }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6">Filters</Typography>
        <IconButton onClick={() => setIsFilterOpen(false)}>
          <X size={20} />
        </IconButton>
      </Box>

      <Divider sx={{ mb: 2 }} />

      {/* Price Range */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1" sx={{ mb: 1 }}>Price Range</Typography>
        <Slider
          value={filters.priceRange}
          onChange={handlePriceChange}
          valueLabelDisplay="auto"
          min={0}
          max={1000}
          sx={{ color: theme.palette.primary.main }}
        />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
          <Typography variant="body2">${filters.priceRange[0]}</Typography>
          <Typography variant="body2">${filters.priceRange[1]}</Typography>
        </Box>
      </Box>

      {/* Categories */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1" sx={{ mb: 1 }}>Categories</Typography>
        <FormGroup>
          {categories.map((category) => (
            <FormControlLabel
              key={category}
              control={
                <Checkbox
                  checked={filters.categories.includes(category)}
                  onChange={() => handleFilterToggle('categories', category)}
                  size="small"
                />
              }
              label={category}
            />
          ))}
        </FormGroup>
      </Box>

      {/* Brands */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1" sx={{ mb: 1 }}>Brands</Typography>
        <FormGroup>
          {brands.map((brand) => (
            <FormControlLabel
              key={brand}
              control={
                <Checkbox
                  checked={filters.brands.includes(brand)}
                  onChange={() => handleFilterToggle('brands', brand)}
                  size="small"
                />
              }
              label={brand}
            />
          ))}
        </FormGroup>
      </Box>

      {/* Rating */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1" sx={{ mb: 1 }}>Rating</Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          {[4, 3, 2, 1].map((rating) => (
            <Chip
              key={rating}
              label={`${rating}+ Stars`}
              onClick={() => handleFilterChange({ rating })}
              color={filters.rating === rating ? 'primary' : 'default'}
              variant={filters.rating === rating ? 'filled' : 'outlined'}
            />
          ))}
        </Box>
      </Box>

      {/* Availability */}
      <Box sx={{ mb: 3 }}>
        <FormControlLabel
          control={
            <Checkbox
              checked={filters.availability}
              onChange={(e) => handleFilterChange({ availability: e.target.checked })}
              size="small"
            />
          }
          label="In Stock Only"
        />
      </Box>

      <Button
        variant="outlined"
        fullWidth
        onClick={handleClearFilters}
        sx={{ mt: 2 }}
      >
        Clear All Filters
      </Button>
    </Box>
  );

  return (
    <Box sx={{ mb: 3 }}>
      {/* Filter and Sort Buttons */}
      <Box
        sx={{
          display: 'flex',
          gap: 1,
          justifyContent: 'flex-start',
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: { xs: 'stretch', sm: 'center' },
          mb: 2,
        }}
      >
        <Button
          variant="outlined"
          startIcon={<SlidersHorizontal size={20} />}
          onClick={() => setIsFilterOpen(true)}
          sx={{ textTransform: 'none', flexGrow: { xs: 1, sm: 0 } }}
        >
          Filters
        </Button>
        <Button
          variant="outlined"
          startIcon={<ArrowUpDown size={20} />}
          onClick={handleSortClick}
          sx={{ textTransform: 'none', flexGrow: { xs: 1, sm: 0 } }}
        >
          Sort
        </Button>
        <Menu
          anchorEl={sortAnchorEl}
          open={Boolean(sortAnchorEl)}
          onClose={() => setSortAnchorEl(null)}
        >
          {sortOptions.map((option) => (
            <MenuItem
              key={option.value}
              onClick={() => handleSortSelect(option.value)}
            >
              {option.label}
            </MenuItem>
          ))}
        </Menu>
      </Box>

      {/* Active Filters Display */}
      {activeFilters.length > 0 && (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
          <Typography variant="subtitle2" sx={{ mr: 1 }}>
            Active Filters:
          </Typography>
          {activeFilters.map((filter) => (
            <Chip
              key={filter}
              label={filter}
              onDelete={() => {
                // Implement remove filter logic
                setActiveFilters(activeFilters.filter((f) => f !== filter));
              }}
              sx={{ borderRadius: 1 }}
            />
          ))}
          <Button
            size="small"
            onClick={handleClearFilters}
            sx={{ textTransform: 'none' }}
          >
            Clear All
          </Button>
        </Box>
      )}

      <Drawer
        anchor={isMobile ? 'bottom' : 'left'}
        open={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        PaperProps={{
          sx: {
            borderRadius: isMobile ? '16px 16px 0 0' : 0,
            width: isMobile ? '100%' : 320,
          },
        }}
      >
        <FilterContent />
      </Drawer>
    </Box>
  );
};

export default ProductFilters; 