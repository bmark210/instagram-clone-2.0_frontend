import { configureStore } from "@reduxjs/toolkit";
import { postReducer } from "./slices/posts";
import { authReducer } from "./slices/auth";
import { combineReducers } from "@reduxjs/toolkit";

export type RootState = ReturnType<typeof rootReducer>;

const rootReducer = combineReducers({
  auth: authReducer,
  posts: postReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
