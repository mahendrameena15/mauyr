import React from "react";
import { Button, Modal } from "antd";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";

const AlertModal = ({
  closeIcon,
  handleOk,
  isModalOpen,
  handleCancel,
  SaveCancel,
  handleDeleteOrder,
  setActiveStep,
  setIsCustomerSelected,
}) => {
  const saveBtn = () => {
    handleCancel(), SaveCancel();
    handleDeleteOrder();
    setActiveStep(0);
    setIsCustomerSelected(false);
  };
  return (
    <>
      <Modal
        title={
          <div className="flex justify-start items-center gap-2">
            <div className="bg-[#FEF0C7] border-[#FFFAEB] border-[6px] rounded-full h-[48px] flex justify-center items-center w-[48px]">
              <WarningAmberRoundedIcon style={{ fill: "#DC6803" }} />
            </div>
            <h5 className="text-[#2B4447] text-lg font-medium">
              Leaving this page will discard all your changes.
              <br /> Are you sure you want to leave?
            </h5>
          </div>
        }
        footer={[
          <div className="flex justify-end items-center">
            <Button
              key="cancel"
              onClick={() => {
                saveBtn();
              }}
              className="bg-[#147D73] text-white text-base font-medium rounded-[8px]  h-[44px] w-[84px]  flex justify-center items-center px-5"
            >
              Yes
            </Button>

            <Button
              key="ok"
              type="primary"
              onClick={handleCancel}
              className="bg-[#DC3545] text-white text-base font-medium rounded-[8px]  h-[44px] w-[84px] flex justify-center items-center px-5"
            >
              No
            </Button>
          </div>,
        ]}
        onCancel={handleCancel}
        open={isModalOpen}
        onOk={handleOk}
        closeIcon={false}
      ></Modal>
    </>
  );
};

export default AlertModal;
