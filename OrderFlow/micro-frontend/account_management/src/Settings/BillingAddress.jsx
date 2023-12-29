import React, { useState } from "react";
import { useFormik } from "formik";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

const initialValues = {
  address: "",
  apartment: "",
  suburb: "",
  postcode: "",
  state: "",
};

function BillingAddress({ organisationSettings, setOrganisationSettings }) {
  const [check, setCheck] = useState(false);

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
    onSubmit: (values) => {},
  });

  const handleCheckbox = (e) => {
    setCheck(!e.target.checked);
    if (e.target.checked) {
      setValues({
        address: organisationSettings.organisationAddress,
        apartment: organisationSettings.apartment,
        suburb: organisationSettings.suburb,
        postcode: organisationSettings.postcode,
        state: organisationSettings.state,
      });
    }
  };

  const handleForm = () => {
    setOrganisationSettings({
      ...organisationSettings,
      billingAddress: values.address,
    });
  };

  return (
    <>
      <div className="   w-full  rounded-lg		 border border-inherit bg-white h-fit		 	  ">
        <div className=" border-b	 border-inherit sm:px-5 sm:py-4 py-3 px-4">
          <h6 className="text-base	font-medium	 text-green">Billing address</h6>
        </div>
        <div className="px-6 py-7">
          <form
            className="w-full "
            onChange={handleForm}
            onSubmit={handleSubmit}
          >
            <div className="flex items-center mb-5">
              <input
                onChange={handleCheckbox}
                id="same-address"
                type="checkbox"
                name="checkbox"
                checked={check}
                defaultValue=""
                className="w-4 h-4 text-darkGreen bg-gray-100 border-gray-300 rounded  dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                htmlFor="same-address"
                className="ml-2 sm:text-base text-sm		 font-normal	 text-green dark:text-gray-300"
              >
                Use same address as Organisation for Billing{" "}
              </label>
            </div>
            <div className="flex flex-wrap -mx-3 mb-5 items-start">
              <div className="w-full md:w-1/2 px-3 relative">
                <label
                  className="block  tracking-wide text-gray-700 text-sm		 font-medium	 "
                  htmlFor="grid-last-name"
                >
                  Address
                </label>
                <input
                  className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded-md	 py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-last-name"
                  type="text"
                  placeholder="126 Juliett Street"
                  name="address"
                  value={values.address}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  style={{
                    border:
                      errors.address && touched.address && "1px solid red",
                  }}
                />
                {errors.address && touched.address && (
                  <p className="mt-2 mb-2 text-red-500 text-xs	font-normal	">
                    {errors.address}
                  </p>
                )}
                {errors.address && touched.address && (
                  <ErrorOutlineIcon className="absolute text-red-500 top-[41px] right-5 transition-all duration-[0.3s]" />
                )}
              </div>
              <div className="w-full md:w-1/2 px-3 relative">
                <label
                  className="block  tracking-wide text-gray-700 text-sm		 font-medium	 "
                  htmlFor="grid-last-name"
                >
                  Apartment, floor etc. (optional)
                </label>
                <input
                  className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded-md	 py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-last-name"
                  type="text"
                  placeholder="Jones"
                  name="apartment"
                  value={values.apartment}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  style={{
                    border:
                      errors.apartment && touched.apartment && "1px solid red",
                  }}
                />
                {errors.apartment && touched.apartment && (
                  <p className="mt-2 mb-2 text-red-500 text-xs	font-normal">
                    {errors.apartment}
                  </p>
                )}
                {errors.apartment && touched.apartment && (
                  <ErrorOutlineIcon className="absolute text-red-500 top-[41px] right-5 transition-all duration-[0.3s]" />
                )}
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-5 items-start">
              <div className="w-full md:w-1/3	 px-3 relative">
                <label
                  className="block  tracking-wide text-gray-700 text-sm		 font-medium	 "
                  htmlFor="grid-last-name"
                >
                  Suburb
                </label>
                <input
                  className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded-md	 py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-last-name"
                  type="text"
                  placeholder="Tom"
                  name="suburb"
                  value={values.suburb}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  style={{
                    border: errors.suburb && touched.suburb && "1px solid red",
                  }}
                />
                {errors.suburb && touched.suburb && (
                  <p className="mt-2 mb-2 text-red-500 text-xs	font-normal">
                    {errors.suburb}
                  </p>
                )}
                {errors.suburb && touched.suburb && (
                  <ErrorOutlineIcon className="absolute text-red-500 top-[41px] right-5 transition-all duration-[0.3s]" />
                )}
              </div>
              <div className="w-full md:w-1/3	 px-3 relative">
                <label
                  className="block  tracking-wide text-gray-700 text-sm		 font-medium	 "
                  htmlFor="grid-last-name"
                >
                  Postcode
                </label>
                <input
                  className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded-md	 py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-last-name"
                  type="text"
                  placeholder="Jones"
                  name="postcode"
                  value={values.postcode}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  style={{
                    border:
                      errors.postcode && touched.postcode && "1px solid red",
                  }}
                />
                {errors.email && touched.email && (
                  <p className="mt-2 mb-2 text-red-500 text-xs	font-normal">
                    {errors.postcode}
                  </p>
                )}
                {errors.postcode && touched.postcode && (
                  <ErrorOutlineIcon className="absolute text-red-500 top-[41px] right-5 transition-all duration-[0.3s]" />
                )}
              </div>
              <div className="w-full md:w-1/3	 px-3 relative">
                <label
                  className="block  tracking-wide text-gray-700 text-sm		 font-medium	 "
                  htmlFor="grid-last-name"
                >
                  State
                </label>
                <div className="relative">
                  <select
                    value={values.state} // Bind the selected state value to the state variable
                    onChange={handleChange}
                    className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded-md	 py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="state"
                  >
                    <option value={""}>Select a state</option>
                    <option value={"NSW"}>NSW</option>
                    <option value={"Missouri"}>Missouri</option>
                    <option value={"Texas"}>Texas</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg
                      className="fill-current h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default BillingAddress;
