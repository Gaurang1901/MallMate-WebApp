import React from "react";
import {
  Drawer,
  List,
  ListItemIcon,
  ListItemText,
  Divider,
  ListItemButton,
  useTheme,
  Box,
  Typography,
  IconButton,
  Avatar,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import InfoIcon from "@mui/icons-material/Info";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CloseIcon from "@mui/icons-material/Close";
import { motion, AnimatePresence } from "framer-motion";

interface SidebarProps {
  open: boolean;
  onClose: () => void;
  isLoggedIn?: boolean;
}

const MotionBox = motion(Box);
const MotionListItemButton = motion(ListItemButton);

export const Sidebar: React.FC<SidebarProps> = ({
  open,
  onClose,
  isLoggedIn = false,
}) => {
  const theme = useTheme();

  const headerLinks = [
    { id: 1, name: "Home", route: "/", icon: <HomeIcon /> },
    { id: 2, name: "Contact", route: "/contact", icon: <ContactMailIcon /> },
    { id: 3, name: "About", route: "/about", icon: <InfoIcon /> },
    { id: 4, name: "SignUp", route: "/signup", icon: <PersonAddIcon /> },
  ];

  const containerVariants = {
    hidden: { x: "100%" },
    visible: { 
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    },
    exit: { 
      x: "100%",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1,
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    })
  };

  return (
    <AnimatePresence>
      {open && (
        <Drawer
          anchor="right"
          open={open}
          onClose={onClose}
          className="md:hidden"
          PaperProps={{
            style: {
              backgroundColor: theme.palette.background.paper,
              width: 320,
              borderLeft: `1px solid ${theme.palette.divider}`,
            },
          }}
        >
          <MotionBox
            sx={{
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
              background: `linear-gradient(180deg, ${theme.palette.background.paper} 0%, ${theme.palette.background.default} 100%)`,
            }}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Header Section */}
            <MotionBox
              sx={{
                p: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderBottom: `1px solid ${theme.palette.divider}`,
              }}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <MotionBox 
                sx={{ display: 'flex', alignItems: 'center', gap: 2 }}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <img
                  src="/src/assets/MallMate-Icon-Transperant.png"
                  alt="logo"
                  className="w-12 h-12"
                />
                <Typography
                  variant="h6"
                  sx={{
                    color: theme.palette.text.primary,
                    fontWeight: 600,
                    fontFamily: 'Manrope',
                  }}
                >
                  MallMate
                </Typography>
              </MotionBox>
              <motion.button
                onClick={onClose}
                whileHover={{ rotate: 90, scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: theme.palette.text.secondary,
                }}
              >
                <CloseIcon />
              </motion.button>
            </MotionBox>

            {/* Navigation Links */}
            <List sx={{ px: 2, py: 1 }}>
              {headerLinks.map((item, index) => (
                <MotionListItemButton
                  key={item.id}
                  onClick={() => {
                    window.location.href = item.route;
                    onClose();
                  }}
                  custom={index}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover={{ 
                    scale: 1.02,
                    backgroundColor: theme.palette.action.hover,
                    x: 10,
                  }}
                  sx={{
                    borderRadius: 2,
                    mb: 1,
                    color: theme.palette.text.primary,
                    transition: 'all 0.2s ease-in-out',
                  }}
                >
                  <ListItemIcon
                    sx={{
                      color: theme.palette.primary.main,
                      minWidth: 40,
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.name}
                    primaryTypographyProps={{
                      fontFamily: 'Manrope',
                      fontWeight: 500,
                    }}
                  />
                </MotionListItemButton>
              ))}
            </List>

            <Divider sx={{ my: 2 }} />

            {/* Bottom Actions */}
            <List sx={{ px: 2 }}>
              <MotionListItemButton
                onClick={onClose}
                variants={itemVariants}
                custom={headerLinks.length}
                initial="hidden"
                animate="visible"
                whileHover={{ 
                  scale: 1.02,
                  backgroundColor: theme.palette.action.hover,
                  x: 10,
                }}
                sx={{
                  borderRadius: 2,
                  mb: 1,
                  color: theme.palette.text.primary,
                  transition: 'all 0.2s ease-in-out',
                }}
              >
                <ListItemIcon
                  sx={{
                    color: theme.palette.primary.main,
                    minWidth: 40,
                  }}
                >
                  <SearchIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Search"
                  primaryTypographyProps={{
                    fontFamily: 'Manrope',
                    fontWeight: 500,
                  }}
                />
              </MotionListItemButton>

              {!isLoggedIn && (
                <MotionListItemButton
                  onClick={onClose}
                  variants={itemVariants}
                  custom={headerLinks.length + 1}
                  initial="hidden"
                  animate="visible"
                  whileHover={{ 
                    scale: 1.02,
                    backgroundColor: theme.palette.action.hover,
                    x: 10,
                  }}
                  sx={{
                    borderRadius: 2,
                    mb: 1,
                    color: theme.palette.text.primary,
                    transition: 'all 0.2s ease-in-out',
                  }}
                >
                  <ListItemIcon
                    sx={{
                      color: theme.palette.primary.main,
                      minWidth: 40,
                    }}
                  >
                    <AccountCircleIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Sign In"
                    primaryTypographyProps={{
                      fontFamily: 'Manrope',
                      fontWeight: 500,
                    }}
                  />
                </MotionListItemButton>
              )}
            </List>

            {/* User Profile Section */}
            {isLoggedIn && (
              <MotionBox
                sx={{
                  mt: 'auto',
                  p: 2,
                  borderTop: `1px solid ${theme.palette.divider}`,
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <MotionBox
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    p: 1,
                    borderRadius: 2,
                    '&:hover': {
                      backgroundColor: theme.palette.action.hover,
                    },
                    transition: 'all 0.2s ease-in-out',
                  }}
                  whileHover={{ scale: 1.02, x: 10 }}
                >
                  <Avatar
                    sx={{
                      width: 40,
                      height: 40,
                      bgcolor: theme.palette.primary.main,
                    }}
                  />
                  <Box>
                    <Typography
                      variant="subtitle1"
                      sx={{
                        fontFamily: 'Manrope',
                        fontWeight: 600,
                        color: theme.palette.text.primary,
                      }}
                    >
                      John Doe
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: theme.palette.text.secondary,
                        fontFamily: 'Manrope',
                      }}
                    >
                      john.doe@example.com
                    </Typography>
                  </Box>
                </MotionBox>
              </MotionBox>
            )}
          </MotionBox>
        </Drawer>
      )}
    </AnimatePresence>
  );
}; 