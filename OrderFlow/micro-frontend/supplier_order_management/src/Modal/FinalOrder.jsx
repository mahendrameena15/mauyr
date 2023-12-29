import React from "react";
import LocalPhoneRoundedIcon from "@mui/icons-material/LocalPhoneRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import ShieldIcon from "@mui/icons-material/Shield";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { stockStatus } from "../helpers/stockStatus";

const FinalOrder = ({
  customerDetails,
  cart,
  handleRemoveCart,
  defaultPaymentTermsValue,
  defaultPaymentTermsDate,
  shippingcharges,
  cartCalculations,
}) => {
  return (
    <>
      <div className="my-5 w-full flex justify-center">
        <h4 className="text-xl font-bold  text-[#2B4447]">
          {customerDetails?.businessName}
        </h4>
      </div>
      <div className="">
        <h5 className="font-semibold text-lg text-[#212B36] mb-5">
          Order Confirm
        </h5>
        <div className="grid md:grid-cols-2 gap-3 ">
          <div className="h-[600px] overflow-y-auto">
            <div className="border border-[#E7E7E7] rounded-md p-4 mb-4">
              <div className="flex justify-between items-center ">
                <div className="flex justify-start items-center gap-2">
                  <LocalPhoneRoundedIcon />
                  <h4 className="text-xl font-semibold text-[#2B4447] leading-[30px]">
                    Delivery Contact
                  </h4>
                </div>
                {/* 
                              <button className="text-base font-semibold text-[#2B4447]">
                                Edit
                              </button> */}
              </div>
              <p className="text-base font-normal text-[#2B4447] leading-[28px]">
                {`${customerDetails?.deliveryFirstName} ${customerDetails?.deliveryLastName}`}
              </p>
              <p className="text-base font-normal text-[#2B4447] leading-[28px] ">
                {customerDetails?.deliveryEmail}
              </p>
              <p className="text-base font-normal text-[#2B4447] leading-[28px]">
                {customerDetails?.deliveryMobile}
              </p>
            </div>

            <div className="border border-[#E7E7E7] rounded-md p-4 mb-4">
              <div className="flex justify-between items-center ">
                <div className="flex justify-start items-center gap-2">
                  <HomeRoundedIcon />
                  <h4 className="text-xl font-semibold text-[#2B4447] leading-[30px]">
                    Delivery Address
                  </h4>
                </div>
                {/* <button className="text-base font-semibold text-[#2B4447]">
                                Edit
                              </button> */}
              </div>
              <p className="text-base font-normal text-[#2B4447] leading-[28px]">
                {`${customerDetails?.apartment} ${customerDetails?.address}, ${customerDetails?.suburb}, ${customerDetails?.state} ${customerDetails?.postalCode} Australia`}
              </p>
              <h4 className=" mt-2 text-xl font-semibold text-[#2B4447] leading-[30px]">
                Notes
              </h4>
              <div className="flex justify-start items-center gap-2">
                <img src="/assets/notesIcon.png" alt="" />

                <p className="text-base font-normal text-[#2B4447] leading-[28px] ">
                  {customerDetails?.deliveryNotes}
                </p>
              </div>
            </div>
            <div className="border border-[#E7E7E7] rounded-md p-4 mb-4">
              <div className="flex justify-between items-center ">
                <div className="flex justify-start items-center gap-2">
                  <ShieldIcon />
                  <h4 className="text-xl font-semibold text-[#2B4447] leading-[30px]">
                    Payment
                  </h4>
                </div>
                {/* <button className="text-base font-semibold text-[#2B4447]">
                                Edit
                              </button> */}
              </div>
              <p className="text-base font-normal text-[#2B4447] leading-[28px]">
                Your chosen payment terms
              </p>

              <h4 className=" text-lg font-medium text-[#2B4447] leading-[30px]">
                {defaultPaymentTermsValue?.label}{" "}
                {`(${defaultPaymentTermsDate})`}
              </h4>
            </div>
            <div className="border border-[#E7E7E7] rounded-md p-4 mb-4">
              <div className="flex justify-between items-center ">
                <div className="flex justify-start items-center gap-2">
                  <HomeRoundedIcon />
                  <h4 className="text-xl font-semibold text-[#2B4447] leading-[30px]">
                    Billing Address
                  </h4>
                </div>

                {/* <button className="text-base font-semibold text-[#2B4447]">
                                Edit
                              </button> */}
              </div>

              <p className="text-base font-normal text-[#2B4447] leading-[28px]">
                {`${customerDetails?.billingApartmentSuite} ${customerDetails?.billingStreetaddress}, ${customerDetails?.billingCity}, ${customerDetails?.billingState} ${customerDetails?.billingPostcode} Australia`}
              </p>
            </div>
          </div>
          <div className="">
            <div className="h-[201px] overflow-y-auto">
              {cart?.length === 0 ? (
                <h5 className="text-sm font-bold text-center  py-8  flow-root border-y border-[#CDCED6] ">
                  Your cart is empty.
                </h5>
              ) : (
                cart.map(({ product, quantity }) => (
                  <div className="flex justify-start items-center mb-2 gap-2 pb-5 border-b border-[#E7E7E7]">
                    <img
                      src={
                        (product?.productImageUrls &&
                          product?.productImageUrls[0]) ||
                        "/assets/customProduct.png"
                      }
                      style={{ width: "120px" }}
                      alt="productImage"
                    />

                    <div className="w-full h-full">
                      <div className="flex justify-between ">
                        <div>
                          <h5 className="text-base font-semibold text-[#2B4447] ">
                            {product?.title}
                          </h5>
                          <p className="text-base font-medium text-[#637381]">
                            Quantity - {quantity?.value}
                          </p>
                        </div>
                        <h5 className="text-base font-semibold text-[#2B4447]">
                          ${product?.globalPrice}
                        </h5>
                      </div>
                      <div className="mt-10 flex justify-between items-center">
                        <div className="flex justify-start gap-1.5">
                          <h5 className="text-base font-normal text-[#2B4447]">
                            {stockStatus(
                              product?.availableQty,
                              product?.stockThreshold
                            )}
                          </h5>
                        </div>

                        <p
                          onClick={() => handleRemoveCart(product?.productId)}
                          className="text-base cursor-pointer font-medium text-[#DC3545]"
                        >
                          Remove
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
            <div className=""></div>

            <div className="pt-5 hidden">
              <h4 className="text-lg font-semibold text-[#2B4447]">
                Promo Code
              </h4>
              <div className="relative mt-3">
                <input
                  className={`placeholder:text-sm appearance-none border border-[#E7E7E7] rounded-md w-full p-3 text-[#563FE3]`}
                  id="grid-first-name"
                  type="text"
                  placeholder="Promotional Code"
                  value="CODE001"
                />
                <button
                  className={`bg-[#563FE3] absolute top-0 right-0 h-full w-[65px] flex justify-center items-center rounded-r-[8px]`}
                  // onClick={applyPromoCode}
                >
                  <ChevronRightIcon style={{ fill: "#fff" }} />
                </button>
              </div>
            </div>
            <div className="py-4">
              <div className="flex justify-between py-3 border-b border-[#E7E7E7]">
                <h5 className="text-sm font-medium text-[#637381]">Subtotal</h5>
                <h5 className="text-sm font-medium text-[#637381]">
                  ${cartCalculations?.subTotal}
                </h5>
              </div>
              <div className="flex justify-between py-3 border-b border-[#E7E7E7]">
                <h5 className="text-sm font-medium text-[#637381]">
                  Shipping estimate
                </h5>
                <h5 className="text-sm font-medium text-[#637381]">
                  ${cartCalculations?.shippingcharges}
                </h5>
              </div>
              <div className="flex justify-between py-3 border-b border-[#E7E7E7]">
                <h5 className="text-sm font-medium text-[#637381]">WET</h5>
                <h5 className="text-sm font-medium text-[#637381]">
                  ${cartCalculations?.wet}
                </h5>
              </div>
              <div className="flex justify-between py-3 border-b border-[#E7E7E7]">
                <h5 className="text-sm font-medium text-[#637381]">GST</h5>
                <h5 className="text-sm font-medium text-[#637381]">
                  ${cartCalculations?.gst}
                </h5>
              </div>
              <div className="flex justify-between py-3 ">
                <h5 className="text-base font-semibold text-[#2B4447]">
                  Order total
                </h5>
                <h5 className="text-base font-semibold text-[#2B4447]">
                  ${cartCalculations?.total}
                </h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FinalOrder;
