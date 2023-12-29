import React from "react";
import { Button, Modal } from "antd";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";

const CancelOrderModal = ({
  closeIcon,
  handleOk,
  isModalOpen,
  handleCancel,
}) => {
  return (
    <>
      <Modal
        title={
          <div className="flex justify-start items-center gap-2">
            <div className="bg-[#FEF0C7] border-[#FFFAEB] border-[6px] rounded-full h-[48px] flex justify-center items-center w-[48px]">
              <WarningAmberRoundedIcon style={{ fill: "#DC6803" }} />
            </div>
            <h5 className="text-[#2B4447] text-lg font-medium">
              Do you want to cancel this order?
            </h5>
          </div>
        }
        footer={[
          <div className="flex justify-end items-center">
            <Button
              key="cancel"
              onClick={handleCancel}
              className="bg-[#ffffff] border text-[#344054] border-[#D0D5DD]  text-base font-medium rounded-[8px]  h-[44px] w-fit  flex justify-center items-center px-5"
            >
              No
            </Button>

            <Button
              key="ok"
              type="primary"
              onClick={handleOk}
              className="bg-[#DC3545] text-white text-base w-fit font-medium h-[44px]"
            >
              Cancel Order
            </Button>
          </div>,
        ]}
        onCancel={handleCancel}
        open={isModalOpen}
        onOk={handleOk}
        closeIcon={false}
      >
        <p className="text-sm font-normal text-[#667085] ">
          Cancelling this order will remove this from the{" "}
        </p>
      </Modal>
    </>
  );
};

export default CancelOrderModal;
