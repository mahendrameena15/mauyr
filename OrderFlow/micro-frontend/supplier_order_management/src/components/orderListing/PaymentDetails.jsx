import React from "react";

const PaymentDetails = ({ orderAdressDetails }) => {
  return (
    <div className="bg-white rounded-[8px] custom-shadow p-4 mt-5">
      <h4 className="font-semibold text-[20px]">Payment</h4>
      <div className="flex items-start gap-2 mt-3">
        <img src="./assets/visa.png" alt="" className="" />
        <p className="text-lg font-normal text-[#2B4447] ">
          Credit card ending with XXXX
        </p>
      </div>
    </div>
  );
};

export default PaymentDetails;
