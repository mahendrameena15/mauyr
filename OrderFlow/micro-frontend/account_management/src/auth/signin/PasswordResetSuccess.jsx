import React from "react";
import { useNavigate } from "react-router-dom";

const PasswordResetSuccess = () => {
  const navigate = useNavigate();

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
              className="mb-6   text-[15px] font-bold leading-tight text-[#147D73] font-inter md:text-2xl
"
            >
              Your password has been reset!
            </h2>
            <p className="text-[#637381] text-[16px] font-inter leading-[20px] flex flex-col my-4 flex-shrink-0 tracking-tight text-center">
              You've successfully reset your password. <br /> Follow the prompt
              below to return your FOBOH <br /> account!
            </p>
          </div>

          <button
            onClick={() => navigate("/auth/sign-in")}
            className="inline-block my-4 h-[47px] font-bold w-full rounded-[15px] bg-[#147D73] px-6 pb-2 pt-2.5 text-[16px] leading-normal text-[#FCFCFC] font-inter shadow-[0_4px_9px_-4px_rgba(51,45,45,0.7)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)]  focus:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:outline-none focus:ring-0  active:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] dark:shadow-[0_4px_9px_-4px_#030202] dark:hover:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)]  dark:focus:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)] dark:active:bg-[#0e6158] dark:active:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)]"
          >
            Home
          </button>
        </div>
      </div>
    </section>
  );
};

export default PasswordResetSuccess;
