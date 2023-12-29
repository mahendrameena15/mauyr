import React from "react";

function ProductListing() {
  return (
    <>
      <div className="rounded-lg	border border-inherit	bg-white">
        <div className="border-b border-inherit  py-3 px-5">
          <h5 className="font-medium	text-lg	text-green"> Status </h5>
        </div>
        <div className="p-5">
          <div className="">
            <h5 className="text-base font-medium text-green mb-3">Status</h5>
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
                <p className="text-sm	 font-medium text-gray">Active</p>
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
                <p className="text-sm	 font-medium text-gray">Inactive</p>
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
                <p className="text-sm	 font-medium text-gray">Archived</p>
              </label>
            </div>
          </div>
          <div className="pb-5">
            <h5 className="text-base font-medium text-green mb-2">
              Product Visibility
            </h5>
            <p className="text-gray text-sm font-normal	">
              Set globally whether this product is shown to customers or not
            </p>
          </div>
          <div className="pb-4 flex justify-between items-center">
            <h5 className="text-green text-base font-medium">
              Visible to customers
            </h5>
            <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in bg-slate-200 border-solid	rounded-full	">
              <input
                type="checkbox"
                name="toggle"
                id="toggle"
                className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
              />
              <label
                for="toggle"
                className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
              ></label>
            </div>
          </div>
          <div className="">
            <h5 className="text-base font-medium text-green mb-3">
              Region availability
            </h5>
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
                <p className="text-sm	 font-medium text-gray">NSW</p>
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
                <p className="text-sm	 font-medium text-gray">VIC</p>
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
                <p className="text-sm	 font-medium text-gray">QLD</p>
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
                <p className="text-sm	 font-medium text-gray">WA</p>
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
                <p className="text-sm	 font-medium text-gray">SA</p>
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
                <p className="text-sm	 font-medium text-gray">TAS</p>
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
                <p className="text-sm	 font-medium text-gray">ACT</p>
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
                <p className="text-sm	 font-medium text-gray">NT</p>
              </label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductListing;
