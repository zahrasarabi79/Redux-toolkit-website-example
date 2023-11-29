import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from "@reduxjs/toolkit";
import { sub } from "date-fns";
const initialState = [
  { id: 1, title: "Redux", content: "Redux is a predictable state container for JavaScript apps.", date: sub(new Date(), { minutes: 10 }).toISOString(), userId: 0 },
  { id: 2, title: "RTK-Query", content: "RTK Query is a powerful data fetching and caching tool.", date: sub(new Date(), { minutes: 5 }).toISOString(), userId: 0 },
];
const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    postAdded: {
      reducer(state, action) {
        state.push(action.payload);
      },
      prepare(title, content, userId) {
        return { payload: { id: nanoid(), title, content, userId, date: new Date().toISOString() } };
      },
    },
  },
});
export const selectAllPosts = (state) => state.posts;
export const { postAdded } = postsSlice.actions;
export default postsSlice.reducer;
