import { createSlice } from '@reduxjs/toolkit';

const keySlice = createSlice({
  name: 'key',
  initialState: '',
    

  reducers: {
    setKey: (state, action) => {
        return action.payload;
    },
  },
});

export const { setKey } = keySlice.actions;

export default keySlice.reducer;
