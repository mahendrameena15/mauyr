import React from "react";
import { Link, useNavigate } from "react-router-dom";

import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
const SupplierSetting = () => {
  // const navigate = useNavigate();
  // const ProfileBtn = () => {
  //   navigate("dashboard/organisation-settings");
  // };
  return (
    <>
      <div className="px-6 padding-top-custom">
        <h5 className="font-semibold text-xl text-[#2B4447]">Settings</h5>
        <div className="flex flex-col gap-4 pb-16 mt-6">
          <Link to="/main/account-management/settings/organisation">
            <button className="w-full">
              <div
                className="custom-shadow px-6 py-5 flex justify-start items-center border border-[#E0E0E0] rounded-md hover-animation bg-white cursor-pointer"
                // onClick={() => {
                //   ProfileBtn();
                // }}
              >
                <div className=" 	">
                  <h5 className="text-lg font-semibold text-[#1D1E20] text-left">
                    {" "}
                    Organisation Settings
                  </h5>
                  <p className="text-[#8F959E] text-sm font-normal text-left">
                    View or edit details
                  </p>
                </div>
                {/* <div className="">
                  <KeyboardArrowRightIcon />
                </div> */}
              </div>
            </button>
          </Link>
          <Link to="/main/account-management/settings/bank-information">
            <button className="w-full">
              <div className="bg-white custom-shadow px-6 py-5 flex justify-start items-center border border-[#E0E0E0] rounded-md hover-animation cursor-pointer">
                <div className=" 	">
                  <h5 className="text-lg font-semibold text-[#1D1E20] text-left">
                    {" "}
                    Set Up Banking Information
                  </h5>
                  <p className="text-[#8F959E] text-sm font-normal text-left">
                    View or edit details
                  </p>
                </div>
                {/* <div className="">
                  <KeyboardArrowRightIcon />
                </div> */}
              </div>
            </button>
          </Link>
          <Link to="#">
            <button
              className="w-full hidden"
              // onClick={() => {
              //   navigate("dashboard/bank-information");
              // }}
            >
              <div className="bg-white custom-shadow px-6 py-5 flex justify-start items-center border border-[#E0E0E0] rounded-md hover-animation cursor-pointer">
                <div className=" 	">
                  <h5 className="text-left text-lg font-semibold text-[#1D1E20]">
                    Store Settings
                  </h5>
                  <p className="text-left text-[#8F959E] text-sm font-normal">
                    View or edit details
                  </p>
                </div>
                {/* <div className="">
                  <KeyboardArrowRightIcon />
                </div> */}
              </div>
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default SupplierSetting;
