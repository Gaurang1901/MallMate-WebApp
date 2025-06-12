import React from 'react';
import { Box, Typography, TextField, Button, useTheme, useMediaQuery, IconButton, Divider, InputAdornment } from '@mui/material';
import { Facebook, Instagram, Twitter, Mail } from 'lucide-react';
import { motion } from 'framer-motion';

const columnVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, type: 'spring' },
  }),
};

const bottomBarVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { delay: 0.6, duration: 0.6 } },
};

const Footer: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box
      component="footer"
      className="w-full border-t"
      sx={{
        bgcolor: theme.palette.background.default,
        color: theme.palette.text.primary,
        borderColor: theme.palette.divider,
        pt: 6,
        pb: 2,
      }}
    >
      <div className="container mx-auto px-4">
        <Box
          className="grid grid-cols-1 md:grid-cols-4 gap-8 shadow-lg rounded-2xl p-6 mb-8"
          sx={{
            bgcolor: theme.palette.background.paper,
            boxShadow: theme.shadows[isMobile ? 1 : 4],
            borderRadius: 4,
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
            <Box className="p-0 md:p-2">
              <Typography variant="h6" className="font-bold mb-3 tracking-wide">
                Explore
              </Typography>
              <ul className="space-y-3 mt-2">
                <li><a href="/shop" className="transition-colors hover:text-primary hover:bg-secondary p-1 rounded-sm font-medium">Shop All</a></li>
                <li><a href="#" className="transition-colors hover:text-primary hover:bg-secondary p-1 rounded-sm font-medium">Categories</a></li>
                <li><a href="/about" className="transition-colors hover:text-primary hover:bg-secondary p-1 rounded-sm font-medium">About</a></li>
              </ul>
            </Box>
          </motion.div>
          {/* Quick Links */}
          <motion.div
            custom={1}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={columnVariants}
          >
            <Box className="p-0 md:p-2">
              <Typography variant="h6" className="font-bold mb-3 tracking-wide">Quick Links</Typography>
              <ul className="space-y-3 mt-2">
                <li><a href="#" className="transition-colors hover:text-primary hover:bg-secondary p-1 rounded-sm font-medium">Summer Style</a></li>
                <li><a href="#" className="transition-colors hover:text-primary hover:bg-secondary p-1 rounded-sm font-medium">Back to School</a></li>
                <li><a href="#" className="transition-colors hover:text-primary hover:bg-secondary p-1 rounded-sm font-medium">Luxury Finds</a></li>
              </ul>
            </Box>
          </motion.div>
          {/* Customer Service */}
          <motion.div
            custom={2}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={columnVariants}
          >
            <Box className="p-0 md:p-2">
              <Typography variant="h6" className="font-bold mb-3 tracking-wide">Customer Service</Typography>
              <ul className="space-y-3 mt-2">
                <li><a href="/contact" className="transition-colors hover:text-primary hover:bg-secondary p-1 rounded-sm font-medium">Contact Us</a></li>
                <li><a href="#" className="transition-colors hover:text-primary hover:bg-secondary p-1 rounded-sm font-medium">FAQ</a></li>
              </ul>
            </Box>
          </motion.div>
          {/* Stay Connected */}
          <motion.div
            custom={3}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={columnVariants}
          >
            <Box className="flex flex-col gap-3 justify-between p-0 md:p-2">
              <Typography variant="h6" className="font-bold mb-3 tracking-wide">Stay Connected</Typography>
              <Typography variant="body2" className="mb-4 text-sm">Subscribe to our newsletter for the latest news and exclusive offers.</Typography>
              <form className="flex flex-col gap-3">
                <TextField
                  variant="outlined"
                  placeholder="Enter your email"
                  size="small"
                  sx={{
                    bgcolor: theme.palette.background.default,
                    input: { color: theme.palette.text.primary },
                    borderRadius: 2,
                    flex: 1,
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Mail size={18} style={{ color: theme.palette.text.secondary }} />
                      </InputAdornment>
                    ),
                  }}
                />
                <Button
                  variant="contained"
                  sx={{
                    bgcolor: theme.palette.primary.main,
                    color: theme.palette.primary.contrastText,
                    minWidth: 120,
                    borderRadius: 2,
                    fontWeight: 600,
                    letterSpacing: 1,
                    boxShadow: theme.shadows[1],
                    '&:hover': {
                      bgcolor: theme.palette.primary.dark,
                    },
                  }}
                >
                  Subscribe
                </Button>
              </form>
            </Box>
          </motion.div>
        </Box>
        <Divider sx={{ mb: 2, borderColor: theme.palette.divider }} />
        {/* Bottom bar */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={bottomBarVariants}
        >
          <Box className="flex flex-col md:flex-row items-center justify-between gap-2 pt-2" sx={{ borderColor: theme.palette.divider }}>
            <Typography variant="body2" className="mb-2 md:mb-0" sx={{ fontWeight: 500 }}>
              © {new Date().getFullYear()} MallMate. All rights reserved.
            </Typography>
            <div className="flex gap-6 mb-2 md:mb-0">
              <a href="#" className="hover:underline transition-colors hover:text-primary">Terms and Conditions</a>
              <a href="#" className="hover:underline transition-colors hover:text-primary">Privacy Policy</a>
            </div>
            <div className="flex gap-2">
              <IconButton href="#" size="small" sx={{ color: theme.palette.text.primary, transition: 'color 0.2s', '&:hover': { color: theme.palette.primary.main } }}><Facebook size={20} /></IconButton>
              <IconButton href="#" size="small" sx={{ color: theme.palette.text.primary, transition: 'color 0.2s', '&:hover': { color: theme.palette.primary.main } }}><Instagram size={20} /></IconButton>
              <IconButton href="#" size="small" sx={{ color: theme.palette.text.primary, transition: 'color 0.2s', '&:hover': { color: theme.palette.primary.main } }}><Twitter size={20} /></IconButton>
            </div>
          </Box>
        </motion.div>
      </div>
    </Box>
  );
};

export default Footer; 