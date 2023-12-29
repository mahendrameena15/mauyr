import { React, useState } from "react";

import ControlPointIcon from "@mui/icons-material/ControlPoint";

import { Menu } from "antd";
import CreateOrderModal from "../../Modal/CreateOrderModal";
import { useEffect } from "react";

const CreateOrderHeader = () => {
  const [createOrderModal, setCreateOrderModal] = useState(false);
  const popupData = localStorage.getItem("orderpopup");
  useEffect(() => {
    if (popupData === "true") {
      setCreateOrderModal(true);
      localStorage.removeItem("orderpopup");
    } else {
      setCreateOrderModal(false);
    }
  }, []);
  return (
    <>
      <div className="flex justify-between items-center py-5 ">
        <h5 className="text-[24px] font-semibold text-[#147D73] ">Orders</h5>
        <button
          onClick={() => {
            setCreateOrderModal(true);
          }}
          className="bg-[#147D73] rounded-[8px] py-2 px-3 flex justify-center items-center gap-2"
        >
          <ControlPointIcon style={{ fill: "#fff" }} />
          <h5 className="text-white text-sm font-semibold">Create Order</h5>
        </button>
      </div>
      <CreateOrderModal
        setCreateOrderModal={setCreateOrderModal}
        handleCancel={() => {
          setCreateOrderModal(false);
        }}
        isModalOpen={createOrderModal}
        handleOk={() => {
          setCreateOrderModal(false);
        }}
        closeIcon={false}
      />
    </>
  );
};

export default CreateOrderHeader;
