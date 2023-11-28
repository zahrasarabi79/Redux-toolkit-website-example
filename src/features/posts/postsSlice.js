import { createSlice } from "@reduxjs/toolkit";
const initialState = [
  { id: 1, title: "Redux", content: "Redux is a predictable state container for JavaScript apps." },
  { id: 2, title: "RTK-Query", content: "RTK Query is a powerful data fetching and caching tool." },
];
const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
});
export default postsSlice.reducer;
