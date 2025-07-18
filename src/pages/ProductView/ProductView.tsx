import React, { useState } from "react";
import {
  Typography,
  Button,
  Rating,
  Chip,
  useTheme,
  IconButton,
  TextField,
  Divider,
} from "@mui/material";
import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import {
  ShoppingCart,
  Heart,
  ChevronLeft,
  Package,
  Truck,
  Shield,
  ArrowRight,
  Minus,
  Plus,
} from "lucide-react";

// Mock data - replace with actual data from your backend
const mockProduct = {
  id: 1,
  name: "Premium Wireless Headphones",
  price: 199.99,
  image: "/images/products/product1.jpg",
  rating: 4,
  reviews: 120,
  description:
    "High-quality wireless headphones with noise cancellation. Experience crystal clear sound and immersive audio with our premium wireless headphones. Features include active noise cancellation, 30-hour battery life, and comfortable over-ear design.",
  features: [
    "Active Noise Cancellation",
    "30-hour Battery Life",
    "Bluetooth 5.0",
    "Built-in Microphone",
    "Foldable Design",
  ],
  stock: 15,
  brand: "Premium Audio",
  category: "Electronics",
  sku: "4550344637135",
};

// Mock images - replace with actual product images
const productImages = [
  mockProduct.image,
  "/images/products/product1-2.jpg",
  "/images/products/product1-3.jpg",
  "/images/products/product1-4.jpg",
];

