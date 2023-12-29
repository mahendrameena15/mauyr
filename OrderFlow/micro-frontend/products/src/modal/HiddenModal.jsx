import React, { useRef, useState } from "react";
import { Button, Modal } from "antd";
import AutorenewOutlinedIcon from "@mui/icons-material/AutorenewOutlined";
import { Select } from "antd";
import ReportProblemOutlinedIcon from "@mui/icons-material/ReportProblemOutlined";
const HiddenModal = ({
  open,
  onOk,
  onCancel,
  handleBulkVisibility,
  totalProducts,
}) => {
  const cancelButtonRef = useRef(null);

  return (
    <>
      <Modal
        title={
          <div className="flex justify-start items-center gap-3">
            <div className="bg-[#F8FAFC] h-[48px] w-[48px] rounded-full flex justify-center items-center ">
              <AutorenewOutlinedIcon style={{ fill: "#147D73" }} />
            </div>
            <h5 className="text-[20px] font-medium text-[#2B4447]">
              Make {totalProducts} products no longer visible?
            </h5>
          </div>
        }
        footer={[
          <div className="flex justify-end items-center">
            <Button
              key="cancel"
              onClick={onCancel}
              className="border border-[#D0D5DD] text-[#344054] text-base font-medium rounded-[8px]  h-[44px] w-[84px]  flex justify-center items-center px-5"
            >
              Cancel
            </Button>

            <Button
              key="ok"
              type="primary"
              onClick={() => {
                handleBulkVisibility("hidden");
                onCancel();
              }}
              className="bg-[#147D73] text-white text-base font-medium rounded-[8px]  h-[44px] w-[33%] flex justify-center items-center px-5"
            >
              Set as Hidden
            </Button>
          </div>,
        ]}
        open={open}
        onOk={onOk}
        onCancel={onCancel}
      >
        <div>
          <p className=" font-normal text-sm  text-[#2B4447] leading-[24px] mt-6">
            Making products hidden will mean they are no longer listed on your
            portal and won’t be available for customers to purchase online
          </p>
        </div>
      </Modal>
    </>
  );
};

export default HiddenModal;
