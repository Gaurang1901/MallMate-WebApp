import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  useTheme,
  // useMediaQuery,
} from "@mui/material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import ProductFilters from "../../components/ProductFilters";
import ProductCard from "../../components/ProductCard";

// Mock data - replace with actual data from your backend
const mockProducts = [
  {
    id: 1,
    name: "Premium Wireless Headphones",
    price: 199.99,
    image: "/images/products/product1.jpg",
    rating: 4.5,
    reviews: 120,
    description: "High-quality wireless headphones with noise cancellation",
  },
  {
    id: 2,
    name: "Smart Fitness Watch",
    price: 149.99,
    image: "/images/products/product2.jpg",
    rating: 4.8,
    reviews: 85,
    description: "Track your fitness goals with this advanced smartwatch",
  },
  {
    id: 3,
    name: "Ultra HD 4K Monitor",
    price: 399.99,
    image: "/images/products/product3.jpg",
    rating: 4.6,
    reviews: 64,
    description: "Crystal clear display with HDR support",
  },
  {
    id: 4,
    name: "Mechanical Gaming Keyboard",
    price: 129.99,
    image: "/images/products/product4.jpg",
    rating: 4.7,
    reviews: 92,
    description: "RGB mechanical keyboard with customizable keys",
  },
];

interface CategoryPageProps {
  categoryId: string;
  categoryName: string;
}

const CategoryPage: React.FC<CategoryPageProps> = ({
  categoryId,
  categoryName,
}) => {
  const theme = useTheme();
  // const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();
  const [filteredProducts, setFilteredProducts] = useState(mockProducts);

  const handleFilterChange = (filters: any) => {
    // Implement filter logic here
    console.log("Filters:", filters);
    console.log("Filters:", categoryId);
    // For now, just update the products (you'll implement actual filtering logic)
    setFilteredProducts(mockProducts);
  };

  const handleSortChange = (sortBy: string) => {
    // Implement sort logic here
    console.log("Sort by:", sortBy);
    // For now, just update the products (you'll implement actual sorting logic)
    setFilteredProducts(mockProducts);
  };

  const handleSearch = (query: string) => {
    // Implement search logic here
    console.log("Search:", query);
    // For now, just update the products (you'll implement actual search logic)
    setFilteredProducts(mockProducts);
  };

  const handleProductClick = (productId: number) => {
    navigate(`/product/${productId}`);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: theme.palette.background.default,
        pt: { xs: 2, md: 4 },
        pb: { xs: 4, md: 8 },
      }}
    >
      <Container maxWidth="lg">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: "2rem", md: "2.5rem" },
              fontWeight: 700,
              color: theme.palette.text.primary,
              mb: 1,
            }}
          >
            {categoryName}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: theme.palette.text.secondary,
              mb: 4,
            }}
          >
            Discover our collection of {categoryName?.toLowerCase()} products
          </Typography>
        </motion.div>

        {/* Filters and Search */}
        <ProductFilters
          onFilterChange={handleFilterChange}
          onSortChange={handleSortChange}
          onSearch={handleSearch}
        />

        {/* Products Grid */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: 3,
          }}
        >
          {filteredProducts.map((product) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <ProductCard
                product={product}
                onClick={() => handleProductClick(product.id)}
              />
            </motion.div>
          ))}
        </Box>

        {/* No Results Message */}
        {filteredProducts.length === 0 && (
          <Box
            sx={{
              textAlign: "center",
              py: 8,
            }}
          >
            <Typography
              variant="h6"
              sx={{
                color: theme.palette.text.secondary,
                mb: 1,
              }}
            >
              No products found
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: theme.palette.text.secondary,
              }}
            >
              Try adjusting your filters or search terms
            </Typography>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default CategoryPage;
