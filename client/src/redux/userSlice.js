import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    allSongs: [],
    currentSong: null,
  },
  reducers: {
    SetUser: (state, action) => {
      state.user = action.payload;
    },
    SetAllSongs: (state, action) => {
      state.allSongs = action.payload;
    },
    SetCurrentSong: (state, action) => {
      state.currentSong = action.payload;
    },
  },
});

export const { SetUser, SetAllSongs, SetCurrentSong } = userSlice.actions;
