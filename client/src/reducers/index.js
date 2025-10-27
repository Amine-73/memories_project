import { configureStore } from "@reduxjs/toolkit";
import Post from "./Posts";
import Auth from "./Auth";

export const store = configureStore({
  reducer: {
    posts: Post,
    Auth: Auth,
  },
});
