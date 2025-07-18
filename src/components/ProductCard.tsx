import React from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Rating,
  useTheme,
  useMediaQuery,
  Button,
  IconButton,
} from '@mui/material';
import { motion } from 'framer-motion';
import { ShoppingCart, Heart, Share2 } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/cart.slice';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  rating?: number;
  reviews?: number;
  description?: string;
}

interface ProductCardProps {
  product: Product;
  onClick?: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onClick }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const dispatch = useDispatch();

  const handleAddToCart = (event: React.MouseEvent) => {
    event.stopPropagation();
    dispatch(addToCart({ ...product, quantity: 1 }));
    if (window && window.dispatchEvent) {
      // Optionally trigger a custom event for notification
      window.dispatchEvent(new CustomEvent('cart:add', { detail: product }));
    } else {
      alert('Added to cart!');
    }
  };

  return (
    <Card
      component={motion.div}
      whileHover={{ y: -4 }}
      sx={{
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        height: isMobile ? 'auto' : 200,
        bgcolor: 'transparent',
        background: theme.palette.mode === 'dark'
          ? 'linear-gradient(135deg, #23233b 0%, #18181b 100%)'
          : 'linear-gradient(135deg, #f8fafc 0%, #e0e7ef 100%)',
        borderRadius: 2,
        overflow: 'hidden',
        cursor: onClick ? 'pointer' : 'default',
        transition: 'all 0.2s ease-in-out',
        border: `1px solid ${theme.palette.divider}`,
        '&:hover': {
          boxShadow: theme.shadows[4],
          borderColor: theme.palette.primary.main,
          '& .product-image': {
            transform: 'scale(1.05)',
          },
          '& .product-actions': {
            opacity: 1,
          },
        },
      }}
      onClick={onClick}
    >
      {/* Image Container */}
      <Box
        sx={{
          position: 'relative',
          width: isMobile ? '100%' : 200,
          height: isMobile ? 200 : '100%',
          overflow: 'hidden',
          bgcolor: theme.palette.grey[100],
        }}
      >
        <CardMedia
          component="img"
          image={product.image}
          alt={product.name}
          className="product-image"
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.3s ease-in-out',
          }}
        />
        
        {/* Quick Actions */}
        <Box
          className="product-actions"
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
            opacity: 0,
            transition: 'all 0.2s ease-in-out',
          }}
        >
          <IconButton
            size="small"
            onClick={(event) => event.stopPropagation()}
            sx={{
              bgcolor: theme.palette.background.paper,
              '&:hover': {
                bgcolor: theme.palette.error.light,
                color: theme.palette.error.contrastText,
              },
            }}
          >
            <Heart size={16} />
          </IconButton>
          <IconButton
            size="small"
            onClick={(event) => event.stopPropagation()}
            sx={{
              bgcolor: theme.palette.background.paper,
              '&:hover': {
                bgcolor: theme.palette.primary.main,
                color: theme.palette.primary.contrastText,
              },
            }}
          >
            <Share2 size={16} />
          </IconButton>
        </Box>
      </Box>

      <CardContent
        sx={{
          flex: 1,
          p: 2,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Box sx={{ flexGrow: 1 }}>
          <Typography
            variant="h6"
            component="h3"
            sx={{
              color: theme.palette.text.primary,
              mb: 1,
              fontSize: '1.1rem',
              fontWeight: 600,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
            }}
          >
            {product.name}
          </Typography>

          {product.description && (
            <Typography
              variant="body2"
              sx={{
                color: theme.palette.text.secondary,
                mb: 2,
                display: isMobile ? 'none' : '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}
            >
              {product.description}
            </Typography>
          )}
          
          <Typography
            variant="h6"
            sx={{
              color: theme.palette.primary.main,
              fontWeight: 700,
              mb: 1,
              fontSize: '1.25rem',
            }}
          >
            ${product.price.toFixed(2)}
          </Typography>

          {product.rating && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <Rating
                value={product.rating}
                precision={0.5}
                size="small"
                readOnly
                sx={{
                  '& .MuiRating-iconFilled': {
                    color: theme.palette.primary.main,
                  },
                }}
              />
              {product.reviews && (
                <Typography
                  variant="body2"
                  sx={{ color: theme.palette.text.secondary }}
                >
                  ({product.reviews})
                </Typography>
              )}
            </Box>
          )}
        </Box>

        <Button
          variant="contained"
          startIcon={<ShoppingCart size={16} />}
          onClick={handleAddToCart}
          sx={{
            alignSelf: 'center',
            textTransform: 'none',
            borderRadius: 1,
            px: 2,
            marginLeft: 'auto',
          }}
        >
          Add to Cart
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProductCard; 