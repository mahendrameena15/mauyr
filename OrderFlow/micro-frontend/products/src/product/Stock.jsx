import React, { useState } from "react";
import { Link } from "react-router-dom";
function Stock() {
  const [isOpen, setIsOpen] = useState(false);
  const stockDropdown = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <div className="relative">
        <div
          className="flex items-center gap-2 product-category-box"
          onClick={stockDropdown}
        >
          <h5 className="text-base font-medium	text-gray">Stock</h5>
          <div className="">
            <img src="http://localhost:3001/assets/dropdownArrow.png" alt="" />
          </div>
        </div>
        {isOpen && (
          <div className=" z-10	left-0   w-60 absolute product-dropdown bg-white	shadow-md rounded-lg	h-fit py-3	">
            <ul className="dropdown-content 	 ">
              <li className="py-2.5	px-4	">
                <div className="flex items-center">
                  <div className="flex items-center gap-3 green-checkbox">
                    <input
                      defaultChecked=""
                      id="checked-checkbox"
                      type="checkbox"
                      defaultValue=""
                      className=""
                    />
                  </div>
                  <label
                    htmlFor="checked-checkbox"
                    className="ml-2 text-sm font-medium text-gray"
                  >
                    In stock
                  </label>
                </div>
              </li>

              <li className="py-2.5	px-4	">
                <div className="flex items-center">
                  <div className="flex items-center gap-3 green-checkbox">
                    <input
                      defaultChecked=""
                      id="checked-checkbox"
                      type="checkbox"
                      defaultValue=""
                      className=""
                    />
                  </div>
                  <label
                    htmlFor="checked-checkbox"
                    className="ml-2 text-sm font-medium text-gray"
                  >
                    Low stock
                  </label>
                </div>
              </li>

              <li className="py-2.5	px-4 	">
                <div className="flex items-center">
                  <div className="flex items-center gap-3 green-checkbox">
                    <input
                      defaultChecked=""
                      id="checked-checkbox"
                      type="checkbox"
                      defaultValue=""
                      className=""
                    />
                  </div>
                  <label
                    htmlFor="checked-checkbox"
                    className="ml-2 text-sm font-medium text-gray"
                  >
                    Out of stock
                  </label>
                </div>
              </li>
            </ul>
          </div>
        )}
      </div>
    </>
  );
}

export default Stock;
