import React from "react";
import { useTheme } from "@mui/material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const categories = [
  {
    title: "Fashion",
    href: "/category/fashion",
    image:
      "https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=1000",
  },
  {
    title: "Food & Dining",
    href: "/category/food-dining",
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1000",
  },
  {
    title: "Entertainment",
    href: "/category/entertainment",
    image:
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1000",
  },
  {
    title: "Books & Stationery",
    href: "/category/books-stationery",
    image:
      "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=1000",
  },
  {
    title: "Health & Beauty",
    href: "/category/health-beauty",
    image:
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1000",
  },
  {
    title: "Gifts & Souvenirs",
    href: "/category/gifts-souvenirs",
    image:
      "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?q=80&w=1000",
  },
];

const CategoriesMenu: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const handleCategoryClick = (categoryId: string) => {
    navigate(`/category/${categoryId}`);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category: any) => (
          <motion.div
            key={category.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div
              className="relative h-64 rounded-xl overflow-hidden group cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              onClick={() => handleCategoryClick(category.id)}
              style={{
                boxShadow: theme.shadows[2],
              }}
            >
              {/* Background Image */}
              <img
                src={category.image}
                alt={category.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />

              {/* Overlay */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    theme.palette.mode === "dark"
                      ? "linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0.4))"
                      : "linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0.3))",
                }}
              />

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-6">
                <h3 className="text-xl font-semibold text-white mb-2">
                  {category.title}
                </h3>
                <p className="text-sm text-gray-200">{category.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CategoriesMenu;
