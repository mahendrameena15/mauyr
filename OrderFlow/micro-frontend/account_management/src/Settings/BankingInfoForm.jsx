import React from "react";
import { useState } from "react";
import { Tooltip } from "antd";

const BankingInfoForm = ({
  handleChange,
  handleBlur,
  values,
  touched,
  errors,
  setValues,
}) => {
  return (
    <div className="border w-full border-[#E7E7E7] rounded-md  bg-white ">
      <div className="px-6 py-3 border-b border-[#E7E7E7]">
        <h5 className="text-base font-medium text-[#2B4447] mb-2">
          Banking information
        </h5>
        <p className="text-sm font-medium text-[#637381] leading-[20px]">
          Nominate your bank account for fund deposit.
        </p>
      </div>
      <div className="py-6 px-6">
        <div className="mb-4">
          <label
            className="block text-[#2B4447] text-base font-medium mb-2"
            htmlFor="bankingInformationBsb"
          >
            Bank State Branch (BSB) number
          </label>
          <input
            className="appearance-none border rounded-[6px] w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="bankingInformationBsb"
            type="text"
            placeholder="XXY-ZZZ"
            name="bankingInformationBsb"
            onKeyPress={(event) => {
              const allowedCharacters = /^[0-9]*$/; // Regular expression to match only numbers
              if (!allowedCharacters.test(event.key)) {
                event.preventDefault();
              }
            }}
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.bankingInformationBsb}
          />
          {errors.bankingInformationBsb && touched.bankingInformationBsb && (
            <p className="mt-2 mb-2 text-red-500 text-xs font-normal ">
              {errors.bankingInformationBsb}
            </p>
          )}
        </div>
        <div className="mb-4">
          <label
            className="block text-[#2B4447] text-base font-medium mb-2"
            htmlFor="bankingInformationAccountNumber"
          >
            Account number
          </label>
          <input
            className="appearance-none border rounded-[6px] w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="bankingInformationAccountNumber"
            type="text"
            placeholder="Enter Account Number"
            onChange={handleChange}
            onBlur={handleBlur}
            onKeyPress={(event) => {
              const allowedCharacters = /^[0-9]*$/; // Regular expression to match only numbers
              if (!allowedCharacters.test(event.key)) {
                event.preventDefault();
              }
            }}
            name="bankingInformationAccountNumber"
            value={values.bankingInformationAccountNumber}
          />
          {errors.bankingInformationAccountNumber &&
            touched.bankingInformationAccountNumber && (
              <p className="mt-2 mb-2 text-red-500 text-xs font-normal ">
                {errors.bankingInformationAccountNumber}
              </p>
            )}
        </div>
        <Tooltip
          color="#2B4447"
          title="You don't need to enter bank name. This field will auto populate when you will submit bank account details."
        >
          <div className="mb-4">
            <label
              className="block text-[#2B4447] text-base font-medium mb-2"
              htmlFor="bankingInformationBankName"
            >
              Bank Name
            </label>
            <input
              className="appearance-none border rounded-[6px] w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="bankingInformationBankName"
              type="text"
              disabled={true}
              placeholder="Bank Name"
              name="bankingInformationBankName"
              value={values.bankingInformationBankName}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.bankingInformationBankName &&
              touched.bankingInformationBankName && (
                <p className="mt-2 mb-2 text-red-500 text-xs font-normal ">
                  {errors.bankingInformationBankName}
                </p>
              )}
          </div>
        </Tooltip>
      </div>
    </div>
  );
};

export default BankingInfoForm;
