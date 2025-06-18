import React, { useState } from "react";
import {
  Typography,
  Paper,
  Avatar,
  Button,
  TextField,
  Tab,
  Tabs,
  // useTheme,
  IconButton,
} from "@mui/material";
import { motion } from "framer-motion";
import {
  User,
  Settings,
  Bell,
  Lock,
  CreditCard,
  Camera,
  Save,
} from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

const MotionPaper = motion(Paper);
const MotionButton = motion(Button);

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`account-tabpanel-${index}`}
      aria-labelledby={`account-tab-${index}`}
      {...other}
    >
      {value === index && <div className="py-3">{children}</div>}
    </div>
  );
};

const Account: React.FC = () => {
  // const theme = useTheme();
  const [tabValue, setTabValue] = useState(0);
  const user = useSelector((state: RootState) => state.auth.user);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    console.log(event);
    setTabValue(newValue);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <div className="text-center mb-12">
            <motion.div variants={itemVariants}>
              <Typography
                variant="h2"
                component="h1"
                sx={{
                  fontWeight: 700,
                  mb: 2,
                  background: "linear-gradient(45deg, #90caf9 30%, #ce93d8 90%)",
                  backgroundClip: "text",
                  textFillColor: "transparent",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                }}
              >
                Account Settings
              </Typography>
              <Typography 
                variant="subtitle1" 
                sx={{ 
                  color: 'text.secondary',
                  maxWidth: '600px',
                  margin: '0 auto',
                  opacity: 0.8
                }}
              >
                Manage your account settings and preferences
              </Typography>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-4">
              <MotionPaper
                variants={itemVariants}
                sx={{
                  p: 4,
                  borderRadius: 4,
                  background: "rgba(255, 255, 255, 0.05)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: "0 12px 40px rgba(0, 0, 0, 0.3)",
                  },
                }}
              >
                <div className="flex flex-col items-center">
                  <div className="relative mb-6 group">
                    <Avatar
                      sx={{
                        width: 140,
                        height: 140,
                        border: "4px solid rgba(144, 202, 249, 0.5)",
                        transition: "all 0.3s ease",
                        "&:hover": {
                          border: "4px solid rgba(144, 202, 249, 0.8)",
                        },
                      }}
                      src={user?.avatar}
                    />
                    <IconButton
                      sx={{
                        position: "absolute",
                        bottom: 0,
                        right: 0,
                        bgcolor: "primary.main",
                        color: "primary.contrastText",
                        transition: "all 0.3s ease",
                        "&:hover": {
                          bgcolor: "primary.dark",
                          transform: "scale(1.1)",
                        },
                      }}
                    >
                      <Camera size={20} />
                    </IconButton>
                  </div>
                  <Typography 
                    variant="h5" 
                    sx={{ 
                      mb: 1,
                      fontWeight: 600,
                      color: "text.primary",
                    }}
                  >
                    {user?.fullname || "User Name"}
                  </Typography>
                  <Typography 
                    color="text.secondary" 
                    sx={{ 
                      mb: 4,
                      opacity: 0.8,
                    }}
                  >
                    {user?.email || "user@example.com"}
                  </Typography>
                  <MotionButton
                    variant="contained"
                    fullWidth
                    startIcon={<Save />}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    sx={{
                      py: 1.5,
                      borderRadius: 2,
                      textTransform: "none",
                      fontWeight: 600,
                      background: "linear-gradient(45deg, #90caf9 30%, #ce93d8 90%)",
                      "&:hover": {
                        background: "linear-gradient(45deg, #90caf9 40%, #ce93d8 100%)",
                      },
                    }}
                  >
                    Save Changes
                  </MotionButton>
                </div>
              </MotionPaper>
            </div>

            <div className="md:col-span-8">
              <MotionPaper
                variants={itemVariants}
                sx={{
                  borderRadius: 4,
                  background: "rgba(255, 255, 255, 0.05)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
                  overflow: "hidden",
                }}
              >
                <Tabs
                  value={tabValue}
                  onChange={handleTabChange}
                  variant="fullWidth"
                  sx={{
                    borderBottom: 1,
                    borderColor: "rgba(255, 255, 255, 0.1)",
                    "& .MuiTab-root": {
                      textTransform: "none",
                      fontWeight: 500,
                      py: 2,
                      color: "text.secondary",
                      "&.Mui-selected": {
                        color: "primary.main",
                      },
                    },
                    "& .MuiTabs-indicator": {
                      backgroundColor: "primary.main",
                    },
                  }}
                >
                  <Tab icon={<User />} label="Profile" />
                  <Tab icon={<Settings />} label="Settings" />
                  <Tab icon={<Bell />} label="Notifications" />
                  <Tab icon={<Lock />} label="Security" />
                  <Tab icon={<CreditCard />} label="Billing" />
                </Tabs>

                <TabPanel value={tabValue} index={0}>
                  <div className="p-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <TextField
                          fullWidth
                          label="First Name"
                          defaultValue={user?.fullname.split(" ")[0]}
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              "& fieldset": {
                                borderColor: "rgba(255, 255, 255, 0.1)",
                              },
                              "&:hover fieldset": {
                                borderColor: "rgba(255, 255, 255, 0.2)",
                              },
                              "&.Mui-focused fieldset": {
                                borderColor: "primary.main",
                              },
                            },
                          }}
                        />
                      </div>
                      <div>
                        <TextField
                          fullWidth
                          label="Last Name"
                          defaultValue={user?.fullname.split(" ")[1] ?? ''}
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              "& fieldset": {
                                borderColor: "rgba(255, 255, 255, 0.1)",
                              },
                              "&:hover fieldset": {
                                borderColor: "rgba(255, 255, 255, 0.2)",
                              },
                              "&.Mui-focused fieldset": {
                                borderColor: "primary.main",
                              },
                            },
                          }}
                        />
                      </div>
                      <div className="col-span-1 sm:col-span-2">
                        <TextField
                          fullWidth
                          label="Email"
                          defaultValue={user?.email}
                          type="email"
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              "& fieldset": {
                                borderColor: "rgba(255, 255, 255, 0.1)",
                              },
                              "&:hover fieldset": {
                                borderColor: "rgba(255, 255, 255, 0.2)",
                              },
                              "&.Mui-focused fieldset": {
                                borderColor: "primary.main",
                              },
                            },
                          }}
                        />
                      </div>
                      <div className="col-span-1 sm:col-span-2">
                        <TextField
                          fullWidth
                          label="Bio"
                          multiline
                          rows={4}
                          defaultValue={user?.bio}
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              "& fieldset": {
                                borderColor: "rgba(255, 255, 255, 0.1)",
                              },
                              "&:hover fieldset": {
                                borderColor: "rgba(255, 255, 255, 0.2)",
                              },
                              "&.Mui-focused fieldset": {
                                borderColor: "primary.main",
                              },
                            },
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </TabPanel>

                <TabPanel value={tabValue} index={1}>
                  <div className="p-6">
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        mb: 3,
                        fontWeight: 600,
                        color: "text.primary",
                      }}
                    >
                      General Settings
                    </Typography>
                    <div className="grid grid-cols-1 gap-6">
                      <div>
                        <TextField
                          fullWidth
                          label="Language"
                          select
                          defaultValue="en"
                          SelectProps={{
                            native: true,
                          }}
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              "& fieldset": {
                                borderColor: "rgba(255, 255, 255, 0.1)",
                              },
                              "&:hover fieldset": {
                                borderColor: "rgba(255, 255, 255, 0.2)",
                              },
                              "&.Mui-focused fieldset": {
                                borderColor: "primary.main",
                              },
                            },
                          }}
                        >
                          <option value="en">English</option>
                          <option value="es">Spanish</option>
                          <option value="fr">French</option>
                        </TextField>
                      </div>
                      <div>
                        <TextField
                          fullWidth
                          label="Time Zone"
                          select
                          defaultValue="utc"
                          SelectProps={{
                            native: true,
                          }}
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              "& fieldset": {
                                borderColor: "rgba(255, 255, 255, 0.1)",
                              },
                              "&:hover fieldset": {
                                borderColor: "rgba(255, 255, 255, 0.2)",
                              },
                              "&.Mui-focused fieldset": {
                                borderColor: "primary.main",
                              },
                            },
                          }}
                        >
                          <option value="utc">UTC</option>
                          <option value="est">EST</option>
                          <option value="pst">PST</option>
                        </TextField>
                      </div>
                    </div>
                  </div>
                </TabPanel>

                <TabPanel value={tabValue} index={2}>
                  <div className="p-6">
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        mb: 3,
                        fontWeight: 600,
                        color: "text.primary",
                      }}
                    >
                      Notification Preferences
                    </Typography>
                    {/* Add notification settings here */}
                  </div>
                </TabPanel>

                <TabPanel value={tabValue} index={3}>
                  <div className="p-6">
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        mb: 3,
                        fontWeight: 600,
                        color: "text.primary",
                      }}
                    >
                      Security Settings
                    </Typography>
                    {/* Add security settings here */}
                  </div>
                </TabPanel>

                <TabPanel value={tabValue} index={4}>
                  <div className="p-6">
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        mb: 3,
                        fontWeight: 600,
                        color: "text.primary",
                      }}
                    >
                      Billing Information
                    </Typography>
                    {/* Add billing information here */}
                  </div>
                </TabPanel>
              </MotionPaper>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Account;
