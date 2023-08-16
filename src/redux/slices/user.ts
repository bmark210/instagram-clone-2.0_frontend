import axios from "../../axios";
import { createSlice, createAsyncThunk, AnyAction } from "@reduxjs/toolkit";
import { LoginParams, RegisterParams } from "../../interfaces/auth";
import { RootState } from "../store";
import { UserData } from "../../interfaces/user";

export const fetchLogin = createAsyncThunk(
  "auth/fetchLogin",
  async (params: LoginParams, { rejectWithValue }) => {
    try {
      const { data } = await axios.post("/auth/login", params);
      return data;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const fetchRegister = createAsyncThunk(
  "auth/fetchRegister",
  async (params: RegisterParams, { rejectWithValue }) => {
    try {
      const { data } = await axios.post("/auth/register", params);
      return data;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const fetchAuth = createAsyncThunk("auth/fetchAuth", async () => {
  const { data } = await axios.get("/auth/me");
  return data;
});

const initialState: UserData = {
  data: null,
  status: "loading",
  error: undefined,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: state => {
      state.data = null;
    },
    getAvatar: (state, action) => {
      if (state.data) {
        state.data.avatar = action.payload;
      }
      state.status = "loaded";
    },
    clearAvatar: state => {
      if (state.data) {
        state.data.avatar = null;
      }
      state.status = "loading";
    },
    changeBio: (state, action) => {
      if (state.data) {
        state.data.bio = action.payload;
      }
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchLogin.pending, state => {
        state.data = null;
        state.status = "loading";
      })
      .addCase(fetchLogin.fulfilled, (state, action: AnyAction) => {
        state.data = action.payload;
        state.status = "loaded";
      })
      .addCase(fetchLogin.rejected, (state, action: AnyAction) => {
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
      .addCase(fetchAuth.fulfilled, (state, action: AnyAction) => {
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
      .addCase(fetchRegister.fulfilled, (state, action: AnyAction) => {
        state.data = action.payload;
        state.status = "loaded";
      })
      .addCase(fetchRegister.rejected, (state, action: AnyAction) => {
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

export const selectIsAuth = (state: RootState) => Boolean(state.auth.data);
export const selectAuthError = (state: RootState) => state.auth.error;

export const { logout } = authSlice.actions;
export const { getAvatar, clearAvatar } = authSlice.actions;
export const { changeBio } = authSlice.actions;
export const authReducer = authSlice.reducer;
