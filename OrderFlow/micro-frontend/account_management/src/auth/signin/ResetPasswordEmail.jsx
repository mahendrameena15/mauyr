import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { ResetPasswordEmailSchema } from "../../schemas";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

const initialValues = {
  email: "",
};

const ResetPasswordEmail = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const SMTP_URL = process.env.REACT_APP_SMTP_URL;

  const { values, errors, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: initialValues,
    validationSchema: ResetPasswordEmailSchema,
    onSubmit: (values) => {
      localStorage.setItem("email", values.email);
      setIsLoading(true);

      fetch(
        `https://graph.microsoft.com/beta/tenant.onmicrosoft.com/users?$filter=(identities/any(i:i/issuer eq 'tenant.onmicrosoft.com' and i/issuerAssignedId eq '${values.email}'))&mailNickname`,
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
              const userName = data.value[0].displayName;
              localStorage.setItem("userName", userName);

              fetch(
                `${SMTP_URL}/api/notify/GenerateMailContentAndSendEmailSimply`,
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    to: values.email,
                    mailtype: "oms-passwordreset",
                    name: userName,
                  }),
                }
              )
                .then((response) => response.json())
                .then((data) => {
                  setIsLoading(false);
                  localStorage.setItem("uniqueKey", data.key);
                  navigate(`/auth/reset-link/${data.key}`);
                })
                .catch((error) => console.log(error));
            } else {
              setError(true);
              setIsLoading(false);
            }
          }
        })
        .catch((error) => {
          setIsLoading(false);
        });
    },
  });

  return (
    <section>
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full p-6 bg-white md:mt-0 sm:max-w-md  rounded-[22px] sm:p-8  shadow-md">
          <div className="flex flex-col items-center">
            <img
              className=" mb-6 mt-10 w-[190px]"
              src="/image/reset/fobohLogo.png"
              alt="foboh-icon"
            />

            <h2
              className="mb-6 text-[20px]  md:text-3xl font-bold leading-tight text-[#147D73] font-Inter
"
            >
              Reset your password
            </h2>
            {/* <p className="text-[#637381] text-[15px] font-inter leading-[20px] flex flex-col my-2 flex-shrink-0 tracking-tight text-center">
              Enter your email and we'll send you a link to reset your password.
            </p> */}
          </div>

          <form
            onSubmit={handleSubmit}
            className="mt-4 space-y-4 lg:mt-5 md:space-y-5"
            action="#"
          >
            <div className="relative">
              <label
                htmlFor="email"
                className="block mb-2 text-base font-inter font-medium text-[#2B4447] "
              >
                Your email
              </label>
              <input
                type="email"
                name="email"
                id="email-input"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                style={{ border: errors.email && "1px solid red" }}
                className="border transition duration-[0.3s]  border-[#E2E8F0] bg-white  sm:text-sm rounded-[8px]
                flex flex-col px-[20px] items-center 
                  w-full p-2.5 border-solid 
                  outline-none dark:placeholder-[#A0AEC0] 
                    text-[#656e7b]
                "
                placeholder="Enter Email"
                required=""
              />
              {<p className="mt-2 mb-2 text-red-500">{errors.email}</p>}
              {errors.email && (
                <ErrorOutlineIcon className="absolute text-red-500 top-[47px] right-3 transition-all duration-[0.3s]" />
              )}
              {error && (
                <p className="mt-2 mb-2 text-red-500">
                  User not present with this email. Please sign up.
                </p>
              )}
            </div>

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
              <button
                type="submit"
                className="inline-block h-[47px] font-bold w-full rounded-[15px] bg-[#147D73] px-6 pb-2 pt-2.5 text-[16px] leading-normal text-[#FCFCFC] font-inter shadow-[0_4px_9px_-4px_rgba(51,45,45,0.7)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)]  focus:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:outline-none focus:ring-0  active:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] dark:shadow-[0_4px_9px_-4px_#030202] dark:hover:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)]  dark:focus:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)] dark:active:bg-[#0e6158] dark:active:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)]"
              >
                Reset password
              </button>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default ResetPasswordEmail;
