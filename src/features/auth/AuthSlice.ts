import type { LoginResponse } from "@/@types/auth";
import type { User, UserDetails } from "@/@types/user";
import { DEFAULT_ERROR_MESSAGE, TOKEN_KEYS } from "@/data/constant";
import { api } from "@/utils/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

export const loginUser = createAsyncThunk(
  "auth/login",
  async (
    { username, password }: { username: string; password: string },
    { rejectWithValue },
  ) => {
    try {
      const { data } = await api.post<LoginResponse>("/user/login", {
        username,
        password,
      });

      localStorage.setItem(TOKEN_KEYS.access, data.accessToken);
      localStorage.setItem(TOKEN_KEYS.refresh, data.refreshToken);

      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(
          error.response?.data?.message || error.message || "Login failed",
        );
      }
      return rejectWithValue(DEFAULT_ERROR_MESSAGE);
    }
  },
);

export const checkUserAuth = createAsyncThunk(
  "auth/check",
  async (_, { rejectWithValue }) => {
    const token = localStorage.getItem(TOKEN_KEYS.access);
    if (!token) {
      return rejectWithValue("No access token found");
    }

    try {
      const { data } = await api.get<UserDetails>("/user/me");

      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(
          error.response?.data?.message || error.message || "Auth check failed",
        );
      }
      return rejectWithValue(DEFAULT_ERROR_MESSAGE);
    }
  },
);

interface AuthState {
  user: User | null;
}

const initialState: AuthState = {
  user: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      localStorage.removeItem(TOKEN_KEYS.access);
      localStorage.removeItem(TOKEN_KEYS.refresh);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.user = action.payload;
    });

    builder.addCase(checkUserAuth.fulfilled, (state, action) => {
      state.user = action.payload;
    });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
