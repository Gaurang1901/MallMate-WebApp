import React, { useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import { Box, Typography, Button, useMediaQuery } from '@mui/material';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../../components/ui/carousel";
import { ShoppingCart } from 'lucide-react';
import { cn } from "../../../lib/utils";
import { useNavigate } from 'react-router-dom';

// Sample product data - replace with your actual data
const products = [
  {
    id: 1,
    name: "Premium Headphones",
    price: 199.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
  },
  {
    id: 2,
    name: "Smart Watch",
    price: 299.99,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500",
  },
  {
    id: 3,
    name: "Wireless Earbuds",
    price: 149.99,
    image: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=500",
  },
  {
    id: 4,
    name: "Bluetooth Speaker",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500",
  },
  {
    id: 5,
    name: "Gaming Mouse",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=500",
  },
];

const ProductCarousel: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [api, setApi] = React.useState<any>();
  const navigate = useNavigate();

  // Auto-scroll functionality
  useEffect(() => {
    if (!api) return;

    const interval = setInterval(() => {
      api.scrollNext();
    }, 5000);

    return () => clearInterval(interval);
  }, [api]);

  const handleProductClick = (productId: number) => {
    navigate(`/product/${productId}`);
  };

  return (
    <Box 
      component="section" 
      className="py-16 w-full overflow-hidden"
      sx={{ 
        bgcolor: theme.palette.background.default,
        color: theme.palette.text.primary
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Typography 
          variant="h2" 
          className="text-2xl font-semibold mb-8 text-center"
          sx={{ color: theme.palette.text.primary }}
        >
          Featured Products
        </Typography>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          setApi={setApi}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {products.map((product) => (
              <CarouselItem 
                key={product.id} 
                className={`pl-4 ${isMobile ? 'basis-full' : 'basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5'}`}
              >
                <Box
                  className="h-full p-4 rounded-lg"
                  sx={{
                    bgcolor: theme.palette.background.paper,
                    border: `1px solid ${theme.palette.divider}`,
                    transition: 'transform 0.2s',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                    },
                  }}
                >
                  <div className="aspect-square mb-4 overflow-hidden rounded-lg">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <Typography 
                    variant="h6" 
                    className="font-semibold mb-2"
                    sx={{ 
                      color: theme.palette.text.primary, 
                      cursor: 'pointer',
                      '&:hover': { textDecoration: 'underline' }
                    }}
                    onClick={() => handleProductClick(product.id)}
                  >
                    {product.name}
                  </Typography>
                  <Typography 
                    variant="h5" 
                    className="font-bold mb-4"
                    sx={{ color: theme.palette.primary.main }}
                  >
                    ${product.price}
                  </Typography>
                  <Button
                    variant="contained"
                    startIcon={<ShoppingCart />}
                    fullWidth
                    sx={
                      {
                        bgcolor: theme.palette.primary.main,
                        color: theme.palette.primary.contrastText,
                        '&:hover': {
                          bgcolor: theme.palette.primary.dark,
                        },
                      }
                    }
                  >
                    Add to Cart
                  </Button>
                </Box>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious 
            className={cn(
              isMobile ? 'hidden' : '',
              'bg-background border border-border text-foreground hover:bg-primary hover:text-primary-foreground',
              '[&>svg]:text-foreground [&:hover>svg]:text-primary-foreground'
            )}
          />
          <CarouselNext 
            className={cn(
              isMobile ? 'hidden' : '',
              'bg-background border border-border text-foreground hover:bg-primary hover:text-primary-foreground',
              '[&>svg]:text-foreground [&:hover>svg]:text-primary-foreground'
            )}
          />
        </Carousel>
      </div>
    </Box>
  );
};

export default ProductCarousel; 