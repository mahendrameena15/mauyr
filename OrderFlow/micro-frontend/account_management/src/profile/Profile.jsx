import React, { useState } from "react";
import PersonalDetails from "./PersonalDetails";
import EditProfile from "./EditProfile";
function Profile() {
  const [isDivVisible, setIsDivVisible] = useState(false);
  const [profileUri, setProfileUri] = useState("");
  const [show, setShow] = useState(false);
  const [imageSrc, setImageSrc] = useState(``);

  const sidebarHandler = () => {
    setIsDivVisible(!isDivVisible);
  };

  const resetProfileImage = (imgUrl) => {
    setProfileUri(imgUrl);
  };

  return (
    <>
      <div className="padding-top-custom">
        <div className="profile-section  sm:px-11 px-5      	">
          <div className="sm:pb-10 pb-8	sm:pt-5 pt-4">
            <h4 className="text-green text-2xl	font-semibold pb-2	">
              {" "}
              Your profile
            </h4>
            <p className="text-gray font-medium	 text-sm	">
              Customise your public profile
            </p>
          </div>
          <div className="grid gap-5 lg:flex  overflow-y-auto	scroll-smooth	scrollable">
            <PersonalDetails
              resetProfileImage={resetProfileImage}
              profileUri={profileUri}
              setShow={setShow}
              show={show}
              setImageSrc={setImageSrc}
              imageSrc={imageSrc}
            />
            <EditProfile
              setProfileUri={setProfileUri}
              setShow={setShow}
              show={show}
              setImageSrc={setImageSrc}
              imageSrc={imageSrc}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
