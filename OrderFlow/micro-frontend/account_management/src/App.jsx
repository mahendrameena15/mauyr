import React, { useEffect } from "react";
import "./style.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  Navigate,
} from "react-router-dom";
import ReactDOM from "react-dom";

import ResetLinkCard from "./auth/signin/ResetLinkCard";
// import Home from './Home';

import RegistrationEmail from "./auth/signup/RegistrationEmail";
import Registration from "./auth/signup/Registration";
import ResetPasswordForm from "./auth/signin/ResetPasswordForm";
import PasswordResetSuccess from "./auth/signin/PasswordResetSuccess";
import SigninNew from "./auth/signin/SigninNew";
import SignupNew from "./auth/signup/SignupNew";
import MyAccount from "./pages/MyAccount";
import ResetPasswordEmail from "./auth/signin/ResetPasswordEmail";
import Main from "./dashboard/Main";
import { Provider } from "react-redux";
import { store } from "./Redux/store";
import { QueryClient, QueryClientProvider } from "react-query";

const Root = () => {
  const navigate = useNavigate();
  const authService = process.env.REACT_APP_AUTH_SERVICE;

  useEffect(() => {
    const email = localStorage.getItem("email");
    if (!email) {
      navigate("/auth/sign-in");
    }
    // const url = process.env.REACT_APP_URL

    // Getting token from server
    fetch(`${authService}/api/Verify/GetToken`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        localStorage.setItem("token", data.tokenresponse.access_token);
      })
      .catch((error) => console.log(error));

    // Fetching user profile and setting to redux store
  }, []);
  return (
    <Routes>
      <Route exact path="/main/*" element={<Main />} />
      <Route
        path="*"
        element={<Navigate to="/main/account-management/dashboard" replace />}
      />
      {/* <Route path="/dashboard/Profile" element={<Profile/>}/> */}
      {/* <Route path="/dashboard/Organisation" element={<Organisation/>}/> */}
      <Route path="/auth/sign-in" element={<SigninNew />} />
      <Route path="/auth/sign-up" element={<SignupNew />} />
      <Route
        path="/auth/password-reset-email"
        element={<ResetPasswordEmail />}
      />
      <Route
        path="/auth/password-reset-form/:id"
        element={<ResetPasswordForm />}
      />
      <Route path="/auth/reset-link/:id" element={<ResetLinkCard />} />
      <Route
        path="/auth/registration-email/:id"
        element={<RegistrationEmail />}
      />
      <Route path="/auth/registration/:id" element={<Registration />} />
      <Route
        path="/auth/password-reset-success"
        element={<PasswordResetSuccess />}
      />
      <Route path="/dashboard/my-account" element={<MyAccount />} />
    </Routes>
  );
};

const App = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <Router>
          <Root />
        </Router>
      </Provider>
    </QueryClientProvider>
  );
};

const container = document.getElementById("app");

// For React 18, use createRoot
const root = ReactDOM.createRoot(container);
root.render(<App />);
