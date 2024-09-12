import { createAsyncThunk, createSlice, nanoid } from "@reduxjs/toolkit";
import { act } from "@testing-library/react";
import axios from "axios";
import { sub } from "date-fns";

const initialState = {
  posts: [],
  isLoading: true,
  fetchError: null,
};
const postURL = "https://jsonplaceholder.typicode.com/posts";

export const getPosts = createAsyncThunk("getPosts", async () => {
  try {
    const response = await axios.get(postURL);
    return response.data;
  } catch (err) {
    return err.message;
  }
});
export const addPosts = createAsyncThunk("addPost", async (newItem) => {
  try {
    const response = await axios.post(postURL, newItem);
    return response.data;
  } catch (err) {
    return err.message;
  }
});
export const editPost = createAsyncThunk("editPost", async (updatePost) => {
  const id = updatePost.id;
  try {
    const response = await axios.put(`${postURL}/${id}`, updatePost);
    return response.data;
  } catch (err) {
    return err.message;
  }
});
export const deletePost = createAsyncThunk(
  "deletePost",
  async (initialPost) => {
    const { id } = initialPost;
    try {
      const response = await axios.delete(`${postURL}/${id}`, initialPost);
      if (response?.status === 200) return initialPost;
      return `${response?.status}:${response?.statusText}`;
    } catch (err) {
      return err.message;
    }
  }
);
const PostSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    addPost: {
      reducer: (state, action) => {
        state.posts.push(action.payload);
      },
      prepare: (title, userId, body) => ({
        payload: {
          id: nanoid(), // Use nanoid to generate a unique id
          title,
          userId,
          body,
          reactions: {
            thumbsUp: 0,
            wow: 0,
            heart: 0,
            rocket: 0,
            coffee: 0,
          },
        },
      }),
    },
    reactionIncrement: (state, action) => {
      const post = state.posts.find(
        (post) => post.id === action.payload.postId
      );
      if (post) {
        post.reactions[action.payload.name]++;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getPosts.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getPosts.fulfilled, (state, action) => {
      state.isLoading = false;
      let min = 1;
      const updatedPosts = action.payload.map((post) => ({
        ...post,
        dateTime: sub(new Date(), { minutes: min++ }).toISOString(),
        reactions: {
          thumbsUp: 0,
          wow: 0,
          heart: 0,
          rocket: 0,
          coffee: 0,
        },
      }));

      state.posts = updatedPosts;
    });
    builder.addCase(getPosts.rejected, (state, action) => {
      state.isLoading = true;
      state.fetchError = action.error.message;
    });
    builder.addCase(addPosts.fulfilled, (state, action) => {
      action.payload.dateTime = new Date().toISOString();
      action.payload.reactions = {
        thumbsUp: 0,
        wow: 0,
        heart: 0,
        rocket: 0,
        coffee: 0,
      };
      state.posts.push(action.payload);
    });
    builder.addCase(editPost.fulfilled, (state, action) => {
      const id = action.payload.id;
      if (!id) {
        return;
      }
      const posts = state.posts.filter((post) => post.id !== id);
      action.payload.dateTime = new Date().toISOString();
      state.posts = [...posts, action.payload];
      console.log(posts.length);
    });
    builder.addCase(deletePost.fulfilled, (state, action) => {
      const id = action.payload.id;
      if (!id) {
        return;
      }
      const posts = state.posts.filter((post) => post.id !== id);
      state.posts = posts;
    });
  },
});

export default PostSlice.reducer;
export const { addPost, reactionIncrement } = PostSlice.actions;
export const selectAllPosts = (store) => store.posts.posts;

export const selectPost = (store, id) =>
  store.posts.posts.find((post) => post.id == id);
