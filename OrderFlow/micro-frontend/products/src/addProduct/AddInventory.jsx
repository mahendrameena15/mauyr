import React, { Fragment, useState } from "react";

import { Combobox, Transition } from "@headlessui/react";
// import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

function AddInventory({ setValues, values }) {
  const people = [
    { id: 1, name: "Wade Cooper" },
    { id: 2, name: "Arlene Mccoy" },
    { id: 3, name: "Devon Webb" },
    { id: 4, name: "Tom Cook" },
    { id: 5, name: "Tanya Fox" },
    { id: 6, name: "Hellen Schmidt" },
  ];
  const [selected, setSelected] = useState(people[0]);
  const [query, setQuery] = useState("");

  const filteredPeople =
    query === ""
      ? people
      : people.filter((person) =>
          person.name
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        );

  const handleMinimumOrderQuantity = (e) => {
    setValues({
      ...values,
      minimumOrder: e.target.value,
    });
  };

  const handleTrackInventory = () => {
    setValues({
      ...values,
      trackInventory: !values.trackInventory,
    });
  };

  const handleStockAlertLevel = (e) => {
    setValues({
      ...values,
      stockAlertLevel: e.target.value,
    });
  };

  const handleSellOutOfStock = () => {
    setValues({
      ...values,
      sellOutOfStock: !values.sellOutOfStock,
    });
  };

  return (
    <>
      <div className="rounded-lg	border border-inherit	bg-white">
        <div className="border-b border-inherit  py-3 px-5">
          <h5 className="font-medium	text-lg	text-green"> Inventory </h5>
        </div>
        <div className="p-5">
          <div className=" pb-5">
            <h5 className="text-base font-medium text-green mb-3">
              Minimum order quantity
            </h5>
            <div className="fixed top-16 w-72">
              <input
                onChange={handleMinimumOrderQuantity}
                className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded-md	 py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-last-name"
                name="firstName"
                type="number"
                placeholder="0 cases"
              />
            </div>
          </div>
          <div className="pb-5">
            <div className=" flex justify-between items-center mb-3">
              <h5 className="text-green text-base font-medium">
                Track inventory
              </h5>
              <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in bg-slate-200 border-solid	rounded-full	">
                <input
                  onChange={handleTrackInventory}
                  type="checkbox"
                  name="track-inventory"
                  id="track-inventory"
                  className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                />
                <label
                  for="track-inventory"
                  className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
                ></label>
              </div>
            </div>
            <p className="text-gray text-sm font-normal	">
              Keep track of inventory to receive notifications when products are
              low or out of stock
            </p>
          </div>
          <div className=" pb-5">
            <div className=" pb-5">
              <h5 className="text-base font-medium text-green mb-3">
                Stock alert level
              </h5>
              <div className="fixed top-16 w-72">
                <input
                  onChange={handleStockAlertLevel}
                  className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded-md	 py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="stock-alert-level"
                  name="stock-alert-level"
                  type="number"
                  placeholder="Select"
                />
              </div>
            </div>
          </div>
          <div className="pb-5">
            <div className=" flex justify-between items-center mb-3">
              <h5 className="text-green text-base font-medium">
                Sell when out of stack
              </h5>
              <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in bg-slate-200 border-solid	rounded-full	">
                <input
                  onChange={handleSellOutOfStock}
                  type="checkbox"
                  name="SellOutOfStock"
                  id="SellOutOfStock"
                  className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                />
                <label
                  for="SellOutOfStock"
                  className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
                ></label>
              </div>
            </div>
            <p className="text-gray text-sm font-normal	">
              If not selected, customers can still view the product but won’t be
              able to add to cart
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddInventory;
