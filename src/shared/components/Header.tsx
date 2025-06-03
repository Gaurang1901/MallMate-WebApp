import React, { useState } from "react";
import {
  IconButton,
  useTheme,
  Avatar,
  Box,
  Typography,
  Button,
  Tooltip,
  Badge,
} from "@mui/material";
import { 
  HelpCircle,
  Moon,
  Sun,
  Search,
  UserCircle,
  Menu,
  Home,
  Info,
  UserPlus,
  Bell
} from "lucide-react";
import { Sidebar } from "./Sidebar";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const MotionBox = motion(Box);
const MotionButton = motion(Button);
const MotionIconButton = motion(IconButton);

interface HeaderProps {
  onThemeToggle: () => void;
  currentMode: "light" | "dark";
  isLoggedIn?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  onThemeToggle,
  currentMode,
  isLoggedIn = false,
}) => {
  const theme = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const headerLinks = [
    { id: 1, name: "Home", route: "/home", icon: <Home /> },
    { id: 2, name: "Contact", route: "/contact", icon: <HelpCircle /> },
    { id: 3, name: "About", route: "/about", icon: <Info /> },
    { id: 4, name: "SignUp", route: "/signup", icon: <UserPlus /> },
  ];

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
      },
    },
  };

  return (
    <>
      <motion.header
        className="sticky top-0 z-50 w-full backdrop-blur-sm bg-opacity-80"
        style={{
          backgroundColor: `${theme.palette.background.paper}CC`,
          borderBottom: `1px solid ${theme.palette.divider}`,
        }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo Section */}
            <MotionBox
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
              }}
              variants={itemVariants}
              whileHover={{
                scale: 1.1,
                rotate: [0, -5, 5, -5, 0],
                transition: {
                  rotate: {
                    duration: 0.5,
                    ease: "easeInOut",
                  },
                },
              }}
            >
              <img
                src="/src/assets/MallMate-Icon-Transperant.png"
                alt="logo"
                className="w-10 h-10 md:hidden"
              />
              <Typography
                variant="h5"
                sx={{
                  color: theme.palette.text.primary,
                  fontWeight: 700,
                  fontFamily: "Manrope",
                  display: { xs: "none", md: "block" },
                }}
              >
                MallMate
              </Typography>
            </MotionBox>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1">
              {headerLinks.map((item) => (
                <MotionButton
                  key={item.id}
                  onClick={() => navigate(item.route)}
                  startIcon={item.icon}
                  variants={itemVariants}
                  whileHover={{
                    scale: 1.1,
                    backgroundColor: theme.palette.action.hover,
                    y: -2,
                  }}
                  whileTap={{ scale: 0.95 }}
                  sx={{
                    color: theme.palette.text.primary,
                    borderRadius: 2,
                    px: 2,
                    py: 1,
                    textTransform: "none",
                    fontFamily: "Manrope",
                    fontWeight: 500,
                  }}
                >
                  {item.name}
                </MotionButton>
              ))}
            </nav>

            {/* Right Section Icons */}
            <MotionBox
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
              variants={itemVariants}
            >
              <Tooltip
                title={`Switch to ${
                  currentMode === "dark" ? "light" : "dark"
                } mode`}
              >
                <MotionIconButton
                  onClick={onThemeToggle}
                  whileHover={{
                    scale: 1.2,
                    rotate: 180,
                    transition: {
                      rotate: {
                        duration: 0.5,
                        ease: "easeInOut",
                      },
                    },
                  }}
                  whileTap={{ scale: 0.9 }}
                  sx={{
                    color: theme.palette.text.primary,
                    "&:hover": {
                      backgroundColor: theme.palette.action.hover,
                    },
                  }}
                >
                  {currentMode === "dark" ? (
                    <Moon />
                  ) : (
                    <Sun />
                  )}
                </MotionIconButton>
              </Tooltip>

              <Tooltip title="Search">
                <MotionIconButton
                  whileHover={{
                    scale: 1.2,
                    y: -2,
                  }}
                  whileTap={{ scale: 0.9 }}
                  sx={{
                    color: theme.palette.text.primary,
                    display: { xs: "none", md: "flex" },
                    "&:hover": {
                      backgroundColor: theme.palette.action.hover,
                    },
                  }}
                >
                  <Search />
                </MotionIconButton>
              </Tooltip>

              {isLoggedIn ? (
                <>
                  <Tooltip title="Notifications">
                    <MotionIconButton
                      whileHover={{
                        scale: 1.2,
                        y: -2,
                      }}
                      whileTap={{ scale: 0.9 }}
                      sx={{
                        color: theme.palette.text.primary,
                        display: { xs: "none", md: "flex" },
                        "&:hover": {
                          backgroundColor: theme.palette.action.hover,
                        },
                      }}
                    >
                      <Badge badgeContent={3} color="error">
                        <Bell />
                      </Badge>
                    </MotionIconButton>
                  </Tooltip>
                  <Tooltip title="Profile">
                    <MotionIconButton
                      whileHover={{
                        scale: 1.2,
                        y: -2,
                      }}
                      whileTap={{ scale: 0.9 }}
                      sx={{
                        color: theme.palette.text.primary,
                        display: { xs: "none", md: "flex" },
                        "&:hover": {
                          backgroundColor: theme.palette.action.hover,
                        },
                      }}
                    >
                      <Avatar
                        sx={{
                          width: 32,
                          height: 32,
                          bgcolor: theme.palette.primary.main,
                        }}
                      />
                    </MotionIconButton>
                  </Tooltip>
                </>
              ) : (
                <Tooltip title="Sign In">
                  <MotionIconButton
                    whileHover={{
                      scale: 1.2,
                      y: -2,
                    }}
                    whileTap={{ scale: 0.9 }}
                    sx={{
                      color: theme.palette.text.primary,
                      display: { xs: "none", md: "flex" },
                      "&:hover": {
                        backgroundColor: theme.palette.action.hover,
                      },
                    }}
                  >
                    <UserCircle />
                  </MotionIconButton>
                </Tooltip>
              )}

              {/* Mobile Menu Button */}
              <Tooltip title="Menu">
                <MotionIconButton
                  onClick={toggleSidebar}
                  whileHover={{
                    scale: 1.2,
                    rotate: 90,
                    transition: {
                      rotate: {
                        duration: 0.3,
                        ease: "easeInOut",
                      },
                    },
                  }}
                  whileTap={{ scale: 0.9 }}
                  sx={{
                    color: theme.palette.text.primary,
                    display: { xs: 'flex', md: 'none' },
                    "&:hover": {
                      backgroundColor: theme.palette.action.hover,
                    },
                  }}
                >
                  <Menu />
                </MotionIconButton>
              </Tooltip>
            </MotionBox>
          </div>
        </div>
      </motion.header>

      {/* Sidebar Component */}
      <Sidebar
        open={sidebarOpen}
        onClose={toggleSidebar}
        isLoggedIn={isLoggedIn}
      />
    </>
  );
};
