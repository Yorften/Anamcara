import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  characters: [],
};

const characterSlicelice = createSlice({
  name: "character",
  initialState,
  reducers: {
    setCharacters: (state, action) => {
      state.characters = action.payload;
    },
  },
});

export const { setCharacters } = characterSlicelice.actions;
export default characterSlicelice.reducer;
