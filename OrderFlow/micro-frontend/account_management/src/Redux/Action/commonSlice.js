import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: 0,
}

export const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {

    addReducer: (state) => {
      state.value += 1
    },

    deleteReducer: (state) => {
      state.value -= 1
    },
    
    incrementByAmount: (state, action) => {
      state.value += action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { addReducer, deleteReducer, incrementByAmount } = counterSlice.actions

export default commonSlice.reducer