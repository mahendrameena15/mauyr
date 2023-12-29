import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import { ResetPasswordFormSchema } from "../../schemas";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { Visibility } from "@mui/icons-material";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import TaskAltOutlinedIcon from "@mui/icons-material/TaskAltOutlined";
import CryptoJS from "crypto-js";

const initialValues = {
  password: "",
  repeatPassword: "",
};

const ResetPasswordForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const handleToggleRepeatPassword = () => {
    setShowRepeatPassword((prevShowPassword) => !prevShowPassword);
  };
  const navigate = useNavigate();
  const { id } = useParams();
  const email = localStorage.getItem("email");
  const authUrl = process.env.REACT_APP_AUTH_URL;

  useEffect(() => {
    if (localStorage.getItem("uniqueKey") !== id) {
      navigate("/auth/password-reset-email");
    }

    fetch(
      `https://graph.microsoft.com/beta/tenant.onmicrosoft.com/users?$filter=(identities/any(i:i/issuer eq 'tenant.onmicrosoft.com' and i/issuerAssignedId eq '${email}'))`,
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
        if (data.value) {
          if (data.value.length > 0) {
            const id = data.value[0].id;
            localStorage.setItem("id", id);
          }
        }
      })
      .catch((error) => console.log(error));
  }, []);

  const { values, errors, handleBlur, handleChange, handleSubmit, touched } =
    useFormik({
      initialValues: initialValues,
      validationSchema: ResetPasswordFormSchema,
      onSubmit: (values) => {
        fetch(`${authUrl}/api/User/reset-password`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: localStorage.getItem("email"),
            password: values.repeatPassword,
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.success) {
              localStorage.removeItem("uniqueKey");
              localStorage.removeItem("email");
              localStorage.removeItem("userName");
              localStorage.removeItem("id");
              navigate("/auth/password-reset-success");
            } else {
              localStorage.removeItem("uniqueKey");
              localStorage.removeItem("email");
              localStorage.removeItem("userName");
              localStorage.removeItem("id");
              alert("Some error occurred, please try again later.");
            }
          })
          .catch((error) => console.log(error));
      },
    });

  // Encrypting the password

  const handleClick = () => {};
  return (
    <section className="container mx-auto ">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="bg-white px-6 py-8 rounded-[15px] min-w-min lg:w-1/3 md:w-1/2 sm:w-2/3   shadow-md text-black">
          <img
            className="mx-auto my-6 w-[190px]"
            src="/image/reset/fobohLogo.png"
            alt="foboh-icon"
          />
          <h2
            className="mb-6 mt-4 text-center text-[20px] font-bold leading-tight text-[#147D73] font-inter md:text-3xl
"
          >
            Reset your password
          </h2>
          {/* <p className="text-[#637381] text-[15px] font-inter leading-[20px] flex flex-col my-2 flex-shrink-0 tracking-tight text-center">
            Enter your email and we'll send you a link to reset your password.
          </p> */}
          <form onSubmit={handleSubmit}>
            {/* Mobile input */}

            <div className="relative mb-6">
              <label htmlFor="newPassword">New password</label>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Your new password"
                className="transition-all duration-[0.3s]"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                style={{
                  border:
                    errors.password && touched.password && "1px solid red",
                }}
                autoComplete="off"
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
              {!errors.password && values.password && (
                <p className="mt-2 mb-2 text-green-500">
                  Your password is strong.
                </p>
              )}
              {/* {!errors.password && values.password && (
                <TaskAltOutlinedIcon className="absolute text-green-500 top-[47px] right-3 transition-all duration-[0.3s]" />
              )} */}

              {<p className="mt-2 mb-2 text-red-500">{errors.password}</p>}
            </div>

            {/* Business name input  */}

            <div className="relative mb-6" data-te-input-wrapper-init>
              <label htmlFor="repeatPassword">Repeat password</label>
              <input
                type={showRepeatPassword ? "text" : "password"}
                id="repeatPassword"
                name="repeatPassword"
                className="transition duration-[0.3s]"
                placeholder="Your new password"
                autoComplete="off"
                value={values.repeatPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                style={{
                  border:
                    errors.repeatPassword &&
                    touched.repeatPassword &&
                    "1px solid red ",
                }}
              />
              <label
                style={{ zIndex: "50" }}
                className="opacity-[0.5] mb-[5px] z-50 rounded px-2 text-sm text-gray-600 font-inter absolute right-3 top-[49px] cursor-pointer js-password-label"
                htmlFor="password"
                onClick={handleToggleRepeatPassword}
              >
                {showRepeatPassword ? (
                  <Visibility fontSize="small" />
                ) : (
                  <VisibilityOffOutlinedIcon fontSize="small" />
                )}
              </label>
              {!errors.repeatPassword && values.repeatPassword && (
                <p className="mt-2 mb-2 text-green-500">
                  Your password is matched.
                </p>
              )}
              {errors.repeatPassword && touched.repeatPassword && (
                <p className="mt-2 mb-2 text-red-500">
                  {errors.repeatPassword}
                </p>
              )}
            </div>

            {/* Submit button */}
            <button
              type="submit"
              className="foboh-green-btn"
              onClick={handleClick}
            >
              Reset Password
            </button>

            {/* Divider  */}
          </form>
        </div>
      </div>
    </section>
  );
};

export default ResetPasswordForm;
