import React from 'react';
import { useTheme, useMediaQuery, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

const Footer: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

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
    <footer
      className="bg-background py-12"
      style={{ backgroundColor: theme.palette.background.default }}
    >
      <div className="container mx-auto px-4">
        <div
          className="grid grid-cols-1 md:grid-cols-4 gap-8 shadow-lg rounded-2xl p-6 mb-8"
          style={{
            backgroundColor: theme.palette.background.paper,
            boxShadow: theme.shadows[isMobile ? 1 : 4],
            borderRadius: 16,
          }}
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
              <Typography variant="h6" className="font-bold mb-3 tracking-wide">
                Explore
              </Typography>
              <ul className="space-y-3 mt-2">
                <li><a href="/shop" className="transition-colors hover:text-primary hover:bg-secondary p-1 rounded-sm font-medium">Shop All</a></li>
                <li><a href="#" className="transition-colors hover:text-primary hover:bg-secondary p-1 rounded-sm font-medium">Categories</a></li>
                <li><a href="/about" className="transition-colors hover:text-primary hover:bg-secondary p-1 rounded-sm font-medium">About</a></li>
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
              <Typography variant="h6" className="font-bold mb-3 tracking-wide">
                Quick Links
              </Typography>
              <ul className="space-y-3 mt-2">
                <li><a href="/faq" className="transition-colors hover:text-primary hover:bg-secondary p-1 rounded-sm font-medium">FAQ</a></li>
                <li><a href="/contact" className="transition-colors hover:text-primary hover:bg-secondary p-1 rounded-sm font-medium">Contact</a></li>
                <li><a href="/terms" className="transition-colors hover:text-primary hover:bg-secondary p-1 rounded-sm font-medium">Terms & Conditions</a></li>
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
              <Typography variant="h6" className="font-bold mb-3 tracking-wide">
                Contact Us
              </Typography>
              <ul className="space-y-3 mt-2">
                <li className="transition-colors hover:text-primary hover:bg-secondary p-1 rounded-sm font-medium">
                  Email: info@mallmate.com
                </li>
                <li className="transition-colors hover:text-primary hover:bg-secondary p-1 rounded-sm font-medium">
                  Phone: +1 (555) 123-4567
                </li>
                <li className="transition-colors hover:text-primary hover:bg-secondary p-1 rounded-sm font-medium">
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
              <Typography variant="h6" className="font-bold mb-3 tracking-wide">
                Follow Us
              </Typography>
              <div className="flex space-x-4 mt-2">
                <a
                  href="#"
                  className="transition-all duration-300 hover:text-primary hover:bg-secondary p-2 rounded-full hover:scale-110"
                  aria-label="Facebook"
                  style={{ color: theme.palette.text.primary }}
                >
                  <Facebook size={24} />
                </a>
                <a
                  href="#"
                  className="transition-all duration-300 hover:text-primary hover:bg-secondary p-2 rounded-full hover:scale-110"
                  aria-label="Twitter"
                  style={{ color: theme.palette.text.primary }}
                >
                  <Twitter size={24} />
                </a>
                <a
                  href="#"
                  className="transition-all duration-300 hover:text-primary hover:bg-secondary p-2 rounded-full hover:scale-110"
                  aria-label="Instagram"
                  style={{ color: theme.palette.text.primary }}
                >
                  <Instagram size={24} />
                </a>
                <a
                  href="#"
                  className="transition-all duration-300 hover:text-primary hover:bg-secondary p-2 rounded-full hover:scale-110"
                  aria-label="YouTube"
                  style={{ color: theme.palette.text.primary }}
                >
                  <Youtube size={24} />
                </a>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="text-center">
          <Typography variant="body2" color="text.secondary">
            © {new Date().getFullYear()} MallMate. All rights reserved.
          </Typography>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 