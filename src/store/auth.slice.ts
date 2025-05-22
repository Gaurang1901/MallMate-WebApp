import type { AuthResponse, AuthState, LoginPayload, SignupPayload } from "../shared/models/Auth.model";
import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

const API_URL = import.meta.env.VITE_API_BASE_URL;

export const loginUser = createAsyncThunk<
  AuthResponse,
  LoginPayload,
  { rejectValue: string }
>("auth/login", async (userData, thunkAPI) => {
  try {
    const response = await axios.post<AuthResponse>(
      `${API_URL}/auth/signin`,
      userData
    );
    console.log('Login Response:', response.data);
    if (!response.data.user) {
      console.error('User data is missing from response:', response.data);
      return thunkAPI.rejectWithValue("Invalid response from server");
    }
    return response.data;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    console.error('Login Error:', error.response?.data);
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || "Login failed"
    );
  }
});

export const signupUser = createAsyncThunk<
  AuthResponse,
  SignupPayload,
  { rejectValue: string }
>("auth/signup", async (userData, thunkAPI) => {
  try {
    const response = await axios.post<AuthResponse>(
      `${API_URL}/auth/signup`,
      userData
    );
    if (!response.data.user) {
      return thunkAPI.rejectWithValue("Invalid response from server");
    }
    return response.data;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || "Signup failed"
    );
  }
});

const initialState: AuthState = {
  user: null,
  token: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        loginUser.fulfilled,
        (state, action: PayloadAction<AuthResponse>) => {
          console.log('Reducer received:', action.payload);
          state.loading = false;
          state.user = action.payload.user;
          state.token = action.payload.token;
          console.log('Updated state:', state);
          localStorage.setItem("token", action.payload.token);
        }
      )
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Login failed";
      })

      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        signupUser.fulfilled,
        (state, action: PayloadAction<AuthResponse>) => {
          state.loading = false;
          state.user = action.payload.user;
          state.token = action.payload.token;
          localStorage.setItem("token", action.payload.token);
        }
      )
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Signup failed";
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
