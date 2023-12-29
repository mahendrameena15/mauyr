import React from "react";

const CustomerBillingStatement = ({
  formChange,
  handleChange,
  handleBlur,
  values,
  errors,
  touched,
}) => {
  return (
    <div className="border w-full border-[#E7E7E7] rounded-md bg-white">
      <div className="px-6 py-3 border-b border-[#E7E7E7]">
        <h5 className="text-base font-medium text-[#2B4447] mb-2">
          Customer billing statement
        </h5>
        <p className="text-sm font-medium text-[#637381] leading-[20px]">
          This information will be shown on the buyer’s card statements.{" "}
        </p>
      </div>
      <div className="py-6 px-6">
        <div className="mb-4">
          <label
            className="block text-[#2B4447] text-base font-medium mb-2"
            htmlFor="billingStatementDescriptor"
          >
            Statement descriptor
          </label>
          <input
            className="appearance-none border rounded-[6px] w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="billingStatementDescriptor"
            type="text"
            placeholder="Enter statement descriptor"
            name="billingStatementDescriptor"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.billingStatementDescriptor}
            onKeyPress={(event) => {
              const isAlphanumericOrSpace = /^[a-zA-Z0-9\s]*$/;
              if (!isAlphanumericOrSpace.test(event.key)) {
                event.preventDefault();
              }
            }}
            onPaste={(event) => {
              const pastedText = event.clipboardData.getData("text/plain");
              const isAlphanumericOrSpace = /^[a-zA-Z0-9\s]*$/;
              if (!isAlphanumericOrSpace.test(pastedText)) {
                event.preventDefault();
              }
            }}
          />
          {errors.billingStatementDescriptor &&
            touched.billingStatementDescriptor && (
              <p className="mt-2 mb-2 text-red-500 text-xs font-normal ">
                {errors.billingStatementDescriptor}
              </p>
            )}
        </div>
        <div className="mb-4">
          <label
            className="block text-[#2B4447] text-base font-medium mb-2"
            htmlFor="billingStatementMobile"
          >
            Mobile number
          </label>
          <input
            className="appearance-none border rounded-[6px] w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="billingStatementMobile"
            type="text"
            name="billingStatementMobile"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.billingStatementMobile}
            placeholder="Enter Mobile Number"
            onKeyPress={(event) => {
              const allowedCharacters = /^[0-9+]*$/; // Regular expression to match only numbers
              if (!allowedCharacters.test(event.key)) {
                event.preventDefault();
              }
            }}
          />
          {errors.billingStatementMobile && touched.billingStatementMobile && (
            <p className="mt-2 mb-2 text-red-500 text-xs font-normal ">
              {errors.billingStatementMobile}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomerBillingStatement;
