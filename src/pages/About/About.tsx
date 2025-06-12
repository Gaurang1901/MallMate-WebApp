import React from 'react';
import {
  Box,
  Container,
  Typography,
  useTheme,
} from '@mui/material';
import { motion } from 'framer-motion';
import { Target, Users, Heart, Star } from 'lucide-react';

const MotionBox = motion(Box);

const About: React.FC = () => {
  const theme = useTheme();

  const features = [
    {
      icon: <Target size={32} />,
      title: 'Our Mission',
      description: 'To revolutionize the shopping experience by connecting shoppers with their favorite stores in a seamless, efficient, and enjoyable way.',
    },
    {
      icon: <Users size={32} />,
      title: 'Our Team',
      description: 'A dedicated group of professionals passionate about creating the best shopping experience for our users.',
    },
    {
      icon: <Heart size={32} />,
      title: 'Our Values',
      description: 'Innovation, customer satisfaction, and community building are at the heart of everything we do.',
    },
    {
      icon: <Star size={32} />,
      title: 'Our Promise',
      description: 'To provide a reliable, user-friendly platform that makes shopping more convenient and enjoyable.',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: (index: number) => ({
      opacity: 0,
      x: index % 2 === 0 ? -100 : 100,
    }),
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 20,
      },
    },
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: theme.palette.mode === 'dark'
          ? 'linear-gradient(135deg, #1a1a1a 0%, #2d1b36 100%)'
          : 'linear-gradient(135deg, #f5f5f5 0%, #e8e8e8 100%)',
        py: 8,
      }}
    >
      <Container maxWidth="lg">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <Box sx={{ textAlign: 'center', mb: 8 }}>
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
                About MallMate
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
                Your Ultimate Shopping Companion
              </Typography>
            </motion.div>
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, alignItems: 'center' }}>
            {features.map((feature, index) => (
              <MotionBox
                key={index}
                custom={index}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                sx={{
                  width: '100%', // Full width for all screen sizes
                  maxWidth: '600px', // Optional: limit max width for better readability on large screens
                  height: 'auto',
                  p: 4,
                  borderRadius: 4,
                  background: theme.palette.mode === 'dark'
                    ? 'rgba(45, 27, 54, 0.8)'
                    : 'rgba(255, 255, 255, 0.9)',
                  backdropFilter: 'blur(10px)',
                  border: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
                  boxShadow: theme.palette.mode === 'dark'
                    ? '0 8px 32px rgba(0, 0, 0, 0.3)'
                    : '0 8px 32px rgba(0, 0, 0, 0.1)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: theme.palette.mode === 'dark'
                      ? '0 12px 40px rgba(0, 0, 0, 0.4)'
                      : '0 12px 40px rgba(0, 0, 0, 0.15)',
                  },
                }}
              >
                  <Box
                    sx={{
                      color: theme.palette.primary.main,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 80,
                      height: 80,
                      borderRadius: '50%',
                      background: theme.palette.mode === 'dark'
                        ? 'rgba(144, 202, 249, 0.15)'
                        : 'rgba(25, 118, 210, 0.15)',
                      mb: 3,
                    }}
                  >
                    {feature.icon}
                  </Box>
                  <Typography
                    variant="h5"
                    component="h3"
                    sx={{
                      fontWeight: 600,
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
                    {feature.title}
                  </Typography>
                  <Typography color="text.secondary">
                    {feature.description}
                  </Typography>
                </MotionBox>
            ))}
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
};

export default About; 