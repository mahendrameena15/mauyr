import React, { useState } from "react";

function OrganisationLogo() {
  const [imageSrc, setImageSrc] = useState(``);
  const defaultImage = "/assets/update-user.png";
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageSrc(reader.result); // Update the state with the selected file
      };

      reader.readAsDataURL(file); // Read the file as a data URL
    }
  };
  return (
    <>
      <div className="w-full rounded-md border border-inherit bg-white h-full">
        <div className="border-b border-inherit sm:px-5 sm:py-4 py-3 px-4">
          <h6 className="text-base font-medium text-green">Personal details</h6>
        </div>
        <div className="px-6 py-7">
          <div className="flex justify-start gap-3 items-center">
            <div className="update-user rounded-full">
              <img
                id="previewImage"
                src={imageSrc || defaultImage}
                alt=""
                className="w-14	h-14	object-contain	"
              />
            </div>
            <div className="">
              <h6 className="font-normal	 text-base text-green">
                Edit your photo
              </h6>
              <div className=" pt-1 flex justify-start gap-2">
                <p className="text-gray font-normal	 text-sm">Delete</p>
                <p className="text-sm font-normal text-lime-600">Update</p>
              </div>
            </div>
          </div>
          <div className="border-darkGreen border border-dashed	flex justify-center items-center    	 rounded-md	h-44	w-full mt-4">
            <div className="text-center ">
              <div className="download-icon relative	mb-3 mx-auto border rounded-full border-inherit bg-white flex justify-center items-center w-10	h-10">
                <input
                  type="file"
                  className="download-file w-full h-full rounded-full absolute opacity-0	"
                  // value={imageSrc}
                  onChange={handleImageChange}
                />
                <svg
                  width={16}
                  height={16}
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M1.99992 9.33325C2.36811 9.33325 2.66659 9.63173 2.66659 9.99992V12.6666C2.66659 12.8434 2.73682 13.013 2.86185 13.138C2.98687 13.263 3.15644 13.3333 3.33325 13.3333H12.6666C12.8434 13.3333 13.013 13.263 13.138 13.138C13.263 13.013 13.3333 12.8434 13.3333 12.6666V9.99992C13.3333 9.63173 13.6317 9.33325 13.9999 9.33325C14.3681 9.33325 14.6666 9.63173 14.6666 9.99992V12.6666C14.6666 13.197 14.4559 13.7057 14.0808 14.0808C13.7057 14.4559 13.197 14.6666 12.6666 14.6666H3.33325C2.80282 14.6666 2.29411 14.4559 1.91904 14.0808C1.54397 13.7057 1.33325 13.197 1.33325 12.6666V9.99992C1.33325 9.63173 1.63173 9.33325 1.99992 9.33325Z"
                    fill="#147D73"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M7.5286 1.52851C7.78894 1.26816 8.21106 1.26816 8.4714 1.52851L11.8047 4.86185C12.0651 5.1222 12.0651 5.54431 11.8047 5.80466C11.5444 6.06501 11.1223 6.06501 10.8619 5.80466L8 2.94273L5.13807 5.80466C4.87772 6.06501 4.45561 6.06501 4.19526 5.80466C3.93491 5.54431 3.93491 5.1222 4.19526 4.86185L7.5286 1.52851Z"
                    fill="#147D73"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M7.99992 1.33325C8.36811 1.33325 8.66659 1.63173 8.66659 1.99992V9.99992C8.66659 10.3681 8.36811 10.6666 7.99992 10.6666C7.63173 10.6666 7.33325 10.3681 7.33325 9.99992V1.99992C7.33325 1.63173 7.63173 1.33325 7.99992 1.33325Z"
                    fill="#147D73"
                  />
                </svg>
              </div>
              <p className="text-xs	text-gray leading-5 font-normal	">
                <span className="text-lime-600 	">Click to upload</span> or drag
                and drop
              </p>
              <p className="text-xs text-gray	font-normal leading-5">
                SVG, PNG or JPG{" "}
              </p>
              <p className="text-xs text-gray	font-normal leading-5">
                (max, 800 X 800px)
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default OrganisationLogo;
