import React from 'react'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { cn } from "@/lib/utils"
import {  Utensils, Shirt, BookOpen, Gamepad2, Heart, Gift } from 'lucide-react'
import { useTheme } from '@mui/material/styles'
import { Box } from '@mui/material'

const categories = [
  {
    title: "Fashion",
    icon: <Shirt className="h-4 w-4" />,
    items: [
      { name: "Men's Clothing", href: "/category/mens-clothing" },
      { name: "Women's Clothing", href: "/category/womens-clothing" },
      { name: "Kids' Fashion", href: "/category/kids-fashion" },
      { name: "Footwear", href: "/category/footwear" },
      { name: "Accessories", href: "/category/accessories" },
    ],
  },
  {
    title: "Food & Dining",
    icon: <Utensils className="h-4 w-4" />,
    items: [
      { name: "Restaurants", href: "/category/restaurants" },
      { name: "Cafes", href: "/category/cafes" },
      { name: "Food Courts", href: "/category/food-courts" },
      { name: "Beverages", href: "/category/beverages" },
    ],
  },
  {
    title: "Entertainment",
    icon: <Gamepad2 className="h-4 w-4" />,
    items: [
      { name: "Cinema", href: "/category/cinema" },
      { name: "Gaming Zone", href: "/category/gaming" },
      { name: "Bowling", href: "/category/bowling" },
      { name: "VR Experience", href: "/category/vr" },
    ],
  },
  {
    title: "Books & Stationery",
    icon: <BookOpen className="h-4 w-4" />,
    items: [
      { name: "Books", href: "/category/books" },
      { name: "Stationery", href: "/category/stationery" },
      { name: "Art Supplies", href: "/category/art-supplies" },
    ],
  },
  {
    title: "Health & Beauty",
    icon: <Heart className="h-4 w-4" />,
    items: [
      { name: "Cosmetics", href: "/category/cosmetics" },
      { name: "Skincare", href: "/category/skincare" },
      { name: "Fragrances", href: "/category/fragrances" },
      { name: "Wellness", href: "/category/wellness" },
    ],
  },
  {
    title: "Gifts & Souvenirs",
    icon: <Gift className="h-4 w-4" />,
    items: [
      { name: "Gift Shops", href: "/category/gift-shops" },
      { name: "Souvenirs", href: "/category/souvenirs" },
      { name: "Specialty Items", href: "/category/specialty" },
    ],
  },
]

const CategoriesMenu: React.FC = () => {
  const theme = useTheme()

  return (
    <Box 
      className="w-full max-w-7xl mx-auto px-4"
      sx={{
        '& .navigation-menu': {
          backgroundColor: theme.palette.background.paper,
          borderRadius: '8px',
          boxShadow: theme.shadows[1],
        },
        '& .navigation-menu-trigger': {
          backgroundColor: theme.palette.background.paper,
          color: theme.palette.text.primary,
          border: `1px solid ${theme.palette.divider}`,
          '&:hover': {
            backgroundColor: theme.palette.action.hover,
          },
        },
        '& .navigation-menu-content': {
          backgroundColor: theme.palette.background.paper,
          border: `1px solid ${theme.palette.divider}`,
          boxShadow: theme.shadows[4],
        },
        '& .navigation-menu-link': {
          color: theme.palette.text.primary,
          '&:hover': {
            backgroundColor: theme.palette.action.hover,
            color: theme.palette.primary.main,
          },
        },
      }}
    >
      <NavigationMenu viewport={false}>
        <NavigationMenuList className="flex flex-wrap justify-center gap-2">
          {categories.map((category) => (
            <NavigationMenuItem key={category.title}>
              <NavigationMenuTrigger 
                className="h-9 px-4 py-2"
                style={{
                  backgroundColor: theme.palette.background.paper,
                  color: theme.palette.text.primary,
                  border: `1px solid ${theme.palette.divider}`,
                }}
              >
                <div className="flex items-center gap-2">
                  <Box 
                    component="span" 
                    sx={{ 
                      color: theme.palette.primary.main,
                      display: 'flex',
                      alignItems: 'center'
                    }}
                  >
                    {category.icon}
                  </Box>
                  <span>{category.title}</span>
                </div>
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul 
                  className="grid w-[400px] gap-3 p-4 md:w-[400px] md:grid-cols-2 lg:w-[400px]"
                  style={{
                    backgroundColor: theme.palette.background.paper,
                    borderRadius: '8px',
                  }}
                >
                  {category.items.map((item) => (
                    <li key={item.name}>
                      <NavigationMenuLink asChild>
                        <Box
                          component="a"
                          href={item.href}
                          className={cn(
                            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors",
                            "flex items-center gap-2"
                          )}
                          sx={{
                            color: theme.palette.text.primary,
                            '&:hover': {
                              backgroundColor: theme.palette.action.hover,
                              color: theme.palette.primary.main,
                            },
                          }}
                        >
                          <div 
                            className="text-sm font-medium leading-none"
                            style={{
                              color: theme.palette.text.primary,
                            }}
                          >
                            {item.name}
                          </div>
                        </Box>
                      </NavigationMenuLink>
                    </li>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
    </Box>
  )
}

export default CategoriesMenu