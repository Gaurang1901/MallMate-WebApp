import React from 'react'
import { useTheme } from '@mui/material/styles'
import { Box, Button } from '@mui/material'

const categories = [
  {
    title: "Fashion",
    href: "/category/fashion",
    image: "https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=1000"
  },
  {
    title: "Food & Dining",
    href: "/category/food-dining",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1000"
  },
  {
    title: "Entertainment",
    href: "/category/entertainment",
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1000"
  },
  {
    title: "Books & Stationery",
    href: "/category/books-stationery",
    image: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=1000"
  },
  {
    title: "Health & Beauty",
    href: "/category/health-beauty",
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1000"
  },
  {
    title: "Gifts & Souvenirs",
    href: "/category/gifts-souvenirs",
    image: "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?q=80&w=1000"
  },
]

const CategoriesMenu: React.FC = () => {
  const theme = useTheme()

  return (
    <Box 
      className="w-full max-w-7xl mx-auto px-4"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <Box
            key={category.title}
            className="relative h-64 rounded-xl overflow-hidden group"
            sx={{
              boxShadow: theme.shadows[2],
              '&:hover': {
                boxShadow: theme.shadows[8],
                transform: 'translateY(-4px)',
                transition: 'all 0.3s ease-in-out',
              },
            }}
          >
            {/* Background Image */}
            <Box
              component="img"
              src={category.image}
              alt={category.title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
            
            {/* Overlay */}
            <Box
              className="absolute inset-0"
              sx={{
                background: theme.palette.mode === 'dark' 
                  ? 'linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0.4))'
                  : 'linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0.3))'
              }}
            />

            {/* Content */}
            <Box
              className="absolute inset-0 flex flex-col items-center justify-center p-6"
              sx={{
                color: theme.palette.mode === 'dark' 
                  ? theme.palette.primary.light 
                  : theme.palette.primary.contrastText
              }}
            >
              <h3 className="text-2xl font-bold mb-4 text-center">
                {category.title}
              </h3>

              <Button
                component="a"
                href={category.href}
                variant="contained"
                className="mt-2"
                sx={{
                  backgroundColor: theme.palette.mode === 'dark' 
                    ? theme.palette.primary.dark 
                    : theme.palette.primary.light,
                  color: theme.palette.mode === 'dark'
                    ? theme.palette.primary.light
                    : theme.palette.primary.contrastText,
                  '&:hover': {
                    backgroundColor: theme.palette.mode === 'dark'
                      ? theme.palette.primary.main
                      : theme.palette.primary.main,
                    color: theme.palette.primary.contrastText,
                  },
                }}
              >
                Explore
              </Button>
            </Box>
          </Box>
        ))}
      </div>
    </Box>
  )
}

export default CategoriesMenu