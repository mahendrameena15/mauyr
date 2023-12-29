import React from "react";
import { useFormik } from "formik";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  mobile: "",
};
function OrderingContact({ organisationSettings, setOrganisationSettings }) {
  const { values, errors, handleBlur, handleChange, handleSubmit, touched } =
    useFormik({
      initialValues: initialValues,
      onSubmit: (values) => {},
    });

  const handleForm = () => {
    setOrganisationSettings({
      ...organisationSettings,
      orderingContactFirstName: values.firstName,
      orderingContactLastName: values.lastName,
      orderingContactMobile: values.mobile,
      orderingContactEmail: values.email,
    });
  };

  return (
    <>
      <div className="   w-full  rounded-lg		 border border-inherit bg-white h-full	 	  ">
        <div className=" border-b	 border-inherit sm:px-5 sm:py-4 py-3 px-4">
          <h6 className="text-base	font-medium	 text-green">Ordering contact</h6>
        </div>
        <div className="px-6 py-7">
          <form
            className="w-full "
            onChange={handleForm}
            onSubmit={handleSubmit}
          >
            <div className="flex flex-wrap -mx-3 mb-5">
              <div className="w-full md:w-1/2 px-3 relative">
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
                  placeholder="Tom"
                  name="firstName"
                  value={values.firstName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  style={{
                    border:
                      errors.firstName && touched.firstName && "1px solid red",
                  }}
                />
                {errors.firstName && touched.firstName && (
                  <p className="mt-2 mb-2 text-red-500 text-xs	font-normal	">
                    {errors.firstName}
                  </p>
                )}
                {errors.firstName && touched.firstName && (
                  <ErrorOutlineIcon className="absolute text-red-500 top-[47px] right-5 transition-all duration-[0.3s]" />
                )}
              </div>
              <div className="w-full md:w-1/2 px-3 relative">
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
                  placeholder="Jones"
                  name="lastName"
                  value={values.lastName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  style={{
                    border:
                      errors.lastName && touched.lastName && "1px solid red",
                  }}
                />
                {errors.lastName && touched.lastName && (
                  <p className="mt-2 mb-2 text-red-500 text-xs	font-normal">
                    {errors.lastName}
                  </p>
                )}
                {errors.lastName && touched.lastName && (
                  <ErrorOutlineIcon className="absolute text-red-500 top-[47px] right-5 transition-all duration-[0.3s]" />
                )}
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-5 relative">
              <div className="w-full px-3">
                <label
                  className="block  tracking-wide text-gray-700 text-base	 font-medium	 "
                  htmlFor="grid-password"
                >
                  Email
                </label>
                <input
                  className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded-md	 py-3 px-4  leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-password"
                  type="email"
                  placeholder="devidjond45@gmail.com"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  style={{
                    border: errors.email && touched.email && "1px solid red",
                  }}
                />
                {errors.email && touched.email && (
                  <p className="mt-2 mb-2 text-red-500 text-xs	font-normal">
                    {errors.email}
                  </p>
                )}
                {errors.email && touched.email && (
                  <ErrorOutlineIcon className="absolute text-red-500 top-[47px] right-5 transition-all duration-[0.3s]" />
                )}
                {/* <p className="text-gray-600 text-base	 italic">Make it as long and as crazy as you'd like</p> */}
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-5 relative">
              <div className="w-full px-3">
                <label
                  className="block  tracking-wide text-gray-700 text-base	 font-medium	 "
                  htmlFor="grid-password"
                >
                  Mobile
                </label>
                <input
                  className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded-md	 py-3 px-4  leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-password"
                  type="text"
                  placeholder="0412 345 678"
                  name="mobile"
                  value={values.mobile}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  style={{
                    border: errors.mobile && touched.mobile && "1px solid red",
                  }}
                />
                {errors.email && touched.email && (
                  <p className="mt-2 mb-2 text-red-500 text-xs	font-normal">
                    {errors.mobile}
                  </p>
                )}
                {errors.mobile && touched.mobile && (
                  <ErrorOutlineIcon className="absolute text-red-500 top-[47px] right-5 transition-all duration-[0.3s]" />
                )}
                {/* <p className="text-gray-600 text-base	 italic">Make it as long and as crazy as you'd like</p> */}
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default OrderingContact;
