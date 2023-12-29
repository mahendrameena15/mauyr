import React, { useState, useEffect, useRef } from "react";

const sort = [
  {
    label: "Title",
    key: "title",
    value: {
      asc: "A - Z",
      desc: "Z - A",
    },
  },
  {
    label: "Date updated",
    key: "date",
    value: {
      asc: "Oldest first",
      desc: "Newest first",
    },
  },
  {
    label: "Stock level",
    key: "stock",
    value: {
      asc: "Lowest to highest",
      desc: "Highest to lowest",
    },
  },
  {
    label: "Price",
    key: "price",
    value: {
      asc: "Lowest to highest",
      desc: "Highest to lowest",
    },
  },
];

function Filter({
  handleSortChange,
  itemLabel,
  filterAndSort,
  handleClearSort,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const [check, setCheck] = useState({
    filterTextFirst: false,
    filterTextSecond: false,
    filterTextThird: false,
    filterTextForth: false,
  });

  const {
    filterTextFirst,
    filterTextSecond,
    filterTextThird,
    filterTextForth,
  } = check;

  const changeHandler = (e) => {
    setCheck({
      [e.target.name]: e.target.checked,
    });
  };

  useEffect(() => {
    const handleClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    const handleKeydown = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKeydown);

    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKeydown);
    };
  }, []);

  return (
    <>
      <div className="relative sm:w-24 w-2/4" ref={dropdownRef}>
        <div
          className=" cursor-pointer h-11	w-fit px-5  shadow-md	border  border-inherit rounded-md flex items-center justify-center gap-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="">
            <svg
              width={13}
              height={10}
              viewBox="0 0 13 10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.367676 9.19262V7.79512H4.56018V9.19262H0.367676ZM0.367676 5.69887V4.30137H8.75268V5.69887H0.367676ZM0.367676 2.20512V0.807617H12.9452V2.20512H0.367676Z"
                fill="#637381"
              />
            </svg>
          </div>
          <h6 className="text-base	font-normal	text-gray">Sort</h6>
        </div>
        {isOpen && (
          <>
            <div className="z-10 right-0 w-56 sm:w-30 absolute top-14 border border-inherit bg-white shadow-md rounded-lg h-fit py-3">
              <ul className="dropdown-content">
                <div
                  className="flex justify-end"
                  style={{ paddingRight: "12px" }}
                  onClick={() => {
                    handleClearSort();
                    setIsOpen(false);
                  }}
                >
                  <p
                    className=" cursor-pointer border-b"
                    style={{
                      color: "#fa0000",
                      borderBottom: "1px solid #fa0000",
                    }}
                  >
                    clear
                  </p>
                </div>
                {sort.map((item) => (
                  <li className="py-2.5 px-4" key={item.label}>
                    <div className="flex items-center">
                      <input
                        defaultChecked=""
                        id={item.label}
                        type="radio"
                        name="filterTextFirst"
                        checked={filterAndSort.sort.sortBy === item.key}
                        onChange={() => handleSortChange(item.key, "")}
                        defaultValue=""
                        className="w-4 h-4 relative text-blue-600 bg-gray-100 border-gray-300 rounded-full dark:bg-gray-700 dark:border-gray-600"
                      />
                      <label
                        htmlFor={item.label}
                        className="ml-2 text-sm font-medium text-gray"
                      >
                        {item.label}
                      </label>
                    </div>
                  </li>
                ))}
              </ul>
              {filterAndSort.sort.sortBy && (
                <ul className="border-t border-inherit">
                  <li className="flex items-center py-2.5 px-4">
                    <input
                      type="radio"
                      value={"asc"}
                      checked={filterAndSort?.sort?.sortOrder === "asc"}
                      onChange={() =>
                        handleSortChange(filterAndSort?.sort?.sortBy, "asc")
                      }
                      className="w-4 h-4 text-lightGreen bg-gray-100 border-gray-300 rounded relative dark:bg-gray-700 dark:border-gray-600"
                      id="asc"
                    />
                    <label
                      htmlFor="asc"
                      className="flex items-center ml-2 justify-start gap-3 box-range"
                    >
                      <div className="">
                        <img
                          src="/assets/arrow_upward.png"
                          alt=""
                          className=""
                        />
                      </div>
                      <div className="">
                        <h5 className="text-base font-medium text-gray whitespace-nowrap">
                          {
                            sort.find(
                              (item) => item.key === filterAndSort?.sort?.sortBy
                            ).value.asc
                          }
                        </h5>
                      </div>
                    </label>
                  </li>
                  <li className="flex items-center py-2.5 px-4">
                    <input
                      type="radio"
                      className="w-4 h-4 text-lightGreen bg-gray-100 border-gray-300 rounded relative dark:bg-gray-700 dark:border-gray-600"
                      id="desc"
                      value={"desc"}
                      checked={filterAndSort.sort.sortOrder === "desc"}
                      onChange={() =>
                        handleSortChange(filterAndSort.sort.sortBy, "desc")
                      }
                    />
                    <label
                      htmlFor="desc"
                      className="flex items-center ml-2 justify-start gap-3 box-range"
                    >
                      <div className="">
                        <img
                          src="/assets/arrow_upward.png"
                          alt=""
                          className=" rotate-180"
                        />
                      </div>
                      <div className="">
                        <h5 className="text-base font-medium text-gray whitespace-nowrap">
                          {
                            sort.find(
                              (item) => item.key === filterAndSort.sort.sortBy
                            ).value.desc
                          }
                        </h5>
                      </div>
                    </label>
                  </li>
                </ul>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default Filter;
