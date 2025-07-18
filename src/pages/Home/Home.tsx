import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Typography, Button, useTheme } from "@mui/material";
import { ArrowRight, TrendingUp, Star, Clock, Shield } from "lucide-react";
import CategoriesMenu from "./components/CategoriesMenu";
import FeaturedProducts from "./components/FeaturedProducts";
import NewArrivals from "./components/NewArrivals";
import BestSellers from "./components/BestSellers";
import bg1 from "../../assets/Shopping-Mall-Home-Bg-1.png";
import bg2 from "../../assets/Shopping-Mall-Home-Bg-2.png";
import bg3 from "../../assets/Shopping-Mall-Home-Bg-3.png";
import bg4 from "../../assets/Shopping-Mall-Home-Bg-4.png";
import bg5 from "../../assets/Shopping-Mall-Home-Bg-5.png";
import Footer from "@/shared/components/Footer";

// Mock background images - replace with your actual images
const backgrounds = [bg1, bg2, bg3, bg4, bg5];

const Home: React.FC = () => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % backgrounds.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className={`min-h-screen ${isDarkMode ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' : 'bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50'}`}>
        {/* Hero Section */}
        <section className="relative py-28 overflow-hidden">
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
              <div className={`absolute inset-0 ${
                isDarkMode 
                  ? 'bg-gradient-to-r from-gray-900/60 via-gray-900/40 to-gray-900/60 backdrop-blur-[2px]'
                  : 'bg-white/60'
              }`} />
            </motion.div>
          </AnimatePresence>
          <div className="max-w-7xl mx-auto px-4 relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center max-w-2xl mx-auto"
            >
              <Typography
                variant="h2"
                sx={{
                  fontWeight: 800,
                  fontSize: { xs: "2rem", md: "3rem" },
                  background: "linear-gradient(45deg, #90caf9 30%, #ce93d8 90%)",
                  backgroundClip: "text",
                  textFillColor: "transparent",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  mb: 2,
                }}
              >
                Discover Your Style
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  color: isDarkMode ? "text.secondary" : "text.primary",
                  mb: 6,
                  opacity: 0.9,
                  lineHeight: 1.6,
                  fontSize: { xs: "1rem", md: "1.25rem" },
                }}
              >
                Explore our curated collection of premium products, designed to
                elevate your shopping experience.
              </Typography>
              <Button
                variant="contained"
                size="large"
                endIcon={<ArrowRight />}
                sx={{
                  py: 1.5,
                  px: 4,
                  borderRadius: 2,
                  textTransform: "none",
                  fontSize: "1rem",
                  fontWeight: 600,
                  background: "linear-gradient(45deg, #90caf9 30%, #ce93d8 90%)",
                  "&:hover": {
                    background: "linear-gradient(45deg, #90caf9 40%, #ce93d8 100%)",
                  },
                }}
              >
                Shop Now
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section className={`py-16 ${isDarkMode ? 'bg-gray-800/50' : 'bg-gray-100/50'} backdrop-blur-sm`}>
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className={`rounded-2xl p-6 backdrop-blur-sm border ${
                  isDarkMode 
                    ? 'bg-gray-800/50 border-gray-700/50 hover:border-primary-500/50' 
                    : 'bg-white border-gray-200 hover:border-primary-500/50'
                } transition-colors duration-300`}
              >
                <div className="p-3 rounded-xl bg-primary-500/10 w-fit mb-4">
                  <TrendingUp className="text-primary-500" size={24} />
                </div>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1, color: isDarkMode ? 'text.primary' : 'text.primary' }}>
                  Trending Products
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: isDarkMode ? "text.secondary" : "text.primary", opacity: 0.8 }}
                >
                  Discover what's hot and popular right now
                </Typography>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className={`rounded-2xl p-6 backdrop-blur-sm border ${
                  isDarkMode 
                    ? 'bg-gray-800/50 border-gray-700/50 hover:border-primary-500/50' 
                    : 'bg-white border-gray-200 hover:border-primary-500/50'
                } transition-colors duration-300`}
              >
                <div className="p-3 rounded-xl bg-primary-500/10 w-fit mb-4">
                  <Star className="text-primary-500" size={24} />
                </div>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1, color: isDarkMode ? 'text.primary' : 'text.primary' }}>
                  Best Quality
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: isDarkMode ? "text.secondary" : "text.primary", opacity: 0.8 }}
                >
                  Premium products with guaranteed quality
                </Typography>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className={`rounded-2xl p-6 backdrop-blur-sm border ${
                  isDarkMode 
                    ? 'bg-gray-800/50 border-gray-700/50 hover:border-primary-500/50' 
                    : 'bg-white border-gray-200 hover:border-primary-500/50'
                } transition-colors duration-300`}
              >
                <div className="p-3 rounded-xl bg-primary-500/10 w-fit mb-4">
                  <Clock className="text-primary-500" size={24} />
                </div>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1, color: isDarkMode ? 'text.primary' : 'text.primary' }}>
                  Fast Delivery
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: isDarkMode ? "text.secondary" : "text.primary", opacity: 0.8 }}
                >
                  Quick and reliable shipping worldwide
                </Typography>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className={`rounded-2xl p-6 backdrop-blur-sm border ${
                  isDarkMode 
                    ? 'bg-gray-800/50 border-gray-700/50 hover:border-primary-500/50' 
                    : 'bg-white border-gray-200 hover:border-primary-500/50'
                } transition-colors duration-300`}
              >
                <div className="p-3 rounded-xl bg-primary-500/10 w-fit mb-4">
                  <Shield className="text-primary-500" size={24} />
                </div>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1, color: isDarkMode ? 'text.primary' : 'text.primary' }}>
                  Secure Shopping
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: isDarkMode ? "text.secondary" : "text.primary", opacity: 0.8 }}
                >
                  Safe and secure payment options
                </Typography>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className={`py-16 ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
          <div className="max-w-7xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <Typography
                variant="h2"
                sx={{
                  fontWeight: 700,
                  mb: 2,
                  fontSize: { xs: "2rem", md: "2.5rem" },
                  background: "linear-gradient(45deg, #90caf9 30%, #ce93d8 90%)",
                  backgroundClip: "text",
                  textFillColor: "transparent",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Shop by Category
              </Typography>
              <Typography
                variant="h6"
                sx={{ color: isDarkMode ? "text.secondary" : "text.primary", opacity: 0.8 }}
              >
                Browse our wide range of categories
              </Typography>
            </motion.div>
            <CategoriesMenu />
          </div>
        </section>

        {/* Featured Products Section */}
        <section className={`py-16 ${isDarkMode ? 'bg-gray-800/50' : 'bg-gray-100/50'} backdrop-blur-sm`}>
          <div className="max-w-7xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <Typography
                variant="h2"
                sx={{
                  fontWeight: 700,
                  mb: 2,
                  fontSize: { xs: "2rem", md: "2.5rem" },
                  background: "linear-gradient(45deg, #90caf9 30%, #ce93d8 90%)",
                  backgroundClip: "text",
                  textFillColor: "transparent",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Featured Products
              </Typography>
              <Typography
                variant="h6"
                sx={{ color: isDarkMode ? "text.secondary" : "text.primary", opacity: 0.8 }}
              >
                Handpicked products just for you
              </Typography>
            </motion.div>
            <FeaturedProducts />
          </div>
        </section>

        {/* New Arrivals Section */}
        <section className={`py-16 ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
          <div className="max-w-7xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <Typography
                variant="h2"
                sx={{
                  fontWeight: 700,
                  mb: 2,
                  fontSize: { xs: "2rem", md: "2.5rem" },
                  background: "linear-gradient(45deg, #90caf9 30%, #ce93d8 90%)",
                  backgroundClip: "text",
                  textFillColor: "transparent",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                New Arrivals
              </Typography>
              <Typography
                variant="h6"
                sx={{ color: isDarkMode ? "text.secondary" : "text.primary", opacity: 0.8 }}
              >
                Check out our latest products
              </Typography>
            </motion.div>
            <NewArrivals />
          </div>
        </section>

        {/* Best Sellers Section */}
        <section className={`py-16 ${isDarkMode ? 'bg-gray-800/50' : 'bg-gray-100/50'} backdrop-blur-sm`}>
          <div className="max-w-7xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <Typography
                variant="h2"
                sx={{
                  fontWeight: 700,
                  mb: 2,
                  fontSize: { xs: "2rem", md: "2.5rem" },
                  background: "linear-gradient(45deg, #90caf9 30%, #ce93d8 90%)",
                  backgroundClip: "text",
                  textFillColor: "transparent",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Best Sellers
              </Typography>
              <Typography
                variant="h6"
                sx={{ color: isDarkMode ? "text.secondary" : "text.primary", opacity: 0.8 }}
              >
                Our most popular products
              </Typography>
            </motion.div>
            <BestSellers />
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default Home;
