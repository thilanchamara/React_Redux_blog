import { configureStore } from "@reduxjs/toolkit";
import PostSliceReducer from "../posts/PostSlice";
import UsersliceReducer from "../users/Userslice";

const store = configureStore({
  reducer: {
    posts: PostSliceReducer,
    users: UsersliceReducer,
  },
});

export default store;
