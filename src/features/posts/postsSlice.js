import { nanoid, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { sub } from "date-fns";
// const initialState = [
//   { id: 1, title: "Redux", content: "Redux is a predictable state container for JavaScript apps.", date: sub(new Date(), { minutes: 10 }).toISOString(), userId: 0 },
//   { id: 2, title: "RTK-Query", content: "RTK Query is a powerful data fetching and caching tool.", date: sub(new Date(), { minutes: 5 }).toISOString(), userId: 0 },
// ];
const POSTS_URL = "https://jsonplaceholder.org/posts";
const initialState = { posts: [], status: "idle", error: null };
const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  try {
    const response = await axios.get(POSTS_URL);
    return [...response.data];
  } catch (error) {
    return error.message;
  }
});
const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    postAdded: {
      reducer(state, action) {
        state.posts.push(action.payload);
      },
      prepare(title, content, userId) {
        return { payload: { id: nanoid(), title, content, userId, date: new Date().toISOString(), reactions: { thumbsUp: 0, wow: 0, heart: 0, rocket: 0, coffee: 0 } } };
      },
    },
    reactionAdded(state, action) {
      const { postId, reaction } = action.payload;
      const existingPost = state.posts.find((post) => post.id === postId);
      if (existingPost) {
        existingPost.reactions[reaction]++;
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        //adding date and reaction
        let min = 1;
        const loadedPosts = action.payload.map((post) => {
          post.date = sub(new Date(), { minutes: min++ }).toISOString();
          post.reaction = { thumbsUp: 0, wow: 0, heart: 0, rocket: 0, coffee: 0 };
          return post;
        });
      });
  },
});
export const selectAllPosts = (state) => state.posts.posts;
export const { postAdded, reactionAdded } = postsSlice.actions;
export default postsSlice.reducer;
