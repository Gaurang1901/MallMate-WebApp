import React from "react";
import { motion } from "framer-motion";
import { Typography, Rating, Button } from "@mui/material";
import { ShoppingCart, Heart } from "lucide-react";

// Mock data - replace with actual data from your backend
const newArrivals = [
  {
    id: 1,
    name: "Smart Home Hub",
    price: 149.99,
    image: "/images/products/new1.jpg",
    rating: 4.3,
    reviews: 45,
    isNew: true,
  },
  {
    id: 2,
    name: "Wireless Gaming Mouse",
    price: 79.99,
    image: "/images/products/new2.jpg",
    rating: 4.7,
    reviews: 32,
    isNew: true,
  },
  {
    id: 3,
    name: "Portable Bluetooth Speaker",
    price: 89.99,
    image: "/images/products/new3.jpg",
    rating: 4.5,
    reviews: 28,
    isNew: true,
  },
  {
    id: 4,
    name: "Smart LED Light Strip",
    price: 49.99,
    image: "/images/products/new4.jpg",
    rating: 4.4,
    reviews: 19,
    isNew: true,
  },
];

const NewArrivals: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {newArrivals.map((product, index) => (
        <motion.div
          key={product.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="group bg-gray-800/50 rounded-2xl overflow-hidden backdrop-blur-sm border border-gray-700/50 hover:border-primary-500/50 transition-all duration-300"
        >
          <div className="relative aspect-square overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute top-4 left-4">
              <span className="px-3 py-1 bg-primary-500 text-white text-sm font-semibold rounded-full">
                New
              </span>
            </div>
            <Button
              variant="contained"
              size="small"
              startIcon={<Heart />}
              sx={{
                position: "absolute",
                top: 8,
                right: 8,
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                backdropFilter: "blur(4px)",
                "&:hover": {
                  backgroundColor: "rgba(0, 0, 0, 0.7)",
                },
              }}
            />
          </div>
          <div className="p-4">
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                mb: 1,
                color: "text.primary",
                fontSize: "1rem",
              }}
            >
              {product.name}
            </Typography>
            <div className="flex items-center gap-2 mb-2">
              <Rating
                value={product.rating}
                precision={0.5}
                size="small"
                readOnly
                sx={{
                  "& .MuiRating-iconFilled": {
                    color: "primary.main",
                  },
                }}
              />
              <Typography
                variant="body2"
                sx={{ color: "text.secondary", opacity: 0.8 }}
              >
                ({product.reviews})
              </Typography>
            </div>
            <Typography
              variant="h6"
              sx={{
                color: "primary.main",
                fontWeight: 700,
                mb: 2,
                background: "linear-gradient(45deg, #90caf9 30%, #ce93d8 90%)",
                backgroundClip: "text",
                textFillColor: "transparent",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              ${product.price.toFixed(2)}
            </Typography>
            <Button
              variant="contained"
              fullWidth
              startIcon={<ShoppingCart />}
              sx={{
                py: 1,
                borderRadius: 2,
                textTransform: "none",
                fontSize: "0.875rem",
                fontWeight: 600,
                background: "linear-gradient(45deg, #90caf9 30%, #ce93d8 90%)",
                "&:hover": {
                  background: "linear-gradient(45deg, #90caf9 40%, #ce93d8 100%)",
                },
              }}
            >
              Add to Cart
            </Button>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default NewArrivals; 