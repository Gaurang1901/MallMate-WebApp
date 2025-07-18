import React from 'react';
import { useTheme, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

const Footer: React.FC = () => {
  const theme = useTheme();
  // const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isDarkMode = theme.palette.mode === 'dark';

  const columnVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
      },
    }),
  };

  return (
    <footer className={`py-12 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-4">
        <div
          className={`grid grid-cols-1 md:grid-cols-4 gap-8 rounded-2xl p-8 mb-8 ${
            isDarkMode 
              ? 'bg-gray-800/50 backdrop-blur-sm border border-gray-700/50' 
              : 'bg-white shadow-lg border border-gray-100'
          }`}
        >
          {/* Explore */}
          <motion.div
            custom={0}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={columnVariants}
          >
            <div className="p-0 md:p-2">
              <Typography 
                variant="h6" 
                className={`font-bold mb-3 tracking-wide ${
                  isDarkMode ? 'text-gray-100' : 'text-gray-900'
                }`}
              >
                Explore
              </Typography>
              <ul className="space-y-3 mt-2">
                <li>
                  <a 
                    href="/shop" 
                    className={`transition-colors p-1 rounded-sm font-medium ${
                      isDarkMode 
                        ? 'text-gray-300 hover:text-primary-400 hover:bg-gray-700/50' 
                        : 'text-gray-600 hover:text-primary-600 hover:bg-gray-100'
                    }`}
                  >
                    Shop All
                  </a>
                </li>
                <li>
                  <a 
                    href="#" 
                    className={`transition-colors p-1 rounded-sm font-medium ${
                      isDarkMode 
                        ? 'text-gray-300 hover:text-primary-400 hover:bg-gray-700/50' 
                        : 'text-gray-600 hover:text-primary-600 hover:bg-gray-100'
                    }`}
                  >
                    Categories
                  </a>
                </li>
                <li>
                  <a 
                    href="/about" 
                    className={`transition-colors p-1 rounded-sm font-medium ${
                      isDarkMode 
                        ? 'text-gray-300 hover:text-primary-400 hover:bg-gray-700/50' 
                        : 'text-gray-600 hover:text-primary-600 hover:bg-gray-100'
                    }`}
                  >
                    About
                  </a>
                </li>
              </ul>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            custom={1}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={columnVariants}
          >
            <div className="p-0 md:p-2">
              <Typography 
                variant="h6" 
                className={`font-bold mb-3 tracking-wide ${
                  isDarkMode ? 'text-gray-100' : 'text-gray-900'
                }`}
              >
                Quick Links
              </Typography>
              <ul className="space-y-3 mt-2">
                <li>
                  <a 
                    href="/faq" 
                    className={`transition-colors p-1 rounded-sm font-medium ${
                      isDarkMode 
                        ? 'text-gray-300 hover:text-primary-400 hover:bg-gray-700/50' 
                        : 'text-gray-600 hover:text-primary-600 hover:bg-gray-100'
                    }`}
                  >
                    FAQ
                  </a>
                </li>
                <li>
                  <a 
                    href="/contact" 
                    className={`transition-colors p-1 rounded-sm font-medium ${
                      isDarkMode 
                        ? 'text-gray-300 hover:text-primary-400 hover:bg-gray-700/50' 
                        : 'text-gray-600 hover:text-primary-600 hover:bg-gray-100'
                    }`}
                  >
                    Contact
                  </a>
                </li>
                <li>
                  <a 
                    href="/terms" 
                    className={`transition-colors p-1 rounded-sm font-medium ${
                      isDarkMode 
                        ? 'text-gray-300 hover:text-primary-400 hover:bg-gray-700/50' 
                        : 'text-gray-600 hover:text-primary-600 hover:bg-gray-100'
                    }`}
                  >
                    Terms & Conditions
                  </a>
                </li>
              </ul>
            </div>
          </motion.div>

          {/* Contact */}
          <motion.div
            custom={2}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={columnVariants}
          >
            <div className="p-0 md:p-2">
              <Typography 
                variant="h6" 
                className={`font-bold mb-3 tracking-wide ${
                  isDarkMode ? 'text-gray-100' : 'text-gray-900'
                }`}
              >
                Contact Us
              </Typography>
              <ul className="space-y-3 mt-2">
                <li className={`transition-colors p-1 rounded-sm font-medium ${
                  isDarkMode 
                    ? 'text-gray-300 hover:text-primary-400 hover:bg-gray-700/50' 
                    : 'text-gray-600 hover:text-primary-600 hover:bg-gray-100'
                }`}>
                  Email: info@mallmate.com
                </li>
                <li className={`transition-colors p-1 rounded-sm font-medium ${
                  isDarkMode 
                    ? 'text-gray-300 hover:text-primary-400 hover:bg-gray-700/50' 
                    : 'text-gray-600 hover:text-primary-600 hover:bg-gray-100'
                }`}>
                  Phone: +1 (555) 123-4567
                </li>
                <li className={`transition-colors p-1 rounded-sm font-medium ${
                  isDarkMode 
                    ? 'text-gray-300 hover:text-primary-400 hover:bg-gray-700/50' 
                    : 'text-gray-600 hover:text-primary-600 hover:bg-gray-100'
                }`}>
                  Address: 123 Mall Street, City, Country
                </li>
              </ul>
            </div>
          </motion.div>

          {/* Social Media */}
          <motion.div
            custom={3}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={columnVariants}
          >
            <div className="p-0 md:p-2">
              <Typography 
                variant="h6" 
                className={`font-bold mb-3 tracking-wide ${
                  isDarkMode ? 'text-gray-100' : 'text-gray-900'
                }`}
              >
                Follow Us
              </Typography>
              <div className="flex space-x-4 mt-2">
                <a
                  href="#"
                  className={`transition-all duration-300 p-2 rounded-full hover:scale-110 ${
                    isDarkMode 
                      ? 'text-gray-300 hover:text-primary-400 hover:bg-gray-700/50' 
                      : 'text-gray-600 hover:text-primary-600 hover:bg-gray-100'
                  }`}
                  aria-label="Facebook"
                >
                  <Facebook size={24} />
                </a>
                <a
                  href="#"
                  className={`transition-all duration-300 p-2 rounded-full hover:scale-110 ${
                    isDarkMode 
                      ? 'text-gray-300 hover:text-primary-400 hover:bg-gray-700/50' 
                      : 'text-gray-600 hover:text-primary-600 hover:bg-gray-100'
                  }`}
                  aria-label="Twitter"
                >
                  <Twitter size={24} />
                </a>
                <a
                  href="#"
                  className={`transition-all duration-300 p-2 rounded-full hover:scale-110 ${
                    isDarkMode 
                      ? 'text-gray-300 hover:text-primary-400 hover:bg-gray-700/50' 
                      : 'text-gray-600 hover:text-primary-600 hover:bg-gray-100'
                  }`}
                  aria-label="Instagram"
                >
                  <Instagram size={24} />
                </a>
                <a
                  href="#"
                  className={`transition-all duration-300 p-2 rounded-full hover:scale-110 ${
                    isDarkMode 
                      ? 'text-gray-300 hover:text-primary-400 hover:bg-gray-700/50' 
                      : 'text-gray-600 hover:text-primary-600 hover:bg-gray-100'
                  }`}
                  aria-label="YouTube"
                >
                  <Youtube size={24} />
                </a>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="text-center">
          <Typography 
            variant="body2" 
            className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}
          >
            © {new Date().getFullYear()} MallMate. All rights reserved.
          </Typography>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 