import React, { useState } from "react";
import CallIcon from "@mui/icons-material/Call";
import { useFormik } from "formik";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { deliveryContactSchema } from "../schemas";
import { useEffect } from "react";
import { updateDeliveryContact } from "../helpers/updateDeliveryContact";
import { getBuyerDetails } from "../helpers/getBuyerDetails";
import { convertDefaultPaymentTermValue } from "../helpers/convertDefaultPaymentTermValue";

const DeliveryContactForm = ({
  setEditDeliveryContact,
  setCustomerDetails,
  customerDetails,
  setDefaultPaymentTermsValue,
  setDefaultPaymentTermsDate,
  success,
  error,
}) => {
  const [initialValues, setInitialValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
  });

  const {
    values,
    errors,
    handleBlur,
    handleChange,
    handleSubmit,
    touched,
    setValues,
  } = useFormik({
    initialValues: initialValues,
    validationSchema: deliveryContactSchema,
    onSubmit: async (values) => {
      const update = await updateDeliveryContact(
        customerDetails?.buyerId,
        values
      );

      update
        ? success("Delivery contact updated!")
        : error("Error occurred, please try again!");

      setEditDeliveryContact(false);

      if (update) {
        const buyerDetails = await getBuyerDetails(customerDetails?.buyerId);

        if (buyerDetails.success) {
          const buyerData = buyerDetails.data[0];
          setCustomerDetails(buyerData);
          const defaultPaymentTermsListValue = defaultPaymentTerms.find(
            (item) => item.label === buyerDetails.data[0].defaultPaymentTerm[0]
          );

          setDefaultPaymentTermsValue(defaultPaymentTermsListValue);

          const defaultPaymentTermsDateValue = convertDefaultPaymentTermValue(
            defaultPaymentTermsListValue.label
          );

          setDefaultPaymentTermsDate(defaultPaymentTermsDateValue);
        }
      }
    },
  });

  useEffect(() => {
    const customerDetailsBody = {
      firstName: customerDetails?.deliveryFirstName,
      lastName: customerDetails?.deliveryLastName,
      email: customerDetails?.deliveryEmail,
      mobile: customerDetails?.deliveryMobile,
    };

    setInitialValues(customerDetailsBody);
    setValues(customerDetailsBody);
  }, []);

  const handleSave = async () => {};

  const handleCancel = () => {
    setValues(initialValues);
    setEditDeliveryContact(false);
  };

  return (
    <div className="  md:px-0 pb-4 ">
      <div className="flex  items-center gap-1.5 pb-6">
        <CallIcon style={{ fill: "#2B4447" }} className="w-[18px] h-[18px]" />
        <h5 className="text-lg font-semibold text-[#2B4447]">
          Delivery Contact
        </h5>
      </div>

      <form onSubmit={handleSubmit} className="">
        <div className="flex flex-nowrap  gap-8">
          <div className="w-full mb-4 relative">
            <label htmlFor="" className="text-base font-normal text-[#2B4447]">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              className="transition-all duration-[0.3s]"
              placeholder="Your first name"
              autoComplete="on"
              value={values.firstName}
              onChange={handleChange}
              onBlur={handleBlur}
              onKeyPress={(event) => {
                const allowedCharacters = /^[A-Za-z0-9]*$/;
                if (!allowedCharacters.test(event.key)) {
                  event.preventDefault();
                }
              }}
              style={{
                border:
                  errors.firstName && touched.firstName && "1px solid red",
              }}
            />
            {errors.firstName && touched.firstName && (
              <p className="mt-2 mb-2 text-red-500">{errors.firstName}</p>
            )}
            {errors.firstName && touched.firstName && (
              <ErrorOutlineIcon className="absolute text-red-500 top-[50px] right-3 transition-all duration-[0.3s]" />
            )}
          </div>
          <div className="w-full mb-4 relative">
            <label htmlFor="" className="text-base font-normal text-[#2B4447]">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              placeholder="Your last name"
              autoComplete="on"
              className="transition-all duration-[0.3s]"
              value={values.lastName}
              onChange={handleChange}
              onKeyPress={(event) => {
                const allowedCharacters = /^[A-Za-z0-9]*$/;
                if (!allowedCharacters.test(event.key)) {
                  event.preventDefault();
                }
              }}
              onBlur={handleBlur}
              style={{
                border: errors.lastName && touched.lastName && "1px solid red",
              }}
            />
            {errors.lastName && touched.lastName && (
              <p className="mt-2 mb-2 text-red-500">{errors.lastName}</p>
            )}
            {errors.lastName && touched.lastName && (
              <ErrorOutlineIcon className="absolute text-red-500 top-[50px] right-3 transition-all duration-[0.3s]" />
            )}
          </div>
        </div>
        <div className="flex flex-nowrap gap-8">
          <div className="w-full mb-4 relative">
            <label htmlFor="" className="text-base font-normal text-[#2B4447]">
              Email
            </label>
            <input
              type="text"
              id="email"
              name="email"
              placeholder="Your email"
              autoComplete="on"
              className="transition-all duration-[0.3s]"
              value={values.email}
              disabled={true}
              onKeyPress={(event) => {
                const allowedCharacters = /^[A-Za-z0-9]*$/;
                if (!allowedCharacters.test(event.key)) {
                  event.preventDefault();
                }
              }}
              onBlur={handleBlur}
              style={{
                border: errors.email && touched.email && "1px solid red",
              }}
            />
            {errors.email && touched.email && (
              <p className="mt-2 mb-2 text-red-500">{errors.email}</p>
            )}
            {errors.email && touched.email && (
              <ErrorOutlineIcon className="absolute text-red-500 top-[50px] right-3 transition-all duration-[0.3s]" />
            )}
          </div>
        </div>

        <div className="flex flex-nowrap gap-8">
          <div className="w-full mb-4 relative">
            <label htmlFor="" className="text-base font-normal text-[#2B4447]">
              Phone no.{" "}
            </label>
            <input
              id="mobile"
              name="mobile"
              placeholder="Your mobile"
              type="text"
              value={values.mobile}
              onChange={handleChange}
              onBlur={handleBlur}
              maxLength={20}
              onKeyPress={(event) => {
                const allowedCharacters = /^[0-9+]*$/; // Regular expression to match only numbers and '+'
                if (!allowedCharacters.test(event.key)) {
                  event.preventDefault();
                }
              }}
              style={{
                border: errors.mobile && touched.mobile && "1px solid red",
              }}
            />
            {errors.mobile && touched.mobile && (
              <p className="mt-2 mb-2 text-red-500">{errors.mobile}</p>
            )}
            {errors.mobile && touched.mobile && (
              <ErrorOutlineIcon className="absolute text-red-500 top-[50px] right-3 transition-all duration-[0.3s]" />
            )}
          </div>
        </div>

        <div className="flex gap-8 justify-end ">
          <button
            type="submit"
            // onClick={() => {
            //   handleSave();
            // }}
            className=" border-[#147D73] border bg-[#147D73] py-[12px] px-[33px] rounded-md text-base text-white font-normal"
          >
            Save
          </button>
          <button
            className=" border-[#147D73] border rounded-md py-[12px] px-[33px] text-base text-[#147D73] font-normal"
            onClick={() => {
              handleCancel();
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default DeliveryContactForm;
