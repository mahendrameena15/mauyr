import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { RegistrationSchema } from "../../schemas";
import { useFormik } from "formik";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import HelpIcon from "@mui/icons-material/Help";
import { styled } from "@mui/material";
import { useMutation } from "react-query";
import { Button, message, Space } from "antd";
import {
  postBusinessName,
  putUserUpdate,
} from "../../reactQuery/registrationApiModule";

const initialValues = {
  firstName: "",
  lastName: "",
  mobile: "",
  businessName: "",
};

const Registration = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  const { id } = useParams();
  const authUrl = process.env.REACT_APP_AUTH_URL;
  const authService = process.env.REACT_APP_AUTH_SERVICE;
  useEffect(() => {
    if (localStorage.getItem("uniqueKey") !== id) {
      navigate("/auth/sign-up");
    }
  }, []);

  const error = (error) => {
    messageApi.open({
      type: "error",
      content: error,
    });
  };

  const { values, errors, handleBlur, handleChange, handleSubmit, touched } =
    useFormik({
      initialValues: initialValues,
      validationSchema: RegistrationSchema,
      onSubmit: async (values) => {
        const organisationId = await postBusinessName(values?.businessName);
        localStorage.setItem("organisationId", organisationId);
        await fetch(`${authService}/api/Verify/CreateUser`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token: localStorage.getItem("token"),
            userProfile: {
              accountEnabled: true,
              displayName: `${values.firstName} ${values.lastName}`,
              jobTitle: values.businessName,
              mail: localStorage.getItem("email"),
              identities: [
                {
                  signInType: "emailAddress",
                  issuer: "fobohdev.onmicrosoft.com",
                  issuerAssignedId: localStorage.getItem("email"),
                },
              ],
              passwordProfile: {
                forceChangePasswordNextSignIn: true,
                password: localStorage.getItem("password"),
              },
              mobilePhone: values.mobile,
            },
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            const userInfo = data?.userdetails;
            fetch(`${authUrl}/api/User/create`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                firstName: values.firstName,
                lastName: values.lastName,
                email: userInfo.mail.toLowerCase(),
                password: localStorage.getItem("password"),
                status: true,
                role: "",
                meta: "",
                adId: userInfo.id,
                imageUrl: "",
                bio: "",
                mobile: userInfo.mobilePhone,
                organisationId: organisationId,
                isActive: true,
              }),
            })
              .then((response) => response.json())
              .then((data) => {
                localStorage.removeItem("uniqueKey");
                if (!data.error) {
                  putUserUpdate(
                    data.data.ccrn,
                    data.data.firstName,
                    data.data.lastName,
                    data.data.email,
                    data.data.mobile,
                    data.data.password,
                    userInfo,
                    organisationId
                  );
                  localStorage.removeItem("uniqueKey");
                  localStorage.removeItem("password");
                  localStorage.setItem("loginPopup", "true");
                  navigate("/main/account-management/dashboard");
                } else {
                  localStorage.setItem("id", data.id);
                  localStorage.removeItem("email");
                  localStorage.removeItem("uniqueKey");
                  localStorage.removeItem("password");
                }
              });
          })
          .catch((error) => console.log(error));
      },
    });

  // Check if the unique key is matching with the url id or not

  const CustomTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: "#2B4447",
      color: "white",
      borderRadius: "5px",
      boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
      textAlign: "center",
      fontSize: 11,
      lineHeight: "24px",
      fontFamily: "Inter",
      fontSize: "11px",
      fontWeight: 600,
    },
  }));

  return (
    <>
      {contextHolder}
      <section className="mx-auto h-full bg-[#F8FAFC]">
        <div className="flex flex-col md:flex-row items-center justify-center scale-[90%]">
          <div className="container max-w-sm flex justify-center px-2">
            <div className="bg-white px-8 py-8 rounded-[15px] shadow-md text-black md:w-[500px]">
              <img
                className="mx-auto my-6 w-[190px]"
                src="/image/signup/fobohLogo.png"
                alt="account-icon"
              />
              <h1 className="mb-8 text-[23px]  md:text-3xl font-bold font-inter text-center text-[#147D73]">
                Create your account
              </h1>
              <form onSubmit={handleSubmit} className="min-w-full registration">
                {/* First name input */}
                <div className="mb-6 relative" data-te-input-wrapper-init>
                  <label htmlFor="fname">First name</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    className="transition-all duration-[0.3s]"
                    placeholder="Your first name"
                    autoComplete="on"
                    value={values.firstName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    onKeyPress={(event) => {
                      const allowedCharacters = /^[A-Za-z0-9\s]*$/;
                      if (!allowedCharacters.test(event.key)) {
                        event.preventDefault();
                      }
                    }}
                    style={{
                      border:
                        errors.firstName &&
                        touched.firstName &&
                        "1px solid red",
                    }}
                  />
                  <img
                    className="relative h-[20px] w-[20px] bottom-9 left-4 -mb-[20px]"
                    src="/image/signup/user.png"
                    alt="user"
                  />
                  {errors.firstName && touched.firstName && (
                    <p className="mt-2 mb-2 text-red-500">{errors.firstName}</p>
                  )}
                  {errors.firstName && touched.firstName && (
                    <ErrorOutlineIcon className="absolute text-red-500 top-[50px] right-3 transition-all duration-[0.3s]" />
                  )}
                </div>

                {/* Last name input */}
                <div className="relative mb-6" data-te-input-wrapper-init>
                  <label htmlFor="lname">Last Name</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    placeholder="Your last name"
                    autoComplete="on"
                    className="transition-all duration-[0.3s]"
                    value={values.lastName}
                    onChange={handleChange}
                    onKeyPress={(event) => {
                      const allowedCharacters = /^[A-Za-z0-9\s]*$/;
                      if (!allowedCharacters.test(event.key)) {
                        event.preventDefault();
                      }
                    }}
                    onBlur={handleBlur}
                    style={{
                      border:
                        errors.lastName && touched.lastName && "1px solid red",
                    }}
                  />
                  <img
                    className="relative h-[20px] w-[20px] bottom-9 left-4 -mb-[20px]"
                    src="/image/signup/user.png"
                    alt="user"
                  />
                  {errors.lastName && touched.lastName && (
                    <p className="mt-2 mb-2 text-red-500">{errors.lastName}</p>
                  )}
                  {errors.lastName && touched.lastName && (
                    <ErrorOutlineIcon className="absolute text-red-500 top-[50px] right-3 transition-all duration-[0.3s]" />
                  )}
                </div>

                {/* Mobile input */}
                <div className="relative mb-6">
                  <label htmlFor="mobile">
                    Mobile
                    <CustomTooltip
                      placement="right"
                      arrow
                      title="Please use a valid prefix for an Australian mobile number. It should start with '04', '+61', or '61'."
                    >
                      <HelpIcon
                        sx={{
                          color: "#E0E0E0",
                          width: "20px",
                          marginLeft: "10px",
                        }}
                      />{" "}
                    </CustomTooltip>
                  </label>
                  <input
                    id="mobile"
                    name="mobile"
                    placeholder="Your mobile"
                    type="text"
                    value={values.mobile}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    maxLength={20}
                    onKeyPress={(event) => {
                      const allowedCharacters = /^[0-9+]*$/; // Regular expression to match only numbers and '+'
                      if (!allowedCharacters.test(event.key)) {
                        event.preventDefault();
                      }
                    }}
                    style={{
                      border:
                        errors.mobile && touched.mobile && "1px solid red",
                    }}
                  />
                  <img
                    className="relative h-[20px] w-[20px] bottom-9 left-4 -mb-[20px]"
                    src="/image/signup/install_mobile.png"
                    alt="user"
                  />
                  {errors.mobile && touched.mobile && (
                    <p className="mt-2 mb-2 text-red-500">{errors.mobile}</p>
                  )}
                  {errors.mobile && touched.mobile && (
                    <ErrorOutlineIcon className="absolute text-red-500 top-[50px] right-3 transition-all duration-[0.3s]" />
                  )}
                </div>

                {/* Business name input */}
                <div className="relative mb-6" data-te-input-wrapper-init>
                  <label htmlFor="mobile">Business name</label>
                  <input
                    type="text"
                    id="businessName"
                    name="businessName"
                    placeholder="Your business name"
                    autoComplete="on"
                    value={values.businessName}
                    onChange={handleChange}
                    onKeyPress={(event) => {
                      const allowedCharacters =
                        /^[A-Za-z0-9\s!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]*$/;
                      if (!allowedCharacters.test(event.key)) {
                        event.preventDefault();
                      }
                    }}
                    onBlur={handleBlur}
                    style={{
                      border:
                        errors.businessName &&
                        touched.businessName &&
                        "1px solid red",
                    }}
                  />
                  <img
                    className="relative h-[20px] w-[20px] bottom-9 -mb-[20px] left-4"
                    src="/image/signup/briefcase 2.png"
                    alt="user"
                  />
                  {errors.businessName && touched.businessName && (
                    <p className="mt-2 mb-2 text-red-500">
                      {errors.businessName}
                    </p>
                  )}
                  {errors.businessName && touched.businessName && (
                    <ErrorOutlineIcon className="absolute text-red-500 top-[50px] right-3 transition-all duration-[0.3s]" />
                  )}
                </div>

                {/* Submit button */}
                <button type="submit" className="foboh-green-btn">
                  Create account
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Registration;
