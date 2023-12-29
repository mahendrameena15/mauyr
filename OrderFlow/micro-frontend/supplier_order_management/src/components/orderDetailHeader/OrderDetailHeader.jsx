import React, { useEffect, useState } from "react";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { fomatDateAndTime } from "../../helpers/formatDateAndTime";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Modal, Skeleton } from "antd";
import { useNavigate } from "react-router-dom";
import {
  orderStatusChange,
  paymentStatusChange,
} from "../../helpers/orderDetailsHelper";
import ChangeStatusModal from "../../Modal/ChangeStatusModal";
import PaymentStatusModal from "../../Modal/PaymentStatusModal";
import { Navigate } from "react-router-dom";

const OrderDetailHeader = ({
  orderAdressDetails,
  success,
  error,
  warning,
  asyncFunction,
  paymentStatus,
  setPaymentStatus,
  setOrderStatus,
  orderStatus,
  orderStatusList,
}) => {
  const navigate = useNavigate();

  const [paymentStatusDropdown, setPaymentStatusDropdown] = useState(false);
  const [changeStatusModal, setChangeStatusModal] = useState(false);
  const [updatedOrderStatus, setUpdatedOrderStatus] = useState("");
  const [isOrderList, setIsOrderList] = useState(false);
  const [paymentStatusModal, setPaymentStatusModal] = useState(false);
  const [loading, setLoading] = useState(true);

  const handlePaymentStatus = () => {
    if (orderStatus !== "Cancelled" && orderStatus !== "Paid") {
      setPaymentStatusDropdown(!paymentStatusDropdown);
    } else {
      setPaymentStatusDropdown(paymentStatusDropdown);
    }
  };

  // Handle for payment status change
  const handleOk = async () => {
    const paymentStatusChangeResponse = await paymentStatusChange(
      orderAdressDetails,
      "Paid"
    );

    if (paymentStatusChangeResponse) {
      setPaymentStatusDropdown(false);
      success("Order marked as Paid successfully!");
      setPaymentStatusModal(false);
      asyncFunction();
    } else {
      error("Some error has occurred, please try again later!");
      setPaymentStatusModal(false);
    }
  };

  //Order status change modal opening
  const handleOrderStatusChange = async (status) => {
    setChangeStatusModal(true);
    setUpdatedOrderStatus(status);
  };

  //Order status change modal opening
  const confirmOrderStatusChange = async (status) => {
    const orderStatusChangeResponse = await orderStatusChange(
      status,
      orderAdressDetails
    );

    if (orderStatusChangeResponse) {
      setChangeStatusModal(false);
      success(`Order status successfully changed to ${status} !`);
      setIsOrderList(false);
      asyncFunction();
    } else {
      setChangeStatusModal(false);
      error("Some error has occurred, please try again later!");
    }
  };
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setLoading(false);
    }, 2000); // 3000 milliseconds = 3 seconds

    // Clear the timeout if the component unmounts or if the data arrives
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <>
      {!loading ? (
        <div className="flex justify-between mb-5 py-4">
          <div className=" flex justify-start items-start gap-5">
            <div
              className="border border-[#EDEFF1] bg-white rounded-[6px] p-2 cursor-pointer"
              onClick={() => {
                navigate("/main/orders/all-orders");
              }}
            >
              <ChevronLeftIcon />
            </div>
            <div className="flex flex-col gap-2">
              <h4 className="text-lg font-semibold text-[#212B36]">
                Orders #{orderAdressDetails?.orderId}
              </h4>
              <h5 className="font-medium text-base text-[#212B36]">
                {orderAdressDetails?.businessName}
              </h5>
            </div>
            <h5 className="text-base font-medium text-[#637381] ">
              {fomatDateAndTime(orderAdressDetails?.orderEntryDate)}
            </h5>
            <div className="relative  flex justify-end">
              <div
                style={{
                  backgroundColor:
                    paymentStatus === "Paid" ? "#147D7330" : "#E5E5E5",
                  color: paymentStatus === "Paid" ? "#147D73" : "#637381",
                  borderRadius: "5px",
                }}
                className="flex px-3 py-2 w-[140px] justify-center gap-2 cursor-pointer"
              >
                <h5
                  onClick={handlePaymentStatus}
                  className={
                    paymentStatus === "Paid"
                      ? " text-[#147D73] font-medium text-base "
                      : " text-[#637381] font-medium text-base "
                  }
                >
                  {paymentStatus}
                </h5>
                {paymentStatus === "Unpaid" && orderStatus !== "Cancelled" && (
                  <div className="relative">
                    <div onClick={handlePaymentStatus}>
                      <KeyboardArrowDownIcon />
                    </div>
                  </div>
                )}
              </div>
              {paymentStatusDropdown && (
                <button
                  disabled={orderStatus === "Cancelled"}
                  style={{
                    backgroundColor: "#147D73",
                    borderRadius: "5px",
                    left: "5px",
                    top: "44px",
                  }}
                  className=" text-white text-base font-semibold py-2 px-4 flex gap-1 absolute right-[2px] w-[145px]"
                  onClick={() => setPaymentStatusModal(true)}
                >
                  Mark as paid
                </button>
              )}
            </div>
          </div>

          {orderStatus === "Processing" ||
          orderStatus === "Shipped" ||
          orderStatus === "Partially fulfilled" ? (
            <>
              <div className="relative">
                <div
                  className="flex gap-1 h-fit bg-[#147D73] rounded-[6px] py-2 px-4 cursor-pointer"
                  onClick={() => setIsOrderList(!isOrderList)}
                >
                  <p className="text-white text-base font-semibold">
                    {orderStatus}
                  </p>
                  <div>
                    <KeyboardArrowDownIcon style={{ fill: "#fff" }} />
                  </div>
                </div>
                {isOrderList && (
                  <div className="absolute bg-[#147D73] rounded-[6px] py-2 px-4 top-[43px] left-0">
                    {orderStatusList.map((item) => (
                      <div>
                        <div className="flex gap-1 text-whitewhitespace-nowrap py-1">
                          <button
                            className="text-sm font-medium text-white"
                            onClick={() => handleOrderStatusChange(item.label)}
                          >
                            {item.label}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="h-fit bg-[#147D73] rounded-[6px] py-2 px-4 cursor-pointer">
              <p className="text-white text-base font-semibold">
                {orderStatus}
              </p>
            </div>
          )}
        </div>
      ) : (
        <div className="" style={{ height: "100px" }}>
          <Skeleton
            paragraph={{ rows: 1 }}
            active
            avatar
            className="custom-skeleton"
            loading={loading}
          />
        </div>
      )}
      <ChangeStatusModal
        orderStatus={orderStatus}
        updatedOrderStatus={updatedOrderStatus}
        handleCancel={() => {
          setChangeStatusModal(false);
        }}
        isModalOpen={changeStatusModal}
        handleOk={() => confirmOrderStatusChange(updatedOrderStatus)}
        closeIcon={false}
      />
      <PaymentStatusModal
        handleCancel={() => {
          setPaymentStatusModal(false);
        }}
        isModalOpen={paymentStatusModal}
        handleOk={handleOk}
        closeIcon={false}
      />
    </>
  );
};

export default OrderDetailHeader;
