import React, { useEffect, useState } from "react";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import { useFormik } from "formik";
import { deliveryAddressSchema } from "../schemas";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import Select from "react-select";
import { getStates } from "../helpers/getStates";
import { updateDeliveryAddress } from "../helpers/updateDeliveryAddress";
import { getBuyerDetails } from "../helpers/getBuyerDetails";
import { convertDefaultPaymentTermValue } from "../helpers/convertDefaultPaymentTermValue";

const DeliveryAddressForm = ({
  setEditDeliveryAddress,
  customerDetails,
  success,
  error,
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
    notes: "",
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
    validationSchema: deliveryAddressSchema,
    onSubmit: async (values) => {
      const update = await updateDeliveryAddress(
        customerDetails?.buyerId,
        values
      );
      update
        ? success("Delivery address updated!")
        : error("Error occurred, please try again!");

      update && setEditDeliveryAddress(false);

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
      (state) => state?.label === customerDetails?.state
    );

    const valuesBody = {
      address: customerDetails?.address,
      apartment: customerDetails?.apartment,
      suburb: customerDetails?.suburb,
      postCode: customerDetails?.postalCode,
      state: stateOption,
      notes: customerDetails?.deliveryNotes,
    };

    setInitialValues(valuesBody);
    setValues(valuesBody);
  };

  const handleStateSelect = (value) => {
    setValues((prev) => {
      return { ...prev, state: value };
    });
  };

  return (
    <>
      <div className="  md:px-0 pb-4 px-6">
        <div className="flex  items-center gap-1.5  pb-4">
          <HomeRoundedIcon
            style={{ fill: "#2B4447" }}
            className="w-[18px] h-[18px]"
          />
          <h5 className="text-lg font-semibold text-[#2B4447]">
            Delivery Address
          </h5>
        </div>

        <form onSubmit={handleSubmit} className="">
          <div className="flex flex-nowrap gap-8">
            <div className="w-full mb-4 relative">
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
          <div className="flex flex-nowrap gap-8">
            <div className="w-full mb-4 relative">
              <label
                htmlFor="apartment"
                className="text-base font-normal text-[#2B4447]"
              >
                Apartment etc
              </label>
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
            <div className="w-full mb-4 relative">
              <label
                htmlFor="suburb"
                className="text-base font-normal text-[#2B4447]"
              >
                Suburb
              </label>
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

          <div className="flex flex-nowrap gap-8">
            <div className="w-full mb-4 relative">
              <label
                htmlFor="postCode"
                className="text-base font-normal text-[#2B4447]"
              >
                Postcode
              </label>
              <input
                type="text"
                id="Postcode"
                name="postCode"
                className=""
                onKeyPress={(event) => {
                  const allowedCharacters = /^[0-9]*$/;
                  if (!allowedCharacters.test(event.key)) {
                    event.preventDefault();
                  }
                }}
                value={values.postCode}
                onChange={handleChange}
                onBlur={handleBlur}
                style={{
                  border:
                    errors.postCode && touched.postCode && "1px solid red",
                }}
              />
              {errors.postCode && touched.postCode && (
                <p className="mt-2 mb-2 text-red-500">{errors.postCode}</p>
              )}
              {errors.postCode && touched.postCode && (
                <ErrorOutlineIcon className="absolute text-red-500 top-[50px] right-3 transition-all duration-[0.3s]" />
              )}
            </div>
            <div className="w-full mb-4 relative">
              <label
                htmlFor=""
                className="text-base font-normal text-[#2B4447]"
              >
                State
              </label>
              <Select
                onChange={handleStateSelect}
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

          <div className="w-full   mb-3 relative">
            {" "}
            <lable htmlFor="notes" className="mb-2">
              Notes
            </lable>
            <textarea
              className="placeholder:text-sm appearance-none border border-[#E7E7E7] rounded-md w-full p-3 text-gray-700 mt-2"
              id="notes"
              type="text"
              name="notes"
              onChange={handleChange}
              value={values.notes}
              placeholder="Notes"
              style={{
                background: "#F8F8F8",
              }}
            />
          </div>

          <div className="flex gap-8 justify-end ">
            {" "}
            <button
              type="submit"
              className="border-[#147D73] border bg-[#147D73] py-[12px] px-[33px] rounded-md text-base text-white font-normal"
            >
              Save
            </button>
            <button
              type="button"
              className=" border-[#147D73] border rounded-md py-[12px] px-[33px] text-base text-[#147D73] font-normal"
              onClick={() => setEditDeliveryAddress(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default DeliveryAddressForm;
