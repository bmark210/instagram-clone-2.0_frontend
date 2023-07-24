import { configureStore } from "@reduxjs/toolkit";
import { postReducer } from "./slices/posts";
import { authReducer } from "./slices/auth";
import modalReducer from "./slices/modal";

const store = configureStore({
  reducer: { auth: authReducer, posts: postReducer, modals: modalReducer },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
