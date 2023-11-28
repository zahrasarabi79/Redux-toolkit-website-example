import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from "@reduxjs/toolkit";

const initialState = [
  { id: 1, title: "Redux", content: "Redux is a predictable state container for JavaScript apps." },
  { id: 2, title: "RTK-Query", content: "RTK Query is a powerful data fetching and caching tool." },
];
const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    postAdded: {
      reducer(state, action) {
        state.push(action.payload);
      },
      prepare(title, content) {
        return { payload: { id: nanoid(), title, content } };
      },
    },
  },
});
export const selectAllPosts = (state) => state.posts;
export const { postAdded } = postsSlice.actions;
export default postsSlice.reducer;
