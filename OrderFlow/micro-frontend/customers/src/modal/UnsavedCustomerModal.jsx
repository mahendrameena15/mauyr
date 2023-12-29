import React, { useRef, useState } from "react";
import { Button, Modal } from "antd";
import AutorenewOutlinedIcon from "@mui/icons-material/AutorenewOutlined";
import { Select } from "antd";
import ReportProblemOutlinedIcon from "@mui/icons-material/ReportProblemOutlined";
const UnSavedCustomerModal = ({ open, onOk, onCancel, onStay }) => {
  const cancelButtonRef = useRef(null);

  return (
    <>
      <Modal
        title={
          <div className="flex justify-start items-center gap-3">
            <div className="bg-[#FED4C7] border-[#FFE9E3] border-[4px] h-[48px] w-[48px] rounded-full flex justify-center items-center ">
              <ReportProblemOutlinedIcon style={{ fill: "#DC3545" }} />
            </div>
            <h5 className="text-[20px] font-medium text-[#2B4447]">
              You have unsaved changes
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
              Stay
            </Button>

            <Button
              key="ok"
              type="primary"
              onClick={onStay}
              className="bg-[#DC3545] text-white text-base font-medium rounded-[8px]  h-[44px] w-[33%] flex justify-center items-center px-5"
            >
              Leave page
            </Button>
          </div>,
        ]}
        open={open}
        onOk={onOk}
        onCancel={onCancel}
      >
        <div>
          <p className=" font-normal text-sm  text-[#2B4447] leading-[24px] mt-6">
            Leaving this page will delete any unsaved changes
          </p>
        </div>
      </Modal>
    </>
  );
};

export default UnSavedCustomerModal;
