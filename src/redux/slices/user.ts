import axios from "../../axios";
import { createSlice, createAsyncThunk, AnyAction } from "@reduxjs/toolkit";
import { LoginParams, RegisterParams } from "../../interfaces/auth";
import { RootState } from "../store";
import { UserData } from "../../interfaces/user";
// Add avatar reducer
const avatarSlice = createSlice({
  name: "avatar",
  initialState: {
    data: null,
    status: "loading",
    error: undefined,
  },
  reducers: {
    setAvatar: (state, action) => {
      state.data = action.payload;
      state.status = "loaded";
    },
    clearAvatar: state => {
      state.data = null;
      state.status = "loading";
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchLogin.pending, state => {
        state.data = null;
        state.status = "loading";
      })
      .addCase(fetchLogin.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = "loaded";
      })
      .addCase(fetchLogin.rejected, (state, action) => {
        state.data = null;
        state.status = "error";
        if (action.payload) {
          state.error = action.payload;
        } else {
          state.error = action.error.message;
        }
      })
      .addCase(fetchAuth.pending, state => {
        state.data = null;
        state.status = "loading";
      })
      .addCase(fetchAuth.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = "loaded";
      })
      .addCase(fetchAuth.rejected, state => {
        state.data = null;
        state.status = "error";
      })
      .addCase(fetchRegister.pending, state => {
        state.data = null;
        state.status = "loading";
      })
      .addCase(fetchRegister.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = "loaded";
      })
      .addCase(fetchRegister.rejected, (state, action) => {
        state.data = null;
        state.status = "error";
        if (action.payload) {
          state.error = action.payload;
        } else {
          state.error = action.error.message;
        }
      });
  },
});
// Selectors
export const selectIsAuth = (state: RootState) => Boolean(state.auth.data);
export const selectAuthError = (state: RootState) => state.auth.error;
export const selectAvatar = (state: RootState) => state.avatar.data;
export const selectAvatarError = (state: RootState) => state.avatar.error;
// Actions
export const logout = authSlice.actions.logout;
export const fetchLogin = auth;
