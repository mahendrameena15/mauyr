import React from "react";

const OrderUpdate = () => {
  return (
    <>
      <div className="w-full flex justify-center h-screen">
        <div className="h-full flex justify-center gap-10 flex-col items-center md:w-[825px] w-full">
          <div className="">
            <img src="/assets/logo.png" alt="" className="w-[190px]" />
          </div>
          <div className="rounded-[8px] border-[#E7E7E7] bg-[#fff] py-5 px-5 custom-shadow">
            <h5 className="font-semibold text-[24px] text-[#147D73] mb-2">
              Order updated 🔁
            </h5>
            <p className="text-sm font-normal text-[#1C1E23] mb-3">
              [Business name] has updated order #12345 on Oct 12th at 5:11 pm.
            </p>
            <button className="bg-[#147D73] rounded-[8px] py-2 px-3 text-white text-sm font-semibold ">
              Review order
            </button>
          </div>
          <div className="">
            <h5 className="text-base font-medium text-center text-[#101828]">
              © FOBOH Pty Ltd
            </h5>
            <p className="mt-2 font-normal text-sm text-center text-[#667085]">
              All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderUpdate;
