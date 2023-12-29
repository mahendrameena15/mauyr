import React, { useEffect, useState } from "react";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import Select from "react-select";

function CustomerAddress({
  values,
  handleChange,
  handleBlur,
  errors,
  options,
  touched,
  setValues,
  setIsUpDate,
  setIsAddressChecked,
  isAddressChecked,
}) {
  const mastersUrl = process.env.REACT_APP_MASTERS_URL
  const [prevBillingDetails, setPrevBillingDetails] = useState({
    billingAddress: "",
    billingApartment: "",
    billingSuburb: "",
    billingPostalCode: "",
    billingState: "",
  });
  const sameAddresses = (e) => {
    setIsAddressChecked(e.target.checked);
    if (e.target.checked) {
      setValues({
        ...values,
        billingAddress: values?.address,
        billingApartment: values?.apartment,
        billingSuburb: values.suburb,
        billingPostalCode: values.postalCode,
        billingState: values.state,
      });
    } else {
      setValues({
        ...values,
        ...prevBillingDetails,
      });
    }
  };
  const [stateOptions, setStateOptions] = useState([]);
  useEffect(() => {
    // defaultPaymentTrems
    fetch(`${mastersUrl}/api/State`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        setStateOptions(
          data.map((ele) => {
            return {
              value: ele.stateId,
              label: ele.stateName,
            };
          })
        );
      })
      .catch((error) => console.log(error));
  }, []);

  const handleSelect = (e, name) => {
    if (name === "state") {
      setValues({
        ...values,
        state: e,
      });
      setIsUpDate(true);
    } else {
      setValues({
        ...values,
        [name]: e,
      });
      setIsUpDate(true);
    }
  };

  return (
    <>
      <div className="  ">
        <div className=" border-b	 border-inherit sm:px-5 sm:py-4 py-3 px-4">
          <h6 className="text-base	font-medium	 text-green">
            Customer addresses
          </h6>
        </div>
        <div className="px-6 py-7">
          <h5 className="text-green mb-5 text-base font-bold	">
            Delivery Address
          </h5>
          <div className="flex flex-wrap -mx-3 mb-5 items-start">
            <div className="w-full md:w-1/2 px-3 relative">
              <label
                className="block  tracking-wide text-gray-700 text-sm	 font-medium	 "
                htmlFor="grid-last-name"
              >
                Address
              </label>
              <input
                className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded-md	 py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-last-name"
                type="text"
                name="address"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.address}
                placeholder="Enter Delivery Address"
                style={{
                  border: errors.address && touched?.address && "1px solid red",
                }}
              />
              {errors.address && touched?.address && (
                <p className="mt-2 mb-2 text-red-500 font-sm text-xs">
                  {errors.address}
                </p>
              )}
              {errors.address && touched?.address && (
                <ErrorOutlineIcon className="absolute text-red-500 top-[42px] right-5 transition-all duration-[0.3s] " />
              )}
            </div>
            <div className="w-full md:w-1/2 px-3 relative">
              <label
                className="block  tracking-wide text-gray-700 text-sm	 font-medium	 "
                htmlFor="grid-last-name"
              >
                Apartment, floor etc. (Optional)
              </label>
              <input
                className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded-md	 py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-last-name"
                type="text"
                onBlur={handleBlur}
                value={values.apartment}
                onChange={handleChange}
                placeholder="Enter Apartment"
                name="apartment"
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-5 items-start">
            <div className="w-full md:w-1/3	 px-3 relative">
              <label
                className="block  tracking-wide text-gray-700 text-sm	 font-medium	 "
                htmlFor="grid-last-name"
              >
                Suburb
              </label>
              <input
                className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded-md	 py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-last-name"
                type="text"
                value={values.suburb}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Enter Suburb"
                name="suburb"
                style={{
                  border: errors.suburb && touched?.suburb && "1px solid red",
                }}
              />
              {errors.suburb && touched?.suburb && (
                <p className="mt-2 mb-2 text-red-500 font-sm text-xs">
                  {errors.suburb}
                </p>
              )}
              {errors.suburb && touched?.suburb && (
                <ErrorOutlineIcon className="absolute text-red-500 top-[42px] right-5 transition-all duration-[0.3s] " />
              )}
            </div>
            <div className="w-full md:w-1/3	 px-3 relative">
              <label
                className="block  tracking-wide text-gray-700 text-sm	 font-medium	 "
                htmlFor="grid-last-name"
              >
                Postcode
              </label>
              <input
                className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded-md	 py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-last-name"
                type="text"
                value={values.postalCode}
                onBlur={handleBlur}
                onChange={handleChange}
                placeholder="Enter Postcode"
                name="postalCode"
                style={{
                  border:
                    errors.postalCode && touched?.postalCode && "1px solid red",
                }}
              />
              {errors.postalCode && touched?.postalCode && (
                <p className="mt-2 mb-2 text-red-500 font-sm text-xs">
                  {errors.postalCode}
                </p>
              )}
              {errors.postalCode && touched?.postalCode && (
                <ErrorOutlineIcon className="absolute text-red-500 top-[42px] right-5 transition-all duration-[0.3s] " />
              )}
            </div>
            <div className="w-full md:w-1/3	 px-3 relative">
              <h5
                className="block  tracking-wide text-gray-700 text-sm	 font-medium mb-[10px]	 "
                htmlFor="grid-last-name"
              >
                State
              </h5>

              <Select
                name="state"
                options={stateOptions}
                value={values?.state}
                onChange={(e) => handleSelect(e, "state")}
                className="basic-multi-select "
                classNamePrefix="select"
                style={{
                  border: errors?.state && "1px solid red",
                }}
              />
              {errors.state && touched?.state && (
                <p className="mt-2 mb-2 text-red-500 font-sm text-xs">
                  {errors.state}
                </p>
              )}
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-5 relative">
            <div className="w-full px-3">
              <label
                htmlFor="message"
                className="block mb-2 text-sm	 font-medium text-gray-700 dark:text-white"
              >
                Delivery notes
              </label>
              <textarea
                id="message"
                rows={4}
                value={values.deliveryNotes}
                onChange={handleChange}
                name="deliveryNotes"
                onBlur={handleBlur}
                maxLength={250}
                className="block p-2.5 w-full text-sm text-gray-900  rounded-md	 border border-gray-200 focus:outline-none focus:bg-white focus:border-gray-500 "
                placeholder="Leave a comment..."
                defaultValue={""}
                style={{
                  border:
                    errors.deliveryNotes &&
                    touched?.deliveryNotes &&
                    "1px solid red",
                }}
              />
              {errors.deliveryNotes && touched?.deliveryNotes && (
                <p className="mt-2 mb-2 text-red-500 font-sm text-xs">
                  {errors.deliveryNotes}
                </p>
              )}
              {errors.deliveryNotes && touched?.deliveryNotes && (
                <ErrorOutlineIcon className="absolute text-red-500 top-[42px] right-5 transition-all duration-[0.3s] " />
              )}
            </div>
          </div>
          <div className="flex flex-wrap gap-5 lg:gap-0 -mx-3 mb-5">
            <div className="w-full relative md:w-1/2 px-3">
              <h5 className="text-green text-base font-bold	">
                Billing address
              </h5>
            </div>
            <div className="w-full relative md:w-1/2 px-3 green-checkbox">
              <div className="flex gap-2 items-center">
                <input
                  id="default-checkbox"
                  type="checkbox"
                  defaultValue=""
                  onClick={sameAddresses}
                  checked={isAddressChecked}
                  className="w-4 h-4 text-darkGreen bg-gray-100 border-gray-300 rounded  dark:bg-gray-700 dark:border-gray-600"
                />
                <h5 className="text-base font-normal">
                  Delivery and billing address the same
                </h5>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-5 items-start">
            <div className="w-full md:w-1/2 px-3 relative">
              <label
                className="block  tracking-wide text-gray-700 text-sm	 font-medium	 "
                htmlFor="grid-last-name"
              >
                Address
              </label>
              <input
                className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded-md	 py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-last-name"
                type="text"
                placeholder="Enter Billing Address"
                value={values?.billingAddress}
                name="billingAddress"
                onBlur={handleBlur}
                onChange={(e) => {
                  handleChange(e);
                  setPrevBillingDetails((prev) => {
                    return {
                      ...prev,
                      billingAddress: e.target.value,
                    };
                  });
                }}
                style={{
                  border:
                    errors.billingAddress &&
                    touched?.billingAddress &&
                    "1px solid red",
                }}
              />
              {errors.billingAddress && touched?.billingAddress && (
                <p className="mt-2 mb-2 text-red-500 font-sm text-xs">
                  {errors.billingAddress}
                </p>
              )}
              {errors.billingAddress && touched?.billingAddress && (
                <ErrorOutlineIcon className="absolute text-red-500 top-[42px] right-5 transition-all duration-[0.3s] " />
              )}
            </div>
            <div className="w-full md:w-1/2 px-3 relative">
              <label
                className="block  tracking-wide text-gray-700 text-sm	 font-medium	 "
                htmlFor="grid-last-name"
              >
                Apartment, floor etc. (optional)
              </label>
              <input
                className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded-md	 py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-last-name"
                type="text"
                onBlur={handleBlur}
                value={values.billingApartment}
                onChange={(e) => {
                  handleChange(e);
                  setPrevBillingDetails((prev) => {
                    return {
                      ...prev,
                      billingApartment: e.target.value,
                    };
                  });
                }}
                placeholder="Enter Apartment"
                name="billingApartment"
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-5 items-start">
            <div className="w-full md:w-1/3	 px-3 relative">
              <label
                className="block  tracking-wide text-gray-700 text-sm	 font-medium	 "
                htmlFor="grid-last-name"
              >
                Suburb
              </label>
              <input
                className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded-md	 py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-last-name"
                type="text"
                placeholder="Enter Suburb"
                onBlur={handleBlur}
                name="billingSuburb"
                value={values.billingSuburb}
                onChange={(e) => {
                  handleChange(e);
                  setPrevBillingDetails((prev) => {
                    return {
                      ...prev,
                      billingSuburb: e.target.value,
                    };
                  });
                }}
                style={{
                  border:
                    errors.billingSuburb &&
                    touched?.billingSuburb &&
                    "1px solid red",
                }}
              />
              {errors.billingSuburb && touched?.billingSuburb && (
                <p className="mt-2 mb-2 text-red-500 font-sm text-xs">
                  {errors.billingSuburb}
                </p>
              )}
              {errors.billingSuburb && touched?.billingSuburb && (
                <ErrorOutlineIcon className="absolute text-red-500 top-[42px] right-5 transition-all duration-[0.3s] " />
              )}
            </div>
            <div className="w-full md:w-1/3	 px-3 relative">
              <label
                className="block  tracking-wide text-gray-700 text-sm	 font-medium	 "
                htmlFor="grid-last-name"
              >
                Postcode
              </label>
              <input
                className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded-md	 py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-last-name"
                type="text"
                onChange={(e) => {
                  handleChange(e);
                  setPrevBillingDetails((prev) => {
                    return {
                      ...prev,
                      billingPostalCode: e.target.value,
                    };
                  });
                }}
                onBlur={handleBlur}
                value={values.billingPostalCode}
                placeholder="Enter Postcode"
                name="billingPostalCode"
                style={{
                  border:
                    errors.billingPostalCode &&
                    touched?.billingPostalCode &&
                    "1px solid red",
                }}
              />
              {errors.billingPostalCode && touched?.billingPostalCode && (
                <p className="mt-2 mb-2 text-red-500 font-sm text-xs">
                  {errors.billingPostalCode}
                </p>
              )}
              {errors.billingPostalCode && touched?.billingPostalCode && (
                <ErrorOutlineIcon className="absolute text-red-500 top-[42px] right-5 transition-all duration-[0.3s] " />
              )}
            </div>
            <div className="w-full md:w-1/3	 px-3 relative">
              <h5
                className="block  tracking-wide text-gray-700 text-sm	 font-medium mb-[10px]	 "
                htmlFor="grid-last-name"
              >
                State
              </h5>

              <Select
                name="billingState"
                options={stateOptions}
                value={values?.billingState}
                onChange={(e) => {
                  handleSelect(e, "billingState");
                  setPrevBillingDetails((prev) => {
                    return {
                      ...prev,
                      billingState: e,
                    };
                  });
                }}
                className="basic-multi-select "
                classNamePrefix="select"
                style={{
                  border:
                    errors?.billingState &&
                    touched?.billingState &&
                    "1px solid red",
                }}
              />
              {errors.billingState && touched?.billingState && (
                <p className="mt-2 mb-2 text-red-500 font-sm text-xs">
                  {errors.billingState}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CustomerAddress;
