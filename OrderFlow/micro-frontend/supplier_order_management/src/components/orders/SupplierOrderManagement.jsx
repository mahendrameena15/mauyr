import React, { useState } from "react";

import ControlPointIcon from "@mui/icons-material/ControlPoint";

import ActionRequired from "./ActionRequired";
import TotalOrders from "./TotalOrders";
import AllOrders from "./AllOrders";
import CreateOrderHeader from "../createOrderHeader/CreateOrderHeader";
const SupplierOrderManagement = () => {
  return (
    <>
      <div className=" px-7 padding-top-custom">
        <CreateOrderHeader />
        <div className="">
          <TotalOrders />
          <div className="py-5 hidden">
            <h5 className=" mb-2 text-[#212B36] font-semibold text-[24px] leading-[30px]">
              Action required
            </h5>
            <p className="text-sm font-medium text-[#637381] leading-[20px]">
              Review and confirm new and pending orders
            </p>
          </div>
          <ActionRequired />
          <AllOrders />
        </div>
      </div>
    </>
  );
};

export default SupplierOrderManagement;
