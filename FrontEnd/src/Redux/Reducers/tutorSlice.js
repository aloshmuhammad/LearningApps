import { createSlice } from "@reduxjs/toolkit";

const tutorSlice = createSlice({
  name: "tutorInfo",
  initialState: {
    tutor: null,
    token: null,
  },
  reducers: {
    setTutor: (state, action) => {
      state.tutor = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
  },
});
export const { setTutor, setToken } = tutorSlice.actions;
export default tutorSlice.reducer;
