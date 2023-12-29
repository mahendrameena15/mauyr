// logoSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  logoURI: "", // Initialize with an empty URI or reference
};

const organisationlogoSlice = createSlice({
  name: 'logo',
  initialState,
  reducers: {
    updateLogoURI: (state, action) => {
      state.logoURI = action.payload;
    },
    resetLogoURI: (state) => {
      state.logoURI = "";
    },
  },
});

export const { updateLogoURI, resetLogoURI } = organisationlogoSlice.actions;
export default organisationlogoSlice.reducer;