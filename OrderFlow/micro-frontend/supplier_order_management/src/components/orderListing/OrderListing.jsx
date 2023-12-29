import React, { useState } from "react";
import { Table, Skeleton, ConfigProvider } from "antd";
import CloseIcon from "@mui/icons-material/Close";
import CancelOrderModal from "../../Modal/CancelOrderModal";
import ChangeStatusModal from "../../Modal/ChangeStatusModal";
import OrderDetailHeader from "../orderDetailHeader/OrderDetailHeader";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import {
  getOrderDetails,
  getOrderStatusList,
  getTimeline,
  nameShortner,
  orderStatusChange,
  timelineConvert,
} from "../../helpers/orderDetailsHelper";
import { message } from "antd";
import OrderDetailsTimeline from "./OrderDetailsTimeline";
import DeliveryContact from "./DeliveryContact";
import DeliveryAddress from "./DeliveryAddress";
import BillingAddress from "./BillingAddress";
import PaymentDetails from "./PaymentDetails";

const OrderListing = () => {
  const [cancelOrderModal, setCancelOrderModal] = useState(false);
  const [orderAdressDetails, setOrderAdressDetails] = useState({});
  const [messageApi, contextHolder] = message.useMessage();
  const [orderProductsDetails, setOrderProductsDetails] = useState([]);
  const [paymentStatus, setPaymentStatus] = useState("");
  const [orderStatus, setOrderStatus] = useState("");
  const [orderStatusList, setOrderStatusList] = useState([]);
  const [changeStatusModal, setChangeStatusModal] = useState(false);
  const [updatedOrderStatus, setUpdatedOrderStatus] = useState("");
  const [timeline, setTimeline] = useState([]);
  const [loading, setLoading] = useState(true);
  const [shortenName, setShortenName] = useState("");

  const { id } = useParams();

  const columns = [
    {
      title: (
        <h5 className="text-lg font-semibold text-[#2B4447]">Product Detail</h5>
      ),
      dataIndex: "ProductDetail",
      width: 400,
    },
    {
      title: <h5 className="text-lg font-semibold text-[#2B4447]">Quantity</h5>,
      dataIndex: "Quantity",
      width: 150,
    },
    {
      title: <h5 className="text-lg font-semibold text-[#2B4447]">Price</h5>,
      dataIndex: "Price",
      width: 150,
    },
  ];

  // Handling event notifications
  const success = (message) => {
    messageApi.open({
      className: "custom-class",
      content: (
        <div className="flex justify-center gap-2 items-center">
          <CloseIcon style={{ fill: "#fff", width: "15px" }} />
          <p className="text-base font-semibold text-[#F8FAFC]">{message}</p>
        </div>
      ),
    });
  };
  const error = (message) => {
    messageApi.open({
      className: "custom-class",
      content: (
        <div className="flex justify-center gap-2 items-center">
          <CloseIcon style={{ fill: "#fff", width: "15px" }} />
          <p className="text-base font-semibold text-[#F8FAFC]">{message}</p>
        </div>
      ),
    });
  };
  const warning = (message) => {
    messageApi.open({
      className: "custom-class",
      content: (
        <div className="flex justify-center gap-2 items-center">
          <CloseIcon style={{ fill: "#fff", width: "15px" }} />
          <p className="text-base font-semibold text-[#F8FAFC]">{message}</p>
        </div>
      ),
    });
  };

  useEffect(() => {
    asyncFunction();
  }, []);
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setLoading(false);
    }, 3000);
    return () => clearTimeout(timeoutId);
  }, []);

  //Order status change modal opening
  const confirmOrderStatusChange = async (status) => {
    const orderStatusChangeResponse = await orderStatusChange(
      status,
      orderAdressDetails
    );

    if (orderStatusChangeResponse) {
      setChangeStatusModal(false);
      setCancelOrderModal(false);
      success(`Order status successfully changed to ${status} !`);
      asyncFunction();
    } else {
      setChangeStatusModal(false);
      setCancelOrderModal(false);
      error("Some error has occurred, please try again later!");
    }
  };

  //Order status change modal opening
  const handleOrderStatusChange = (status) => {
    setChangeStatusModal(true);
    setUpdatedOrderStatus(status);
  };

  const handleCancelOrder = (status) => {
    setCancelOrderModal(true);
    setUpdatedOrderStatus(status);
  };

  const asyncFunction = async () => {
    const orderDetailsResponse = await getOrderDetails(id);

    const timelineResponse = await getTimeline(orderDetailsResponse[0]);
    if (timelineResponse) {
      const updatedTimeline = timelineConvert(timelineResponse);
      setTimeline(updatedTimeline);
    }

    if (orderDetailsResponse) {
      const updatedName = nameShortner(orderDetailsResponse[0]?.customerName);
      setShortenName(updatedName);

      //If order status is New and payment is Paid
      if (
        orderDetailsResponse[0]?.orderStatus === "New" &&
        orderDetailsResponse[0]?.transactionStatus === "Paid"
      ) {
        const orderStatusChangeResponse = await orderStatusChange(
          "Processing",
          orderDetailsResponse[0]
        );
        if (orderStatusChangeResponse) {
          success(`Order status successfully changed to Processing !`);
          asyncFunction();
        } else {
          error("Some error has occurred, please try again later!");
        }
      } else if (orderDetailsResponse[0]?.orderStatus === "New") {
        const orderStatusChangeResponse = await orderStatusChange(
          "Pending",
          orderDetailsResponse[0]
        );
        if (orderStatusChangeResponse) {
          success(`Order status successfully changed to Pending !`);
          asyncFunction();
        } else {
          error("Some error has occurred, please try again later!");
        }
      }
      if (
        orderDetailsResponse[0]?.orderStatus === "Delivered" &&
        orderDetailsResponse[0]?.transactionStatus === "Paid"
      ) {
        const orderStatusChangeResponse = await orderStatusChange(
          "Complete",
          orderDetailsResponse[0]
        );
        if (orderStatusChangeResponse) {
          success(`Order status successfully changed to Complete !`);
          asyncFunction();
        } else {
          error("Some error has occurred, please try again later!");
        }
      }

      //Setting payment status to useState on loading
      setPaymentStatus(orderDetailsResponse[0]?.transactionStatus);

      //Setting order status to useState on loading
      setOrderStatus(orderDetailsResponse[0]?.orderStatus);

      //Setting order details to useState on loading
      setOrderAdressDetails(orderDetailsResponse[0]);

      //Setting order product details to useState on loading
      setOrderProductsDetails(
        orderDetailsResponse?.map((product, idx) => {
          return {
            key: idx,
            ProductDetail: (
              <div className="flex justify-start gap-4" key={idx}>
                <div
                  className="flex items-center justify-center"
                  style={{ width: "65px" }}
                >
                  <img
                    src={
                      product?.productImageUrls.length > 0
                        ? product?.productImageUrls[0]
                        : "/assets/order.png"
                    }
                    alt=""
                    style={{ height: "65px" }}
                  />
                </div>
                <div>
                  <h5 className="text-lg font-semibold text-[#2B4447]">
                    {product?.title}
                  </h5>
                  <p className="font-medium text-lg text-[#637381]">
                    {product?.configuration}
                  </p>
                </div>
              </div>
            ),
            Quantity: (
              <p className="text-lg font-semibold text-[#2B4447]">
                {product?.quantity}
              </p>
            ),
            Price: (
              <p className="text-lg font-semibold text-[#2B4447]">
                ${product?.globalPrice}
              </p>
            ),
          };
        })
      );

      if (
        orderDetailsResponse[0]?.orderStatus === "Processing" ||
        orderDetailsResponse[0]?.orderStatus === "Shipped" ||
        orderDetailsResponse[0]?.orderStatus === "Partially fulfilled"
      ) {
        const status = orderDetailsResponse[0]?.orderStatus;
        const orderStatusListResponse = await getOrderStatusList(status);
        setOrderStatusList(
          orderStatusListResponse.map((item, idx) => {
            return {
              label: item,
              value: idx,
            };
          })
        );
      }
    }
  };
  const emptyImage = (
    <div>
      {loading === true ? (
        <Skeleton
          height={20}
          width={80}
          paragraph={{ rows: 2 }}
          loading={loading}
          active
          // avatar
          className="custom-skeleton"
        />
      ) : (
        <div className="flex items-center justify-center h-[200px] no-data flex-col">
          <svg
            style={{ fill: "#808080", width: "60px" }}
            id="Layer_1"
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 74 100"
          >
            <defs>
              <style
                dangerouslySetInnerHTML={{
                  __html:
                    "\n      .cls-1 {\n        stroke-width: 0px;\n      }\n    ",
                }}
              />
            </defs>
            <path
              className="cls-1"
              d="m62,30C62,13.4,50.8,0,37,0S12,13.4,12,30H0l6,70h62l6-70h-12ZM37,4c11.6,0,21,11.7,21,26H16c0-14.3,9.4-26,21-26Zm15,46c0,2.8-2.2,5-5,5s-5-2.2-5-5,2.2-5,5-5,5,2.2,5,5Zm-20,0c0,2.8-2.2,5-5,5s-5-2.2-5-5,2.2-5,5-5,5,2.2,5,5Zm5,12.6c12.4,0,22.5,10.1,22.5,22.5h-5c0-9.6-7.9-17.5-17.5-17.5s-17.5,7.8-17.5,17.5h-5c0-12.4,10.1-22.5,22.5-22.5Z"
            />
          </svg>

          <h5 className="text-[#808080] text-lg font-medium">No Data</h5>
        </div>
      )}
    </div>
  );
  return (
    <>
      {contextHolder}
      <div className="padding-top-custom px-7 ">
        <OrderDetailHeader
          success={success}
          error={error}
          warning={warning}
          orderAdressDetails={orderAdressDetails}
          asyncFunction={asyncFunction}
          paymentStatus={paymentStatus}
          setPaymentStatus={setPaymentStatus}
          setOrderStatus={setOrderStatus}
          orderStatus={orderStatus}
          orderStatusList={orderStatusList}
        />
        <div className="flex lg:flex-nowrap flex-wrap   gap-5 ">
          <div className="lg:w-[70%] w-full">
            <div className="bg-white rounded-[8px] custom-shadow">
              <ConfigProvider renderEmpty={() => emptyImage}>
                <Table
                  columns={columns}
                  dataSource={orderProductsDetails}
                  showSizeChanger={false}
                  pagination={false}
                  scroll={{
                    y: 240,
                  }}
                />
              </ConfigProvider>
              <div className=" p-4 ">
                <div className="flex justify-between py-3 border-b border-[#E7E7E7]">
                  <h5 className="text-base font-medium text-[#637381]">
                    Subtotal
                  </h5>
                  <h5 className="text-base font-medium text-[#637381]">
                    {/* ${totalCost} */}${orderAdressDetails?.totalPrice}
                  </h5>
                </div>
                {orderAdressDetails?.shippingcharges > 0 && (
                  <div className="flex justify-between py-3 border-b border-[#E7E7E7]">
                    <h5 className="text-base font-medium text-[#637381]">
                      Shipping estimate
                    </h5>
                    <h5 className="text-base font-medium text-[#637381]">
                      ${orderAdressDetails?.shippingcharges}
                    </h5>
                  </div>
                )}
                {orderAdressDetails?.wt !== 0 && (
                  <div className="flex justify-between py-3 border-b border-[#E7E7E7]">
                    <h5 className="text-base font-medium text-[#637381]">
                      WET
                    </h5>
                    <h5 className="text-base font-medium text-[#637381]">
                      ${orderAdressDetails?.wt}
                    </h5>
                  </div>
                )}
                <div className="flex justify-between py-3 border-b border-[#E7E7E7]">
                  <h5 className="text-base font-medium text-[#637381]">GST</h5>
                  <h5 className="text-base font-medium text-[#637381]">
                    ${orderAdressDetails?.gst}
                  </h5>
                </div>
                <div className="flex justify-between py-3 ">
                  <h5 className="text-lg font-semibold text-[#2B4447]">
                    Order total
                  </h5>
                  <h5 className="text-lg font-semibold text-[#2B4447]">
                    ${orderAdressDetails?.payAmountLong}
                  </h5>
                </div>
                <div className="py-5 flex justify-between ">
                  <button
                    onClick={() => {
                      handleCancelOrder("Cancelled");
                    }}
                    className={`cursor-pointer
                      ${
                        orderAdressDetails.orderStatus !== "Pending"
                          ? "rounded-[6px] py-2 bg-[#ffffff] border text-gray-500  text-base font-semibold w-fit px-6"
                          : "rounded-[6px] py-2 bg-[#DC3545] text-white  text-base font-semibold w-fit px-6"
                      }
                      `}
                    disabled={orderAdressDetails.orderStatus !== "Pending"}
                  >
                    Cancel
                  </button>
                  <div className="flex gap-3 ">
                    <button
                      onClick={() => {
                        handleOrderStatusChange("Processing");
                      }}
                      disabled={orderAdressDetails.orderStatus !== "Pending"}
                      className={`cursor-pointer
                      ${
                        orderAdressDetails.orderStatus !== "Pending"
                          ? "bg-[#ffffff] py-2 px-6 rounded-[6px] border text-gray-500 font-semibold text-base"
                          : "bg-[#147D73] py-2 px-6 rounded-[6px] text-white font-semibold text-base"
                      }
                      `}
                    >
                      Confirm
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <OrderDetailsTimeline
              orderAdressDetails={orderAdressDetails}
              success={success}
              error={error}
              timeline={timeline}
              asyncFunction={asyncFunction}
              shortenName={shortenName}
            />
          </div>
          <div className="lg:w-[30%] w-full">
            <DeliveryContact
              orderAdressDetails={orderAdressDetails}
              loading={loading}
            />
            <DeliveryAddress
              orderAdressDetails={orderAdressDetails}
              loading={loading}
            />
            <BillingAddress
              orderAdressDetails={orderAdressDetails}
              loading={loading}
            />
            <PaymentDetails
              orderAdressDetails={orderAdressDetails}
              loading={loading}
            />
          </div>
        </div>
      </div>
      <CancelOrderModal
        handleCancel={() => {
          setCancelOrderModal(false);
        }}
        isModalOpen={cancelOrderModal}
        handleOk={() => {
          confirmOrderStatusChange(updatedOrderStatus);
        }}
        closeIcon={false}
      />
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
    </>
  );
};

export default OrderListing;
