import axios from "../../axios";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { LoginParams, RegisterParams } from "../../types/authTypes";
import { RootState } from "../store";
import { OneUser, User } from "../../types/user/user";

export const fetchLogin = createAsyncThunk(
  "auth/fetchLogin",
  async (params: LoginParams) => {
    const { data } = await axios.post("/auth/login", params);
    return data;
  }
);

export const fetchRegister = createAsyncThunk(
  "auth/fetchRegister",
  async (params: RegisterParams) => {
    const { data } = await axios.post("/auth/register", params);
    return data;
  }
);

export const fetchAuth = createAsyncThunk("auth/fetchAuth", async () => {
  const { data } = await axios.get("/auth/me");
  return data;
});

const initialState: User = {
  data: null,
  status: "loading",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.data = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLogin.pending, (state) => {
        state.data = null;
        state.status = "loading";
      })
      .addCase(
        fetchLogin.fulfilled,
        (state, action: PayloadAction<OneUser>) => {
          state.data = action.payload;
          state.status = "loaded";
        }
      )
      .addCase(fetchLogin.rejected, (state) => {
        state.data = null;
        state.status = "error";
      })
      .addCase(fetchAuth.pending, (state) => {
        state.data = null;
        state.status = "loading";
      })
      .addCase(fetchAuth.fulfilled, (state, action: PayloadAction<OneUser>) => {
        state.data = action.payload;
        state.status = "loaded";
      })
      .addCase(fetchAuth.rejected, (state) => {
        state.data = null;
        state.status = "error";
      })
      .addCase(fetchRegister.pending, (state) => {
        state.data = null;
        state.status = "loading";
      })
      .addCase(
        fetchRegister.fulfilled,
        (state, action: PayloadAction<OneUser>) => {
          state.data = action.payload;
          state.status = "loaded";
        }
      )
      .addCase(fetchRegister.rejected, (state) => {
        state.data = null;
        state.status = "error";
      });
  },
});

export const selectIsAuth = (state: RootState) => Boolean(state.auth.data); // может здесь трабл с типами <===
export const { logout } = authSlice.actions;
export const authReducer = authSlice.reducer;
