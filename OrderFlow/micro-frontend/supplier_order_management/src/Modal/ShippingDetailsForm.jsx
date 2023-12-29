import React from "react";

const ShippingDetailsForm = ({
  checked,
  handleCheckboxChange,
  setSippingCharges,
  shippingcharges,
}) => {
  return (
    <>
      <div className="flex justify-between items-center mt-5">
        <h4 className="text-xl font-bold  text-[#2B4447]">
          Add Shipping Details
        </h4>
      </div>

      <div>
        <div className="flex justify-between items-center mt-5">
          <div className="md:w-[60%] w-full mb-5">
            <h5 className="text-lg font-semibold text-[#212B36] mt-3">
              Add shipping estimate as a separate line item during checkout.
            </h5>
            <p className="text-sm font-normal text-[#637381] mt-2">
              Turning this On will add the Shipping Estimate separately during
              checkout. Turning this Off will NOT add it as a separate line
              item.
            </p>
          </div>
          <div className="relative inline-block w-[50px] mr-2 align-middle select-none transition duration-200 ease-in bg-slate-200 border-solid rounded-full">
            <input
              type="checkbox"
              name="wetLiable"
              checked={checked}
              onChange={handleCheckboxChange}
              id="toggle"
              className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
            />
            <label
              for="toggle"
              className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
            ></label>
          </div>
        </div>
        {checked === true && (
          <div className="">
            <form>
              <div className="flex flex-col mb-5 w-[50%]">
                <label className="text-[#2B4447] text-base font-normal ">
                  Shipping Name
                </label>
                <input
                  type="text"
                  className="border border-[#E0E0E0] rounded-[8px] bg-[#F8F8F8] py-2 px-3"
                  value={shippingcharges?.name}
                  onChange={(e) =>
                    setSippingCharges((prev) => {
                      return { ...prev, name: e.target.value };
                    })
                  }
                />
              </div>
              <div className="flex flex-col mb-5 w-[50%]">
                <label className="text-[#2B4447] text-base font-normal ">
                  Price
                </label>
                <input
                  type="text"
                  className="border border-[#E0E0E0] rounded-[8px] bg-[#F8F8F8] py-2 px-3"
                  value={shippingcharges?.price}
                  onChange={(e) =>
                    setSippingCharges((prev) => {
                      return { ...prev, price: e.target.value };
                    })
                  }
                  onKeyPress={(event) => {
                    const allowedCharacters = /(\.[0-9])?$/; // Regular expression to match only numbers and '+'
                    if (!allowedCharacters.test(event.key)) {
                      event.preventDefault();
                    }
                  }}
                />
              </div>
            </form>
          </div>
        )}
      </div>
    </>
  );
};

export default ShippingDetailsForm;
