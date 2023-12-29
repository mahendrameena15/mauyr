import React, { useEffect, useState } from "react";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import { useFormik } from "formik";
import { billingAddressSchema } from "../schemas";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { getStates } from "../helpers/getStates";
import Select from "react-select";
import { updateBillingAddress } from "../helpers/updateBillingAddress";
import { convertDefaultPaymentTermValue } from "../helpers/convertDefaultPaymentTermValue";
import { getBuyerDetails } from "../helpers/getBuyerDetails";

const BillingAddressForm = ({
  setEditBillingAddress,
  customerDetails,
  error,
  success,
  setCustomerDetails,
  setDefaultPaymentTermsValue,
  setDefaultPaymentTermsDate,
}) => {
  const [states, setStates] = useState([]);
  const [initialValues, setInitialValues] = useState({
    address: "",
    apartment: "",
    suburb: "",
    postCode: "",
    state: "",
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
    validationSchema: billingAddressSchema,
    onSubmit: async (values) => {
      const update = await updateBillingAddress(
        customerDetails?.buyerId,
        values
      );
      update
        ? success("Billing address updated!")
        : error("Error occurred, please try again!");
      update && setEditBillingAddress(false);

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
    asyncFunction();
  }, []);

  const asyncFunction = async () => {
    let stateList = [];
    await getStates().then((data) => {
      stateList = data.map((state) => {
        return {
          label: state?.stateName,
          value: state?.stateId,
        };
      });
      setStates(stateList);
    });

    let stateOption = stateList.find(
      (state) => state?.label === customerDetails?.billingState
    );

    setInitialValues({
      address: customerDetails?.billingStreetaddress,
      apartment: customerDetails?.billingApartmentSuite,
      suburb: customerDetails?.billingCity,
      postCode: customerDetails?.billingPostcode,
      state: stateOption,
    });

    setValues({
      address: customerDetails?.billingStreetaddress,
      apartment: customerDetails?.billingApartmentSuite,
      suburb: customerDetails?.billingCity,
      postCode: customerDetails?.billingPostcode,
      state: stateOption,
    });
  };

  const handleState = (stateValue) => {
    setValues((prev) => {
      return { ...prev, state: stateValue };
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-8 mb-5 border border-[#E7E7E7] rounded-md p-3"
    >
      <div className="">
        <div className="mb-3 relative">
          <div className="flex justify-start items-center gap-1.5 mb-6">
            <HomeRoundedIcon
              style={{ fill: "#2B4447" }}
              className="w-[18px] h-[18px]"
            />
            <label
              className="block text-[#2B4447] text-lg font-semibold "
              htmlFor="Country/Region"
            >
              Billing Address
            </label>
          </div>
        </div>

        <div className="flex md:flex-nowrap gap-4 my-3">
          <div className="w-full   mb-3  md:mb-0 relative">
            <label
              htmlFor="address"
              className="text-base font-normal text-[#2B4447]"
            >
              Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              className=""
              value={values.address}
              onChange={handleChange}
              onBlur={handleBlur}
              style={{
                border: errors.address && touched.address && "1px solid red",
              }}
            />
            {errors.address && touched.address && (
              <p className="mt-2 mb-2 text-red-500">{errors.address}</p>
            )}
            {errors.address && touched.address && (
              <ErrorOutlineIcon className="absolute text-red-500 top-[50px] right-3 transition-all duration-[0.3s]" />
            )}
          </div>
        </div>
        <div className="flex md:flex-nowrap gap-4 my-3">
          <div className="w-full   mb-3 relative">
            <lable>Apartment, Suite, etc</lable>
            <input
              type="text"
              id="apartment"
              name="apartment"
              className=""
              value={values.apartment}
              onChange={handleChange}
              onBlur={handleBlur}
              style={{
                border:
                  errors.apartment && touched.apartment && "1px solid red",
              }}
            />
            {errors.apartment && touched.apartment && (
              <p className="mt-2 mb-2 text-red-500">{errors.apartment}</p>
            )}
            {errors.apartment && touched.apartment && (
              <ErrorOutlineIcon className="absolute text-red-500 top-[50px] right-3 transition-all duration-[0.3s]" />
            )}
          </div>
          <div className="w-full   mb-3 relative md:mb-0 ">
            <lable>Suburb</lable>
            <input
              type="text"
              id="suburb"
              name="suburb"
              className="custom-bg"
              value={values.suburb}
              onChange={handleChange}
              onBlur={handleBlur}
              style={{
                border: errors.suburb && touched.suburb && "1px solid red",
              }}
            />
            {errors.suburb && touched.suburb && (
              <p className="mt-2 mb-2 text-red-500">{errors.suburb}</p>
            )}
            {errors.suburb && touched.suburb && (
              <ErrorOutlineIcon className="absolute text-red-500 top-[50px] right-3 transition-all duration-[0.3s]" />
            )}
          </div>
        </div>
        <div className="flex md:flex-nowrap gap-4 my-3">
          <div className="w-full   mb-3 relative">
            <lable>Postcode</lable>
            <input
              type="text"
              id="Postcode"
              name="postCode"
              className=""
              onKeyPress={(event) => {
                const allowedCharacters = /^[0-9]*$/; // Regular expression to match only numbers and '+'
                if (!allowedCharacters.test(event.key)) {
                  event.preventDefault();
                }
              }}
              value={values.postCode}
              onChange={handleChange}
              onBlur={handleBlur}
              style={{
                border: errors.postCode && touched.postCode && "1px solid red",
              }}
            />
            {errors.postCode && touched.postCode && (
              <p className="mt-2 mb-2 text-red-500">{errors.postCode}</p>
            )}
            {errors.postCode && touched.postCode && (
              <ErrorOutlineIcon className="absolute text-red-500 top-[50px] right-3 transition-all duration-[0.3s]" />
            )}
          </div>
          <div className="w-full   mb-3 relative md:mb-0 basic-multi-select">
            <h5 style={{ marginBottom: "10px" }}>State</h5>
            <Select
              onChange={handleState}
              value={values.state}
              options={states}
              style={{
                background: "#F8F8F8",
              }}
            />
            {errors.state && touched.state && (
              <p className="mt-2 mb-2 text-red-500">{errors.state}</p>
            )}
          </div>
        </div>
      </div>
      <div className="text-right flex justify-end items-center gap-2">
        <button
          type="submit"
          className="bg-[#147D73] rounded-[6px] w-fit py-[12px] px-[33px] text-base font-medium text-white"
        >
          Save
        </button>
        <button
          onClick={() => {
            setEditBillingAddress(false);
          }}
          type="submit"
          className="border-[#637381] border rounded-[6px] w-fit py-[12px] px-[33px] text-base font-medium text-[#637381]"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default BillingAddressForm;
