import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { profileAPI } from '../../services/profileAPI';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  zipCode: string;
  country: string;
  avatar?: string;
  joinDate: string;
  preferences: {
    emailNotifications: boolean;
    smsNotifications: boolean;
    pushNotifications: boolean;
    marketing: boolean;
  };
}

export interface ProfileState {
  profile: UserProfile | null;
  isLoading: boolean;
  error: string | null;
  isEditing: boolean;
}

const initialState: ProfileState = {
  profile: null,
  isLoading: false,
  error: null,
  isEditing: false,
};

// Async thunks
export const fetchProfile = createAsyncThunk(
  'profile/fetchProfile',
  async (_, { rejectWithValue }) => {
    try {
      const response = await profileAPI.getProfile();
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch profile');
    }
  }
);

export const updateProfile = createAsyncThunk(
  'profile/updateProfile',
  async (profileData: Partial<UserProfile>, { rejectWithValue }) => {
    try {
      const response = await profileAPI.updateProfile(profileData);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to update profile');
    }
  }
);

export const updateAvatar = createAsyncThunk(
  'profile/updateAvatar',
  async (file: File, { rejectWithValue }) => {
    try {
      const response = await profileAPI.updateAvatar(file);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to update avatar');
    }
  }
);

export const changePassword = createAsyncThunk(
  'profile/changePassword',
  async (passwordData: { currentPassword: string; newPassword: string }, { rejectWithValue }) => {
    try {
      await profileAPI.changePassword(passwordData);
      return true;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to change password');
    }
  }
);

export const deleteAccount = createAsyncThunk(
  'profile/deleteAccount',
  async (password: string, { rejectWithValue }) => {
    try {
      await profileAPI.deleteAccount(password);
      return true;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to delete account');
    }
  }
);

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setIsEditing: (state, action: PayloadAction<boolean>) => {
      state.isEditing = action.payload;
    },
    clearProfile: (state) => {
      state.profile = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch profile
      .addCase(fetchProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchProfile.fulfilled, (state, action: PayloadAction<UserProfile>) => {
        state.isLoading = false;
        state.profile = action.payload;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Update profile
      .addCase(updateProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state, action: PayloadAction<UserProfile>) => {
        state.isLoading = false;
        state.profile = action.payload;
        state.isEditing = false;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Update avatar
      .addCase(updateAvatar.fulfilled, (state, action: PayloadAction<string>) => {
        if (state.profile) {
          state.profile.avatar = action.payload;
        }
      })
      // Change password (no state change needed on success)
      .addCase(changePassword.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      // Delete account
      .addCase(deleteAccount.fulfilled, (state) => {
        state.profile = null;
      });
  },
});

export const { clearError, setIsEditing, clearProfile } = profileSlice.actions;
export default profileSlice.reducer;