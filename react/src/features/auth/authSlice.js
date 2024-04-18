import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
  userRoles: [],
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setUserRoles: (state, action) => {
      state.userRoles = action.payload;
    },
  },
});

export const { setUser, setToken, setUserRoles } = authSlice.actions;
export default authSlice.reducer;