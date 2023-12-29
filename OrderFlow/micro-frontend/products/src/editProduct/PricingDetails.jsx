import React from "react";

function PricingDetails() {
  return (
    <>
      <div className="  w-full  rounded-lg		 border border-inherit bg-white h-full	 grid	  ">
        <div className=" border-b	 border-inherit sm:px-5 sm:py-4 py-3 px-4">
          <h6 className="text-base	font-medium	 text-green">Pricing details</h6>
        </div>
        <div className="px-6 py-7">
          <form className="w-full ">
            <div className="flex flex-wrap gap-5 lg:gap-0 -mx-3 mb-5">
              <div className="w-full relative md:w-1/2 px-3">
                <label
                  className="block  tracking-wide text-gray-700 text-base	 font-medium	 "
                  htmlFor="grid-last-name"
                >
                  Sale price exc. GST
                </label>
                <input
                  className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded-md	 py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-last-name"
                  name="firstName"
                  type="text"
                  placeholder="Enter Price"
                />
              </div>
              <div className="w-full relative md:w-1/2 px-3">
                <label
                  className="block  tracking-wide text-gray-700 text-base	 font-medium	 "
                  htmlFor="grid-last-name"
                >
                  Buy price
                </label>
                <input
                  className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded-md	 py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-last-name"
                  type="text"
                  name="lastName"
                  placeholder="$250.00"
                />
              </div>
            </div>
            <div className="mb-5">
              <div className="flex flex-wrap gap-5 lg:gap-0 -mx-3 mb-3">
                <div className="w-full relative md:w-1/2 px-3">
                  <label
                    className="block  tracking-wide text-gray-700 text-base	 font-medium	 "
                    htmlFor="grid-last-name"
                  >
                    Profit
                  </label>
                  <input
                    className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded-md	 py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-last-name"
                    name="firstName"
                    type="text"
                    placeholder="$80.00"
                  />
                </div>
                <div className="w-full relative md:w-1/2 px-3">
                  <label
                    className="block  tracking-wide text-gray-700 text-base	 font-medium	 "
                    htmlFor="grid-last-name"
                  >
                    Margin
                  </label>
                  <input
                    className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded-md	 py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-last-name"
                    type="text"
                    name="lastName"
                    placeholder="24.2%"
                  />
                </div>
              </div>
              <p className="text-center text-xs font-normal	text-gray">
                Customers won’t see this
              </p>
            </div>
            <div className="  mb-5">
              <h5 className="text-base font-medium text-green mb-3">Tax</h5>
              <div className="flex items-center mb-4 gap-3">
                <input
                  id="default-checkbox"
                  type="checkbox"
                  defaultValue=""
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded  dark:ring-offset-gray-800  dark:border-gray-600"
                />
                <label
                  htmlFor="default-checkbox"
                  className="ml-2  dark:text-gray-300"
                >
                  <p className="text-sm	 font-medium text-gray">
                    GST applicable
                  </p>
                </label>
              </div>
              <div className="flex items-center mb-4 gap-3">
                <input
                  defaultChecked=""
                  id="checked-checkbox"
                  type="checkbox"
                  defaultValue=""
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded  dark:ring-offset-gray-800  dark:border-gray-600"
                />
                <label
                  htmlFor="checked-checkbox"
                  className="ml-2  dark:text-gray-300"
                >
                  <p className="text-sm	 font-medium text-gray">
                    WET applicable
                  </p>
                </label>
              </div>
            </div>
            <div className="mb-5">
              <div className="flex flex-wrap gap-5 lg:gap-0 -mx-3 mb-3">
                <div className="w-full relative md:w-1/2 px-3">
                  <label
                    className="block  tracking-wide text-gray-700 text-base	 font-medium	 "
                    htmlFor="grid-last-name"
                  >
                    Wine equalisation tax
                  </label>
                  <input
                    className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded-md	 py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-last-name"
                    name="firstName"
                    type="text"
                    placeholder="$105.27"
                  />
                </div>
                <div className="w-full relative md:w-1/2 px-3">
                  <label
                    className="block  tracking-wide text-gray-700 text-base	 font-medium	 "
                    htmlFor="grid-last-name"
                  >
                    Landed unit cost
                  </label>
                  <input
                    className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded-md	 py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-last-name"
                    type="text"
                    name="lastName"
                    placeholder="$224.73"
                  />
                </div>
              </div>
              <p className="text-center text-xs font-normal	text-gray">
                Customers won’t see this
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default PricingDetails;
