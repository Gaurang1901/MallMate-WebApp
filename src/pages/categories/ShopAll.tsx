import React from "react";
import { Box, Container, Typography, useTheme, Paper } from "@mui/material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

// Mock data - replace with actual data from your backend
const categories = [
  {
    id: "fashion",
    name: "Fashion",
    description: "Clothing, Shoes & Accessories",
    image: "/images/categories/fashion.jpg",
    subcategories: ["Women", "Men", "Kids", "Accessories"],
  },
  {
    id: "electronics",
    name: "Electronics",
    description: "Gadgets, Devices & Accessories",
    image: "/images/categories/electronics.jpg",
    subcategories: ["Phones", "Laptops", "Audio", "Gaming"],
  },
  {
    id: "home",
    name: "Home & Kitchen",
    description: "Furniture, Appliances & More",
    image: "/images/categories/home.jpg",
    subcategories: ["Furniture", "Appliances", "Decor", "Kitchen"],
  },
  {
    id: "beauty",
    name: "Beauty & Personal Care",
    description: "Makeup, Skincare & Fragrances",
    image: "/images/categories/beauty.jpg",
    subcategories: ["Makeup", "Skincare", "Fragrances", "Hair Care"],
  },
  {
    id: "sports",
    name: "Sports & Outdoors",
    description: "Fitness, Sports & Outdoor Gear",
    image: "/images/categories/sports.jpg",
    subcategories: ["Fitness", "Team Sports", "Outdoor", "Exercise"],
  },
  {
    id: "toys",
    name: "Toys & Games",
    description: "Toys, Games & Entertainment",
    image: "/images/categories/toys.jpg",
    subcategories: ["Toys", "Games", "Puzzles", "Collectibles"],
  },
  {
    id: "books",
    name: "Books & Stationery",
    description: "Books, Office & School Supplies",
    image: "/images/categories/books.jpg",
    subcategories: ["Books", "Stationery", "Art Supplies", "Office"],
  },
  {
    id: "grocery",
    name: "Grocery & Gourmet",
    description: "Food, Beverages & More",
    image: "/images/categories/grocery.jpg",
    subcategories: ["Food", "Beverages", "Snacks", "Organic"],
  },
];

const ShopAll: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();

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
        <Box sx={{ mb: 4 }}>
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: "2rem", md: "2.5rem" },
              fontWeight: 700,
              color: theme.palette.text.primary,
              mb: 1,
            }}
          >
            Shop by Category
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: theme.palette.text.secondary,
              maxWidth: "600px",
            }}
          >
            Browse our wide selection of products across various categories
          </Typography>
        </Box>

        {/* Categories Grid */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
              lg: "repeat(4, 1fr)",
            },
            gap: 3,
          }}
        >
          {categories.map((category) => (
            <motion.div
              key={category.id}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
            >
              <Paper
                elevation={0}
                onClick={() => navigate(`/category/${category.id}`)}
                sx={{
                  height: "100%",
                  cursor: "pointer",
                  borderRadius: 2,
                  overflow: "hidden",
                  bgcolor: theme.palette.background.paper,
                  border: `1px solid ${theme.palette.divider}`,
                  transition: "all 0.2s ease-in-out",
                  "&:hover": {
                    boxShadow: theme.shadows[4],
                    borderColor: theme.palette.primary.main,
                  },
                }}
              >
                {/* Category Image */}
                <Box
                  sx={{
                    position: "relative",
                    height: 200,
                    overflow: "hidden",
                    bgcolor: theme.palette.grey[100],
                  }}
                >
                  <Box
                    component="img"
                    src={category.image}
                    alt={category.name}
                    sx={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      transition: "transform 0.3s ease-in-out",
                      "&:hover": {
                        transform: "scale(1.05)",
                      },
                    }}
                  />
                </Box>

                {/* Category Content */}
                <Box sx={{ p: 2 }}>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 600,
                      color: theme.palette.text.primary,
                      mb: 0.5,
                    }}
                  >
                    {category.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: theme.palette.text.secondary,
                      mb: 2,
                      fontSize: "0.875rem",
                    }}
                  >
                    {category.description}
                  </Typography>

                  {/* Subcategories */}
                  <Box sx={{ mt: 2 }}>
                    {category.subcategories.map((subcat) => (
                      <Typography
                        key={subcat}
                        variant="body2"
                        sx={{
                          color: theme.palette.text.secondary,
                          fontSize: "0.75rem",
                          mb: 0.5,
                          display: "flex",
                          alignItems: "center",
                          gap: 0.5,
                        }}
                      >
                        <ArrowRight size={12} />
                        {subcat}
                      </Typography>
                    ))}
                  </Box>
                </Box>
              </Paper>
            </motion.div>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default ShopAll;
