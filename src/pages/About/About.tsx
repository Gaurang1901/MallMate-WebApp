import React from "react";
import { Typography, useTheme } from "@mui/material";
import { motion } from "framer-motion";
import { Target, Users, Heart, Star } from "lucide-react";

const MotionDiv = motion.div;

const About: React.FC = () => {
  const theme = useTheme();

  const features = [
    {
      icon: <Target size={32} />,
      title: "Our Mission",
      description:
        "To revolutionize the shopping experience by connecting shoppers with their favorite stores in a seamless, efficient, and enjoyable way.",
    },
    {
      icon: <Users size={32} />,
      title: "Our Team",
      description:
        "A dedicated group of professionals passionate about creating the best shopping experience for our users.",
    },
    {
      icon: <Heart size={32} />,
      title: "Our Values",
      description:
        "Innovation, customer satisfaction, and community building are at the heart of everything we do.",
    },
    {
      icon: <Star size={32} />,
      title: "Our Promise",
      description:
        "To provide a reliable, user-friendly platform that makes shopping more convenient and enjoyable.",
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
        type: "spring",
        stiffness: 100,
        damping: 20,
      },
    },
  };

  return (
    <div
      className="min-h-screen py-8"
      style={{
        background:
          theme.palette.mode === "dark"
            ? "linear-gradient(135deg, #1a1a1a 0%, #2d1b36 100%)"
            : "linear-gradient(135deg, #f5f5f5 0%, #e8e8e8 100%)",
      }}
    >
      <div className="container mx-auto px-4 max-w-7xl">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <div className="text-center mb-8">
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
            >
              <Typography
                variant="h2"
                component="h1"
                sx={{
                  fontWeight: 700,
                  mb: 2,
                  background:
                    theme.palette.mode === "dark"
                      ? "linear-gradient(45deg, #90caf9 30%, #ce93d8 90%)"
                      : "linear-gradient(45deg, #1976d2 30%, #9c27b0 90%)",
                  backgroundClip: "text",
                  textFillColor: "transparent",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                About MallMate
              </Typography>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.2,
                type: "spring",
                stiffness: 100,
                damping: 20,
              }}
            >
              <Typography
                variant="h5"
                color="text.secondary"
                sx={{ maxWidth: "800px", mx: "auto" }}
              >
                Your Ultimate Shopping Companion
              </Typography>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:flex md:flex-col items-center justify-center gap-6">
            {features.map((feature, index) => (
              <MotionDiv
                key={index}
                custom={index}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                className="w-full max-w-[800px] p-4 md:col-span-2 rounded-lg flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-2"
                style={{
                  background:
                    theme.palette.mode === "dark"
                      ? "rgba(45, 27, 54, 0.8)"
                      : "rgba(255, 255, 255, 0.9)",
                  backdropFilter: "blur(10px)",
                  border: `1px solid ${
                    theme.palette.mode === "dark"
                      ? "rgba(255, 255, 255, 0.1)"
                      : "rgba(0, 0, 0, 0.1)"
                  }`,
                  boxShadow:
                    theme.palette.mode === "dark"
                      ? "0 8px 32px rgba(0, 0, 0, 0.3)"
                      : "0 8px 32px rgba(0, 0, 0, 0.1)",
                }}
              >
                <div
                  className="flex items-center justify-center w-20 h-20 rounded-full mb-3"
                  style={{
                    color: theme.palette.primary.main,
                    background:
                      theme.palette.mode === "dark"
                        ? "rgba(144, 202, 249, 0.15)"
                        : "rgba(25, 118, 210, 0.15)",
                  }}
                >
                  {feature.icon}
                </div>
                <Typography
                  variant="h5"
                  component="h3"
                  sx={{
                    fontWeight: 600,
                    mb: 2,
                    background:
                      theme.palette.mode === "dark"
                        ? "linear-gradient(45deg, #90caf9 30%, #ce93d8 90%)"
                        : "linear-gradient(45deg, #1976d2 30%, #9c27b0 90%)",
                    backgroundClip: "text",
                    textFillColor: "transparent",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {feature.title}
                </Typography>
                <Typography color="text.secondary">
                  {feature.description}
                </Typography>
              </MotionDiv>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
