// userSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  mobile: "",
  password: "",
  status: true,
  role: "",
  meta: "",
  adId: "",
  imageUrl: "",
  bio: "",
  organisationId: "",
  ccrn: "",
  isActive: true,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUserData: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    resetUserData: (state) => {
      return {
        ...initialState,
      };
    },
  },
});

export const { updateUserData, resetUserData } = userSlice.actions;
export default userSlice.reducer;
