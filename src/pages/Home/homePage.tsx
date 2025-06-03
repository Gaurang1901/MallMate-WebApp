import React, { useState, useEffect } from "react";
import CategoriesMenu from "./components/CategoriesMenu";
import { motion, AnimatePresence } from "framer-motion";
import { Search, MapPin, Clock, Store, Users, Star } from "lucide-react";
import { useTheme } from "@mui/material/styles";
import { Box, useMediaQuery } from "@mui/material";
import ProductCarousel from "./components/ProductCarousel";

// Import background images
import bg1 from "../../assets/Shopping-Mall-Home-Bg-1.png";
import bg2 from "../../assets/Shopping-Mall-Home-Bg-2.png";
import bg3 from "../../assets/Shopping-Mall-Home-Bg-3.png";
import bg4 from "../../assets/Shopping-Mall-Home-Bg-4.png";
import bg5 from "../../assets/Shopping-Mall-Home-Bg-5.png";
import Footer from "../../shared/components/Footer";

const backgrounds = [bg1, bg2, bg3, bg4, bg5];

const HomePage: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % backgrounds.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Box
      className="min-h-screen"
      sx={{
        bgcolor: theme.palette.background.default,
        color: theme.palette.text.primary,
      }}
    >
      {/* Hero Section */}
      <section className="relative h-[60vh] overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImageIndex}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0"
              style={{
                backgroundImage: `url(${backgrounds[currentImageIndex]})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
            <Box
              className="absolute inset-0"
              sx={{
                bgcolor:
                  theme.palette.mode === "dark"
                    ? "rgba(0, 0, 0, 0.5)"
                    : "rgba(0, 0, 0, 0.3)",
                background: `linear-gradient(to right, ${theme.palette.primary.main}33, ${theme.palette.primary.main}11, ${theme.palette.background.default}33)`,
              }}
            />
          </motion.div>
        </AnimatePresence>
        <div className="relative container mx-auto px-4 h-full flex flex-col items-center justify-center text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{
              color: theme.palette.text.primary,
              fontSize: isMobile ? "2rem" : "3.75rem",
            }}
            className="font-bold mb-6"
          >
            Welcome to MallMate
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            style={{
              color: theme.palette.text.disabled,
              fontSize: isMobile ? "1rem" : "1.25rem",
            }}
            className="mb-8 max-w-2xl"
          >
            Your one-stop destination for shopping, dining, and entertainment
          </motion.p>
        </div>
      </section>

      {/* Categories Section */}
      <Box
        component="section"
        className="py-12"
        sx={{ bgcolor: theme.palette.background.default }}
      >
        <div className="container mx-auto px-4">
          <h2
            className="text-2xl font-semibold mb-8 text-center"
            style={{ color: theme.palette.text.primary }}
          >
            Browse Categories
          </h2>
          <CategoriesMenu />
        </div>
      </Box>

      {/* Product Carousel Section */}
      <ProductCarousel />

      {/* Features Section */}
      <Box
        component="section"
        className="py-16"
        sx={{
          bgcolor:
            theme.palette.mode === "dark"
              ? "rgba(255, 255, 255, 0.05)"
              : "rgba(0, 0, 0, 0.02)",
        }}
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: MapPin,
                title: "Easy Navigation",
                description:
                  "Find your way around the mall with our interactive map and store locator",
              },
              {
                icon: Clock,
                title: "Real-time Updates",
                description:
                  "Stay informed about store hours, events, and special offers",
              },
              {
                icon: Search,
                title: "Smart Search",
                description:
                  "Quickly find what you're looking for with our advanced search feature",
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="flex flex-col items-center text-center p-6 rounded-lg"
                style={{
                  backgroundColor: theme.palette.background.paper,
                  border: `1px solid ${theme.palette.divider}`,
                }}
              >
                <feature.icon
                  className="w-12 h-12 mb-4"
                  style={{ color: theme.palette.primary.main }}
                />
                <h3
                  className="text-xl font-semibold mb-2"
                  style={{ color: theme.palette.text.primary }}
                >
                  {feature.title}
                </h3>
                <p
                  className="text-muted-foreground"
                  style={{ color: theme.palette.text.secondary }}
                >
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </Box>

      {/* Stats Section */}
      <Box
        component="section"
        className="py-16"
        sx={{ bgcolor: theme.palette.background.default }}
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Store, value: "200+", label: "Stores" },
              { icon: Users, value: "50k+", label: "Visitors" },
              { icon: Star, value: "4.8", label: "Rating" },
              { icon: Clock, value: "24/7", label: "Support" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex flex-col items-center p-6 rounded-lg"
                style={{
                  backgroundColor: theme.palette.background.paper,
                  border: `1px solid ${theme.palette.divider}`,
                }}
              >
                <stat.icon
                  className="w-8 h-8 mb-2"
                  style={{ color: theme.palette.primary.main }}
                />
                <h4
                  className="text-2xl font-bold"
                  style={{ color: theme.palette.text.primary }}
                >
                  {stat.value}
                </h4>
                <p
                  className="text-sm"
                  style={{ color: theme.palette.text.secondary }}
                >
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </Box>

      {/* Upcoming Events Section */}
      <Box
        component="section"
        className="py-16"
        sx={{
          bgcolor:
            theme.palette.mode === "dark"
              ? "rgba(255, 255, 255, 0.05)"
              : "rgba(0, 0, 0, 0.02)",
        }}
      >
        <div className="container mx-auto px-4">
          <h2
            className="text-2xl font-semibold mb-8 text-center"
            style={{ color: theme.palette.text.primary }}
          >
            Upcoming Events
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="rounded-lg overflow-hidden"
              style={{
                backgroundColor: theme.palette.background.paper,
                border: `1px solid ${theme.palette.divider}`,
              }}
            >
              <div
                className="aspect-video"
                style={{
                  backgroundColor:
                    theme.palette.mode === "dark"
                      ? "rgba(255, 255, 255, 0.1)"
                      : "rgba(0, 0, 0, 0.1)",
                }}
              />
              <div className="p-4">
                <h3
                  className="font-semibold mb-2"
                  style={{ color: theme.palette.text.primary }}
                >
                  Summer Fashion Show
                </h3>
                <p
                  className="text-sm mb-4"
                  style={{ color: theme.palette.text.secondary }}
                >
                  Join us for the latest fashion trends and exclusive
                  collections
                </p>
                <div
                  className="flex items-center text-sm"
                  style={{ color: theme.palette.text.secondary }}
                >
                  <Clock className="w-4 h-4 mr-2" />
                  <span>June 15, 2024 • 2:00 PM</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </Box>
      <Footer />
    </Box>
  );
};

export default HomePage;
