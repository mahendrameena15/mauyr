import React from "react";
import { Select } from "antd";

const checkboxList = [
  "I own more than 25% of the company",
  "I am a member of the governing board of the company",
  "I am a company executive.",
];

const RepresentativeInformation = ({
  values,
  handleChange,
  handleBlur,
  touched,
  errors,
  stateOptions,
  setValues,
  setShow,
}) => {
  const handleSelect = (value, name) => {
    setShow(true);
    setValues((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  return (
    <div className="border border-[#E7E7E7] rounded-md bg-white  overflow-y-auto">
      <div className="px-6 py-3 border-b border-[#E7E7E7]">
        <h5 className="text-base font-medium text-[#2B4447]">
          Representative Information
        </h5>
      </div>
      <div className="py-6 px-6">
        <div className="flex flex-nowrap gap-4">
          <div className="mb-4 w-full">
            <label
              className="block text-[#2B4447] text-base font-medium mb-2"
              htmlFor="representativeInformationFirstName"
            >
              First name
            </label>
            <input
              className="appearance-none border rounded-[6px] w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="representativeInformationFirstName"
              type="text"
              name="representativeInformationFirstName"
              placeholder="Enter first name"
              value={values.representativeInformationFirstName}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.representativeInformationFirstName &&
              touched.representativeInformationFirstName && (
                <p className="mt-2 mb-2 text-red-500 text-xs font-normal ">
                  {errors.representativeInformationFirstName}
                </p>
              )}
          </div>
          <div className="mb-4 w-full">
            <label
              className="block text-[#2B4447] text-base font-medium mb-2"
              htmlFor="representativeInformationLastName"
            >
              Last name
            </label>
            <input
              className="appearance-none border rounded-[6px] w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="representativeInformationLastName"
              type="text"
              name="representativeInformationLastName"
              placeholder="Enter last name"
              value={values.representativeInformationLastName}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.representativeInformationLastName &&
              touched.representativeInformationLastName && (
                <p className="mt-2 mb-2 text-red-500 text-xs font-normal ">
                  {errors.representativeInformationLastName}
                </p>
              )}
          </div>
        </div>
        <div className="flex flex-nowrap gap-4">
          <div className="mb-4 w-full">
            <label
              className="block text-[#2B4447] text-base font-medium mb-2"
              htmlFor="representativeInformationDob"
            >
              Date of birth
            </label>
            <input
              className="appearance-none border rounded-[6px] w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="representativeInformationDob"
              type="date"
              onChange={handleChange}
              value={values.representativeInformationDob}
              name="representativeInformationDob"
              placeholder="dd/mm/yyyy"
            />
          </div>
          <div className="mb-4 w-full">
            <label
              className="block text-[#2B4447] text-base font-medium mb-2"
              htmlFor="representativeInformationAddress"
            >
              Address
            </label>

            <input
              className="appearance-none border rounded-[6px] w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="representativeInformationAddress"
              type="text"
              placeholder="Enter address"
              name="representativeInformationAddress"
              value={values.representativeInformationAddress}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.representativeInformationAddress &&
              touched.representativeInformationAddress && (
                <p className="mt-2 mb-2 text-red-500 text-xs font-normal ">
                  {errors.representativeInformationAddress}
                </p>
              )}
          </div>
        </div>
        <div className="flex flex-nowrap gap-4">
          <div className="mb-4 w-full">
            <label
              className="block text-[#2B4447] text-base font-medium mb-2"
              htmlFor="representativeInformationSuburb"
            >
              Suburb
            </label>
            <input
              className="appearance-none border rounded-[6px] w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter suburb"
              name="representativeInformationSuburb"
              id="representativeInformationSuburb"
              type="text"
              value={values.representativeInformationSuburb}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.representativeInformationSuburb &&
              touched.representativeInformationSuburb && (
                <p className="mt-2 mb-2 text-red-500 text-xs font-normal ">
                  {errors.representativeInformationSuburb}
                </p>
              )}
          </div>
          <div className="mb-4 w-full">
            <label
              className="block text-[#2B4447] text-base font-medium mb-2"
              htmlFor="representativeInformationPostcode"
            >
              Postcode
            </label>
            <input
              className="appearance-none border rounded-[6px] w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="representativeInformationPostcode"
              type="text"
              placeholder="Enter postcode"
              name="representativeInformationPostcode"
              maxLength={4}
              onKeyPress={(event) => {
                const allowedCharacters = /^[0-9]*$/; // Regular expression to match only numbers
                if (!allowedCharacters.test(event.key)) {
                  event.preventDefault();
                }
              }}
              value={values.representativeInformationPostcode}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.representativeInformationPostcode &&
              touched.representativeInformationPostcode && (
                <p className="mt-2 mb-2 text-red-500 text-xs font-normal ">
                  {errors.representativeInformationPostcode}
                </p>
              )}
          </div>
        </div>
        <div className="flex flex-nowrap gap-2">
          <div className="mb-4 w-full">
            <label
              className="block text-[#2B4447] text-base font-medium mb-2"
              htmlFor="representativeInformationState"
            >
              State
            </label>
            <Select
              className="mt-[3px]"
              showSearch
              id="representativeInformationState"
              name="representativeInformationState"
              style={{ width: "100%", height: "48px" }}
              placeholder="Search to Select"
              options={stateOptions}
              onChange={(value) =>
                handleSelect(value, "representativeInformationState")
              }
              onBlur={handleBlur}
              value={values.representativeInformationState}
            />
            {errors.representativeInformationState &&
              touched.representativeInformationState && (
                <p className="mt-2 mb-2 text-red-500 text-xs font-normal ">
                  {errors.representativeInformationState}
                </p>
              )}
          </div>
          <div className="mb-4 w-full">
            <label
              className="block text-[#2B4447] text-base font-medium mb-2"
              htmlFor="representativeInformationMobile"
            >
              Mobile number
            </label>
            <input
              className="appearance-none border rounded-[6px] w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="representativeInformationMobile"
              type="text"
              placeholder="Enter Mobile Number"
              name="representativeInformationMobile"
              onKeyPress={(event) => {
                const allowedCharacters = /^[0-9+]*$/; // Regular expression to match only numbers
                if (!allowedCharacters.test(event.key)) {
                  event.preventDefault();
                }
              }}
              value={values.representativeInformationMobile}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.representativeInformationMobile &&
              touched.representativeInformationMobile && (
                <p className="mt-2 mb-2 text-red-500 text-xs font-normal ">
                  {errors.representativeInformationMobile}
                </p>
              )}
          </div>
        </div>
        <div className="mb-4 w-full">
          <label
            className="block text-[#2B4447] text-base font-medium mb-2"
            htmlFor="representativeInformationEmail"
          >
            Email ID
          </label>
          <input
            className="appearance-none border rounded-[6px] w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="representativeInformationEmail"
            type="text"
            placeholder="Enter valid email ID"
            name="representativeInformationEmail"
            value={values.representativeInformationEmail}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.representativeInformationEmail &&
            touched.representativeInformationEmail && (
              <p className="mt-2 mb-2 text-red-500 text-xs font-normal ">
                {errors.representativeInformationEmail}
              </p>
            )}
        </div>
        <div className="flex flex-wrap gap-2">
          {checkboxList.map((item) => {
            return (
              <div
                key={`${item}`}
                className=" gap-2 w-full green-checkbox flex justify-start items-center"
              >
                <div className="w-4 h-4 gre">
                  <input
                    className="w-4 h-4 relative text-blue-600 bg-gray-100 border-gray-300 rounded-full dark:bg-gray-700 dark:border-gray-600"
                    id={item}
                    type="radio"
                    checked={values.representativeInformationOwnership === item}
                    value={item}
                    onClick={handleChange}
                    name="representativeInformationOwnership"
                  />
                </div>
                <label
                  htmlFor={item}
                  className="ml-2 text-lg font-normal text-[#2B4447] "
                >
                  {item}
                </label>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default RepresentativeInformation;
