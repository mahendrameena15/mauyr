import React, { useState } from "react";
import { Link } from "react-router-dom";
function Subcategory() {
  const [isOpen, setIsOpen] = useState(false);
  const [Open, setOpen] = useState(false);
  const subCategoryDropdown = () => {
    setIsOpen(!isOpen);
  };
  const toggleCategory = () => {
    setOpen(!Open);
  };
  return (
    <>
      <div className="relative ">
        <div
          className="flex items-center gap-2 product-category-box"
          onClick={subCategoryDropdown}
        >
          <h5 className="text-base font-medium	text-gray">Sub-category</h5>
          <div className="">
            <img src="http://localhost:3001/assets/dropdownArrow.png" alt="" />
          </div>
        </div>
        {isOpen && (
          <div className=" z-10	left-0   w-max	 absolute product-dropdown bg-white	shadow-md rounded-lg	h-fit py-3	">
            <ul className="dropdown-content ">
              <li className="py-2.5	px-4	">
                <div className="flex items-center" onClick={toggleCategory}>
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
                    Alcoholic beverage
                  </label>
                </div>
                {Open && (
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
                          Beer
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
                          Wine{" "}
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
                          Spirirts{" "}
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
                          Cider{" "}
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
                          Pre-mixed{" "}
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
                          Other{" "}
                        </label>
                      </div>
                    </li>
                  </ul>
                )}
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
                    Non-alcoholic beverage
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
                    Equipment
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

export default Subcategory;
