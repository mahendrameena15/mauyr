import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  CheckBox,
  CheckBoxOutlineBlank,
  Visibility,
  VisibilityOffOutlined,
} from "@mui/icons-material";
import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import jwtDecode from "jwt-decode";
import { useFormik } from "formik";
import { SignInSchema } from "../../schemas";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { generateUniqueKey } from "../../helpers/uniqueKey";
import { updateUserData } from "../../Redux/Action/userSlice";
import { useSelector, useDispatch } from "react-redux";

const initialValues = {
  email: "",
  password: "",
};

const SigninNew = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [isValidPassword, setIsValidPassword] = useState(true);
  const [isEmail, setIsEmail] = useState(true);
  const [isPassword, setIsPassword] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const authUrl = process.env.REACT_APP_AUTH_URL;
  const { values, errors, handleBlur, handleChange, handleSubmit, touched } =
    useFormik({
      initialValues: initialValues,
      validationSchema: SignInSchema,
      onSubmit: (values) => {
        setIsLoading(true);
        fetch(`${authUrl}/api/User/Verify-login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: values.email.toLowerCase(),
            password: values.password,
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            setIsLoading(false);
            if (data.success) {
              localStorage.setItem("userId", data.data.ccrn);
              localStorage.setItem("email", values.email.toLowerCase());
              const user = data.data;
              dispatch(
                updateUserData({
                  firstName: user.firstName,
                  lastName: user.lastName,
                  email: user.email,
                  mobile: user.mobile,
                  password: "",
                  status: true,
                  role: user.role,
                  meta: "",
                  adId: user.adId,
                  imageUrl: user.imageUrl,
                  bio: user.bio,
                  organisationId: user.organisationId,
                  isActive: true,
                })
              );
              navigate("/main/account-management/dashboard");
            } else {
              setIsValidPassword(false);
            }
          })
          .catch((error) => {
            setIsLoading(false);
            console.log(error);
          });
      },
    });

  //Google handle callback
  const handleCallback = (response) => {
    const googleResponse = jwtDecode(response.credential);

    fetch(`${authUrl}/api/User/get?email=${googleResponse.email}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        let randomPassword = generateUniqueKey();
        let password = randomPassword.slice(0, 8);

        if (data.success) {
          localStorage.setItem("email", googleResponse.email);
          navigate("/main/account-management/dashboard");
        } else {
          fetch(
            `https://graph.microsoft.com/beta/fobohdev.onmicrosoft.com/users?$filter=(identities/any(i:i/issuer eq 'fobohdev.onmicrosoft.com' and i/issuerAssignedId eq '${googleResponse.email}'))`,
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json",
              },
            }
          )
            .then((response) => response.json())
            .then((data) => {
              fetch(`${authUrl}/api/User/create`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  firstName: googleResponse.given_name,
                  lastName: googleResponse.family_name,
                  email: googleResponse.email,
                  password: "",
                  status: true,
                  role: "",
                  meta: "",
                  adId: "",
                  imageUrl: "",
                  bio: "",
                  mobile: "",
                  organisationId: "",
                  isActive: true,
                }),
              })
                .then((response) => response.json())
                .then((data) => {
                  if (data.success) {
                    fetch("https://graph.microsoft.com/v1.0/users", {
                      method: "POST",
                      headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                          "token"
                        )}`,
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({
                        accountEnabled: true,
                        displayName: `${googleResponse.given_name} ${googleResponse.family_name}`,
                        jobTitle: null,
                        mail: googleResponse.email,
                        identities: [
                          {
                            signInType: "emailAddress",
                            issuer: "fobohdev.onmicrosoft.com",
                            issuerAssignedId: googleResponse.email,
                          },
                        ],
                        passwordProfile: {
                          forceChangePasswordNextSignIn: true,
                          password: `@${password}`,
                        },
                        mobilePhone: null,
                      }),
                    })
                      .then((response) => response.json())
                      .then((data) => {
                        localStorage.setItem("email", googleResponse.email);

                        navigate("/main/account-management/dashboard");
                      })
                      .catch((error) => console.log(error));
                  }
                })
                .catch((err) => console.log(err));
            })
            .catch((error) => console.log(error));
        }
      });
  };

  // Sign in with google

  useEffect(() => {
    /* global google */
    window.google.accounts.id.initialize({
      client_id:
        "751295795620-4kts1rr5gelpjt2eo22ta6gnunakune7.apps.googleusercontent.com",
      callback: handleCallback,
    });

    google.accounts.id.renderButton(document.getElementById("signInDiv"), {
      theme: "outline",
      size: "large",
    });
  }, []);

  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleRememberMe = () => {
    setRememberMe((prevRememberMe) => !prevRememberMe);
  };

  return (
    <>
      <div className="absolute md:bg-[#F8FAFC]  w-full h-screen flex items-center justify-center ">
        <div className="container mx-auto px-6 ">
          <div className="w-full scale-90">
            <div className="flex flex-col md:flex-row md:justify-center bg-white gap-12  ">
              <div className="w-full md:w-1/2 lg:ps-12 flex flex-col justify-center">
                <div className="px-4 sm:px-6 md:px-8  lg:px-10">
                  <h1 className="mb-6 mt-8 text-3xl text-[#212B36]">Log in</h1>
                  <p
                    onClick={() => navigate("/auth/sign-up")}
                    className="text-[#637381] mb-5 text-base cursor-pointer"
                  >
                    Don't have an account?{" "}
                    <span className="text-[#147D73]">Sign up</span>
                  </p>
                </div>
                <form
                  onSubmit={handleSubmit}
                  className="px-4 sm:px-6 md:px-8 lg:px-10  pb-4 "
                >
                  {/* Email input  */}
                  <div
                    className={`relative mb-6 ${
                      !isEmail ? "text-red-500" : ""
                    }`}
                    data-te-input-wrapper-init
                  >
                    <label
                      htmlFor="email"
                      className="text-base font-normal text-[#2B4447]"
                    >
                      Your email
                    </label>
                    <input
                      type="text"
                      id="email"
                      placeholder="Your email"
                      autoComplete="on"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      style={{
                        border:
                          errors.email && touched.email && "1px solid red",
                      }}
                    />
                    {errors.email && touched.email && (
                      <p className="mt-2 mb-2 text-red-500">{errors.email}</p>
                    )}
                    {errors.email && touched.email && (
                      <ErrorOutlineIcon className="absolute text-red-500 top-[47px] right-3 transition-all duration-[0.3s]" />
                    )}
                  </div>

                  {/* Password input */}

                  <div
                    className={`relative  mb-6 ${
                      !isPassword ? "text-red-500" : ""
                    }`}
                    data-te-input-wrapper-init
                  >
                    <label
                      htmlFor="password"
                      className="text-base font-normal text-[#2B4447]"
                    >
                      Your password
                    </label>
                    <div className="inset-y-0 right-0 flex items-center">
                      <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        className={`js-password ${
                          !isValidPassword || !isPassword
                            ? "border-red-500"
                            : ""
                        }`}
                        autoComplete="off"
                        placeholder="Your password"
                        style={{
                          border:
                            errors.password &&
                            touched.password &&
                            "1px solid red",
                        }}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.password}
                      />
                      <label
                        style={{ zIndex: "50" }}
                        className="opacity-[0.5] mb-[5px] z-50 rounded px-2 text-sm text-gray-600 font-inter absolute right-3 top-[49px] cursor-pointer js-password-label"
                        htmlFor="password"
                        onClick={handleTogglePassword}
                      >
                        {showPassword ? (
                          <Visibility fontSize="small" />
                        ) : (
                          <VisibilityOffOutlinedIcon fontSize="small" />
                        )}
                      </label>
                    </div>
                    {errors.password && touched.password && (
                      <p className="mt-2 mb-2 text-red-500">
                        {errors.password}
                      </p>
                    )}
                  </div>
                  {!isValidPassword && (
                    <p className="mb-6 -mt-4 text-red-500">
                      Email or password are incorrect, please try again
                    </p>
                  )}

                  {!isPassword && (
                    <p className="mb-6 -mt-4 text-red-500">
                      Password field must not be empty
                    </p>
                  )}

                  {/* Remember me checkbox  */}
                  <div className="mb-6 flex items-center justify-between">
                    <div className="">
                      {rememberMe ? (
                        <CheckBoxOutlinedIcon
                          onClick={handleRememberMe}
                          className="text-[#147D73] cursor-pointer"
                        />
                      ) : (
                        <CheckBoxOutlineBlank
                          onClick={handleRememberMe}
                          className="text-[#147D73] cursor-pointer"
                        />
                      )}

                      <label
                        className="text-[#637381]  font-normal"
                        style={{
                          position: "relative",
                          top: "2px",
                          left: "5px",
                          cursor: "pointer",
                        }}
                        onClick={handleRememberMe}
                      >
                        Remember me
                      </label>
                    </div>

                    {/* Forgot password link  */}
                    <p
                      className="text-[#147D73] cursor-pointer transition duration-150 ease-in-out hover:text-primary-600 focus:text-primary-600 active:text-primary-700 dark:text-primary-400 dark:hover:text-primary-500 dark:focus:text-primary-500 dark:active:text-primary-600"
                      onClick={() => navigate("/auth/password-reset-email")}
                    >
                      Forgot password?
                    </p>
                  </div>

                  {/* Submit button */}
                  {isLoading ? (
                    <button
                      disabled
                      className="foboh-green-btn flex items-center justify-center w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mt-4"
                    >
                      <svg
                        aria-hidden="true"
                        role="status"
                        className="inline w-4 h-4 mr-3 text-white animate-spin"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        {/* ... (your SVG path for the spinner) */}
                        <path
                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                          fill="#E5E7EB"
                        />
                        <path
                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                          fill="currentColor"
                        />
                      </svg>
                      Loading...
                    </button>
                  ) : (
                    <button type="submit" className="foboh-green-btn">
                      Login
                    </button>
                  )}

                  <div className="my-2 flex items-center before:mt-1 before:flex-1 before:border-t before:border-[#E9EDF4] after:mt-1 after:flex-1 after:border-t after:border-[##E9EDF4]">
                    <p className="mx-4  my-5 text-center  text-[#637381] font-inter text-lg">
                      Or continue with
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 sm:gap-10 items-center justify-center">
                    <div id="signInDiv"></div>
                  </div>
                </form>
              </div>
              <div className="  md:basis-1/2  hidden lg:block ">
                <img
                  src="/image/signin/SignInImg.png"
                  className="h-full w-full  "
                  alt="signin"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SigninNew;
