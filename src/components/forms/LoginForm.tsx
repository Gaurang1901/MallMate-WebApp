import React from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { TextField, Button } from "@mui/material";
import type { LoginForm } from "../../shared/models/Auth.model";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../store/auth.slice";
import type { AppDispatch } from "../../store";
// import Notification from "../Notification";

const LoginFormComponent: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, user, token } = useSelector((state: any) => state.auth);
  console.log(user, token);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>();

  const onSubmit: SubmitHandler<LoginForm> = (data) => {
    console.log(data);
    dispatch(loginUser(data));
  };

  return (
    <>
      {/* <Notification message="error" severity="error" /> */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-6 w-full"
      >
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
          loading={loading}
        >
          Log In
        </Button>
      </form>
    </>
  );
};

export { LoginFormComponent as LoginForm };
