import React, { useState, useRef, useEffect, useMemo } from "react";
import { Button, Modal, message } from "antd";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import CloseIcon from "@mui/icons-material/Close";
import { Stepper, Step, Typography, button } from "@material-tailwind/react";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import LocalPhoneRoundedIcon from "@mui/icons-material/LocalPhoneRounded";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import ShieldIcon from "@mui/icons-material/Shield";
import AlertModal from "./AlertModal";
import { getCustomers } from "../helpers/getCustomer";
import Select from "react-select";
import { getCustomerDetails } from "../helpers/getCustomerDetails";
import DeliveryContactForm from "./DeliveryContactForm";
import DeliveryAddressForm from "./DeliveryAddressForm";
import { getDefaultPaymentTerms } from "../helpers/getDefaultPaymentTerms";
import { postBuyerDetails } from "../helpers/postBuyerDetails";
import { getBuyerDetails } from "../helpers/getBuyerDetails";
import { convertDefaultPaymentTermValue } from "../helpers/convertDefaultPaymentTermValue";
import BillingAddressForm from "./BillingAddressForm";
import { getProducts } from "../helpers/getProducts";
import { getCartList } from "../helpers/getCartList";
import { addToCart } from "../helpers/addToCart";
import { stockStatus } from "../helpers/stockStatus";
import { removeToCart } from "../helpers/removeTocart";
import { removeAllCart } from "../helpers/removeAllCart";
import { updateProductQuantityCart } from "../helpers/updateProductQuantityCart";
import { updateDefaultPaymentTerms } from "../helpers/updateDefaultPaymentTerms";
import ShippingDetailsForm from "./ShippingDetailsForm";
import FinalOrder from "./FinalOrder";
import { getCalculations } from "../helpers/getCalculations";
import { updateCartStatus } from "../helpers/updateCartStatus";
import { updateOrderStatus } from "../helpers/updateOrderStatus";
import { deleteOrder } from "../helpers/deleteOrder";
import { useNavigate } from "react-router-dom";