const ProductView: React.FC = () => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';
  const navigate = useNavigate();
  const { id } = useParams();
  console.log(id);

  const [selectedImage, setSelectedImage] = useState(mockProduct.image);
  const [quantity, setQuantity] = useState(1);

  return (
    <div
      style={{ backgroundColor: theme.palette.background.default }}
      className="min-h-screen py-12"
    >
      <div className="max-w-7xl mx-auto px-4">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Button
            startIcon={<ChevronLeft />}
            onClick={() => navigate(-1)}
            sx={{
              mb: 4,
              color: 'text.secondary',
              '&:hover': {
                color: 'primary.main',
                backgroundColor: isDarkMode ? 'rgba(144, 202, 249, 0.1)' : 'rgba(124, 58, 237, 0.08)',
              },
            }}
          >
            Back to Products
          </Button>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Images */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className={`relative w-full aspect-square rounded-2xl overflow-hidden ${isDarkMode ? 'bg-gray-800' : 'bg-white'} mb-4 group`}>
              <img
                src={selectedImage}
                alt={mockProduct.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className={`absolute inset-0 ${isDarkMode ? 'bg-gradient-to-t from-black/50 to-transparent' : 'bg-gradient-to-t from-gray-200/60 to-transparent'} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
            </div>

            {/* Thumbnail Images */}
            <div className={`flex gap-3 overflow-x-auto pb-2 scrollbar-thin ${isDarkMode ? 'scrollbar-thumb-gray-600' : 'scrollbar-thumb-gray-300'} scrollbar-track-transparent`}>
              {productImages.map((image, index) => (
                <div
                  key={index}
                  onClick={() => setSelectedImage(image)}
                  className={`relative w-20 h-20 rounded-lg overflow-hidden cursor-pointer transition-all duration-300 ${
                    selectedImage === image
                      ? 'ring-2 ring-primary-500 scale-105'
                      : 'hover:scale-105'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${mockProduct.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  {selectedImage === image && (
                    <div className="absolute inset-0 bg-primary-500/20" />
                  )}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div>
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 700,
                  color: 'text.primary',
                  mb: 2,
                  fontSize: { xs: '2rem', md: '2.5rem' },
                }}
              >
                {mockProduct.name}
              </Typography>

              <div className="flex items-center gap-3 mb-4">
                <Rating
                  value={mockProduct.rating}
                  precision={0.5}
                  readOnly
                  sx={{
                    '& .MuiRating-iconFilled': {
                      color: 'primary.main',
                    },
                  }}
                />
                <Typography
                  variant="body2"
                  sx={{ color: 'text.secondary', opacity: 0.8 }}
                >
                  ({mockProduct.reviews} reviews)
                </Typography>
              </div>

              <Typography
                variant="h4"
                sx={{
                  color: 'primary.main',
                  fontWeight: 700,
                  mb: 4,
                  background: 'linear-gradient(45deg, #90caf9 30%, #ce93d8 90%)',
                  backgroundClip: 'text',
                  textFillColor: 'transparent',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                ${mockProduct.price.toFixed(2)}
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  color: 'text.secondary',
                  mb: 6,
                  lineHeight: 1.8,
                  opacity: 0.9,
                }}
              >
                {mockProduct.description}
              </Typography>
            </div>

            {/* Features */}
            <div className="mb-6">
              <Typography
                variant="h6"
                sx={{ mb: 3, fontWeight: 600, color: 'text.primary' }}
              >
                Key Features
              </Typography>
              <div className="flex flex-wrap gap-2">
                {mockProduct.features.map((feature, index) => (
                  <Chip
                    key={index}
                    label={feature}
                    size="small"
                    sx={{
                      borderRadius: 1,
                      backgroundColor: isDarkMode ? 'rgba(144, 202, 249, 0.1)' : 'rgba(124, 58, 237, 0.08)',
                      color: 'primary.main',
                      '&:hover': {
                        backgroundColor: isDarkMode ? 'rgba(144, 202, 249, 0.2)' : 'rgba(124, 58, 237, 0.16)',
                      },
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center gap-4 mb-6">
              <Typography variant="subtitle1" sx={{ fontWeight: 600, color: 'text.primary' }}>
                Quantity:
              </Typography>
              <div className="flex items-center gap-2">
                <IconButton
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  sx={{
                    minWidth: '40px',
                    height: '40px',
                    borderRadius: '8px',
                    border: `1px solid ${isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0,0,0,0.1)'}`,
                    color: 'text.primary',
                    '&:hover': {
                      borderColor: 'primary.main',
                      backgroundColor: isDarkMode ? 'rgba(144, 202, 249, 0.1)' : 'rgba(124, 58, 237, 0.08)',
                    },
                  }}
                >
                  <Minus size={20} />
                </IconButton>
                <TextField
                  value={quantity}
                  onChange={(e) => {
                    const value = parseInt(e.target.value);
                    if (!isNaN(value) && value > 0) {
                      setQuantity(value);
                    }
                  }}
                  variant="standard"
                  inputProps={{
                    min: 1,
                    style: { textAlign: 'center' },
                  }}
                  sx={{
                    width: '60px',
                    '& .MuiInputBase-input': {
                      textAlign: 'center',
                    },
                  }}
                />
                <IconButton
                  onClick={() => setQuantity(quantity + 1)}
                  sx={{
                    minWidth: '40px',
                    height: '40px',
                    borderRadius: '8px',
                    border: `1px solid ${isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0,0,0,0.1)'}`,
                    color: 'text.primary',
                    '&:hover': {
                      borderColor: 'primary.main',
                      backgroundColor: isDarkMode ? 'rgba(144, 202, 249, 0.1)' : 'rgba(124, 58, 237, 0.08)',
                    },
                  }}
                >
                  <Plus size={20} />
                </IconButton>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button
                variant="contained"
                size="large"
                startIcon={<ShoppingCart />}
                endIcon={<ArrowRight />}
                fullWidth
                sx={{
                  py: 1.5,
                  borderRadius: 2,
                  textTransform: 'none',
                  fontSize: '1rem',
                  fontWeight: 600,
                  background: 'linear-gradient(45deg, #90caf9 30%, #ce93d8 90%)',
                  '&:hover': {
                    background: 'linear-gradient(45deg, #90caf9 40%, #ce93d8 100%)',
                  },
                }}
              >
                Add to Cart
              </Button>
              <Button
                variant="outlined"
                size="large"
                startIcon={<Heart />}
                fullWidth
                sx={{
                  py: 1.5,
                  borderRadius: 2,
                  textTransform: 'none',
                  fontSize: '1rem',
                  fontWeight: 600,
                  borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0,0,0,0.1)',
                  color: 'text.primary',
                  '&:hover': {
                    borderColor: 'primary.main',
                    backgroundColor: isDarkMode ? 'rgba(144, 202, 249, 0.1)' : 'rgba(124, 58, 237, 0.08)',
                  },
                }}
              >
                Add to Wishlist
              </Button>
            </div>

            <Divider sx={{ borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0,0,0,0.1)' }} />

            {/* Product Details */}
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div>
                <Typography
                  variant="body2"
                  sx={{ color: 'text.secondary', mb: 1, opacity: 0.8 }}
                >
                  Brand
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 500, color: 'text.primary' }}>
                  {mockProduct.brand}
                </Typography>
              </div>
              <div>
                <Typography
                  variant="body2"
                  sx={{ color: 'text.secondary', mb: 1, opacity: 0.8 }}
                >
                  Category
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 500, color: 'text.primary' }}>
                  {mockProduct.category}
                </Typography>
              </div>
              <div>
                <Typography
                  variant="body2"
                  sx={{ color: 'text.secondary', mb: 1, opacity: 0.8 }}
                >
                  Stock
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 500, color: 'text.primary' }}>
                  {mockProduct.stock} units available
                </Typography>
              </div>
              <div>
                <Typography
                  variant="body2"
                  sx={{ color: 'text.secondary', mb: 1, opacity: 0.8 }}
                >
                  SKU
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 500, color: 'text.primary' }}>
                  {mockProduct.sku}
                </Typography>
              </div>
            </div>

            {/* Shipping Info */}
            <div className={`${isDarkMode ? 'bg-gray-800/50 border-gray-700/50' : 'bg-gray-100/50 border-gray-200'} rounded-2xl p-6 backdrop-blur-sm border`}>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary-500/10">
                    <Truck className="text-primary-500" size={20} />
                  </div>
                  <div>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600, color: 'text.primary' }}>
                      Free Shipping
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: 'text.secondary', opacity: 0.8 }}
                    >
                      On orders over $100
                    </Typography>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary-500/10">
                    <Package className="text-primary-500" size={20} />
                  </div>
                  <div>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600, color: 'text.primary' }}>
                      Easy Returns
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: 'text.secondary', opacity: 0.8 }}
                    >
                      30-day return policy
                    </Typography>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary-500/10">
                    <Shield className="text-primary-500" size={20} />
                  </div>
                  <div>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600, color: 'text.primary' }}>
                      2 Year Warranty
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: 'text.secondary', opacity: 0.8 }}
                    >
                      Full coverage on all products
                    </Typography>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProductView;
