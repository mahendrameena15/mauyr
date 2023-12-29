import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ResetLinkCard = () => {
  const navigate = useNavigate();
  const email = localStorage.getItem("email");
  const { id } = useParams();
  const SMTP_URL = process.env.REACT_APP_SMTP_URL;

  useEffect(() => {
    if (id !== localStorage.getItem("uniqueKey")) {
      navigate("/auth/password-reset-email");
    }
  }, []);

  const handleEmailLink = () => {
    //Email link
    window.open(`https://${email}`, "_blank");
  };

  const handleResetLink = () => {
    //Reset Link

    fetch(`${SMTP_URL}/api/notify/GenerateMailContentAndSendEmailSimply`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to: email,
        name: localStorage.getItem("userName"),
        mailtype: "oms-passwordreset",
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.key) {
          localStorage.setItem("uniqueKey", data.key);
          alert("Email sent successfully!");
        } else {
          alert("Try to send email again");
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <section>
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full p-6 bg-white md:mt-0 sm:max-w-md  rounded-[22px] sm:p-8  shadow-md ">
          <div className="flex flex-col items-center">
            <img
              className=" mb-6 mt-10 w-[190px]"
              src="/image/reset/fobohLogo.png"
              alt="foboh-icon"
            />

            <h2
              className="mb-6 text-[20px]   font-bold leading-tight text-[#147D73] font-inter md:text-3xl
"
            >
              Help is on the way!
            </h2>
            <p className="text-[#637381] text-base font-inter leading-5  my-4 flex-shrink-0 tracking-tight text-center">
              Almost there! An email containing the your
              <br />
              password reset link was sent to{" "}
              <span
                onClick={handleEmailLink}
                className="text-[#147D73] cursor-pointer underline"
              >
                {email}
              </span>
            </p>
            <p className="text-[#637381] inline text-base font-inter leading-5  my-4 flex-shrink-0 tracking-tight text-center">
              Didn’t receive an email? Please double check that you entered the
              correct email address and check your spam folder.
            </p>
            <p className="text-[#637381] text-base font-inter leading-5 my-4 flex-shrink-0 tracking-tight text-center">
              Still no luck?{" "}
              <span
                onClick={handleResetLink}
                className="font-semibold cursor-pointer text-[#147D73]"
              >
                Resend email
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResetLinkCard;
