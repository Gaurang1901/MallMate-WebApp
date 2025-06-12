import React, { useState } from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Paper,
  Avatar,
  Button,
  TextField,
  Tab,
  Tabs,
  useTheme,
  Divider,
  IconButton,
} from '@mui/material';
import { motion } from 'framer-motion';
import {
  User,
  Settings,
  Bell,
  Lock,
  CreditCard,
  Camera,
  Save,
} from 'lucide-react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

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
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
};

const Account: React.FC = () => {
  const theme = useTheme();
  const [tabValue, setTabValue] = useState(0);
  const user = useSelector((state: RootState) => state.auth.user);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
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
        type: 'spring',
        stiffness: 100,
        damping: 20,
      },
    },
  };

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <motion.div variants={itemVariants}>
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
              Account Settings
            </Typography>
          </motion.div>
        </Box>

        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <MotionPaper
              variants={itemVariants}
              sx={{
                p: 4,
                borderRadius: 4,
                background: theme.palette.mode === 'dark'
                  ? 'rgba(34, 9, 44, 0.7)'
                  : 'rgba(255, 255, 255, 0.7)',
                backdropFilter: 'blur(10px)',
                border: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
                boxShadow: theme.palette.mode === 'dark'
                  ? '0 4px 30px rgba(0, 0, 0, 0.3)'
                  : '0 4px 30px rgba(0, 0, 0, 0.1)',
              }}
            >
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Box sx={{ position: 'relative', mb: 3 }}>
                  <Avatar
                    sx={{
                      width: 120,
                      height: 120,
                      border: `4px solid ${theme.palette.primary.main}`,
                    }}
                    src={user?.avatar}
                  />
                  <IconButton
                    sx={{
                      position: 'absolute',
                      bottom: 0,
                      right: 0,
                      bgcolor: theme.palette.primary.main,
                      color: theme.palette.primary.contrastText,
                      '&:hover': {
                        bgcolor: theme.palette.primary.dark,
                      },
                    }}
                  >
                    <Camera size={20} />
                  </IconButton>
                </Box>
                <Typography variant="h5" sx={{ mb: 1 }}>
                  {user?.name || 'User Name'}
                </Typography>
                <Typography color="text.secondary" sx={{ mb: 3 }}>
                  {user?.email || 'user@example.com'}
                </Typography>
                <MotionButton
                  variant="outlined"
                  fullWidth
                  startIcon={<Save />}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Save Changes
                </MotionButton>
              </Box>
            </MotionPaper>
          </Grid>

          <Grid item xs={12} md={8}>
            <MotionPaper
              variants={itemVariants}
              sx={{
                borderRadius: 4,
                background: theme.palette.mode === 'dark'
                  ? 'rgba(34, 9, 44, 0.7)'
                  : 'rgba(255, 255, 255, 0.7)',
                backdropFilter: 'blur(10px)',
                border: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
                boxShadow: theme.palette.mode === 'dark'
                  ? '0 4px 30px rgba(0, 0, 0, 0.3)'
                  : '0 4px 30px rgba(0, 0, 0, 0.1)',
              }}
            >
              <Tabs
                value={tabValue}
                onChange={handleTabChange}
                variant="fullWidth"
                sx={{
                  borderBottom: 1,
                  borderColor: 'divider',
                  '& .MuiTab-root': {
                    textTransform: 'none',
                    fontWeight: 500,
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
                <Box sx={{ p: 3 }}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="First Name"
                        defaultValue={user?.firstName}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Last Name"
                        defaultValue={user?.lastName}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Email"
                        defaultValue={user?.email}
                        type="email"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Bio"
                        multiline
                        rows={4}
                        defaultValue={user?.bio}
                      />
                    </Grid>
                  </Grid>
                </Box>
              </TabPanel>

              <TabPanel value={tabValue} index={1}>
                <Box sx={{ p: 3 }}>
                  <Typography variant="h6" sx={{ mb: 2 }}>
                    General Settings
                  </Typography>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Language"
                        select
                        defaultValue="en"
                        SelectProps={{
                          native: true,
                        }}
                      >
                        <option value="en">English</option>
                        <option value="es">Spanish</option>
                        <option value="fr">French</option>
                      </TextField>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Time Zone"
                        select
                        defaultValue="utc"
                        SelectProps={{
                          native: true,
                        }}
                      >
                        <option value="utc">UTC</option>
                        <option value="est">EST</option>
                        <option value="pst">PST</option>
                      </TextField>
                    </Grid>
                  </Grid>
                </Box>
              </TabPanel>

              <TabPanel value={tabValue} index={2}>
                <Box sx={{ p: 3 }}>
                  <Typography variant="h6" sx={{ mb: 2 }}>
                    Notification Preferences
                  </Typography>
                  {/* Add notification settings here */}
                </Box>
              </TabPanel>

              <TabPanel value={tabValue} index={3}>
                <Box sx={{ p: 3 }}>
                  <Typography variant="h6" sx={{ mb: 2 }}>
                    Security Settings
                  </Typography>
                  {/* Add security settings here */}
                </Box>
              </TabPanel>

              <TabPanel value={tabValue} index={4}>
                <Box sx={{ p: 3 }}>
                  <Typography variant="h6" sx={{ mb: 2 }}>
                    Billing Information
                  </Typography>
                  {/* Add billing information here */}
                </Box>
              </TabPanel>
            </MotionPaper>
          </Grid>
        </Grid>
      </motion.div>
    </Container>
  );
};

export default Account; 