import React from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { AddCustomerSchema } from "../schemas";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import HelpIcon from "@mui/icons-material/Help";
import { styled } from "@mui/material";
import { useState } from "react";

function CustomerContact({
  values,
  handleChange,
  handleBlur,
  errors,
  options,
  touched,
  setValues,
  setIsChecked,
  isChecked,
}) {
  const [prevDeliveryContact, setPrevDeliveryContact] = useState({
    deliveryFirstName: "",
    deliveryLastName: "",
    deliveryEmail: "",
    deliveryMobile: "",
  });

  const CustomTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: "#2B4447",
      color: "white",
      borderRadius: "5px",
      boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
      textAlign: "center",
      fontSize: 11,
      lineHeight: "24px",
      fontFamily: "Inter",
      fontSize: "11px",
      fontWeight: 600,
    },
  }));

  const contactSame = (e) => {
    setIsChecked(e.target.checked);
    if (e.target.checked) {
      setValues({
        ...values,
        deliveryFirstName: values.orderingFirstName,
        deliveryLastName: values.orderingLastName,
        deliveryEmail: values.orderingEmail,
        deliveryMobile: values.orderingMobile,
      });
    } else {
      setValues({
        ...values,
        ...prevDeliveryContact,
      });
    }
  };
  return (
    <>
      <div>
        <div className=" border-b	 border-inherit sm:px-5 sm:py-4 py-3 px-4">
          <h6 className="text-base	font-medium	 text-green">Customer contacts</h6>
        </div>
        <div className="px-6 py-7">
          <h5 className="text-green mb-5 text-base font-bold	">
            Ordering contact
          </h5>
          <div className="flex flex-wrap gap-5 lg:gap-0 -mx-3 mb-5">
            <div className="w-full relative md:w-1/2 px-3">
              <label
                className="block  tracking-wide text-gray-700 text-base	 font-medium	 "
                htmlFor="grid-last-name"
              >
                First name
              </label>
              <input
                className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded-md	 py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-last-name"
                type="text"
                placeholder="Enter First Name"
                name="orderingFirstName"
                value={values.orderingFirstName}
                onChange={handleChange}
                onBlur={handleBlur}
                style={{
                  border:
                    errors.orderingFirstName &&
                    touched?.orderingFirstName &&
                    "1px solid red",
                }}
              />
              {errors.orderingFirstName && touched?.orderingFirstName && (
                <p className="mt-2 mb-2 text-red-500 font-sm text-xs">
                  {errors.orderingFirstName}
                </p>
              )}
              {errors.orderingFirstName && touched?.orderingFirstName && (
                <ErrorOutlineIcon className="absolute text-red-500 top-[47px] right-5 transition-all duration-[0.3s] " />
              )}
            </div>
            <div className="w-full relative md:w-1/2 px-3">
              <label
                className="block  tracking-wide text-gray-700 text-base	 font-medium	 "
                htmlFor="grid-last-name"
              >
                Last name
              </label>
              <input
                className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded-md	 py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-last-name"
                type="text"
                placeholder="Enter Last Name"
                name="orderingLastName"
                value={values.orderingLastName}
                onChange={handleChange}
                onBlur={handleBlur}
                style={{
                  border:
                    errors.orderingLastName &&
                    touched?.orderingLastName &&
                    "1px solid red",
                }}
              />
              {errors.orderingLastName && touched?.orderingLastName && (
                <p className="mt-2 mb-2 text-red-500 font-sm text-xs">
                  {errors.orderingLastName}
                </p>
              )}
              {errors.orderingLastName && touched?.orderingLastName && (
                <ErrorOutlineIcon className="absolute text-red-500 top-[47px] right-5 transition-all duration-[0.3s]" />
              )}
            </div>
          </div>
          <div className="flex flex-wrap gap-5 lg:gap-0 -mx-3 mb-5">
            <div className="w-full relative md:w-1/2 px-3">
              <label
                className="block  tracking-wide text-gray-700 text-base	 font-medium	 "
                htmlFor="grid-last-name"
              >
                Mobile
                <CustomTooltip
                  placement="right"
                  arrow
                  title="Please enter a valid Australian mobile number that starts with '04', '+61', or '61'"
                >
                  <HelpIcon
                    sx={{
                      color: "#E0E0E0",
                      width: "20px",
                      marginLeft: "10px",
                    }}
                  />{" "}
                </CustomTooltip>
              </label>
              <input
                className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded-md	 py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-last-name"
                type="text"
                placeholder="Enter Mobile Number"
                maxLength={20}
                name="orderingMobile"
                value={values.orderingMobile}
                onChange={handleChange}
                onKeyPress={(event) => {
                  const allowedCharacters = /^[0-9+]*$/; // Regular expression to match only numbers and '+'
                  if (!allowedCharacters.test(event.key)) {
                    event.preventDefault();
                  }
                }}
                onBlur={handleBlur}
                style={{
                  border:
                    errors.orderingMobile &&
                    touched?.orderingMobile &&
                    "1px solid red",
                }}
              />
              {errors.orderingMobile && touched?.orderingMobile && (
                <p className="mt-2 mb-2 text-red-500 font-sm text-xs">
                  {errors.orderingMobile}
                </p>
              )}
              {errors.orderingMobile && touched?.orderingMobile && (
                <ErrorOutlineIcon className="absolute text-red-500 top-[47px] right-5 transition-all duration-[0.3s]" />
              )}
            </div>
            <div className="w-full relative md:w-1/2 px-3">
              <label
                className="block  tracking-wide text-gray-700 text-base	 font-medium	 "
                htmlFor="grid-last-name"
              >
                Email
              </label>
              <input
                className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded-md	 py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-last-name"
                type="email"
                placeholder="Enter Ordering Mail"
                name="orderingEmail"
                value={values.orderingEmail}
                onChange={handleChange}
                onBlur={handleBlur}
                style={{
                  border:
                    errors.orderingEmail &&
                    touched?.orderingEmail &&
                    "1px solid red",
                }}
              />
              {errors.orderingEmail && touched?.orderingEmail && (
                <p className="mt-2 mb-2 text-red-500 font-sm text-xs">
                  {errors.orderingEmail}
                </p>
              )}
              {errors.orderingEmail && touched?.orderingEmail && (
                <ErrorOutlineIcon className="absolute text-red-500 top-[47px] right-5 transition-all duration-[0.3s]" />
              )}
            </div>
          </div>
          <div className="flex flex-wrap gap-5 lg:gap-0 -mx-3 mb-5">
            <div className="w-full relative md:w-1/2 px-3">
              <h5 className="text-green text-base font-bold	">
                Delivery contact
              </h5>
            </div>
            <div className="w-full relative md:w-1/2 px-3 green-checkbox">
              <div className="flex gap-2 items-center">
                <input
                  id="default-checkbox"
                  type="checkbox"
                  name="deliveryMobile"
                  onClick={contactSame}
                  checked={isChecked}
                  defaultValue=""
                  className="w-4 h-4 text-darkGreen bg-gray-100 border-gray-300 rounded  dark:bg-gray-700 dark:border-gray-600"
                />
                <h5 className="text-sm font-normal">
                  Delivery and ordering contact the same
                </h5>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-5 lg:gap-0 -mx-3 mb-5">
            <div className="w-full relative md:w-1/2 px-3">
              <label
                className="block  tracking-wide text-gray-700 text-base	 font-medium	 "
                htmlFor="grid-last-name"
              >
                First name
              </label>
              <input
                className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded-md	 py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-last-name"
                name="deliveryFirstName"
                value={values.deliveryFirstName}
                type="text"
                placeholder="Enter Frist Name"
                onChange={(e) => {
                  handleChange(e);
                  setPrevDeliveryContact((prev) => {
                    return { ...prev, deliveryFirstName: e.target.value };
                  });
                }}
                onBlur={handleBlur}
                style={{
                  border:
                    errors.deliveryFirstName &&
                    touched?.deliveryFirstName &&
                    "1px solid red",
                }}
              />
              {errors.deliveryFirstName && touched?.deliveryFirstName && (
                <p className="mt-2 mb-2 text-red-500 font-sm text-xs">
                  {errors.deliveryFirstName}
                </p>
              )}
              {errors.deliveryFirstName && touched?.deliveryFirstName && (
                <ErrorOutlineIcon className="absolute text-red-500 top-[47px] right-5 transition-all duration-[0.3s] " />
              )}
            </div>
            <div className="w-full relative md:w-1/2 px-3">
              <label
                className="block  tracking-wide text-gray-700 text-base	 font-medium	 "
                htmlFor="grid-last-name"
              >
                Last name
              </label>
              <input
                className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded-md	 py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-last-name"
                type="text"
                name="deliveryLastName"
                value={values.deliveryLastName}
                placeholder="Enter Last Name"
                onChange={(e) => {
                  handleChange(e);
                  setPrevDeliveryContact((prev) => {
                    return { ...prev, deliveryLastName: e.target.value };
                  });
                }}
                onBlur={handleBlur}
                style={{
                  border:
                    errors.deliveryLastName &&
                    touched?.deliveryLastName &&
                    "1px solid red",
                }}
              />
              {errors.deliveryLastName && touched?.deliveryLastName && (
                <p className="mt-2 mb-2 text-red-500 font-sm text-xs">
                  {errors.deliveryLastName}
                </p>
              )}
              {errors.deliveryLastName && touched?.deliveryLastName && (
                <ErrorOutlineIcon className="absolute text-red-500 top-[47px] right-5 transition-all duration-[0.3s] " />
              )}
            </div>
          </div>
          <div className="flex flex-wrap gap-5 lg:gap-0 -mx-3 mb-5">
            <div className="w-full relative md:w-1/2 px-3">
              <label
                className="block  tracking-wide text-gray-700 text-base	 font-medium	 "
                htmlFor="grid-last-name"
              >
                Mobile
                <CustomTooltip
                  placement="right"
                  arrow
                  title="Please enter a valid Australian mobile number that starts with '04', '+61', or '61'"
                >
                  <HelpIcon
                    sx={{
                      color: "#E0E0E0",
                      width: "20px",
                      marginLeft: "10px",
                    }}
                  />{" "}
                </CustomTooltip>
              </label>
              <input
                className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded-md	 py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-last-name"
                type="text"
                placeholder="Enter Mobile Number"
                name="deliveryMobile"
                maxLength={20}
                value={values.deliveryMobile}
                onChange={(e) => {
                  handleChange(e);
                  setPrevDeliveryContact((prev) => {
                    return { ...prev, deliveryMobile: e.target.value };
                  });
                }}
                onBlur={handleBlur}
                style={{
                  border:
                    errors.deliveryMobile &&
                    touched?.deliveryMobile &&
                    "1px solid red",
                }}
              />
              {errors.deliveryMobile && touched?.deliveryMobile && (
                <p className="mt-2 mb-2 text-red-500 font-sm text-xs">
                  {errors.deliveryMobile}
                </p>
              )}
              {errors.deliveryMobile && touched?.deliveryMobile && (
                <ErrorOutlineIcon className="absolute text-red-500 top-[47px] right-5 transition-all duration-[0.3s]" />
              )}
            </div>
            <div className="w-full relative md:w-1/2 px-3">
              <label
                className="block  tracking-wide text-gray-700 text-base	 font-medium	 "
                htmlFor="grid-last-name"
              >
                Email
              </label>
              <input
                className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded-md	 py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-last-name"
                type="email"
                placeholder="Enter Delivery Mail"
                name="deliveryEmail"
                value={values.deliveryEmail}
                onChange={(e) => {
                  handleChange(e);
                  setPrevDeliveryContact((prev) => {
                    return { ...prev, deliveryEmail: e.target.value };
                  });
                }}
                onBlur={handleBlur}
                style={{
                  border:
                    errors.deliveryEmail &&
                    touched?.deliveryEmail &&
                    "1px solid red",
                }}
              />
              {errors.deliveryEmail && touched?.deliveryEmail && (
                <p className="mt-2 mb-2 text-red-500 font-sm text-xs">
                  {errors.deliveryEmail}
                </p>
              )}
              {errors.deliveryEmail && touched?.deliveryEmail && (
                <ErrorOutlineIcon className="absolute text-red-500 top-[47px] right-5 transition-all duration-[0.3s]" />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CustomerContact;
