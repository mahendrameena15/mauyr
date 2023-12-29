import { createSlice } from "@reduxjs/toolkit";

const credentialsSlice = createSlice({
  name: "credentials",
  initialState: {
    organisationId: "",
    ccrn: "",
    email: "",
  },
  reducers: {
    setOrganisationId: (state, action) => {
      state.organisationId = action.payload;
    },
    setCcrn: (state, action) => {
      state.ccrn = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
  },
});

export const { setOrganisationId, setCcrn, setEmail } = credentialsSlice.actions;

export default credentialsSlice.reducer;
