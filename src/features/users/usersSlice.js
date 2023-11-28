import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from "@reduxjs/toolkit";

const initialState = [
  { id: 0, name: "zahra" },
  { id: 1, name: "sara" },
  { id: 2, name: "rima" },
];
const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
});
export const selectAllUsers = (state) => state.users;
export default usersSlice.reducer;
