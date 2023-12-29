import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const RegistrationEmail = () => {
  const { id } = useParams();
  const SMTP_URL = process.env.REACT_APP_SMTP_URL;
  const navigate = useNavigate();
  const email = localStorage.getItem("email");
  const key = localStorage.getItem("uniqueKey");

  useEffect(() => {
    if (key !== id) {
      navigate("/auth/sign-up");
    }
  }, []);

  const handleEmailLink = () => {
    //Email link
    window.open(`https://${email}`);
    // , "_blank"
  };

  const handleResendLink = () => {
    // const url = process.env.REACT_APP_URL
    //Resend Link
    fetch(`${SMTP_URL}/api/notify/GenerateMailContentAndSendEmailSimply`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to: email,
        mailtype: "oms-emailverification",
        name: "email",
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        localStorage.setItem("uniqueKey", data.key);
        alert("Email sent successfully!");
      })
      .catch((error) => console.log(error));
  };

  return (
    <section>
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full p-6 bg-white md:mt-0 sm:max-w-md  rounded-[22px] sm:p-8  shadow-xl">
          <div className="flex flex-col items-center scale-95">
            <img
              className=" mb-6 mt-10 w-[190px]"
              src="/image/signup/fobohLogo.png"
              alt="foboh-icon"
            />

            <h2 className="mb-6   text-[20px] font-bold leading-tight text-[#147D73] font-inter md:text-3xl">
              Verify your email
            </h2>
            <p className="text-[#637381] text-[16px] font-inter leading-[20px]  my-4 flex-shrink-0 tracking-tight text-center">
              Almost there! An email containing your verification link
              <br />
              was sent to{" "}
              <span
                onClick={handleEmailLink}
                className="text-[#147D73] cursor-pointer underline"
              >
                {email}
              </span>
            </p>
            <p className="text-[#637381] text-[16px] font-inter leading-[20px]  my-4 flex-shrink-0 tracking-tight text-center">
              Didn’t receive an email? Please double check <br /> that you
              entered the correct email address and check your spam folder.{" "}
            </p>
            <p className="text-[#637381] text-[16px] font-inter leading-[20px] my-4 flex-shrink-0 tracking-tight text-center">
              Still no luck?{" "}
              <span
                onClick={handleResendLink}
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

export default RegistrationEmail;
