import React from "react";
import { Select } from "antd";

const BusinessDetails = ({
  values,
  businessType,
  handleBlur,
  errors,
  handleChange,
  stateOptions,
  CustomTooltip,
  HelpIcon,
  setValues,
  touched,
  setShow
}) => {
  const handleSelect = (value, name) => {
    setShow(true)
    setValues((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });

    console.log("values", values);
  };

  return (
    <div className="border border-[#E7E7E7] rounded-md bg-white  overflow-y-auto">
      <div className="px-6 py-3 border-b border-[#E7E7E7]">
        <h5 className="text-base font-medium text-[#2B4447]">
          Business details
        </h5>
      </div>
      <div className="py-6 px-6">
        <div className="flex flex-nowrap gap-4">
          <div className="mb-4 w-full">
            <label
              className="block text-[#2B4447] text-base font-medium mb-2"
              htmlFor="businessType"
            >
              Business type
            </label>
            <Select
              id="businessType"
              className="mt-[3px]"
              showSearch
              placeholder="Select a type"
              style={{
                width: "100%",
                height: "48px",
              }}
              options={businessType}
              onChange={(value) => handleSelect(value, "businessType")}
              onBlur={handleBlur}
              name="businessType"
              value={values.businessType}
            />
            {errors.businessType && touched.businessType && (
              <p className="mt-2 mb-2 text-red-500 text-xs font-normal ">
                {errors.businessType}
              </p>
            )}
          </div>
          <div className="mb-4 w-full">
            <label
              className="block text-[#2B4447] text-base font-medium mb-2"
              htmlFor="legalBusinessName"
            >
              Legal business name
            </label>
            <input
              className="appearance-none border rounded-[6px] w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="legalBusinessName"
              type="text"
              name="legalBusinessName"
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Enter business name"
              value={values.legalBusinessName}
            />
            {errors.legalBusinessName && touched.legalBusinessName && (
              <p className="mt-2 mb-2 text-red-500 text-xs font-normal ">
                {errors.legalBusinessName}
              </p>
            )}
          </div>
        </div>
        <div className="flex flex-nowrap gap-4">
          <div className="mb-4 w-full">
            <label
              className="block text-[#2B4447] text-base font-medium mb-2"
              htmlFor="acn"
            >
              ACN
            </label>
            <input
              className="appearance-none border rounded-[6px] w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="acn"
              type="text"
              name="acn"
              placeholder="Enter ACN"
              value={values.acn}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.acn && touched.acn && (
              <p className="mt-2 mb-2 text-red-500 text-xs font-normal ">
                {errors.acn}
              </p>
            )}
          </div>
          <div className="mb-4 w-full">
            <label
              className="block text-[#2B4447] text-base font-medium mb-2"
              htmlFor="abn"
            >
              ABN
            </label>
            <input
              className="appearance-none border rounded-[6px] w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="abn"
              type="text"
              name="abn"
              placeholder="Enter ABN"
              value={values.abn}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.abn && touched.abn && (
              <p className="mt-2 mb-2 text-red-500 text-xs font-normal ">
                {errors.abn}
              </p>
            )}
          </div>
        </div>
        <div className="flex flex-nowrap gap-4">
          <div className="mb-4 w-full">
            <label
              className="block text-[#2B4447] text-base font-medium mb-2"
              htmlFor="username"
            >
              Business Address
            </label>
            <input
              className="appearance-none border rounded-[6px] w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="businessAddress"
              type="text"
              name="businessAddress"
              placeholder="Enter business address "
              value={values.businessAddress}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.businessAddress && touched.businessAddress && (
              <p className="mt-2 mb-2 text-red-500 text-xs font-normal ">
                {errors.businessAddress}
              </p>
            )}
          </div>
          <div className="mb-4 w-full">
            <label
              className="block text-[#2B4447] text-base font-medium mb-2"
              htmlFor="businessPhoneNumber"
            >
              Business Phone Number
            </label>
            <input
              className="appearance-none border rounded-[6px] w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="businessPhoneNumber"
              type="text"
              name="businessPhoneNumber"
              placeholder="Enter phone number"
              value={values.businessPhoneNumber}
              onChange={handleChange}
              onBlur={handleBlur}
              onKeyPress={(event) => {
                const allowedCharacters = /^[0-9+]*$/;
                if (!allowedCharacters.test(event.key)) {
                  event.preventDefault();
                }
              }}
              onPaste={(event) => {
                const pastedText = event.clipboardData.getData("text/plain");
                const allowedCharacters = /^[0-9+]*$/;
                if (!allowedCharacters.test(pastedText)) {
                  event.preventDefault();
                }
              }}
            />
            {errors.businessPhoneNumber && touched.businessPhoneNumber && (
              <p className="mt-2 mb-2 text-red-500 text-xs font-normal ">
                {errors.businessPhoneNumber}
              </p>
            )}
          </div>
        </div>
        <div className="flex flex-nowrap gap-4">
          <div className="mb-4 w-full">
            <label
              className="block text-[#2B4447] text-base font-medium mb-2"
              htmlFor="businessDetailsSuburb"
            >
              Suburb
            </label>

            <input
              className="appearance-none border rounded-[6px] w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="businessDetailsSuburb"
              type="text"
              name="businessDetailsSuburb"
              placeholder="Enter suburb"
              value={values.businessDetailsSuburb}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.businessDetailsSuburb && touched.businessDetailsSuburb && (
              <p className="mt-2 mb-2 text-red-500 text-xs font-normal ">
                {errors.businessDetailsSuburb}
              </p>
            )}
          </div>
          <div className="mb-4 w-full">
            <label
              className="block text-[#2B4447] text-base font-medium mb-2"
              htmlFor="businessDetailsPostcode"
            >
              Postcode
            </label>
            <input
              className="appearance-none border rounded-[6px] w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="businessDetailsPostcode"
              type="text"
              placeholder="Enter postcode"
              name="businessDetailsPostcode"
              value={values.businessDetailsPostcode}
              onChange={handleChange}
              onBlur={handleBlur}
              maxLength={4}
              onKeyPress={(event) => {
                const allowedCharacters = /^[0-9]*$/; // Regular expression to match only numbers
                if (!allowedCharacters.test(event.key)) {
                  event.preventDefault();
                }
              }}
            />
            {errors.businessDetailsPostcode &&
              touched.businessDetailsPostcode && (
                <p className="mt-2 mb-2 text-red-500 text-xs font-normal ">
                  {errors.businessDetailsPostcode}
                </p>
              )}
          </div>
        </div>
        <div className="flex flex-nowrap gap-4">
          <div className="mb-4 w-full">
            <label
              className="block text-[#2B4447] text-base font-medium mb-2"
              htmlFor="businessDetailsState"
            >
              State
            </label>
            <Select
              className="mt-[3px]"
              showSearch
              id="businessDetailsState"
              name="businessDetailsState"
              style={{ width: "100%", height: "48px" }}
              placeholder="Search to Select"
              options={stateOptions}
              onChange={(value) => handleSelect(value, "businessDetailsState")}
              onBlur={handleBlur}
              value={values.businessDetailsState}
            />
            {errors.businessDetailsState && touched.businessDetailsState && (
              <p className="mt-2 mb-2 text-red-500 text-xs font-normal ">
                {errors.businessDetailsState}
              </p>
            )}
          </div>
          <div className="mb-4 w-full">
            <label
              className="block text-[#2B4447] text-base font-medium mb-2"
              htmlFor="businessDetailsCountry"
            >
              Country
            </label>
            <input
              disabled
              className="appearance-none  border rounded-[6px] w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="businessDetailsCountry"
              type="text"
              placeholder="Australia "
              value={values.businessDetailsCountry}
              style={{ background: "#E0E0E0" }}
            />
          </div>
        </div>
        <div className="flex flex-nowrap gap-4">
          <div className="mb-4 w-full">
            <label
              className="block text-[#2B4447] text-base font-medium mb-2"
              htmlFor="businessWebsiteUrl"
            >
              <CustomTooltip
                placement="right"
                arrow
                title="Please provide the URL of your business website or social media profile."
              >
                <HelpIcon
                  sx={{
                    color: "#E0E0E0",
                    width: "20px",
                    marginLeft: "10px",
                  }}
                />{" "}
              </CustomTooltip>{" "}
              Business website URL
            </label>
            <input
              className="appearance-none border rounded-[6px] w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="businessWebsiteUrl"
              type="text"
              placeholder="Business website URL"
              name="businessWebsiteUrl"
              value={values.businessWebsiteUrl}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.businessWebsiteUrl && touched.businessWebsiteUrl && (
              <p className="mt-2 mb-2 text-red-500 text-xs font-normal ">
                {errors.businessWebsiteUrl}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessDetails;
