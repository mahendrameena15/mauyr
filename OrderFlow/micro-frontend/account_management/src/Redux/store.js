import { configureStore } from "@reduxjs/toolkit";
import tokenReducer from "./Action/tokenSlice";
import authReducer from "./Action/authSlice";
import keyReducer from "./Action/uniqueKeySlice";
import organisationDetailsReducer from "./Action/organisationDetailsSlice";
import userReducer from "../Redux/Action/userSlice";
import logoReducer from "../Redux/Action/organisationLogoSlice";
import credentialsReducer from "./Action/credentialsSlice";

export const store = configureStore({
  reducer: {
    token: tokenReducer,
    auth: authReducer,
    key: keyReducer,
    organisationDetails: organisationDetailsReducer,
    user: userReducer,
    logo: logoReducer,
    credentials: credentialsReducer,
  },
});
