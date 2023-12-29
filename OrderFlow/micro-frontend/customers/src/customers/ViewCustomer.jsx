import React, { useState } from "react";
import Select from "react-select";
import OrderDetails from "../ViewCustomer/OrderDetails";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SellIcon from "@mui/icons-material/Sell";
import WorkIcon from "@mui/icons-material/Work";
import PersonIcon from "@mui/icons-material/Person";
import { ViewCustomerDetails } from "../schemas";
import { useFormik } from "formik";
import SaveCancel from "./SaveCancel";
import { message } from "antd";
import CloseIcon from "@mui/icons-material/Close";

function ViewCustomer() {
  const customerUrl = process.env.REACT_APP_CUSTOMER_URL;
  const options = [
    { value: "1", label: "Active" },
    { value: "0", label: "Inactive" },
  ];
  const location = useLocation();
  const [customerEdit, setCustomerEdit] = useState(true);
  const [selectedValue, setSelectedValue] = useState(null);
  // const [customerDetails, setCustomerDetails] = useState({});
  const [messageApi, contextHolder] = message.useMessage();

  const [show, setShow] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [isBussiness, setIsBussiness] = useState();
  const [initialValues, setInitialValues] = useState({
    buyerId: "",
    businessName: "",
    abn: "",
    liquorLicence: "",
    salesRepId: "",
    pricingProfileId: "",
    isActive: "",
  });

  const {
    values,
    errors,
    handleBlur,
    handleChange,
    handleSubmit,
    touched,
    setValues,
    isValid,
  } = useFormik({
    initialValues: initialValues,
    validationSchema: ViewCustomerDetails,
    onSubmit: (values) => {},
  });
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

  const handleCustomerTiles = () => {
    const buyID = location?.state?.data.buyerId;
    fetch(`${customerUrl}/api/Customer/UpdateCustomerProfile/${buyID}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        buyerId: buyID,
        businessName: values?.businessName,
        abn: values?.abn,
        liquorLicence: values?.liquorLicence,
        salesRepId: "",
        pricingProfileId: "",
        isActive: selectedValue.value,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          success(data.message);
          setCustomerEdit(true);
          setShow(true);
          setIsOpen(false);
          setIsBussiness(data?.data?.businessName);
          setValues((prev) => {
            if (data.isActive === "1") {
              return {
                ...prev,
                isActive: "1",
              };
            } else {
              return {
                ...prev,
                isActive: "0",
              };
            }
          });
        } else {
          error(data.message);
        }
      })
      .catch((error) => console.log(error));
  };
  const handleCancel = () => {
    setCustomerEdit(true);
    setShow(true);
    setIsOpen(false);
    setValues(initialValues);
    setSelectedValue(() => {
      if (initialValues.isActive === "1") {
        return {
          label: "Active",
          value: "1",
        };
      } else {
        return {
          label: "Inactive",
          value: "0",
        };
      }
    });
  };
  const handleSelectChange = (selectedOption) => {
    setSelectedValue(selectedOption);
    setShow(false);
  };

  const handleCustomerDetails = (data) => {
    setInitialValues(data);
    setIsBussiness(data.businessName);
    setValues(data);
    localStorage.setItem;
    data.isActive === "1"
      ? setSelectedValue({
          label: "Active",
          value: "1",
        })
      : setSelectedValue({
          label: "Inactive",
          value: "0",
        });
  };
  const ordeItem = [
    {
      title: "Business name",
      SubTitle: values?.businessName,
      image: <SellIcon />,
    },
    {
      title: "ABN / Liquor licence",
      SubTitle: `${values?.abn}/ ${values?.liquorLicence}`,
      image: <WorkIcon />,
    },
    {
      title: "Delivery address",
      SubTitle: `${values?.apartment} ${values?.address} ${values?.suburb} ${values?.state} ${values?.postalCode}`,
      image: <LocationOnIcon />,
    },
    {
      title: "Customer Status",
      SubTitle: values?.isActive === "1" ? "Active" : "Inactive",
      image: <PersonIcon />,
    },
  ];
  const handlePopUp = () => {
    localStorage.setItem("orderpopup", "true");
    localStorage.setItem("buyerID", values.buyerId);
  };

  return (
    <>
      {contextHolder}
      <div className="px-6 padding-top-custom">
        {/* {show === true ? (
        <SaveCancel
          handleCustomerTiles={handleCustomerTiles}
          handleCancel={handleCancel}
        />
      ) : null} */}
        <div className="py-8 sm:flex grid items-center justify-between  gap-5">
          <div className="flex justify-start gap-3 items-center">
            <Link to="/main/customers/all-customers">
              <div className="">
                <img src="/assets/previousBtn.png" alt="" />
              </div>
            </Link>
            <h4 className=" text-2xl font-semibold text-darkGreen">
              {isBussiness}
            </h4>
          </div>
          {show && (
            <div className=" flex-wrap	 flex judstify-center items-center gap-3">
              <button
                onClick={() => {
                  setCustomerEdit(false);
                  setIsOpen(true);
                  setShow(false);
                }}
                type="button"
                className="border-darkGreen shadow-md border rounded	w-fit px-4		h-10	flex justify-center items-center text-base	font-medium gap-2	"
              >
                <div className="">
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10.586 1.58519C10.7705 1.39417 10.9912 1.2418 11.2352 1.13698C11.4792 1.03216 11.7416 0.976993 12.0072 0.974685C12.2728 0.972377 12.5361 1.02298 12.7819 1.12354C13.0277 1.2241 13.251 1.37261 13.4388 1.5604C13.6266 1.74818 13.7751 1.97148 13.8756 2.21728C13.9762 2.46307 14.0268 2.72643 14.0245 2.99199C14.0222 3.25755 13.967 3.51999 13.8622 3.76399C13.7574 4.008 13.605 4.22869 13.414 4.41319L12.621 5.20619L9.793 2.37819L10.586 1.58519ZM8.379 3.79219L0 12.1712V14.9992H2.828L11.208 6.62019L8.378 3.79219H8.379Z"
                      fill="#147D73"
                    />
                  </svg>
                </div>
                <h6 className="text-darkGreen">Edit</h6>
              </button>
              <Link to="/main/orders/all-orders" onClick={handlePopUp}>
                <button
                  type="button"
                  className=" border rounded 	w-fit px-4		h-10	flex justify-center items-center text-base	font-medium	gap-2 btn-animation"
                >
                  <div className="">
                    <svg
                      width="16"
                      height="15"
                      viewBox="0 0 16 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M7.40791 11.25H8.59209V8.09209H11.75V6.90791H8.59209V3.75001H7.40791V6.90791H4.25001V8.09209H7.40791V11.25ZM8.00132 15C6.964 15 5.98897 14.8032 5.07624 14.4095C4.16348 14.0158 3.36952 13.4815 2.69435 12.8066C2.01916 12.1318 1.48464 11.3381 1.09078 10.4258C0.696928 9.51347 0.5 8.53864 0.5 7.50132C0.5 6.464 0.696843 5.48897 1.09053 4.57624C1.48421 3.66348 2.01849 2.86952 2.69336 2.19435C3.36824 1.51916 4.16186 0.984642 5.0742 0.590785C5.98653 0.196929 6.96136 0 7.99868 0C9.036 0 10.011 0.196843 10.9238 0.590529C11.8365 0.984214 12.6305 1.51849 13.3057 2.19336C13.9808 2.86824 14.5154 3.66186 14.9092 4.5742C15.3031 5.48653 15.5 6.46136 15.5 7.49868C15.5 8.536 15.3032 9.51102 14.9095 10.4238C14.5158 11.3365 13.9815 12.1305 13.3066 12.8057C12.6318 13.4808 11.8381 14.0154 10.9258 14.4092C10.0135 14.8031 9.03864 15 8.00132 15ZM8 13.8158C9.76316 13.8158 11.2566 13.204 12.4803 11.9803C13.704 10.7566 14.3158 9.26316 14.3158 7.5C14.3158 5.73684 13.704 4.24341 12.4803 3.01973C11.2566 1.79604 9.76316 1.18419 8 1.18419C6.23684 1.18419 4.74341 1.79604 3.51972 3.01973C2.29604 4.24341 1.68419 5.73684 1.68419 7.5C1.68419 9.26316 2.29604 10.7566 3.51972 11.9803C4.74341 13.204 6.23684 13.8158 8 13.8158Z"
                        fill="white"
                      />
                    </svg>
                  </div>
                  <h6 className="text-white">create order</h6>
                </button>
              </Link>
            </div>
          )}
          {isOpen && (
            <div className=" flex-wrap	 flex judstify-center items-center gap-3">
              <button
                onClick={handleCancel}
                type="button"
                className="border-darkGreen shadow-md border rounded	w-fit px-4		h-10	flex justify-center items-center text-base	font-medium gap-2 "
              >
                <h6 className="text-darkGreen">Cancel</h6>
              </button>
              <button
                onClick={handleCustomerTiles}
                disabled={!isValid}
                className="rounded-md px-6	py-2.5 text-white text-base	font-medium	bg-[#147d73]"
              >
                Save
              </button>
            </div>
          )}
        </div>
        {customerEdit === true ? (
          <div className="grid gap-4 lg:grid-cols-2 grid-cols-1 ">
            {ordeItem.map((item, index) => {
              return (
                <>
                  <div
                    key={index}
                    className={`address-box address-box-${index} bg-white rounded-lg border border-darkGreen shadow-md	 p-5`}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="h-[25px] w-[25px] rounded-full bg-[#147D73] flex justify-center items-center order-tab-svg">
                        {item?.image}
                      </div>
                      <h4 className="text-darkGreen font-bold	text-lg	">
                        {item?.title}
                      </h4>
                    </div>
                    <div className="">
                      <p className="text-green text-sm font-normal">
                        {item?.SubTitle}
                      </p>
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        ) : (
          <form>
            <div className="grid gap-6 lg:grid-cols-2 grid-cols-1 ">
              <div className={`relative`}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-[25px] w-[25px] rounded-full bg-[#147D73] flex justify-center items-center order-tab-svg">
                    <SellIcon />
                  </div>
                  <h4 className="text-darkGreen font-bold	text-lg	">
                    Business name
                  </h4>
                </div>
                <input
                  type="text"
                  className="bg-white rounded-lg border border-darkGreen shadow-md	"
                  placeholder="The Union Hotel"
                  onBlur={handleBlur}
                  name="businessName"
                  onChange={handleChange}
                  value={values?.businessName}
                  style={{
                    border:
                      errors.businessName &&
                      touched.businessName &&
                      "1px solid red",
                  }}
                />
                {errors.businessName && touched.businessName && (
                  <p className="mt-2 mb-2 text-red-500 font-sm text-xs">
                    {errors.businessName}
                  </p>
                )}
                {errors.businessName && touched.businessName && (
                  <ErrorOutlineIcon className="absolute text-red-500 top-[55px] right-5 transition-all duration-[0.3s] " />
                )}
              </div>
              <div className={`relative`}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-[25px] w-[25px] rounded-full bg-[#147D73] flex justify-center items-center order-tab-svg">
                    <WorkIcon />
                  </div>
                  <h4 className="text-darkGreen font-bold	text-lg	">
                    ABN / Liquor licence
                  </h4>
                </div>
                <div
                  className="flex bg-white rounded-lg border border-darkGreen shadow-md relative"
                  style={{
                    border:
                      errors.liquorLicence &&
                      touched.liquorLicence &&
                      "1px solid red",
                  }}
                >
                  <input
                    type="text"
                    className=" w-[50%]	mt-0 custom-form"
                    placeholder="-- --- --- ---"
                    onBlur={handleBlur}
                    name="abn"
                    onChange={handleChange}
                    value={values?.abn}
                  />
                  <p className="text-[#637381] absolute top-[50%] left-[50%] custom-absolute">
                    /
                  </p>
                  <input
                    type="text"
                    className="	w-[50%] mt-0  custom-form"
                    placeholder="-- --- --- ---"
                    onBlur={handleBlur}
                    name="liquorLicence"
                    onChange={handleChange}
                    value={values?.liquorLicence}
                  />
                </div>
                {errors.abn && touched.abn && (
                  <p className="mt-2 mb-2 text-red-500 font-sm text-xs">
                    {errors.abn}
                  </p>
                )}
                {errors.abn && touched.abn && (
                  <ErrorOutlineIcon className="absolute text-red-500 top-[55px] right-5 transition-all duration-[0.3s] " />
                )}

                {errors.liquorLicence && touched.liquorLicence && (
                  <p className="mt-2 mb-2 text-red-500 font-sm text-xs">
                    {errors.liquorLicence}
                  </p>
                )}
                {errors.liquorLicence && touched.liquorLicence && (
                  <ErrorOutlineIcon className="absolute text-red-500 top-[55px] right-5 transition-all duration-[0.3s] " />
                )}
              </div>
              <div className={`relative`}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-[25px] w-[25px] rounded-full bg-[#147D73] flex justify-center items-center order-tab-svg">
                    <LocationOnIcon />
                  </div>
                  <h4 className="text-darkGreen font-bold	text-lg	">
                    Delivery address
                  </h4>
                </div>
                <i className="text-normal font-normal text-[#2B4447]">
                  Delivery address can be changed in the
                  <br />
                  <span className="font-bold ">Address</span> tab below
                </i>
              </div>
              <div className={``}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-[25px] w-[25px] rounded-full bg-[#147D73] flex justify-center items-center order-tab-svg">
                    <PersonIcon />
                  </div>
                  <h4 className="text-darkGreen font-bold	text-lg	">
                    Customer Status
                  </h4>
                </div>
                <Select
                  options={options}
                  onChange={handleSelectChange}
                  placeholder="The Union Hotel"
                  className="bg-white rounded-lg border border-[#e2e8f0] shadow-md custom-status	"
                  value={selectedValue}
                />
              </div>
            </div>
          </form>
        )}

        <OrderDetails
          handleCustomerDetails={handleCustomerDetails}
          datas={location?.state?.data?.buyerId}
          setTileValues={setValues}
        />
      </div>
    </>
  );
}

export default ViewCustomer;