let isValid = false;
const CreateOrderModal = ({
  setCreateOrderModal,
  handleOk,
  isModalOpen,
  handleCancel,
}) => {
  const navigate = useNavigate();
  const [checked, setChecked] = useState(false);
  const [customerList, setCustomerList] = useState([]);
  const [editDeliveryContact, setEditDeliveryContact] = useState(false);
  const [editDeliveryAddress, setEditDeliveryAddress] = useState(false);
  const [editBillingAddress, setEditBillingAddress] = useState(false);
  const [editPayment, setEditPayment] = useState(false);
  const [alertModal, setAlertModal] = useState(false);
  const [details, setDetails] = useState(false);
  const [activeStep, setActiveStep] = React.useState(0);
  const [isLastStep, setIsLastStep] = React.useState(false);
  const [isFirstStep, setIsFirstStep] = React.useState(false);
  const [isCustomerSelected, setIsCustomerSelected] = useState(false);
  const [errorData, setErrorData] = useState(true);
  const [customerDetails, setCustomerDetails] = useState({});
  const [defaultPaymentTerms, setDefaultPaymentTerms] = useState([]);
  const [defaultPaymentTermsValue, setDefaultPaymentTermsValue] = useState({});
  const [defaultPaymentTermsDate, setDefaultPaymentTermsDate] = useState("");
  const [messageApi, contextHolder] = message.useMessage();
  const [productSelectList, setProductSelectList] = useState([
    {
      value: "title",
      label: (
        <>
          <p style={{ fontSize: "16px" }}>Title</p>
          <p style={{ fontSize: "12px", color: "gray" }}>configuration</p>
        </>
      ),
      key: {},
    },
  ]);
  const [cartList, setCartList] = useState([]);
  const [cart, setCart] = useState([]);
  const [updatedQuantity, setUpdatedQuantity] = useState({
    product: {},
    quantity: {},
  });
  const [shippingcharges, setSippingCharges] = useState({
    name: "",
    price: 0,
  });

  let defaultPaymentTermsList = [];
  let list = [];

  // const isMobile = useMediaQuery()

  const productQty = [
    { value: 1, label: "1" },
    { value: 2, label: "2" },
    { value: 3, label: "3" },
    { value: 4, label: "4" },
    { value: 5, label: "5" },
    { value: 6, label: "6" },
    { value: 7, label: "7" },
    { value: 8, label: "8" },
    { value: 9, label: "9" },
    { value: 10, label: "10" },
    { value: 11, label: "11" },
    { value: 12, label: "12" },
    { value: 13, label: "13" },
    { value: 14, label: "14" },
    { value: 15, label: "15" },
    { value: 16, label: "16" },
    { value: 17, label: "17" },
    { value: 18, label: "18" },
    { value: 19, label: "19" },
    { value: 20, label: "20" },
  ];

  const handleCheckboxChange = () => {
    setChecked(!checked);
  };

  const success = (message) => {
    messageApi.open({
      className: "custom-class",
      content: (
        <div className="flex justify-center gap-2 items-center">
          <CloseIcon style={{ fill: "#fff", width: "15px" }} />
          <p className="text-base font-semibold text-[#F8FAFC]">{message}</p>
        </div>
      ),
      // content: message,
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

  const handleNext = () => {
    if (isValid === true && activeStep === 0) {
      !isLastStep &&
        (setActiveStep((cur) => cur + 1),
        setDetails(true),
        setSelectedItems(""));
    } else if (activeStep === 1 && !errorData && cart.length > 0) {
      !isLastStep &&
        (setActiveStep((cur) => cur + 1),
        setDetails(true),
        setSelectedItems(""));
    } else if (activeStep === 2) {
      setActiveStep((cur) => cur + 1), setDetails(true), setSelectedItems("");
    }
    isValid = false;
  };

  const handlePrev = () => {
    if (isCustomerSelected) {
      setIsCustomerSelected(false);
    } else {
      setIsCustomerSelected(true);
      !isFirstStep && setActiveStep((cur) => cur - 1);
    }
  };
  const items = ["Apples", "Nails", "Bananas", "Helicopters"];
  const [selectedItems, setSelectedItems] = useState([]);

  // Handle submitting the order
  const handleSubmit = async () => {
    const orderResponse = await updateOrderStatus(
      customerDetails,
      defaultPaymentTermsValue,
      cartCalculations,
      shippingcharges
    );

    if (orderResponse) {
      const cartStatus = await updateCartStatus(customerDetails);

      cartStatus
        ? success("  Order placed successfully!")
        : error(" Some error has occurred! Please try again");

      setCreateOrderModal(false);
      setCustomerDetails({});
      setIsCustomerSelected(false);
      setActiveStep(0);
    }
  };

  //Delete an order
  const handleDeleteOrder = async () => {
    const orderResponse = await deleteOrder();
    orderResponse && setCart([]);
    orderResponse && warning("Order information removed!");
  };

  useEffect(() => {
    // Getting all the customer list
    getCustomers().then((data) => {
      if (data.success) {
        const customerData = data?.data?.map((customer) => ({
          label: customer?.businessName,
          value: customer?.buyerId,
        }));
        const customerListWithHeader = [
          {
            label: (
              // <Link to="/main/customers/add-customer/customer-details">
              <div
                onClick={() =>
                  navigate("/main/customers/add-customer/customer-details")
                }
                className="bg-[#EAEAEA] rounded-[6px] py-[8px] px-[14px] flex justify-start items-center gap-2"
              >
                <ControlPointIcon style={{ fill: "#637381" }} />
                <h5 className="text-sm font-medium text-[#637381]">
                  Create New Customer
                </h5>
              </div>
              // </Link>
            ),

            value: "createNewCustomer",
          },
          ...customerData,
        ];
        setCustomerList(customerListWithHeader);
        if (localStorage.getItem("buyerID")) {
          handleCustomerSelect({ value: localStorage.getItem("buyerID") });
        }
      }
    });

    getDefaultPaymentTermsValue();
    asyncFunction();
    asyncGetCart();
  }, []);

  // Using useEffect to handle debounce function not to call the api multiple times
  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      debouncedHandleIncrementDecrement(
        updatedQuantity.product?.productId,
        updatedQuantity.quantity.value,
        updatedQuantity.product?.globalPrice
      );
    }, 1000);
    return () => clearTimeout(debounceTimeout);
  }, [updatedQuantity]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      asyncCartCalculation();
    }, 2000);

    return () => clearInterval(timeout);
  }, [cart]);

  const asyncCartCalculation = async () => {
    const cartListResponse = await getCartList();
    setCartList(cartListResponse);
  };

  const cartCalculations = useMemo(() => {
    const shipCharges = parseFloat(shippingcharges.price);
    const calculationResults = getCalculations(cartList, shipCharges);
    return calculationResults;
  }, [cartList, activeStep]);

  // Debounce function
  function debounce(func, timeout = 0) {
    let timer;
    return (...args) => {
      clearTimeout(timer);

      timer = setTimeout(() => {
        func.apply(this, args);
      }, timeout);
    };
  }

  // Calling debounce function
  const debouncedHandleIncrementDecrement = debounce(
    (productId, quantity, globalPrice) => {
      updateProductQuantityCart(
        productId,
        customerDetails?.buyerId,
        globalPrice,
        quantity,
        success,
        error
      );
    }
  );

  const asyncFunction = async () => {
    const productList = await getProducts();

    list = productList?.map((item) => {
      return {
        value: `${item?.title} ${item?.configuration}`,
        label: (
          <>
            <p style={{ fontSize: "16px" }}>{item?.title}</p>
            <p style={{ fontSize: "12px", color: "gray" }}>
              {item?.configuration}
            </p>
          </>
        ),
        key: item,
      };
    });
    setProductSelectList(list);
  };

  const asyncGetCart = async () => {
    const cartList = await getCartList();
    const cartUpdatedList = cartList?.map((product) => {
      return {
        product: product,
        quantity: {
          label: `${product?.quantity}`,
          value: product?.quantity,
        },
      };
    });
    setCart(cartUpdatedList);
  };

  // Setting Default payment terms list
  const getDefaultPaymentTermsValue = async () => {
    await getDefaultPaymentTerms().then((data) => {
      defaultPaymentTermsList = data?.map((item) => {
        return {
          label: item?.paymentTermName,
          value: item?.id,
        };
      });

      defaultPaymentTermsList.pop();
      defaultPaymentTermsList.shift();

      setDefaultPaymentTerms(defaultPaymentTermsList);
    });
  };

  // Handle defaultPaymentTerms
  const handledefaultPaymentTerms = async (value) => {
    setDefaultPaymentTermsValue(value);

    const defaultPaymentTermsResponse = await updateDefaultPaymentTerms(
      customerDetails?.buyerId,
      value.label,
      shippingcharges.value
    );

    defaultPaymentTermsResponse
      ? success("Default payment term updated!")
      : error("Some error occurred, please try again!");
  };

  const handleCustomerSelect = async (value) => {
    const customerInfo = await getCustomerDetails(value?.value);
    if (localStorage.getItem("buyerID")) {
      localStorage.removeItem("buyerID");
    }
    if (customerInfo.success) {
      // Posting customer info on loading modal
      setIsCustomerSelected(true);
      await postBuyerDetails(customerInfo.data[0]);
      const buyerDetails = await getBuyerDetails(value?.value);

      if (buyerDetails.success) {
        isValid = true;
        const buyerData = buyerDetails.data[0];
        console.log(buyerData, "buyerData");
        setCustomerDetails(buyerData);
        const defaultPaymentTermsListValue = defaultPaymentTerms.find(
          (item) => item.label === buyerDetails.data[0].defaultPaymentTerm[0]
        );

        setDefaultPaymentTermsValue(defaultPaymentTermsListValue);

        const defaultPaymentTermsDateValue = convertDefaultPaymentTermValue(
          defaultPaymentTermsListValue?.label
        );

        setDefaultPaymentTermsDate(defaultPaymentTermsDateValue);
      } else {
        isValid = false;
      }
    }
  };

  // Select product to add to cart
  const handleSelectProduct = async (product) => {
    const addToCartResponse = await addToCart(
      product?.key,
      customerDetails?.buyerId
    );

    addToCartResponse &&
      localStorage.setItem("cartId", addToCartResponse[0]?.cartId);

    addToCartResponse
      ? success("Product added successfully!")
      : error("Some error occurred, please try again!");

    if (addToCartResponse) {
      const cartUpdatedList = addToCartResponse?.map((product) => {
        return {
          product: product,
          quantity: {
            label: `${product?.quantity}`,
            value: product?.quantity,
          },
        };
      });

      setErrorData(
        !cartUpdatedList.every(
          (item) => item?.quantity?.value >= item?.product?.minimumOrder
        )
      );

      setCart(cartUpdatedList);
      if (cartUpdatedList.length > 0) {
        isValid = true;
      } else {
        isValid = false;
      }
    }
  };

  // Handle for removing product from cart
  const handleRemoveCart = async (productId) => {
    const removeCart = await removeToCart(productId, customerDetails?.buyerId);
    removeCart
      ? warning("Product removed from cart!")
      : error("Some error occurred, please try again!");

    if (removeCart) {
      const cartUpdatedList = removeCart?.map((product) => {
        return {
          product: product,
          quantity: {
            label: `${product?.quantity}`,
            value: product?.quantity,
          },
        };
      });
      setCart(cartUpdatedList);
    }
  };

  // Handle for removing all products from cart
  const handleRemoveAllCart = async () => {
    const removeAll = await removeAllCart(customerDetails?.buyerId);
    removeAll
      ? success("Products removed from cart!")
      : error("Some error occurred, please try again!");
    removeAll && setCart([]);
  };

  // Handle for changing the quantity of products in cart
  const handleQuantity = async (value, productId, minimumOrder) => {
    const updateList = () => {
      return cart?.map((item) => {
        if (item.product.productId === productId) {
          let newQuantityValue = {
            ...item.quantity,
            label: value.label,
            value: value.value,
          };
          if (newQuantityValue.value <= item.product.availableQty) {
            setUpdatedQuantity({
              ...item,
              quantity: newQuantityValue,
            });
            return {
              ...item,
              quantity: newQuantityValue,
            };
          } else {
            warning(
              `Please add product below available quantity ${item.product.availableQty}`
            );
          }
        }

        return item;
      });
    };

    const updatedCartList = updateList();

    setErrorData(
      !updatedCartList.every(
        (item) => item?.quantity?.value >= item?.product?.minimumOrder
      )
    );
    setCart(updatedCartList);
  };

  return (
    <>
      {contextHolder}
      <Modal
        width="75%"
        // height="100%"
        className="custom-modal-height"
        title={
          <>
            <div
              className={`flex  items-center bg-[#F8F8F8] p-2.5 rounded-t-[8px] ${
                isFirstStep && !isCustomerSelected
                  ? "justify-end"
                  : " justify-between"
              }`}
            >
              <div
                onClick={handlePrev}
                className={` flex justify-center items-center border border-[#EDEFF1] rounded-[8px] h-[35px] w-[35px] bg-white ${
                  isFirstStep && !isCustomerSelected && "hidden"
                } `}
              >
                <ArrowBackIosRoundedIcon
                  style={{ width: "14px", fill: "#2B4447" }}
                  className="cursor-pointer"
                />
              </div>
              <CloseRoundedIcon
                style={{ width: "20px", fill: "#2B4447" }}
                onClick={() => {
                  setAlertModal(true);
                }}
                className="cursor-pointer"
              />
            </div>

            <div className=" createOrderStepper mt-6 px-5">
              <Stepper
                activeStep={activeStep}
                className="w-[90%]"
                isLastStep={(value) => setIsLastStep(value)}
                isFirstStep={(value) => setIsFirstStep(value)}
              >
                <Step size="sm">
                  <div
                    className={`w-[40px] h-[40px]  rounded-full   flex justify-center items-center  `}
                  >
                    <p className=" text-sm font-normal text-white ">1</p>
                  </div>
                  <div className="absolute -bottom-[3rem]  w-[150px] -left-[30px] text-center">
                    <Typography
                      variant="h6"
                      color={activeStep === 0 ? "blue-gray" : "gray"}
                      className="text-[#637381] font-medium text-lg"
                    >
                      Find Customer
                    </Typography>
                  </div>
                </Step>
                <Step>
                  <div
                    className={`w-[40px] h-[40px] rounded-full   flex justify-center items-center `}
                  >
                    <p className=" text-sm font-normal text-white">2</p>
                  </div>
                  <div className="absolute -bottom-[3rem]  w-[150px] -left-[30px] text-center">
                    <Typography
                      variant="h6"
                      color={activeStep === 1 ? "blue-gray" : "gray"}
                      className="text-[#637381] font-medium text-lg"
                    >
                      Select Products
                    </Typography>
                  </div>
                </Step>
                <Step>
                  <div
                    className={`w-[40px] h-[40px] rounded-full   flex justify-center items-center `}
                  >
                    <p className=" text-sm font-normal text-white">3</p>
                  </div>
                  <div className="absolute -bottom-[3rem]  w-[200px] -left-[30px] text-center">
                    <Typography
                      variant="h6"
                      color={activeStep === 2 ? "blue-gray" : "gray"}
                      className="text-[#637381] font-medium text-lg"
                    >
                      Add Shipping Details
                    </Typography>
                  </div>
                </Step>
                <Step>
                  <div
                    className={`w-[40px] h-[40px] rounded-full   flex justify-center items-center 
                     `}
                  >
                    <p className=" text-sm font-normal text-white">4</p>
                  </div>
                  <div className="absolute -bottom-[3rem] w-[150px] -left-[30px] text-center">
                    <Typography
                      variant="h6"
                      color={activeStep === 3 ? "blue-gray" : "gray"}
                      className="text-[#637381] font-medium text-lg"
                    >
                      Finalise Order
                    </Typography>
                  </div>
                </Step>
              </Stepper>
              <div className="mt-24">
                {activeStep === 0 && (
                  <>
                    {isCustomerSelected ? (
                      <div className="mb-5">
                        <h5 className="text-[24px] font-bold text-[#212B36] mb-5">
                          {customerDetails?.businessName}
                        </h5>
                        <div className="h-[300px] overflow-y-auto custom-scroll-bar">
                          <div className="border border-[#E7E7E7] rounded-md p-4 mb-4">
                            {editDeliveryContact ? (
                              <DeliveryContactForm
                                success={success}
                                error={error}
                                customerDetails={customerDetails}
                                setCustomerDetails={setCustomerDetails}
                                setEditDeliveryContact={setEditDeliveryContact}
                                setDefaultPaymentTermsValue={
                                  setDefaultPaymentTermsValue
                                }
                                setDefaultPaymentTermsDate={
                                  setDefaultPaymentTermsDate
                                }
                              />
                            ) : (
                              <div className="">
                                <div className="flex justify-between items-center ">
                                  <div className="flex justify-start items-center gap-2">
                                    <LocalPhoneRoundedIcon />
                                    <h4 className="text-xl font-semibold text-[#2B4447] leading-[30px]">
                                      Delivery Contact
                                    </h4>
                                  </div>

                                  <button
                                    onClick={() => {
                                      setEditDeliveryContact(true);
                                    }}
                                    className="text-base font-semibold text-[#2B4447]"
                                  >
                                    Edit
                                  </button>
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
                            )}
                          </div>

                          <div className="border border-[#E7E7E7] rounded-md p-4 mb-4">
                            {editDeliveryAddress ? (
                              <DeliveryAddressForm
                                success={success}
                                error={error}
                                customerDetails={customerDetails}
                                setEditDeliveryAddress={setEditDeliveryAddress}
                                setCustomerDetails={setCustomerDetails}
                                setDefaultPaymentTermsValue={
                                  setDefaultPaymentTermsValue
                                }
                                setDefaultPaymentTermsDate={
                                  setDefaultPaymentTermsDate
                                }
                              />
                            ) : (
                              <div>
                                <div className="flex justify-between items-center ">
                                  <div className="flex justify-start items-center gap-2">
                                    <HomeRoundedIcon />
                                    <h4 className="text-xl font-semibold text-[#2B4447] leading-[30px]">
                                      Delivery Address
                                    </h4>
                                  </div>
                                  <button
                                    className="text-base font-semibold text-[#2B4447]"
                                    onClick={() => {
                                      setEditDeliveryAddress(true);
                                    }}
                                  >
                                    Edit
                                  </button>
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
                            )}
                          </div>
                          <div className="border border-[#E7E7E7] rounded-md p-4 mb-4">
                            <div className="flex justify-between items-center ">
                              <div className="flex justify-start items-center gap-2">
                                <ShieldIcon />
                                <h4 className="text-xl font-semibold text-[#2B4447] leading-[30px]">
                                  Payment
                                </h4>
                              </div>
                              <button
                                onClick={() => setEditPayment(!editPayment)}
                                className="text-base font-semibold text-[#2B4447]"
                              >
                                Edit
                              </button>
                            </div>
                            <p className="text-base font-normal text-[#2B4447] leading-[28px]">
                              Your chosen payment terms
                            </p>
                            <div className="border mt-2 border-[#E0E0E0] rounded-[6px] py-2 px-4">
                              {editPayment ? (
                                <Select
                                  // menuIsOpen={true}
                                  onChange={handledefaultPaymentTerms}
                                  options={defaultPaymentTerms}
                                  value={defaultPaymentTermsValue}
                                  style={{
                                    background: "#F8F8F8",
                                  }}
                                />
                              ) : (
                                <h4 className=" text-lg font-medium text-[#2B4447] leading-[30px]">
                                  {defaultPaymentTermsValue?.label}
                                  {`(${defaultPaymentTermsDate})`}
                                </h4>
                              )}
                            </div>
                          </div>
                          <div className="border border-[#E7E7E7] rounded-md p-4 mb-4">
                            {editBillingAddress ? (
                              <BillingAddressForm
                                success={success}
                                error={error}
                                setEditBillingAddress={setEditBillingAddress}
                                customerDetails={customerDetails}
                                setCustomerDetails={setCustomerDetails}
                                setDefaultPaymentTermsValue={
                                  setDefaultPaymentTermsValue
                                }
                                setDefaultPaymentTermsDate={
                                  setDefaultPaymentTermsDate
                                }
                              />
                            ) : (
                              <div>
                                <div className="flex justify-between items-center ">
                                  <div className="flex justify-start items-center gap-2">
                                    <HomeRoundedIcon />
                                    <h4 className="text-xl font-semibold text-[#2B4447] leading-[30px]">
                                      Billing Address
                                    </h4>
                                  </div>

                                  <button
                                    onClick={() => {
                                      setEditBillingAddress(true);
                                    }}
                                    className="text-base font-semibold text-[#2B4447]"
                                  >
                                    Edit
                                  </button>
                                </div>

                                <p className="text-base font-normal text-[#2B4447] leading-[28px]">
                                  {`${customerDetails?.billingApartmentSuite} ${customerDetails?.billingStreetaddress}, ${customerDetails?.billingCity}, ${customerDetails?.billingState} ${customerDetails?.billingPostcode} Australia`}
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="  mb-5 ">
                        <h5 className="text-lg font-semibold text-[#212B36] mb-5">
                          Find Customer
                        </h5>
                        <Select
                          onChange={handleCustomerSelect}
                          options={customerList}
                        />
                      </div>
                    )}
                  </>
                )}
                {activeStep === 1 && (
                  <>
                    <div className="my-5">
                      <h4 className="text-[24px] font-bold  text-[#2B4447] text-center">
                        {customerDetails?.businessName}
                      </h4>
                    </div>
                    <div className="">
                      <h5 className="font-semibold text-lg text-[#212B36] mb-3">
                        Select Products
                      </h5>
                      <div className="flex justify-between items-center mb-10">
                        <div className="w-[35%]">
                          <Select
                            onChange={handleSelectProduct}
                            className="product-list"
                            options={productSelectList}
                          />{" "}
                        </div>
                        <button
                          onClick={handleRemoveAllCart}
                          className="bg-[#ed1c1c36] py-1.5 px-3 rounded-md "
                        >
                          <p className="text-[#DC3545] font-medium text-base leading-[24px]">
                            Remove All
                          </p>
                        </button>
                      </div>
                      <div
                        style={{
                          maxHeight: "465px",
                        }}
                        className="max-h-[465px] overflow-y-auto custom-scroll-bar "
                      >
                        {cart?.length === 0 ? (
                          <h5 className="text-sm font-bold text-center  py-8  flow-root border-y border-[#CDCED6] ">
                            Your cart is empty.
                          </h5>
                        ) : (
                          cart?.map(({ product, quantity }) => (
                            <div className="flex items-center gap-2 py-5 border-b border-[#E7E7E7]">
                              <div className="">
                                <img
                                  src={
                                    (product?.productImageUrls &&
                                      product?.productImageUrls[0]) ||
                                    "/assets/customProduct.png"
                                  }
                                  style={{ width: "120px" }}
                                  alt="productImageUrls"
                                />
                              </div>
                              <div className="w-full">
                                <div className="grid grid-cols-10  w-full ">
                                  <div className="col-span-5">
                                    <h3 className="text-xl font-semibold text-[#2B4447]">
                                      {product?.title}
                                    </h3>
                                  </div>
                                  <div className="">
                                    <Select
                                      onChange={(value) =>
                                        handleQuantity(
                                          value,
                                          product?.productId,
                                          product?.minimumOrder
                                        )
                                      }
                                      options={productQty}
                                      value={quantity}
                                    />
                                  </div>
                                  <div className="col-span-4 ">
                                    <h4 className="text-lg font-semibold text-[#2B4447] text-end">
                                      ${product?.globalPrice}
                                    </h4>
                                  </div>
                                </div>
                                <div>
                                  <p className="text-base font-medium text-[#637381] ">
                                    {product?.configuration}
                                  </p>
                                </div>
                                <div className="flex justify-between  items-center mt-6 ">
                                  <div className="flex justify-start items-center gap-3">
                                    {stockStatus(
                                      product?.availableQty,
                                      product?.stockThreshold
                                    )}
                                    <p className="bg-[#F0F0F0] px-4 py-1  rounded-[30px] text-sm font-medium text-[#656565]">
                                      {product?.visibility === "1"
                                        ? "Visible"
                                        : "Hidden"}
                                    </p>
                                  </div>
                                  <button
                                    className="bg-[#ed1c1c36] py-1.5 px-3 rounded-md"
                                    onClick={() =>
                                      handleRemoveCart(product?.productId)
                                    }
                                  >
                                    <p className="text-[#DC3545] font-medium text-base leading-[24px]">
                                      Remove
                                    </p>
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  </>
                )}
                {activeStep === 2 && (
                  <ShippingDetailsForm
                    checked={checked}
                    handleCheckboxChange={handleCheckboxChange}
                    setSippingCharges={setSippingCharges}
                    shippingcharges={shippingcharges}
                  />
                )}
                {activeStep === 3 && (
                  <FinalOrder
                    customerDetails={customerDetails}
                    cart={cart}
                    handleRemoveCart={handleRemoveCart}
                    defaultPaymentTermsValue={defaultPaymentTermsValue}
                    defaultPaymentTermsDate={defaultPaymentTermsDate}
                    shippingcharges={shippingcharges}
                    cartCalculations={cartCalculations}
                  />
                )}
              </div>
            </div>
          </>
        }
        footer={[
          <div className="flex justify-end items-center  px-5 pb-5 mt-5">
            <Button
              // onClick={handlePrev}
              disabled={isFirstStep}
              onClick={() => setCreateOrderModal(false)}
              className={`bg-[#2B4447] text-white text-base font-medium rounded-[8px]  h-[44px] w-fit flex justify-center items-center px-5 
              ${isFirstStep && "hidden"}
              }`}
            >
              Save & Exit
            </Button>
            {activeStep !== 3 ? (
              <Button
                onClick={handleNext}
                onCancel={handleCancel}
                // disabled={isLastStep}
                className="bg-[#147D73] text-white text-base font-medium rounded-[8px]  h-[44px] w-fit   flex justify-center items-center px-5"
              >
                Next
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                onCancel={handleCancel}
                disabled={!cart.length}
                className="bg-[#147D73] text-white text-base font-medium rounded-[8px]  h-[44px] w-fit  flex justify-center items-center px-5"
              >
                Place order
              </Button>
            )}
          </div>,
        ]}
        maskClosable={false}
        onCancel={handleCancel}
        open={isModalOpen}
        onOk={handleOk}
        closeIcon={false}
      ></Modal>
      <AlertModal
        setIsCustomerSelected={setIsCustomerSelected}
        setActiveStep={setActiveStep}
        handleDeleteOrder={handleDeleteOrder}
        SaveCancel={handleCancel}
        handleCancel={() => {
          setAlertModal(false);
        }}
        isModalOpen={alertModal}
        handleOk={() => {
          setAlertModal(false);
        }}
        closeIcon={false}
      />
    </>
  );
};

export default CreateOrderModal;
