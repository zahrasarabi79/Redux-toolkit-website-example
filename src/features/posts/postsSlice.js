import { nanoid, createSlice, createAsyncThunk, createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import axios from "axios";
import { sub } from "date-fns";

const POSTS_URL = "https://jsonplaceholder.org/posts";
const postsAdapter = createEntityAdapter({
  sortComparer: (a, b) => b.date.localeCompare(a.date),
});

const initialState = postsAdapter.getInitialState({ status: "idle", error: null, count: 0 });
export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  try {
    const response = await axios.get(POSTS_URL);
    return [...response.data];
  } catch (error) {
    return error.message;
  }
});
export const addNewPosts = createAsyncThunk("posts/addNewPosts", async (initialPost) => {
  try {
    const response = await axios.post(POSTS_URL, initialPost);
    console.log(response.data);
    return response.data;
  } catch (error) {
    return error.message;
  }
});
export const updatePost = createAsyncThunk("posts/updatePost", async (initialPost) => {
  const { id } = initialPost;
  try {
    const response = await axios.put(`${POSTS_URL}/${id}`, initialPost);
    return response.data;
  } catch (error) {
    return error.message;
  }
});
export const deletePost = createAsyncThunk("posts/deletePost", async (initialPost) => {
  const { id } = initialPost;
  try {
    const response = await axios.delete(`${POSTS_URL}/${id}`, initialPost);
    if (response?.status === 200) return initialPost;
    return `${response.status}:${response.statusText}`;
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
      const existingPost = state.entities[postId];
      if (existingPost) {
        existingPost.reactions[reaction]++;
      }
    },
    increaseCount(state, action) {
      state.count = state.count + 1;
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
          post.reactions = { thumbsUp: 0, wow: 0, heart: 0, rocket: 0, coffee: 0 };
          return post;
        });
        //add many frtch post to array
        postsAdapter.upsertMany(state, loadedPosts);
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addNewPosts.fulfilled, (state, action) => {
        const sortedPosts = state.posts.sort((a, b) => {
          if (a.id > b.id) return 1;
          if (a.id < b.id) return -1;
          return 0;
        });
        action.payload.id = sortedPosts[sortedPosts.length - 1].id + 1;
        action.payload.userId = Number(action.payload.userId);
        action.payload.date = new Date().toISOString();
        action.payload.reactions = { thumbsUp: 0, wow: 0, heart: 0, rocket: 0, coffee: 0 };
        console.log(action.payload);
        postsAdapter.addOne(state, action.payload);
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        if (!action.payload?.id) {
          console.log("Update could not complete");
          console.log(action.payload);
          return;
        }
        action.payload.date = new Date().toISOString();
        postsAdapter.updateOne(state, action.payload);
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        if (!action.payload?.id) {
          console.log("Delete could not complete");
          console.log(action.payload);
          return;
        }
        const { id } = action.payload;
        postsAdapter.removeOne(state, id);
      });
  },
});
//get selctors create these selectors and we rename them with aliases usung destructuers
export const { selectAll: selectAllPosts, selectById: selectPostById, selectIds: selectPostIds } = postsAdapter.getSelectors((state) => state.posts);
export const getPostsStatus = (state) => state.posts.status;
export const getPostsError = (state) => state.posts.error;
export const getcount = (state) => state.posts.count;
//createSelector : accepts on or more input function//pass in selector that returns  the post slice of state
export const selectPostByUser = createSelector([selectAllPosts, (state, userId) => userId], (posts, userId) => posts?.filter((post) => post.userId === userId));
export const { increaseCount, reactionAdded } = postsSlice.actions;
export default postsSlice.reducer;
