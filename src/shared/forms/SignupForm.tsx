import React, { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { TextField, Button, IconButton, InputAdornment } from "@mui/material";
import { SignupPayload } from "../models/Auth.model";
import { useDispatch, useSelector } from "react-redux";
import { signupUser } from "../../store/auth.slice";
import type { AppDispatch } from "../../store";
import { useNotification } from "../../context/NotificationContext";
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";
import { useLoader } from "../../context/LoaderContext";
import { useNavigate } from "react-router-dom";

const MotionTextField = motion(TextField);
const MotionButton = motion(Button);

const SignupFormComponent: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigate();
  const { loading, user, token, error } = useSelector(
    (state: any) => state.auth
  );
  const { showNotification } = useNotification();
  const [showPassword, setShowPassword] = useState(false);
  const { showLoader, hideLoader } = useLoader();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupPayload>();

  React.useEffect(() => {
    if (loading) {
      showLoader();
    } else {
      hideLoader();
    }
    if (error) {
      showNotification(error, "error");
      hideLoader();
    }
    if (user && token) {
      hideLoader();
      showNotification("Account created successfully!", "success");
      navigation("/"); // Navigate after successful signup
    }
  }, [loading, error, user, token, showNotification, showLoader, hideLoader, navigation]);

  const onSubmit: SubmitHandler<SignupPayload> = (data) => {
    dispatch(signupUser(data));
    // navigation("/"); // Remove this line
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
        label="Name"
        variant="outlined"
        color="secondary"
        fullWidth
        className="text-black"
        {...register("fullname", { required: "Name is required" })}
        error={!!errors.fullname}
        helperText={errors.fullname?.message}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1 }}
      />
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
                {showPassword ? <EyeOff /> : <Eye />}
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
        Sign Up
      </MotionButton>
    </motion.form>
  );
};

export { SignupFormComponent as SignupForm };
