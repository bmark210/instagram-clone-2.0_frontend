import axios from "../../Axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Posts } from "../../types/post/post";

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const { data } = await axios.get("/posts");
  return data;
});

const initialState: Posts = {
  items: [],
  status: "loading",
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchPosts.pending, state => {
        state.items = [];
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = "loaded";
      })
      .addCase(fetchPosts.rejected, state => {
        state.items = [];
        state.status = "error";
      });
  },
});

export const postReducer = postsSlice.reducer;
