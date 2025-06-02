import React, { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { TextField, Button, IconButton, InputAdornment } from "@mui/material";
import type { LoginForm } from "../models/Auth.model";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "../../store";
import { useNotification } from "../../context/NotificationContext";
import { motion } from "framer-motion";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "react-router-dom";

const MotionTextField = motion(TextField);
const MotionButton = motion(Button);

const LoginFormComponent: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigate();
  const { loading, user, token, error } = useSelector(
    (state: any) => state.auth
  );
  const { showNotification } = useNotification();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>();

  React.useEffect(() => {
    if (error) {
      showNotification(error, "error");
    }
    if (user && token) {
      showNotification("Logged in successfully!", "success");
    }
  }, [error, user, token, showNotification]);

  const onSubmit: SubmitHandler<LoginForm> = (data) => {
    showNotification("Backend Not Available!", "info");
    navigation("/");
    // dispatch(loginUser(data));
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <motion.form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-6 w-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <MotionTextField
        label="Email"
        variant="outlined"
        color="secondary"
        fullWidth
        className="text-black"
        {...register("email", { required: "Email is required" })}
        error={!!errors.email}
        helperText={errors.email?.message}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
      />
      <MotionTextField
        label="Password"
        type={showPassword ? "text" : "password"}
        variant="outlined"
        fullWidth
        className="text-black"
        color="secondary"
        {...register("password", { required: "Password is required" })}
        error={!!errors.password}
        helperText={errors.password?.message}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
              </IconButton>
            </InputAdornment>
          ),
        }}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
      />
      <MotionButton
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        disabled={loading}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        Log In
      </MotionButton>
    </motion.form>
  );
};

export { LoginFormComponent as LoginForm };
