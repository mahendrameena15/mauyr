import React, { useEffect, useRef } from "react";
import FilterCustomer from "./SortCustomer";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import Select from "react-select";
import { useQuery } from "react-query";
import { getStates } from "../reactQuery/customerListingApiModule";

let filterAndSort = {
  filter: {
    businessName: "",
    status: "",
    postCode: "",
    state: [],
    page: 1,
  },
  sort: {
    sortBy: "",
    sortOrder: "asc",
  },
};

function SearchCustomer({
  products,
  setProducts,
  prevProducts,
  setTotalPages,
  pageIndex,
  setPageIndex,
  setisSearchResult,
  setLoading,
  setActiveData,
}) {
  const customerUrl = process.env.REACT_APP_CUSTOMER_URL
  const status = [
    { label: "Active", value: "1" },
    { label: "Inactive", value: "0" },
  ];
  const [First, setFirst] = useState(false);
  const [Second, setSecond] = useState(false);
  const [Third, setThird] = useState(false);
  const [pincode, setPinCode] = React.useState("");
  const [search, setSearch] = React.useState(0);

  const [isActiveChecked, setIsActiveChecked] = React.useState(false);
  const [isInactiveChecked, setIsInactiveChecked] = React.useState(true);
  const [itemLabel, setItemLabel] = useState("");
  const [isFilter, setIsFilter] = useState(false);
  const [selectedState, setSelectedState] = useState([]);
  const dropdownRef = useRef(null);
  const { Option } = Select;
  const [statusSelected, setStatusSelected] = useState(false);

  const { data: State } = useQuery("getStates", getStates);

  const handleSortChange = (sortBy, sortOrder) => {
    // Handling pagination
    const newFilter = {
      ...filterAndSort.filter,
      page: pageIndex,
    };

    filterAndSort = {
      ...filterAndSort,
      filter: newFilter,
    };

    setItemLabel(sortBy);

    filterAndSort = {
      ...filterAndSort,
      sort: {
        sortBy: sortBy,
        sortOrder: sortOrder,
      },
    };

    processChange("filterAndSort");
  };

  const addState = (value) => {
    setSelectedState(value);
    const newState = value.map((item) => item.value);
    const updatedFilter = {
      ...filterAndSort.filter,
      state: newState,
      page: 1,
    };

    setPageIndex(1);

    filterAndSort = {
      ...filterAndSort,
      filter: updatedFilter,
    };

    processChange("filterAndSort");
  };

  const DropDownFirst = () => {
    setFirst(true);
    setSecond(false);
    setThird(false);
  };

  const DropDownSecond = () => {
    setFirst(false);
    setSecond(!Second);
    setThird(false);
  };

  const DropDownThird = () => {
    setFirst(false);
    setSecond(false);
    setThird(!Third);
  };

  const filterClick = () => {
    isFilter(filterAndSort);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "text":
        const updatedFilter1 = {
          ...filterAndSort.filter,
          businessName: value,
          page: 1,
        };

        setPageIndex(1);

        filterAndSort = {
          ...filterAndSort,
          filter: updatedFilter1,
        };

        break;
      case "pincode":
        const updatedFilter = {
          ...filterAndSort.filter,
          postCode: value,
          page: 1,
        };

        setPageIndex(1);

        filterAndSort = {
          ...filterAndSort,
          filter: updatedFilter,
        };
        setPinCode(value);
      default:
        break;
    }
  };
  useEffect(() => {
    const newFilter = {
      ...filterAndSort.filter,
      page: pageIndex,
    };
    filterAndSort = {
      ...filterAndSort,
      filter: newFilter,
    };
    processChange("filterAndSort");
  }, [pageIndex]);

  const toggleCategory = (e, value, category) => {
    const checked = e.target.checked;
    const newStatus = checked ? value : "";
    setStatusSelected(newStatus);

    const updatedFilter = {
      ...filterAndSort.filter,
      status: newStatus,
      page: 1,
    };
    setPageIndex(1);
    filterAndSort = {
      ...filterAndSort,
      filter: updatedFilter,
    };
    processChange("filterAndSort");
  };

  function debounce(func, timeout = 1000) {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func.apply(this, args);
      }, timeout);
    };
  }

  const processChange = debounce((name) => saveInput(name));

  const saveInput = (name) => {
    const orgID = localStorage.getItem("organisationId");
    if (name === "filterAndSort") {
      setLoading(true);
      fetch(
        `${customerUrl}/api/Customer/Filter?OrganisationId=${orgID}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(filterAndSort),
        }
      )
        .then((response) => response.json())
        .then((data) => {
          setActiveData(data.activeCustomer);
          if (data?.data?.length > 0) {
            setTotalPages(data.last_page);
            setPageIndex(data.page);
            setProducts(data.data);
            setSearch(data.data.length);
            setisSearchResult(true);

            setLoading(false);
          } else {
            setisSearchResult(false);
            setTotalPages(0);
          }
        })
        .catch((error) => console.log(error));
    } else {
      let search = filterAndSort?.filter?.businessName;
      const orgID = localStorage.getItem("organisationId");
      fetch(
        `${customerUrl}/api/Customer/SearchByName?search=${search}&page=${pageIndex}&OrganisationId=${orgID}`,
        {
          method: "GET",
        }
      )
        .then((respose) => respose.json())
        .then((data) => {
          if (search) {
            setTotalPages(data.total);
            setisSearchResult(true);
            setProducts(data.data);
          } else {
            setisSearchResult(false);
            setProducts(prevProducts);
          }
        });
    }
  };
  const handleInputChange1 = (e) => {
    const { name, value } = e.target;
    if (value?.length > 0) {
      setPinCode(value);
      saveInput("filterAndSort");
    } else {
      setProducts(prevProducts);
    }
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        const dropdowns = document.querySelectorAll(".product-dropdown");
        let isInsideDropdown = false;

        for (const dropdown of dropdowns) {
          if (dropdown.contains(event.target)) {
            isInsideDropdown = true;
            break;
          }
        }

        if (!isInsideDropdown) {
          setFirst(false);
          setSecond(false);
          setThird(false);
        }
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  const handleClearFilter = () => {
    setPageIndex(1);
    setFirst(false);
    setSecond(false);
    setThird(false);
    filterAndSort = {
      ...filterAndSort,
      filter: {
        businessName: "",
        status: "",
        postCode: "",
        state: [],
        page: 1,
      },
    };
    setSelectedState([]);
    setStatusSelected(false);
    setPinCode("");
    processChange("filterAndSort");
    setIsFilter(false);
  };

  const handleClearSort = () => {
    setPageIndex(1);
    filterAndSort = {
      ...filterAndSort,
      sort: {
        sortBy: "",
        sortOrder: "",
      },
    };
    processChange("filterAndSort");
  };

  useEffect(() => {
    filterAndSort = {
      filter: {
        businessName: "",
        status: "",
        postCode: "",
        state: [],
        page: 1,
      },
      sort: {
        sortBy: "",
        sortOrder: "asc",
      },
    };
  }, []);

  const handlecut = () => {
    filterAndSort.filter.postCode = "";
    setPinCode("");
    saveInput("filterAndSort");
    setThird(false);
  };

  return (
    <>
      <div
        ref={dropdownRef}
        className=" border border-inherit bg-white h-full py-3	 px-4"
      >
        <div className=" rounded-md gap-3	  sm:flex grid sm:justify-between items-center ">
          <div>
            <div className="relative 	">
              <div
                className="absolute inset-y-0  flex items-center pr-1 pointer-events-none"
                style={{ right: "10px" }}
              >
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="text"
                id="default-search"
                className="block  shadow-md lg:w-96 w-full h-11 p-4 pl-10 text-sm text-gray-900 border  rounded-md  border-inherit  "
                placeholder="Search customers"
                name="text"
                onKeyUp={() => processChange("filterAndSort")}
                onChange={handleInputChange}
                // onChange={(e) => SetpinCode(e.target.value)
              />
            </div>
          </div>
          <div className="flex justify-center items-center gap-2">
            {/* <Filter/> */}
            <div
              onClick={() => setIsFilter(!isFilter)}
              className="h-11	w-fit px-5 shadow-md cursor-pointer	border  border-inherit rounded-md flex items-center justify-center gap-2"
            >
              <div className="">
                <svg
                  width={18}
                  height={18}
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M1.13131 2.44682C1.2458 2.2053 1.4931 2.05078 1.76513 2.05078H15.7395C16.0115 2.05078 16.2588 2.2053 16.3733 2.44682C16.4878 2.68833 16.4487 2.97292 16.273 3.17621L10.8485 9.45426V15.044C10.8485 15.281 10.7231 15.5011 10.5171 15.6257C10.3111 15.7503 10.0539 15.7616 9.83727 15.6556L7.0424 14.2879C6.80569 14.1721 6.65616 13.9353 6.65616 13.6763V9.45426L1.23161 3.17621C1.05596 2.97292 1.01682 2.68833 1.13131 2.44682ZM3.27108 3.41848L7.8884 8.76229C7.99507 8.88574 8.0536 9.04219 8.0536 9.20387V13.2536L9.45103 13.9375V9.20387C9.45103 9.04219 9.50956 8.88574 9.61623 8.76229L14.2335 3.41848H3.27108Z"
                    fill="#637381"
                  />
                </svg>
              </div>
              <h6 className="text-base	font-normal	text-gray">Filter</h6>
            </div>
            <FilterCustomer
              filterAndSort={filterAndSort}
              handleSortChange={handleSortChange}
              itemLabel={itemLabel}
              handleClearSort={handleClearSort}
            />
          </div>
        </div>
        {isFilter && (
          <div className="flex justify-between items-center pt-4 ">
            <div className="flex  gap-8 relative   flex-wrap">
              <div className="relative">
                <div
                  className="flex items-center gap-2 product-category-box cursor-pointer"
                  onClick={DropDownFirst}
                >
                  <h5 className={`text-base font-medium	text-gray `}>Status</h5>
                  <div className={`arrow-${First}`}>
                    <img src="/assets/dropdownArrow.png" alt="" />
                  </div>

                  {First && (
                    <div
                      className=" z-10 left-0   w-60 absolute product-dropdown bg-white  shadow-md rounded-lg  h-fit py-3 border border-[#e2e8f0] "
                      style={{ top: "37px" }}
                    >
                      <ul className="dropdown-content">
                        {status.map((sts, index) => (
                          <ul key={index}>
                            <li className="py-2.5 px-4  ">
                              <div className="flex items-center ">
                                <div className="flex items-center gap-3 green-checkbox">
                                  <input
                                    id={sts.label}
                                    checked={
                                      filterAndSort?.filter?.status ===
                                      sts.value
                                    }
                                    type="radio"
                                    value={statusSelected}
                                    onClick={(e) =>
                                      toggleCategory(e, sts.value, "status")
                                    }
                                    className="w-4 h-4 text-lightGreen bg-gray-100 border-gray-300 rounded relative dark:bg-gray-700 dark:border-gray-600"
                                  />
                                </div>

                                <label
                                  htmlFor={sts.label}
                                  className="ml-2 text-sm font-medium text-gray"
                                >
                                  {sts.label}
                                </label>
                              </div>
                            </li>
                          </ul>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
              <div className="relative">
                <div
                  className="flex items-center gap-2 product-category-box cursor-pointer"
                  onClick={DropDownSecond}
                >
                  <h5 className="text-base font-medium	text-gray">State</h5>
                  <div className={`arrow-${Second}`}>
                    <img src="/assets/dropdownArrow.png" alt="" />
                  </div>
                </div>
                {Second && (
                  <div
                    style={{
                      top: "135%",
                      position: "absolute",
                      left: "0",
                      zIndex: "1",
                      width: "240px",
                    }}
                  >
                    <Select
                      className=""
                      isMulti={true}
                      isSearchable={true}
                      style={{
                        width: "100%",
                      }}
                      placeholder="select..."
                      onChange={addState}
                      value={selectedState}
                      options={State?.map((item) => {
                        return {
                          label: item?.stateName,
                          value: item?.stateName,
                        };
                      })}
                      closeMenuOnSelect={false}
                    />
                  </div>
                )}
              </div>
              <div className="relative">
                <div
                  className="flex items-center gap-2 product-category-box cursor-pointer"
                  onClick={DropDownThird}
                >
                  <h5 className="text-base font-medium	text-gray">Postcode</h5>
                  <div className={`arrow-${Third}`}>
                    <img src="/assets/dropdownArrow.png" alt="" />
                  </div>
                </div>
                {Third && (
                  <div className=" z-10	left-0   w-60 absolute product-dropdown bg-white	shadow-md rounded-lg	h-fit 	">
                    <input
                      type=""
                      id="default-search"
                      maxLength={4}
                      className="block  shadow-md lg:w-96 w-full h-11 p-4 pl-10 text-sm text-gray-900 border  rounded-md  border-inherit  "
                      placeholder="4739"
                      name="pincode"
                      required=""
                      value={pincode}
                      onKeyUp={() => processChange("filterAndSort")}
                      onChange={handleInputChange}
                    />
                    <span onClick={handlecut}>
                      <CloseIcon
                        style={{
                          top: "13px",
                          right: "8px",
                          position: "absolute",
                          fill: "#9aa0ab",
                          fontSize: "17px",
                          cursor: "pointer",
                        }}
                      />
                    </span>
                  </div>
                )}
              </div>
            </div>
            <div
              className="cursor-pointer bg-[#0000] border border-[#0000002e] py-1.5 px-3 rounded-md"
              onClick={() => {
                handleClearFilter();
              }}
            >
              <h2 className="text-[#DC3545] font-medium text-base leading-[24px]">
                Clear filters
              </h2>
            </div>
            {/* <CustomerPostCode /> */}
            {/* <CustomerVisibility/> */}
          </div>
        )}
      </div>
    </>
  );
}

export default SearchCustomer;
