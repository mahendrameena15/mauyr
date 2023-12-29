import React, { useEffect, useState, Suspense } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import "react-datepicker/dist/react-datepicker.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { updateUserData } from "../Redux/Action/userSlice";
import { updateLogoURI } from "../Redux/Action/organisationLogoSlice";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import SafeComponent from "./SafeComponent";
import Loader from "./Loader";
import FallbackComponent from "./FallbackComponent";
import {
  setOrganisationDetails,
  setbusinessName,
} from "../Redux/Action/organisationDetailsSlice";
import { setOrganisationId } from "../Redux/Action/credentialsSlice";
import AccountManagement from "./AccountManagement";
import Orders from "./Orders";
import Customers from "./Customers";
import Products from "./Products";

function Main() {
  const [isDivVisible, setIsDivVisible] = useState(false);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const sidebarHandler = () => {
    setIsDivVisible(!isDivVisible);
  };

  const authUrl = process.env.REACT_APP_AUTH_URL;
  const stripeKey = process.env.REACT_APP_STRIPE_KEY;
  const organisationUrl = process.env.REACT_APP_ORGANISATION_URL;

  // STRIPE
  const stripePromise = loadStripe(stripeKey);

  useEffect(() => {
    const email = localStorage.getItem("email");
    fetch(`${authUrl}/api/User/get?email=${email}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        const userInfo = data?.data[0];
        dispatch(setOrganisationId(userInfo.organisationId));
        localStorage.setItem("organisationId", userInfo.organisationId);
        localStorage.setItem("ccrn", userInfo.ccrn);

        dispatch(
          updateUserData({
            ...user,
            firstName: userInfo.firstName,
            lastName: userInfo.lastName,
            email: userInfo.email,
            mobile: userInfo.mobile,
            bio: userInfo.bio,
            password: userInfo.password,
            status: true,
            role: userInfo.role,
            meta: userInfo.meta,
            adId: userInfo.adId,
            ccrn: userInfo.ccrn,
            imageUrl: userInfo.imageUrl,
            organisationId: userInfo.organisationId,
          })
        );
      })
      .then(() => {
        fetch(
          `${organisationUrl}/api/Organization/get?organizationId=${localStorage.getItem(
            "organisationId"
          )}`,
          {
            method: "GET",
          }
        )
          .then((response) => response.json())
          .then((data) => {
            if (data.success) {
              const org = data?.data[0];
              localStorage.setItem("catalogueId", org?.catalogueId);
              localStorage.setItem("cCatalogueId", org?.cCatalogueId);
              dispatch(setOrganisationDetails(org));
              dispatch(updateLogoURI(org?.organisationlogo));
              dispatch(setbusinessName(org?.businessName));
            }
          });
      })
      .catch((error) => console.log(error));
  }, []);

  const isActive = (path) => {
    return location.pathname.startsWith(path) ? "active" : "";
  };

  return (
    <>
      <div className="flex flex-no-wrap">
        <div className="w-custom-20 absolute  sm:relative border border-inherit md:h-screen overflow-y-auto		 flex-col justify-between custom-scroll-bar hidden sm:flex">
          <Sidebar />
        </div>
        <div
          className="w-64 z-40 absolute bg-white  shadow md:h-full flex-col justify-between sm:hidden  transition duration-150 ease-in-out"
          id="mobile-nav"
        >
          <div
            className="h-10 w-10 bg-gray-800 absolute left-4 mt-16 -mr-10 flex items-center shadow justify-center cursor-pointer"
            id="mobile-toggler"
            onClick={sidebarHandler}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-adjustments"
              width={20}
              height={20}
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="#FFFFFF"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" />
              <circle cx={6} cy={10} r={2} />
              <line x1={6} y1={4} x2={6} y2={8} />
              <line x1={6} y1={12} x2={6} y2={20} />
              <circle cx={12} cy={16} r={2} />
              <line x1={12} y1={4} x2={12} y2={14} />
              <line x1={12} y1={18} x2={12} y2={20} />
              <circle cx={18} cy={7} r={2} />
              <line x1={18} y1={4} x2={18} y2={5} />
              <line x1={18} y1={9} x2={18} y2={20} />
            </svg>
          </div>
          <div
            className={`	justify-between h-screen ${
              isDivVisible ? "grid" : "hidden"
            }`}
          >
            <Sidebar />
          </div>
        </div>
        <div className="container-fluid mx-auto  h-64 sm:w-4/5 w-full ">
          <div className="container-fluid mx-auto px-0 sidebar">
            <Header />
            <SafeComponent>
              <Suspense fallback={<Loader />}>
                <Elements stripe={stripePromise}>
                  <Routes>
                    <Route
                      path="*"
                      element={<Navigate to="/account-management/dashboard" />}
                    />
                    {/* Account management routes */}
                    <Route
                      exact
                      path="/account-management/*"
                      element={<AccountManagement />}
                    />

                    {/* Orders routes */}
                    <Route path="/orders/*" element={<Orders />} />

                    {/* Customers routes */}
                    <Route path="/customers/*" element={<Customers />} />

                    {/* Products routes */}
                    <Route path="/products/*" element={<Products />} />
                  </Routes>
                </Elements>
              </Suspense>
            </SafeComponent>
            {/* <Profile /> */}
          </div>
        </div>
      </div>
    </>
  );
}

export default Main;
