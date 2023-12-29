import { useState, useEffect } from "react";
import { CheckBox, CheckBoxOutlineBlank } from "@mui/icons-material";
import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { SignUpSchema } from "../../schemas";
import { useFormik } from "formik";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { generateUniqueKey } from "../../helpers/uniqueKey";
import { Visibility } from "@mui/icons-material";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import {
  postBusinessName,
  putUserUpdate,
} from "../../reactQuery/registrationApiModule";
const initialValues = {
  email: "",
  password: "",
};

const SignupNew = () => {
  const navigate = useNavigate();
  const [emailPresent, setEmailPresent] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const SMTP_URL = process.env.REACT_APP_SMTP_URL;
  const authUrl = process.env.REACT_APP_AUTH_URL;
  const authService = process.env.REACT_APP_AUTH_SERVICE;
  const [showPassword, setShowPassword] = useState(false);
  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const { values, errors, handleBlur, handleChange, handleSubmit, touched } =
    useFormik({
      initialValues: initialValues,
      validationSchema: SignUpSchema,
      onSubmit: (values) => {
        // const url = process.env.REACT_APP_URL;
        setIsLoading(true);

        fetch(`${authService}/api/Verify/GetUser`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token: localStorage.getItem("token"),
            filters: {
              issuer: "fobohdev.onmicrosoft.com",
              issuerAssignedId: values.email,
              email: null,
            },
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            if (
              data?.userdetails?.value?.length > 0 &&
              !data.error &&
              data?.userdetails?.value
            ) {
              if (data?.userdetails?.value[0]?.mail === values?.email) {
                setIsLoading(false);
                setEmailPresent(true);
              }
            } else {
              setEmailPresent(false);
              fetch(
                `${SMTP_URL}/api/notify/GenerateMailContentAndSendEmailSimply`,
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    to: values.email,
                    mailtype: "oms-emailverification",
                    name: "email",
                  }),
                }
              )
                .then((response) => response.json())
                .then((data) => {
                  setIsLoading(false);
                  localStorage.setItem("email", values.email.toLowerCase());
                  localStorage.setItem("password", values.password);
                  localStorage.setItem("uniqueKey", data.key);
                  navigate(`/auth/registration-email/${data.key}`);
                })
                .catch((error) => {
                  console.log(error);
                });
            }
          });
      },
    });

  const handleRememberMe = () => {
    setRememberMe((prevRememberMe) => !prevRememberMe);
  };

  // Sign in with google
  const handleCallback = (response) => {
    const googleResponse = jwtDecode(response.credential);
    let randomPassword = generateUniqueKey();
    let password = randomPassword.slice(0, 8);
    fetch(`${authService}/api/Verify/CreateUser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: localStorage.getItem("token"),
        userProfile: {
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
            password: password,
          },
          mobilePhone: null,
        },
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          if (data.error.error) {
            setEmailPresent(true);
          }
        } else {
          fetch(`${authUrl}/api/User/create`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              firstName: googleResponse.given_name,
              lastName: googleResponse?.family_name || "",
              email: googleResponse.email.toLowerCase(),
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
            .then(async (data) => {
              const organisationId = await postBusinessName("");

              await putUserUpdate(
                data.data.ccrn,
                data.data.firstName,
                data.data.lastName,
                data.data.email,
                data.data.mobile,
                data.data.password,
                "",
                organisationId
              );
              localStorage.setItem("email", googleResponse.email);
              navigate("/main/account-management/dashboard");
            });
        }
      })
      .catch((error) => console.log(error));
  };

  //Calling login with google api
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

  return (
    <>
      <div className="absolute md:bg-[#F8FAFC] w-full h-screen flex items-center justify-center">
        <div className="container mx-auto px-6">
          <div className="w-full scale-90 ">
            <div className="flex flex-col md:flex-row md:justify-center bg-white gap-12">
              <div className="w-full md:w-1/2 lg:ps-12">
                <div className="px-4 sm:px-6 md:px-8 lg:px-10">
                  <h1 className="mb-6 mt-8 text-3xl text-[#212B36]">Sign up</h1>
                  <p
                    onClick={() => navigate("/auth/sign-in")}
                    className="text-[#637381] cursor-pointer mb-5 text-base"
                  >
                    Already have an account?{" "}
                    <span className="text-[#147D73]">Log in</span>
                  </p>
                  {emailPresent && (
                    <p className="mt-2 text-red-500">
                      Email already exists. Please use a different email or
                      please login.
                    </p>
                  )}
                </div>
                <form
                  onSubmit={handleSubmit}
                  className="px-4 sm:px-6 md:px-8 lg:px-10 py-4"
                >
                  {/* Email input */}
                  <div className="relative mb-6" data-te-input-wrapper-init>
                    <label
                      htmlFor="email"
                      className="text-base font-normal text-[#2B4447]"
                    >
                      Your email
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      className="transition-all duration-[0.3s]"
                      placeholder="Your email"
                      autoComplete="on"
                      style={{
                        border:
                          errors.email && touched.email && "1px solid red",
                      }}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email}
                    />

                    {errors.email && touched.email && (
                      <p className="mt-2 mb-2 text-red-500">{errors.email}</p>
                    )}
                    {errors.email && touched.email && (
                      <ErrorOutlineIcon className="absolute text-red-500 top-[47px] right-3 transition-all duration-[0.3s]" />
                    )}
                  </div>

                  {/* Password input */}
                  <div className="relative mb-6" data-te-input-wrapper-init>
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
                        maxLength={17}
                        className="js-password relative"
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
                    {!errors.password && values.password && (
                      <p className="mt-2 mb-2 text-green-500">
                        Your password is strong.
                      </p>
                    )}

                    {errors.password && touched.password && (
                      <p className="mt-2 mb-2 text-red-500">
                        {errors.password}
                      </p>
                    )}
                  </div>

                  {/* Remember me checkbox */}
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
                        onClick={handleRememberMe}
                        className="text-[#637381] font-normal"
                        style={{
                          position: "relative",
                          top: "2px",
                          left: "5px",
                          cursor: "pointer",
                        }}
                      >
                        Remember me
                      </label>
                    </div>

                    {/* Forgot password link */}
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
                      Sign up
                    </button>
                  )}

                  {/* Divider */}
                  <div className="my-2 flex items-center before:mt-1 before:flex-1 before:border-t before:border-[#E9EDF4] after:mt-1 after:flex-1 after:border-t after:border-[##E9EDF4]">
                    <p className="mx-4 my-5 text-center text-[#637381] font-openSans text-lg">
                      Or continue with
                    </p>
                  </div>

                  {/* Social login buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 sm:gap-10 items-center justify-center">
                    <div id="signInDiv"></div>
                  </div>
                </form>
              </div>
              <div className="md:basis-1/2 hidden lg:block">
                <img
                  src="/image/signup/SignUpImg.png"
                  className="h-full w-full"
                  alt="signup"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignupNew;
