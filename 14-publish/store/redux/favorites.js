import { createSlice } from '@reduxjs/toolkit';

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: {
    ids: []
  },
  reducers: {
    addFavories: (state, action) => {
      state.ids.push(action.payload.id);
    },
    removeFavorites: (state, action) => {
      state.ids.splice(state.ids.indexOf(action.payload.id), 1);
    }
  }
});

export const favoritesActions = favoritesSlice.actions;

export default favoritesSlice.reducer;
