import React from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { TextField, Button } from "@mui/material";
import type { SignupForm } from "../../shared/models/Auth.model";
import { useDispatch, useSelector } from "react-redux";
import { signupUser } from "../../store/auth.slice";
import type { AppDispatch } from "../../store";

const SignupFormComponent: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, user, token } = useSelector((state: any) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupForm>();

  const onSubmit: SubmitHandler<SignupForm> = (data) => {
    console.log(data);
    dispatch(signupUser(data));
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-6 w-full"
    >
      <TextField
        label="Name"
        variant="outlined"
        color="secondary"
        fullWidth
        className="text-black"
        {...register("name", { required: "Name is required" })}
        error={!!errors.name}
        helperText={errors.name?.message}
      />
      <TextField
        label="Email"
        variant="outlined"
        color="secondary"
        fullWidth
        className="text-black"
        {...register("email", { required: "Email is required" })}
        error={!!errors.email}
        helperText={errors.email?.message}
      />
      <TextField
        label="Password"
        type="password"
        variant="outlined"
        fullWidth
        className="text-black"
        color="secondary"
        {...register("password", { required: "Password is required" })}
        error={!!errors.password}
        helperText={errors.password?.message}
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        disabled={loading}
      >
        Sign Up
      </Button>
    </form>
  );
};

export { SignupFormComponent as SignupForm }; 