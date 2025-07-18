import React, { useState } from "react";
import {
  IconButton,
  useTheme,
  Avatar,
  Box,
  Typography,
  Button,
  Tooltip,
  TextField,
  InputAdornment,
  IconButton as MuiIconButton,
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
  LogOut,
  // Store,
  X,
  ShoppingCart,
} from "lucide-react";
import { Sidebar } from "./Sidebar";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/store";
import { logout } from "../../store/auth.slice";

const MotionBox = motion(Box);
const MotionButton = motion(Button);
const MotionIconButton = motion(IconButton);

interface HeaderProps {
  onThemeToggle: () => void;
  currentMode: "light" | "dark";
}

export const Header: React.FC<HeaderProps> = ({
  onThemeToggle,
  currentMode,
}) => {
  const theme = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const headerLinks = [
    { id: 1, name: "Home", route: "/", icon: <Home /> },
    // { id: 2, name: "Shop All", route: "/shop", icon: <Store /> },
    { id: 3, name: "Contact", route: "/contact", icon: <HelpCircle /> },
    { id: 4, name: "About", route: "/about", icon: <Info /> },
    {
      id: 5,
      name: isLoggedIn ? "Logout" : "SignIn",
      route: isLoggedIn ? "/" : "/signin",
      icon: isLoggedIn ? <LogOut /> : <UserCircle />,
      onClick: isLoggedIn ? handleLogout : undefined,
    },
  ];

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleProfileClick = () => {
    if (isLoggedIn) {
      navigate("/account");
    } else {
      navigate("/signin");
    }
  };

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
        className="sticky top-0 z-50 w-full backdrop-blur-sm bg-opacity-80 overflow-hidden"
        style={{
          backgroundColor: `${theme.palette.background.paper}CC`,
          borderBottom: `1px solid ${theme.palette.divider}`,
        }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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

            <AnimatePresence mode="wait">
              {!showSearchBar ? (
                /* Desktop Navigation */
                <nav
                  className="hidden md:flex items-center space-x-1"
                  key="main-nav"
                >
                  {headerLinks.map((item) => (
                    <MotionButton
                      key={item.id}
                      onClick={item.onClick || (() => navigate(item.route))}
                      startIcon={item.icon}
                      variants={itemVariants}
                      whileHover={{
                        scale: 1.1,
                        backgroundColor: theme.palette.action.hover,
                        y: -2,
                      }}
                      whileTap={{ scale: 0.95 }}
                      sx={{
                        color:
                          item.name === "Logout"
                            ? "error.main"
                            : theme.palette.text.primary,
                        borderRadius: 2,
                        px: 2,
                        py: 1,
                        textTransform: "none",
                        fontFamily: "Manrope",
                        fontWeight: 500,
                        "&:hover": {
                          backgroundColor:
                            item.name === "Logout"
                              ? "error.light"
                              : theme.palette.action.hover,
                        },
                      }}
                    >
                      {item.name}
                    </MotionButton>
                  ))}
                </nav>
              ) : (
                /* Search Bar (conditionally rendered) */
                <MotionBox
                  sx={{
                    flexGrow: 1,
                    ml: { xs: 0, md: 2 },
                    maxWidth: { xs: "100%", md: "50%" },
                  }}
                  initial={{ opacity: 0, scaleX: 0, originX: 0 }}
                  animate={{ opacity: 1, scaleX: 1 }}
                  exit={{ opacity: 0, scaleX: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                    duration: 0.2,
                  }}
                  key="search-bar"
                >
                  <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onBlur={() => setShowSearchBar(false)}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        console.log("Searching for:", searchQuery);
                        setShowSearchBar(false);
                      }
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Search size={20} />
                        </InputAdornment>
                      ),
                      endAdornment: searchQuery && (
                        <InputAdornment position="end">
                          <MuiIconButton onClick={() => setSearchQuery("")}>
                            <X size={20} />
                          </MuiIconButton>
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 2,
                        pr: 1,
                      },
                    }}
                    autoFocus
                  />
                </MotionBox>
              )}
            </AnimatePresence>

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
                  {currentMode === "dark" ? <Moon /> : <Sun />}
                </MotionIconButton>
              </Tooltip>

              <Tooltip title="Search">
                {showSearchBar ? (
                  <MotionIconButton
                    onClick={() => setShowSearchBar(!showSearchBar)}
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
                    <X />
                  </MotionIconButton>
                ) : (
                  <MotionIconButton
                    onClick={() => setShowSearchBar(!showSearchBar)}
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
                )}
              </Tooltip>

              {isLoggedIn ? (
                <>
                  <Tooltip title="Cart">
                    <IconButton
                      onClick={() => navigate("/cart")}
                      sx={{
                        ml: 1,
                        color:
                          theme.palette.mode === "dark"
                            ? "primary.light"
                            : "primary.main",
                      }}
                    >
                      <ShoppingCart />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Profile">
                    <MotionIconButton
                      onClick={handleProfileClick}
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
                  <Tooltip title="Logout">
                    <MotionIconButton
                      onClick={handleLogout}
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
                      <LogOut />
                    </MotionIconButton>
                  </Tooltip>
                </>
              ) : (
                <></>
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
                    display: { xs: "flex", md: "none" },
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
        onLogout={handleLogout}
      />
    </>
  );
};
