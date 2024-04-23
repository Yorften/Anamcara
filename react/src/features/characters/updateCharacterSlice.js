import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  ilvl: "",
  note: "",
  path: "",
};

const updateCharacterSlice = createSlice({
  name: "char",
  initialState,
  reducers: {
    setName: (state, action) => {
      state.name = action.payload;
    },
    setIlvl: (state, action) => {
      state.ilvl = action.payload;
    },
    setNote: (state, action) => {
      state.note = action.payload;
    },
    setPath: (state, action) => {
      state.path = action.payload;
    },
  },
});

export const { setName, setIlvl, setNote, setPath } = updateCharacterSlice.actions;
export default updateCharacterSlice.reducer;
