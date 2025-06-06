import React from "react";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Box,
  Avatar,
  Typography,
  Divider,
  Badge,
} from "@mui/material";
import {
  Home,
  HelpCircle,
  Info,
  UserCircle,
  X,
  Bell,
  LogOut,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const MotionBox = motion(Box);
const MotionListItemButton = motion(ListItemButton);
const MotionIconButton = motion(IconButton);

interface SidebarProps {
  open: boolean;
  onClose: () => void;
  isLoggedIn: boolean;
  onLogout: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  open,
  onClose,
  isLoggedIn,
  onLogout,
}) => {
  const navigate = useNavigate();

  const menuItems = [
    { id: 1, name: "Home", route: "/", icon: <Home /> },
    { id: 2, name: "Contact", route: "/contact", icon: <HelpCircle /> },
    { id: 3, name: "About", route: "/about", icon: <Info /> },
    { id: 4, name: isLoggedIn ? "Account" : "SignIn", route: isLoggedIn ? "/account" : "/signin", icon: <UserCircle /> },
  ];

  const handleNavigation = (route: string) => {
    navigate(route);
    onClose();
  };

  const drawerVariants = {
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

  const menuItemVariants = {
    hidden: { opacity: 0, x: 50 },
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
          PaperProps={{
            sx: {
              width: "100%",
              maxWidth: 300,
              bgcolor: "background.paper",
            },
            component: motion.div,
            variants: drawerVariants,
            initial: "hidden",
            animate: "visible",
            exit: "exit"
          }}
        >
          <Box sx={{ p: 2 }}>
            <MotionBox
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 2,
              }}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Menu
              </Typography>
              <MotionIconButton 
                onClick={onClose} 
                size="small"
                whileHover={{ scale: 1.2, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
              >
                <X />
              </MotionIconButton>
            </MotionBox>

            {isLoggedIn && (
              <MotionBox
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  mb: 2,
                  p: 2,
                  borderRadius: 2,
                  bgcolor: "action.hover",
                }}
              >
                <Avatar
                  sx={{
                    width: 40,
                    height: 40,
                    bgcolor: "primary.main",
                  }}
                />
                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                    User Name
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    user@email.com
                  </Typography>
                </Box>
              </MotionBox>
            )}

            <List>
              {menuItems.map((item, index) => (
                <MotionListItemButton
                  key={item.id}
                  onClick={() => handleNavigation(item.route)}
                  custom={index}
                  variants={menuItemVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover={{ scale: 1.02, x: 10 }}
                  whileTap={{ scale: 0.98 }}
                  sx={{
                    borderRadius: 2,
                    mb: 0.5,
                    "&:hover": {
                      bgcolor: "action.hover",
                    },
                  }}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.name} />
                </MotionListItemButton>
              ))}

              {isLoggedIn && (
                <>
                  <Divider sx={{ my: 2 }} />
                  <MotionListItemButton
                    onClick={() => handleNavigation("/notifications")}
                    custom={menuItems.length}
                    variants={menuItemVariants}
                    initial="hidden"
                    animate="visible"
                    whileHover={{ scale: 1.02, x: 10 }}
                    whileTap={{ scale: 0.98 }}
                    sx={{
                      borderRadius: 2,
                      mb: 0.5,
                      "&:hover": {
                        bgcolor: "action.hover",
                      },
                    }}
                  >
                    <ListItemIcon>
                      <Badge badgeContent={3} color="error">
                        <Bell />
                      </Badge>
                    </ListItemIcon>
                    <ListItemText primary="Notifications" />
                  </MotionListItemButton>
                  <MotionListItemButton
                    onClick={onLogout}
                    custom={menuItems.length + 1}
                    variants={menuItemVariants}
                    initial="hidden"
                    animate="visible"
                    whileHover={{ scale: 1.02, x: 10 }}
                    whileTap={{ scale: 0.98 }}
                    sx={{
                      borderRadius: 2,
                      mb: 0.5,
                      color: "error.main",
                      "&:hover": {
                        bgcolor: "error.light",
                        color: "error.contrastText",
                      },
                    }}
                  >
                    <ListItemIcon sx={{ color: "inherit" }}>
                      <LogOut />
                    </ListItemIcon>
                    <ListItemText primary="Logout" />
                  </MotionListItemButton>
                </>
              )}
            </List>
          </Box>
        </Drawer>
      )}
    </AnimatePresence>
  );
}; 