import React, { Fragment, useEffect, useState } from "react";
import { Combobox, Transition } from "@headlessui/react";

// import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
// import ComboBoxMultiSelect from './ComboBoxMultiSelect';
import Select from "react-select";
import {
  segment,
  subCategory,
  region,
  country,
  baseUnitOfMeasurement,
  innerUnitOfMeasurement,
  options,
} from "../data";

function AddProductDetails({ setValues, values }) {
  const mastersUrl = process.env.REACT_APP_MASTERS_API_URL
  const [department, setDepartment] = useState([]);
  const [category, setCategory] = useState([]);

  // Department
  const [selectedDepartment, setSelectedDepartment] = useState(department[0]);
  const [queryDepartment, setQuerydepartment] = useState("");

  // Category
  const [selectedCategory, setSelectedCategory] = useState(category[0]);
  const [queryCategory, setQueryCategory] = useState("");

  // Sub category
  const [selectedSubCategory, setSelectedSubCategory] = useState(
    subCategory[0]
  );
  const [querySubCategory, setQuerySubCategory] = useState("");

  // Segment
  const [selectedSegment, setSelectedSegment] = useState(segment[0]);
  const [querySegment, setQuerySegment] = useState("");

  // Region
  const [selectedRegion, setSelectedRegion] = useState(region[0]);
  const [queryRegion, setQueryRegion] = useState("");

  // Country
  const [selectedCountry, setSelectedCountry] = useState(country[0]);
  const [queryCountry, setQueryCountry] = useState("");

  //Base unit of measurement
  const [selectedBaseUnitOfMeasurement, setSelectedBaseUnitOfMeasurement] =
    useState(baseUnitOfMeasurement[0]);
  const [queryBaseUnitOfMeasurement, setQueryBaseUnitOfMeasurement] =
    useState("");

  //Inner unit of measurement
  const [selectedInnerUnitOfMeasurement, setSelectedInnerUnitOfMeasurement] =
    useState(innerUnitOfMeasurement[0]);
  const [queryInnerUnitOfMeasurement, setQueryInnerUnitOfMeasurement] =
    useState("");

  const filteredDepartment =
    queryDepartment === ""
      ? department
      : department.filter((dept) =>
          dept.departmentName
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(queryDepartment.toLowerCase().replace(/\s+/g, ""))
        );

  const filteredCategory =
    queryCategory === ""
      ? category
      : category.filter((ctgry) =>
          ctgry.name
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(queryCategory.toLowerCase().replace(/\s+/g, ""))
        );
  const filteredSubCategory =
    querySubCategory === ""
      ? subCategory
      : subCategory.filter((subctg) =>
          subctg.name
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(querySubCategory.toLowerCase().replace(/\s+/g, ""))
        );

  const filteredSegment =
    querySegment === ""
      ? segment
      : segment.filter((sgmnt) =>
          sgmnt.name
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(querySegment.toLowerCase().replace(/\s+/g, ""))
        );

  const filteredRegion =
    queryRegion === ""
      ? region
      : region.filter((rgn) =>
          rgn.name
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(queryRegion.toLowerCase().replace(/\s+/g, ""))
        );

  const filteredCountry =
    queryCountry === ""
      ? country
      : country.filter((cntry) =>
          cntry.name
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(queryCountry.toLowerCase().replace(/\s+/g, ""))
        );
  const filteredBaseUnitOfMeasurement =
    queryBaseUnitOfMeasurement === ""
      ? baseUnitOfMeasurement
      : baseUnitOfMeasurement.filter((BUOM) =>
          BUOM.name
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(
              queryBaseUnitOfMeasurement.toLowerCase().replace(/\s+/g, "")
            )
        );

  const filteredInnerUnitOfMeasurement =
    queryInnerUnitOfMeasurement === ""
      ? innerUnitOfMeasurement
      : innerUnitOfMeasurement.filter((IUOM) =>
          IUOM.name
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(
              queryInnerUnitOfMeasurement.toLowerCase().replace(/\s+/g, "")
            )
        );

  const handleTitle = (e) => {
    setValues({
      ...values,
      title: e.target.value,
    });
  };

  const handleSkuCode = (e) => {
    setValues({
      ...values,
      skuCode: e.target.value,
    });
  };

  const handleBrand = (e) => {
    setValues({
      ...values,
      brand: e.target.value,
    });
  };

  const handleDepartment = (e) => {
    setSelectedDepartment;
    setValues({
      ...values,
      department: e.target.value,
    });
  };

  const handleConfiguration = (e) => {
    setValues({
      ...values,
      configuration:
        selectedInnerUnitOfMeasurement.value *
        selectedBaseUnitOfMeasurement.value,
    });
  };

  useEffect(() => {
    fetch(`${mastersUrl}/api/Department/get`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        setDepartment(data.data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      <div className=" w-full  rounded-lg		 border border-inherit bg-white h-full	 grid	  ">
        <div className=" border-b	 border-inherit sm:px-5 sm:py-4 py-3 px-4">
          <h6 className="text-base	font-medium	 text-green">Product details</h6>
        </div>
        <div className="px-6 py-7">
          <form className="w-full ">
            <div className="flex flex-wrap -mx-3 mb-5">
              <div className="w-full relative px-3">
                <label
                  className="block  tracking-wide text-gray-700 text-base	 font-medium	 "
                  htmlFor="title"
                >
                  Title
                </label>
                <input
                  onChange={handleTitle}
                  className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded-md	 py-3 px-4  leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="title"
                  type="text"
                  name="title"
                  autoComplete="on"
                  placeholder="Enter Title"
                />
              </div>
            </div>
            {/* <ComboBoxMultiSelect/> */}
            <div className="flex flex-nowrap gap-5 lg:gap-0 -mx-3 mb-5">
              <div className="w-full relative px-3">
                <label
                  className="block  tracking-wide text-gray-700 text-base	 font-medium	 "
                  htmlFor="sku-code"
                >
                  SKU code
                </label>
                <input
                  onChange={handleSkuCode}
                  className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded-md	 py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="sku-code"
                  name="sku-code"
                  type="text"
                  placeholder="GOODINTCJCHARD22"
                />
              </div>
              <div className="w-full relative px-3">
                <label
                  className="block  tracking-wide text-gray-700 text-base	 font-medium	 "
                  htmlFor="brand"
                >
                  Brand
                </label>
                <input
                  onChange={handleBrand}
                  className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded-md	 py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="brand"
                  type="text"
                  name="brand"
                  placeholder="Lo-Fi Wines"
                />
              </div>
            </div>
            <div className="flex flex-nowrap gap-5 lg:gap-0 -mx-3 mb-5">
              <div className="  w-full relative px-3">
                <h5 className="text-base font-medium text-green mb-3">
                  Department
                </h5>
                <div className="fixed top-16 w-full">
                  <Combobox
                    value={selectedDepartment}
                    onChange={setSelectedDepartment}
                  >
                    <div className="relative mt-1">
                      <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left  focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
                        <Combobox.Input
                          className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
                          displayValue={(dept) => dept.departmentName}
                          onChange={(event) =>
                            setQuerydepartment(event.target.value)
                          }
                        />
                        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                          {/* <ChevronUpDownIcon
                                                className="h-5 w-5 text-gray-400"
                                                aria-hidden="true"
                                            /> */}
                          <ArrowDropDownIcon />
                        </Combobox.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                        afterLeave={() => setQuerydepartment("")}
                      >
                        <Combobox.Options className=" z-50 absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                          {filteredDepartment.length === 0 &&
                          queryDepartment !== "" ? (
                            <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                              Nothing found.
                            </div>
                          ) : (
                            filteredDepartment.map((dept) => (
                              <Combobox.Option
                                key={dept.departmentId}
                                className={({ active }) =>
                                  `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                    active
                                      ? "bg-teal-600 text-white"
                                      : "text-gray-900"
                                  }`
                                }
                                value={dept}
                              >
                                {({ selected, active }) => (
                                  <>
                                    <span
                                      className={`block truncate ${
                                        selected ? "font-medium" : "font-normal"
                                      }`}
                                    >
                                      {dept.departmentName}
                                    </span>
                                    {selected ? (
                                      <span
                                        className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                          active
                                            ? "text-white"
                                            : "text-teal-600"
                                        }`}
                                      >
                                        {/* <ArrowDropDownIcon/> */}
                                        {/* <CheckIcon className="h-5 w-5" aria-hidden="true" /> */}
                                      </span>
                                    ) : null}
                                  </>
                                )}
                              </Combobox.Option>
                            ))
                          )}
                        </Combobox.Options>
                      </Transition>
                    </div>
                  </Combobox>
                </div>
              </div>
              <div className="  w-full relative px-3">
                <h5 className="text-base font-medium text-green mb-3">
                  Category
                </h5>
                <div className="fixed top-16 w-full">
                  <Combobox
                    value={selectedCategory}
                    onChange={setSelectedCategory}
                  >
                    <div className="relative mt-1">
                      <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left  focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
                        <Combobox.Input
                          className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
                          displayValue={(ctgry) => ctgry.name}
                          onChange={(event) =>
                            setQueryCategory(event.target.value)
                          }
                        />
                        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                          {/* <ChevronUpDownIcon
                                                className="h-5 w-5 text-gray-400"
                                                aria-hidden="true"
                                            /> */}
                          <ArrowDropDownIcon />
                        </Combobox.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                        afterLeave={() => setQueryCategory("")}
                      >
                        <Combobox.Options className=" z-50 absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                          {filteredCategory.length === 0 &&
                          queryCategory !== "" ? (
                            <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                              Nothing found.
                            </div>
                          ) : (
                            filteredCategory.map((ctgry) => (
                              <Combobox.Option
                                key={ctgry.id}
                                className={({ active }) =>
                                  `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                    active
                                      ? "bg-teal-600 text-white"
                                      : "text-gray-900"
                                  }`
                                }
                                value={ctgry}
                              >
                                {({ selected, active }) => (
                                  <>
                                    <span
                                      className={`block truncate ${
                                        selected ? "font-medium" : "font-normal"
                                      }`}
                                    >
                                      {ctgry.name}
                                    </span>
                                    {selected ? (
                                      <span
                                        className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                          active
                                            ? "text-white"
                                            : "text-teal-600"
                                        }`}
                                      >
                                        {/* <ArrowDropDownIcon/> */}
                                        {/* <CheckIcon className="h-5 w-5" aria-hidden="true" /> */}
                                      </span>
                                    ) : null}
                                  </>
                                )}
                              </Combobox.Option>
                            ))
                          )}
                        </Combobox.Options>
                      </Transition>
                    </div>
                  </Combobox>
                </div>
              </div>
            </div>

            <div className="flex flex-nowrap gap-5 lg:gap-0 -mx-3 mb-5">
              <div className=" w-full relative px-3">
                <h5 className="text-base font-medium text-green mb-3">
                  Subcategory
                </h5>
                <div className="fixed top-16 w-full">
                  <Combobox
                    value={selectedSubCategory}
                    onChange={setSelectedSubCategory}
                  >
                    <div className="relative mt-1">
                      <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left  focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
                        <Combobox.Input
                          className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
                          displayValue={(subctg) => subctg.name}
                          onChange={(event) =>
                            setQuerySubCategory(event.target.value)
                          }
                        />
                        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                          {/* <ChevronUpDownIcon
                                                className="h-5 w-5 text-gray-400"
                                                aria-hidden="true"
                                            /> */}
                          <ArrowDropDownIcon />
                        </Combobox.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                        afterLeave={() => setQuerySubCategory("")}
                      >
                        <Combobox.Options className=" z-50 absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                          {filteredSubCategory.length === 0 &&
                          querySubCategory !== "" ? (
                            <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                              Nothing found.
                            </div>
                          ) : (
                            filteredSubCategory.map((subctg) => (
                              <Combobox.Option
                                key={subctg.id}
                                className={({ active }) =>
                                  `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                    active
                                      ? "bg-teal-600 text-white"
                                      : "text-gray-900"
                                  }`
                                }
                                value={subctg}
                              >
                                {({ selected, active }) => (
                                  <>
                                    <span
                                      className={`block truncate ${
                                        selected ? "font-medium" : "font-normal"
                                      }`}
                                    >
                                      {subctg.name}
                                    </span>
                                    {selected ? (
                                      <span
                                        className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                          active
                                            ? "text-white"
                                            : "text-teal-600"
                                        }`}
                                      >
                                        {/* <ArrowDropDownIcon/> */}
                                        {/* <CheckIcon className="h-5 w-5" aria-hidden="true" /> */}
                                      </span>
                                    ) : null}
                                  </>
                                )}
                              </Combobox.Option>
                            ))
                          )}
                        </Combobox.Options>
                      </Transition>
                    </div>
                  </Combobox>
                </div>
              </div>
              <div className="  w-full relative px-3">
                <h5 className="text-base font-medium text-green mb-3">
                  Segment
                </h5>
                <div className="fixed top-16 w-full">
                  <Combobox
                    value={selectedSegment}
                    onChange={setSelectedSegment}
                  >
                    <div className="relative mt-1">
                      <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left  focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
                        <Combobox.Input
                          className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
                          displayValue={(sgmnt) => sgmnt.name}
                          onChange={(event) =>
                            setQuerySegment(event.target.value)
                          }
                        />
                        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                          {/* <ChevronUpDownIcon
                                                className="h-5 w-5 text-gray-400"
                                                aria-hidden="true"
                                            /> */}
                          <ArrowDropDownIcon />
                        </Combobox.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                        afterLeave={() => setQuerySegment("")}
                      >
                        <Combobox.Options className=" z-50 absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                          {filteredSegment.length === 0 &&
                          querySegment !== "" ? (
                            <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                              Nothing found.
                            </div>
                          ) : (
                            filteredSegment.map((sgmnt) => (
                              <Combobox.Option
                                key={sgmnt.id}
                                className={({ active }) =>
                                  `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                    active
                                      ? "bg-teal-600 text-white"
                                      : "text-gray-900"
                                  }`
                                }
                                value={sgmnt}
                              >
                                {({ selected, active }) => (
                                  <>
                                    <span
                                      className={`block truncate ${
                                        selected ? "font-medium" : "font-normal"
                                      }`}
                                    >
                                      {sgmnt.name}
                                    </span>
                                    {selected ? (
                                      <span
                                        className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                          active
                                            ? "text-white"
                                            : "text-teal-600"
                                        }`}
                                      >
                                        {/* <ArrowDropDownIcon/> */}
                                        {/* <CheckIcon className="h-5 w-5" aria-hidden="true" /> */}
                                      </span>
                                    ) : null}
                                  </>
                                )}
                              </Combobox.Option>
                            ))
                          )}
                        </Combobox.Options>
                      </Transition>
                    </div>
                  </Combobox>
                </div>
              </div>
            </div>
            <div className="flex flex-nowrap gap-5 lg:gap-0 -mx-3 mb-5">
              <div className=" w-full relative px-3">
                <h5 className="text-base font-medium text-green mb-3">
                  Grape variety
                </h5>
                <div className="fixed top-16 w-full">
                  <Select
                    defaultValue={[options[2], options[3]]}
                    isMulti
                    name="colors"
                    options={options}
                    className="basic-multi-select "
                    classNamePrefix="select"
                  />
                </div>
              </div>
              <div className="  w-full relative px-3">
                <h5 className="text-base font-medium text-green mb-3">
                  Region
                </h5>
                <div className="fixed top-16 w-full">
                  <Combobox value={selectedRegion} onChange={setSelectedRegion}>
                    <div className="relative mt-1">
                      <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left  focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
                        <Combobox.Input
                          className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
                          displayValue={(rgn) => rgn.name}
                          onChange={(event) =>
                            setQueryRegion(event.target.value)
                          }
                        />
                        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                          {/* <ChevronUpDownIcon
                                                className="h-5 w-5 text-gray-400"
                                                aria-hidden="true"
                                            /> */}
                          <ArrowDropDownIcon />
                        </Combobox.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                        afterLeave={() => setQueryRegion("")}
                      >
                        <Combobox.Options className=" z-50 absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                          {filteredRegion.length === 0 && queryRegion !== "" ? (
                            <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                              Nothing found.
                            </div>
                          ) : (
                            filteredRegion.map((rgn) => (
                              <Combobox.Option
                                key={rgn.id}
                                className={({ active }) =>
                                  `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                    active
                                      ? "bg-teal-600 text-white"
                                      : "text-gray-900"
                                  }`
                                }
                                value={rgn}
                              >
                                {({ selected, active }) => (
                                  <>
                                    <span
                                      className={`block truncate ${
                                        selected ? "font-medium" : "font-normal"
                                      }`}
                                    >
                                      {rgn.name}
                                    </span>
                                    {selected ? (
                                      <span
                                        className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                          active
                                            ? "text-white"
                                            : "text-teal-600"
                                        }`}
                                      >
                                        {/* <ArrowDropDownIcon/> */}
                                        {/* <CheckIcon className="h-5 w-5" aria-hidden="true" /> */}
                                      </span>
                                    ) : null}
                                  </>
                                )}
                              </Combobox.Option>
                            ))
                          )}
                        </Combobox.Options>
                      </Transition>
                    </div>
                  </Combobox>
                </div>
              </div>
            </div>
            <div className="flex flex-nowrap gap-5 lg:gap-0 -mx-3 mb-5">
              <div className="w-full relative px-3">
                <label
                  className="block  tracking-wide text-gray-700 text-base	 font-medium	 "
                  htmlFor="grid-last-name"
                >
                  Vintage
                </label>
                <input
                  className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded-md	 py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-last-name"
                  name="firstName"
                  type="text"
                  placeholder="2004"
                />
              </div>
              <div className="w-full relative px-3">
                <label
                  className="block  tracking-wide text-gray-700 text-base	 font-medium	 "
                  htmlFor="grid-last-name"
                >
                  Awards
                </label>
                <input
                  className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded-md	 py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-last-name"
                  name="firstName"
                  type="text"
                  placeholder="WS 93"
                />
              </div>
            </div>
            <div className="flex flex-nowrap gap-5 lg:gap-0 -mx-3 mb-5">
              <div className=" w-full relative px-3">
                <h5 className="text-base font-medium text-green mb-3">
                  Country
                </h5>
                <div className="fixed top-16 w-full">
                  <Combobox
                    value={selectedCountry}
                    onChange={setSelectedCountry}
                  >
                    <div className="relative mt-1">
                      <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left  focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
                        <Combobox.Input
                          className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
                          displayValue={(cntry) => cntry.name}
                          onChange={(event) =>
                            setQueryCountry(event.target.value)
                          }
                        />
                        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                          {/* <ChevronUpDownIcon
                                                className="h-5 w-5 text-gray-400"
                                                aria-hidden="true"
                                            /> */}
                          <ArrowDropDownIcon />
                        </Combobox.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                        afterLeave={() => setQueryCountry("")}
                      >
                        <Combobox.Options className=" z-50 absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                          {filteredCountry.length === 0 &&
                          queryCountry !== "" ? (
                            <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                              Nothing found.
                            </div>
                          ) : (
                            filteredCountry.map((cntry) => (
                              <Combobox.Option
                                key={cntry.id}
                                className={({ active }) =>
                                  `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                    active
                                      ? "bg-teal-600 text-white"
                                      : "text-gray-900"
                                  }`
                                }
                                value={cntry}
                              >
                                {({ selected, active }) => (
                                  <>
                                    <span
                                      className={`block truncate ${
                                        selected ? "font-medium" : "font-normal"
                                      }`}
                                    >
                                      {cntry.name}
                                    </span>
                                    {selected ? (
                                      <span
                                        className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                          active
                                            ? "text-white"
                                            : "text-teal-600"
                                        }`}
                                      >
                                        {/* <ArrowDropDownIcon/> */}
                                        {/* <CheckIcon className="h-5 w-5" aria-hidden="true" /> */}
                                      </span>
                                    ) : null}
                                  </>
                                )}
                              </Combobox.Option>
                            ))
                          )}
                        </Combobox.Options>
                      </Transition>
                    </div>
                  </Combobox>
                </div>
              </div>
              <div className="w-full relative px-3">
                <label
                  className="block  tracking-wide text-gray-700 text-base	 font-medium	 "
                  htmlFor="grid-last-name"
                >
                  ABV
                </label>
                <input
                  className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded-md	 py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-last-name"
                  name="firstName"
                  type="text"
                  placeholder="15%"
                />
              </div>
            </div>

            <div className="flex flex-nowrap gap-5 lg:gap-0 -mx-3 mb-5">
              <div className="  w-full relative  px-3">
                <h5 className="text-base font-medium text-green mb-3">
                  Base unit of measure
                </h5>
                <div className="fixed top-16 w-full">
                  <Combobox
                    value={selectedBaseUnitOfMeasurement}
                    onChange={setSelectedBaseUnitOfMeasurement}
                  >
                    <div className="relative mt-1">
                      <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left  focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
                        <Combobox.Input
                          className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
                          displayValue={(BUOM) => BUOM.name}
                          onChange={(event) =>
                            setQueryBaseUnitOfMeasurement(event.target.value)
                          }
                        />
                        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                          {/* <ChevronUpDownIcon
                                                className="h-5 w-5 text-gray-400"
                                                aria-hidden="true"
                                            /> */}
                          <ArrowDropDownIcon />
                        </Combobox.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                        afterLeave={() => setQueryBaseUnitOfMeasurement("")}
                      >
                        <Combobox.Options className=" z-50 absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                          {filteredBaseUnitOfMeasurement.length === 0 &&
                          queryBaseUnitOfMeasurement !== "" ? (
                            <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                              Nothing found.
                            </div>
                          ) : (
                            filteredBaseUnitOfMeasurement.map((BUOM) => (
                              <Combobox.Option
                                key={BUOM.value}
                                className={({ active }) =>
                                  `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                    active
                                      ? "bg-teal-600 text-white"
                                      : "text-gray-900"
                                  }`
                                }
                                value={BUOM}
                              >
                                {({ selected, active }) => (
                                  <>
                                    <span
                                      className={`block truncate ${
                                        selected ? "font-medium" : "font-normal"
                                      }`}
                                    >
                                      {BUOM.name}
                                    </span>
                                    {selected ? (
                                      <span
                                        className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                          active
                                            ? "text-white"
                                            : "text-teal-600"
                                        }`}
                                      >
                                        {/* <ArrowDropDownIcon/> */}
                                        {/* <CheckIcon className="h-5 w-5" aria-hidden="true" /> */}
                                      </span>
                                    ) : null}
                                  </>
                                )}
                              </Combobox.Option>
                            ))
                          )}
                        </Combobox.Options>
                      </Transition>
                    </div>
                  </Combobox>
                </div>
              </div>
              <div className="  w-full relative  px-3">
                <h5 className="text-base font-medium text-green mb-3">
                  Inner unit of measure
                </h5>
                <div className="fixed top-16 w-full">
                  <Combobox
                    value={selectedInnerUnitOfMeasurement}
                    onChange={setSelectedInnerUnitOfMeasurement}
                  >
                    <div className="relative mt-1">
                      <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left  focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
                        <Combobox.Input
                          className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
                          displayValue={(IUOM) => IUOM.name}
                          onChange={(event) =>
                            setQueryInnerUnitOfMeasurement(event.target.value)
                          }
                        />
                        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                          {/* <ChevronUpDownIcon
                                                className="h-5 w-5 text-gray-400"
                                                aria-hidden="true"
                                            /> */}
                          <ArrowDropDownIcon />
                        </Combobox.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                        afterLeave={() => setQueryInnerUnitOfMeasurement("")}
                      >
                        <Combobox.Options className=" z-50 absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                          {filteredInnerUnitOfMeasurement.length === 0 &&
                          queryInnerUnitOfMeasurement !== "" ? (
                            <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                              Nothing found.
                            </div>
                          ) : (
                            filteredInnerUnitOfMeasurement.map(
                              (IUOM, index) => (
                                <Combobox.Option
                                  key={IUOM.index}
                                  className={({ active }) =>
                                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                      active
                                        ? "bg-teal-600 text-white"
                                        : "text-gray-900"
                                    }`
                                  }
                                  value={IUOM}
                                >
                                  {({ selected, active }) => (
                                    <>
                                      <span
                                        className={`block truncate ${
                                          selected
                                            ? "font-medium"
                                            : "font-normal"
                                        }`}
                                      >
                                        {IUOM.name}
                                      </span>
                                      {selected ? (
                                        <span
                                          className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                            active
                                              ? "text-white"
                                              : "text-teal-600"
                                          }`}
                                        >
                                          {/* <ArrowDropDownIcon/> */}
                                          {/* <CheckIcon className="h-5 w-5" aria-hidden="true" /> */}
                                        </span>
                                      ) : null}
                                    </>
                                  )}
                                </Combobox.Option>
                              )
                            )
                          )}
                        </Combobox.Options>
                      </Transition>
                    </div>
                  </Combobox>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-5">
              <div className="w-full relative px-3">
                <label
                  className="block  tracking-wide text-gray-700 text-base	 font-medium	 "
                  htmlFor="grid-password"
                >
                  Configuration (ordering unit of measure)
                </label>
                <input
                  className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded-md	 py-3 px-4     leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-password"
                  type="text"
                  name="mobile"
                  disabled
                  value={`${selectedInnerUnitOfMeasurement.value} x ${selectedBaseUnitOfMeasurement.name}`}
                  onChange={handleConfiguration}
                  placeholder={`${selectedInnerUnitOfMeasurement.value} x ${selectedBaseUnitOfMeasurement.name}`}
                />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-5">
              <div className="w-full px-3">
                <label
                  htmlFor="message"
                  className="block mb-2 text-base	 font-medium text-gray-700 dark:text-white"
                >
                  Description
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className="block p-2.5 w-full text-sm text-gray-900  rounded-md	 border border-gray-200 focus:outline-none focus:bg-white focus:border-gray-500 "
                  placeholder="Leave a comment..."
                  defaultValue={""}
                />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-5">
              <div className="w-full relative px-3">
                <label
                  className="block  tracking-wide text-gray-700 text-base	 font-medium	 "
                  htmlFor="grid-password"
                >
                  Tags
                </label>
                <div className="fixed top-16 w-full">
                  <Select
                    defaultValue={[options[2], options[3]]}
                    isMulti
                    name="colors"
                    options={options}
                    className="basic-multi-select "
                    classNamePrefix="select"
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default AddProductDetails;
