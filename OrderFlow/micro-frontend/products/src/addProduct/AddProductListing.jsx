import React, { useState } from "react";

function AddProductListing({ setValues, values }) {
  const [selectedState, setSelectedState] = useState("");

  const status = ["Active", "Inactive", "Archived"];

  const regionAvailability = [
    "NSW",
    "VIC",
    "QLD",
    "WA",
    "SA",
    "TAS",
    "ACT",
    "NT",
  ];

  // Product Availability
  const handleChange = () => {
    setValues({
      ...values,
      visibility: !values.visibility,
    });
  };

  // Region Availability
  const handleRegionAvailability = (e) => {
    if (e.target.checked) {
      if (!values.region.includes(e.target.value)) {
        setValues({
          ...values,
          region: [...values.region, e.target.value],
        });
      }
    } else {
      setValues({
        ...values,
        region: values.region.filter((region) => region !== e.target.value),
      });
    }
  };

  // status
  const handleStateSelection = (event) => {
    setSelectedState(event.target.value);
    setValues({
      ...values,
      status: event.target.value,
    });
  };

  return (
    <>
      <div className="rounded-lg	border border-inherit	bg-white">
        <div className="border-b border-inherit  py-3 px-5">
          <h5 className="font-medium	text-lg	text-green"> Product listing </h5>
        </div>
        <div className="p-5">
          <div className="">
            <h5 className="text-base font-medium text-green mb-3">Status</h5>
            {status.map((state, index) => (
              <div key={index} className="flex items-center mb-4 gap-3">
                <input
                  id={state}
                  onChange={handleStateSelection}
                  type="checkbox"
                  value={state}
                  name={state}
                  checked={selectedState === state}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded  dark:ring-offset-gray-800  dark:border-gray-600"
                />
                <label htmlFor={state} className="ml-2  dark:text-gray-300">
                  <p className="text-sm	 font-medium text-gray">{state}</p>
                </label>
              </div>
            ))}
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

            <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in bg-slate-200 border-solid rounded-full">
              <input
                onChange={handleChange}
                type="checkbox"
                name="availability"
                id="toggle"
                className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
              />
              <label
                htmlFor="toggle"
                className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
              ></label>
            </div>
          </div>
          <div className="">
            <h5 className="text-base font-medium text-green mb-3">
              Region availability
            </h5>
            {regionAvailability.map((region, index) => (
              <div key={index} className="flex items-center mb-4 gap-3">
                <input
                  onChange={handleRegionAvailability}
                  id={region}
                  type="checkbox"
                  value={region}
                  name={region}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded  dark:ring-offset-gray-800  dark:border-gray-600"
                />
                <label htmlFor={region} className="ml-2  dark:text-gray-300">
                  <p className="text-sm	 font-medium text-gray">{region}</p>
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default AddProductListing;
