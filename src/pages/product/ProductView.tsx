import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Button,
  Rating,
  Divider,
  Chip,
  useTheme,
  useMediaQuery,
  IconButton,
} from '@mui/material';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ShoppingCart,
  Heart,
  Share2,
  ChevronLeft,
  Package,
  Truck,
  RefreshCw,
  Shield,
} from 'lucide-react';

// Mock data - replace with actual data from your backend
const mockProduct = {
  id: 1,
  name: 'Premium Wireless Headphones',
  price: 199.99,
  image: '/images/products/product1.jpg',
  rating: 4.5,
  reviews: 120,
  description: 'High-quality wireless headphones with noise cancellation. Experience crystal clear sound and immersive audio with our premium wireless headphones. Features include active noise cancellation, 30-hour battery life, and comfortable over-ear design.',
  features: [
    'Active Noise Cancellation',
    '30-hour Battery Life',
    'Bluetooth 5.0',
    'Built-in Microphone',
    'Foldable Design',
  ],
  stock: 15,
  brand: 'Premium Audio',
  category: 'Electronics',
};

const ProductView: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { productId } = useParams();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(mockProduct.image);

  // Mock images - replace with actual product images
  const productImages = [
    mockProduct.image,
    '/images/products/product1-2.jpg',
    '/images/products/product1-3.jpg',
    '/images/products/product1-4.jpg',
  ];

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: theme.palette.background.default,
        pt: { xs: 2, md: 4 },
        pb: { xs: 4, md: 8 },
      }}
    >
      <Container maxWidth="lg">
        {/* Back Button */}
        <Button
          startIcon={<ChevronLeft />}
          onClick={() => navigate(-1)}
          sx={{ mb: 3 }}
        >
          Back
        </Button>

        <Grid container spacing={4}>
          {/* Product Images */}
          <Grid item xs={12} md={6}>
            <Box
              component={motion.div}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Box
                sx={{
                  position: 'relative',
                  width: '100%',
                  height: { xs: 300, md: 500 },
                  borderRadius: 2,
                  overflow: 'hidden',
                  bgcolor: theme.palette.grey[100],
                  mb: 2,
                }}
              >
                <Box
                  component="img"
                  src={selectedImage}
                  alt={mockProduct.name}
                  sx={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              </Box>

              {/* Thumbnail Images */}
              <Box
                sx={{
                  display: 'flex',
                  gap: 1,
                  overflowX: 'auto',
                  pb: 1,
                  '&::-webkit-scrollbar': {
                    height: 4,
                  },
                  '&::-webkit-scrollbar-thumb': {
                    bgcolor: theme.palette.grey[300],
                    borderRadius: 2,
                  },
                }}
              >
                {productImages.map((image, index) => (
                  <Box
                    key={index}
                    onClick={() => setSelectedImage(image)}
                    sx={{
                      width: 80,
                      height: 80,
                      borderRadius: 1,
                      overflow: 'hidden',
                      cursor: 'pointer',
                      border: `2px solid ${
                        selectedImage === image
                          ? theme.palette.primary.main
                          : 'transparent'
                      }`,
                    }}
                  >
                    <Box
                      component="img"
                      src={image}
                      alt={`${mockProduct.name} ${index + 1}`}
                      sx={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                    />
                  </Box>
                ))}
              </Box>
            </Box>
          </Grid>

          {/* Product Info */}
          <Grid item xs={12} md={6}>
            <Box
              component={motion.div}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 700,
                  color: theme.palette.text.primary,
                  mb: 1,
                }}
              >
                {mockProduct.name}
              </Typography>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <Rating value={mockProduct.rating} precision={0.5} readOnly />
                <Typography variant="body2" color="text.secondary">
                  ({mockProduct.reviews} reviews)
                </Typography>
              </Box>

              <Typography
                variant="h5"
                sx={{
                  color: theme.palette.primary.main,
                  fontWeight: 700,
                  mb: 3,
                }}
              >
                ${mockProduct.price.toFixed(2)}
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  color: theme.palette.text.secondary,
                  mb: 3,
                  lineHeight: 1.7,
                }}
              >
                {mockProduct.description}
              </Typography>

              {/* Features */}
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 600 }}>
                  Key Features
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {mockProduct.features.map((feature, index) => (
                    <Chip
                      key={index}
                      label={feature}
                      size="small"
                      sx={{ borderRadius: 1 }}
                    />
                  ))}
                </Box>
              </Box>

              {/* Action Buttons */}
              <Box
                sx={{
                  display: 'flex',
                  gap: 2,
                  mb: 4,
                  flexDirection: { xs: 'column', sm: 'row' },
                }}
              >
                <Button
                  variant="contained"
                  size="large"
                  startIcon={<ShoppingCart />}
                  fullWidth
                  sx={{
                    py: 1.5,
                    borderRadius: 2,
                    textTransform: 'none',
                    fontSize: '1rem',
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
                  }}
                >
                  Add to Wishlist
                </Button>
              </Box>

              <Divider sx={{ mb: 4 }} />

              {/* Product Details */}
              <Box sx={{ mb: 4 }}>
                <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600 }}>
                  Product Details
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Typography variant="body2" color="text.secondary">
                      Brand
                    </Typography>
                    <Typography variant="body1">{mockProduct.brand}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2" color="text.secondary">
                      Category
                    </Typography>
                    <Typography variant="body1">{mockProduct.category}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2" color="text.secondary">
                      Stock
                    </Typography>
                    <Typography variant="body1">{mockProduct.stock} units</Typography>
                  </Grid>
                </Grid>
              </Box>

              {/* Shipping Info */}
              <Box
                sx={{
                  bgcolor: theme.palette.background.paper,
                  borderRadius: 2,
                  p: 2,
                  mb: 4,
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                  <Truck size={20} />
                  <Typography variant="subtitle2">Free Shipping</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                  <Package size={20} />
                  <Typography variant="subtitle2">Easy Returns</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Shield size={20} />
                  <Typography variant="subtitle2">2 Year Warranty</Typography>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default ProductView; 