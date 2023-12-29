import { createSlice } from "@reduxjs/toolkit";

const organisationDetailsSlice = createSlice({
  name: "organisationDetails",
  initialState: {
    tradingName: "",
    businessName: "",
    abn: "",
    liquorLicence: "",
    organisationId : "",
    organisationAddress: "",
    organisationAddressApartment: "",
    organisationAddressSuburb: "",
    organisationAddressPostcode: "",
    billingAddress: "",
    billingAddressApartment: "",
    billingAddressSuburb: "",
    billingAddressPostcode: "",
    billingAddressState: "",
    orderingContactFirstName: "",
    orderingContactLastName: "",
    orderingContactEmail: "",
    orderingContactMobile: "",
    logisticsContactFirstName: "",
    logisticsContactLastName: "",
    logisticsContactEmail: "",
    logisticsContactMobile: "",
    categories: [],
    description: "",
    state: "",
    postcode: "",
    categoryList: [],
  },
  reducers: {
    setOrganisationDetails: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    setTradingName: (state, action) => {
      state.tradingName = action.payload;
    },
    setbusinessName: (state, action) => {
      state.businessName = action.payload;
    },
    setAbn: (state, action) => {
      state.abn = action.payload;
    },
    setLiquorLicence: (state, action) => {
      state.liquorLicence = action.payload;
    },
    setDescription: (state, action) => {
      state.description = action.payload;
    },
  },
});

export const {
  setTradingName,
  setbusinessName,
  setAbn,
  setLiquorLicence,
  setDescription,
  setOrganisationDetails
} = organisationDetailsSlice.actions;

export default organisationDetailsSlice.reducer;
