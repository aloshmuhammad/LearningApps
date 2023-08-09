import { createSlice } from '@reduxjs/toolkit';

const searchSlice = createSlice({
  name: 'search',
  initialState: {
    query: '',
    results: [],
  },
  reducers: {
    setSearch: (state, action) => {
      state.query = action.payload.query;
      state.results = action.payload.results;
    },
    clearSearch: (state) => {
      state.query = '';
      state.results = [];
    },
  },
});

export const { setSearch, clearSearch } = searchSlice.actions;
export default searchSlice.reducer;
