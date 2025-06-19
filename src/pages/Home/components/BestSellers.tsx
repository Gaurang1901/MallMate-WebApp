import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Typography, Rating, Button } from "@mui/material";
import { ShoppingCart, Heart, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Mock data - replace with actual data from your backend
const bestSellers = [
  {
    id: 1,
    name: "Professional DSLR Camera",
    price: 1299.99,
    image: "/images/products/best1.jpg",
    rating: 4.9,
    reviews: 256,
    sales: 1200,
  },
  {
    id: 2,
    name: "Gaming Laptop Pro",
    price: 1499.99,
    image: "/images/products/best2.jpg",
    rating: 4.8,
    reviews: 189,
    sales: 950,
  },
  {
    id: 3,
    name: "Smartphone Ultra",
    price: 899.99,
    image: "/images/products/best3.jpg",
    rating: 4.7,
    reviews: 324,
    sales: 2100,
  },
  {
    id: 4,
    name: "Wireless Noise Cancelling Headphones",
    price: 249.99,
    image: "/images/products/best4.jpg",
    rating: 4.8,
    reviews: 412,
    sales: 1800,
  },
  {
    id: 5,
    name: "Wireless Noise Cancelling Headphones",
    price: 249.99,
    image: "/images/products/best4.jpg",
    rating: 4.8,
    reviews: 412,
    sales: 1800,
  },
  {
    id: 6,
    name: "Wireless Noise Cancelling Headphones",
    price: 249.99,
    image: "/images/products/best4.jpg",
    rating: 4.8,
    reviews: 412,
    sales: 1800,
  },
];

const BestSellers: React.FC = () => {
  const navigate = useNavigate();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = React.useState(false);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let scrollAmount = 0;
    const scrollSpeed = 1; // pixels per frame
    const scrollInterval = 30; // milliseconds

    const scroll = () => {
      if (!isHovered && scrollContainer) {
        scrollAmount += scrollSpeed;
        if (scrollAmount >= scrollContainer.scrollWidth - scrollContainer.clientWidth) {
          scrollAmount = 0;
        }
        scrollContainer.scrollLeft = scrollAmount;
      }
    };

    const intervalId = setInterval(scroll, scrollInterval);

    return () => clearInterval(intervalId);
  }, [isHovered]);

  const handleProductClick = (productId: number) => {
    navigate(`/product/${productId}`);
  };

  return (
    <div 
      ref={scrollRef}
      className="flex overflow-x-auto gap-6 pb-4 scrollbar-hide"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
      }}
    >
      {bestSellers.map((product, index) => (
        <motion.div
          key={product.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="group bg-gray-800/50 rounded-2xl overflow-hidden backdrop-blur-sm border border-gray-700/50 hover:border-primary-500/50 transition-all duration-300 flex-shrink-0 w-[300px]"
        >
          <div className="relative aspect-square overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute top-4 left-4 flex items-center gap-2">
              <TrendingUp className="text-primary-500" size={16} />
              <span className="px-3 py-1 bg-primary-500 text-white text-sm font-semibold rounded-full">
                Best Seller
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
              onClick={() => handleProductClick(product.id)}
              sx={{
                fontWeight: 600,
                mb: 1,
                color: "text.primary",
                fontSize: "1rem",
                cursor: "pointer",
                "&:hover": {
                  color: "primary.main",
                },
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
            <div className="flex items-center justify-between mb-3">
              <Typography
                variant="body2"
                sx={{ color: "text.secondary", opacity: 0.8 }}
              >
                {product.sales.toLocaleString()} sold
              </Typography>
            </div>
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

export default BestSellers; 