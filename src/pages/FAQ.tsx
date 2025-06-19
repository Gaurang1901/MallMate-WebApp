import React, { useState } from 'react';
import {
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  useTheme,
  TextField,
  InputAdornment,
} from '@mui/material';
import { motion } from 'framer-motion';
import { ChevronDown, Search } from 'lucide-react';
// import { Search, ExpandMore } from '@mui/icons-material';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

const FAQ: React.FC = () => {
  const theme = useTheme();
  const [searchQuery, setSearchQuery] = useState('');

  // FAQ data
  const faqData = [
    {
      question: 'What is MallMate?',
      answer: 'MallMate is a modern shopping platform that connects users with their favorite stores and brands, offering a seamless shopping experience with advanced features like real-time inventory tracking and personalized recommendations.',
    },
    {
      question: 'How do I track my order?',
      answer: 'You can track your order by logging into your account and visiting the "My Orders" section. Each order has a unique tracking number that you can use to monitor its status in real-time.',
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept various payment methods including credit/debit cards, PayPal, and other major digital payment platforms. All transactions are secure and encrypted.',
    },
    {
      question: 'How can I return a product?',
      answer: 'You can initiate a return within 30 days of purchase. Visit the "Returns" section in your account dashboard, select the item you wish to return, and follow the step-by-step instructions.',
    },
    {
      question: 'Do you ship internationally?',
      answer: 'Yes, we ship to most countries worldwide. Shipping costs and delivery times vary depending on your location. You can check shipping rates during checkout.',
    },
    {
      question: 'How do I contact customer support?',
      answer: 'You can reach our customer support team 24/7 through live chat, email, or phone. Visit the "Contact Us" page for detailed contact information.',
    },
  ];

  // Filter FAQs based on search query
  const filteredFAQs = faqData.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div
      className="min-h-screen py-8"
      style={{
        background: theme.palette.mode === 'dark'
          ? 'linear-gradient(135deg, #1a1a1a 0%, #2d1b36 100%)'
          : 'linear-gradient(135deg, #f5f5f5 0%, #e8e8e8 100%)',
      }}
    >
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <div className="text-center mb-8">
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 100, damping: 20 }}
            >
              <Typography
                variant="h2"
                component="h1"
                sx={{
                  fontWeight: 700,
                  mb: 2,
                  background: theme.palette.mode === 'dark'
                    ? 'linear-gradient(45deg, #90caf9 30%, #ce93d8 90%)'
                    : 'linear-gradient(45deg, #1976d2 30%, #9c27b0 90%)',
                  backgroundClip: 'text',
                  textFillColor: 'transparent',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Frequently Asked Questions
              </Typography>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 100, damping: 20 }}
            >
              <Typography
                variant="h5"
                color="text.secondary"
                sx={{ maxWidth: '800px', mx: 'auto' }}
              >
                Find answers to common questions about MallMate
              </Typography>
            </motion.div>
          </div>

          <div className="mb-8">
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Search questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  backgroundColor: theme.palette.mode === 'dark'
                    ? 'rgba(255, 255, 255, 0.05)'
                    : 'rgba(0, 0, 0, 0.02)',
                  '&:hover': {
                    backgroundColor: theme.palette.mode === 'dark'
                      ? 'rgba(255, 255, 255, 0.08)'
                      : 'rgba(0, 0, 0, 0.04)',
                  },
                },
              }}
            />
          </div>

          <div className="max-w-3xl mx-auto">
            {filteredFAQs.map((faq, index) => (
              <motion.div className='my-2' key={index} variants={itemVariants}>
                <Accordion
                  sx={{
                    mb: 2,
                    borderRadius: '12px !important',
                    overflow: 'hidden',
                    backdropFilter: 'blur(10px)',
                    backgroundColor: theme.palette.mode === 'dark'
                      ? 'rgba(255, 255, 255, 0.05)'
                      : theme.palette.background.paper,
                    border: `1px solid ${theme.palette.mode === 'dark'
                      ? 'rgba(255, 255, 255, 0.1)'
                      : theme.palette.divider}`,
                    '&:before': {
                      display: 'none',
                    },
                    '&:hover': {
                      backgroundColor: theme.palette.mode === 'dark'
                        ? 'rgba(255, 255, 255, 0.08)'
                        : theme.palette.action.hover,
                    },
                    boxShadow: theme.shadows[1],
                    transition: 'all 0.3s ease',
                  }}
                >
                  <AccordionSummary
                    expandIcon={<ChevronDown />}
                    sx={{
                      '&:hover': {
                        backgroundColor: theme.palette.mode === 'dark'
                          ? 'rgba(255, 255, 255, 0.05)'
                          : theme.palette.action.hover,
                      },
                      minHeight: 64,
                      transition: 'all 0.3s ease',
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 600,
                        color: theme.palette.text.primary,
                        fontSize: { xs: '1rem', sm: '1.1rem', md: '1.25rem' },
                      }}
                    >
                      {faq.question}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails
                    sx={{
                      backgroundColor: theme.palette.mode === 'dark'
                        ? 'rgba(0, 0, 0, 0.2)'
                        : theme.palette.grey[50],
                      transition: 'all 0.3s ease',
                    }}
                  >
                    <Typography
                      variant="body1"
                      color="text.secondary"
                      sx={{ lineHeight: 1.7 }}
                    >
                      {faq.answer}
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              </motion.div>
            ))}
          </div>

          {filteredFAQs.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mt-8"
            >
              <Typography
                variant="h6"
                sx={{
                  color: theme.palette.text.secondary,
                }}
              >
                No questions found matching your search.
              </Typography>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default FAQ; 