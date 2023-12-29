import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
  useRef,
} from "react";
import Sort from "./Sort";
import { Select, Space } from "antd";
const stock = [
  { label: "In Stock", value: "inStock" },
  { label: "Low Stock", value: "lowStock" },
  { label: "Out of Stock", value: "outOfStock" },
];
const status = [
  { label: "Active", value: "Active" },
  { label: "Inactive", value: "Inactive" },
  { label: "Archived", value: "Archived" },
];

let filterAndSort = {
  filter: {
    category: [],
    subcategory: [],
    stock: [],
    productStatus: [],
    visibility: "",
    page: 1,
    searchByTitle: "",
  },
  sort: {
    sortBy: "",
    sortOrder: "",
  },
};

let categoryList = [];

const SearchProduct = forwardRef(
  (
    {
      pageIndex,
      setPageIndex,
      setProducts,
      products,
      prevProducts,
      setLoading,
      setisSearchResult,
      setTotalPages,
      setActiveData,
    },
    ref
  ) => {
    const productUrl = process.env.REACT_APP_PRODUCT_API_URL;
    const fobohWebApi = process.env.REACT_APP_FOBOH_WEB_API_URL;
    const [Open, setOpen] = useState(false);
    const [filterTextFirst, setFilterTextFirst] = useState(false);
    const [filterTextSecond, setFilterTextSecond] = useState(false);
    const [filterTextThird, setFilterTextThird] = useState(false);
    const [filterTextForth, setFilterTextForth] = useState(false);
    const [input, setInput] = useState("");
    const [selectedCatId, setSelectedCatId] = useState([]);
    const [categoryAndSubcategory, setCategoryAndSubcategory] = useState([]);
    const [selectedSubcatId, setSelectedSubcatId] = useState([]);
    const [itemLabel, setItemLabel] = useState("");
    const [showFilter, setShowFilter] = useState(false);
    const dropdownRef = useRef(null);
    const { Option } = Select;
    const [selectSubcategory, setSelectSubcategory] = useState([]);
    const [selectStatus, setSelectStatus] = useState([]);
    const [selectStock, setSelectStock] = useState([]);
    const [selectVisibility, setSelectVisibility] = useState("");

    const FirstDropdown = () => {
      setFilterTextFirst(!filterTextFirst);
      setFilterTextSecond(false);
      setFilterTextThird(false);
      setFilterTextForth(false);
    };
    const SecondDropdown = () => {
      setFilterTextFirst(false);
      setFilterTextSecond(!filterTextSecond);
      setFilterTextThird(false);
      setFilterTextForth(false);
    };
    const ThirdDropdown = () => {
      setFilterTextFirst(false);
      setFilterTextSecond(false);
      setFilterTextThird(!filterTextThird);
      setFilterTextForth(false);
    };
    const ForthDropdown = () => {
      setFilterTextFirst(false);
      setFilterTextSecond(false);
      setFilterTextThird(false);
      setFilterTextForth(!filterTextForth);
    };

    useEffect(() => {
      fetch(`${fobohWebApi}/api/ShowCategorySubcategory`, {
        method: "GET",
      })
        .then((response) => response.json())
        .then((data) => {
          setCategoryAndSubcategory(
            data.map((i) => {
              return {
                categoryName: i.categoryName,
                categoryId: i.categoryId,
                subcategory: i.subcategoryId.map((c, n) => {
                  return { name: i.subCategorys[n], id: c };
                }),
              };
            })
          );
        });
    }, []);

    const updatedFilterAndSort = () => {
      return filterAndSort;
    };

    const handleInputChange = (e) => {
      const search = e.target.value;
      setInput(search);
      if (search === "") {
        setPageIndex(1);
        const newFilter = {
          ...filterAndSort.filter,
          searchByTitle: search,
          page: 1,
        };

        filterAndSort = {
          ...filterAndSort,
          filter: newFilter,
        };
      } else {
        const newFilter = {
          ...filterAndSort.filter,
          searchByTitle: search,
          page: 1,
        };
        setPageIndex(1);

        filterAndSort = {
          ...filterAndSort,
          filter: newFilter,
        };
      }
    };

    useEffect(() => {
      const debounceTimeout = setTimeout(() => {
        processChange("filterAndSort");
      }, 1000);

      return () => clearTimeout(debounceTimeout);
    }, [input]);

    // Debouce function
    function debounce(func, timeout = 1000) {
      let timer;
      return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
          func.apply(this, args);
        }, timeout);
      };
    }
    function saveInput(name, newFilterAndSort) {
      if (name === "filterAndSort") {
        setLoading(true);
        const orgID = localStorage.getItem("organisationId");
        const filterBody =
          localStorage.getItem("yourBooleanKey") === "true"
            ? newFilterAndSort
            : filterAndSort;
        fetch(`${productUrl}/api/product/Filter?OrganisationId=${orgID}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(filterBody),
        })
          .then((response) => response.json())
          .then((data) => {
            setActiveData(data?.activeproduct);
            if (data?.data?.length > 0) {
              setisSearchResult(true);
              setProducts(data.data);
              setTotalPages(data.last_page);
            } else {
              setisSearchResult(false);
              setTotalPages(0);
            }
            setLoading(false);
          })
          .then(() => {})
          .catch((error) => console.log(error));
      }
    }
    const processChange = debounce((name) => saveInput(name));
    useImperativeHandle(ref, () => ({
      handleFilterPagination(pageNumber) {
        const newFilter = {
          ...filterAndSort.filter,
          page: pageNumber,
        };

        filterAndSort = {
          ...filterAndSort,
          filter: newFilter,
        };

        processChange("filterAndSort");
      },
    }));

    const toggleCategoryAndSubcategory = (e, id, name, categoryName) => {
      setPageIndex(1);
      if (name === "category") {
        setOpen(!Open);
        const newCategoryIds = e.target.checked
          ? [...filterAndSort.filter.category, id]
          : filterAndSort.filter.category.filter((catId) => catId !== id);

        if (!e.target.checked) {
          setSelectSubcategory((prev) => {
            categoryList = prev.filter((item) => item.cat !== id);

            let newFilter = {
              ...filterAndSort.filter,
              category: newCategoryIds,
              subcategory: categoryList.flatMap((i) => i.sub),
              page: 1,
            };

            filterAndSort = {
              ...filterAndSort,
              filter: newFilter,
            };
            return prev.filter((item) => item.cat !== id);
          });
        } else {
          let newFilter = {
            ...filterAndSort.filter,
            category: newCategoryIds,
            subcategory: categoryList.flatMap((i) => i.sub),
            page: 1,
          };

          filterAndSort = {
            ...filterAndSort,
            filter: newFilter,
          };
        }

        setSelectedCatId(newCategoryIds);
      } else if (name === "subcategory") {
        setSelectSubcategory((prev) => {
          const existingIndex = prev.findIndex(
            (item) => item.cat === categoryName
          );
          if (existingIndex !== -1) {
            categoryList = [
              ...prev.slice(0, existingIndex),
              {
                cat: categoryName,
                sub: e,
              },
              ...prev.slice(existingIndex + 1),
            ];
            return [
              ...prev.slice(0, existingIndex),
              {
                cat: categoryName,
                sub: e,
              },
              ...prev.slice(existingIndex + 1),
            ];
          } else {
            // Create a new object if categoryName doesn't match any prev cat

            categoryList = [
              ...prev,
              {
                cat: categoryName,
                sub: e,
              },
            ];
            return [
              ...prev,
              {
                cat: categoryName,
                sub: e,
              },
            ];
          }
        });

        const newSubcategoryIds = categoryList.flatMap((item) => item.sub);

        // console.log("selectSubcategory", selectSubcategory);

        const newFilter = {
          ...filterAndSort.filter,
          subcategory: newSubcategoryIds,
          page: 1,
        };

        filterAndSort = {
          ...filterAndSort,
          filter: newFilter,
        };
      } else if (name === "stock") {
        const newStockValues = e.target.checked
          ? [...filterAndSort.filter.stock, id]
          : filterAndSort.filter.stock.filter(
              (stockValue) => stockValue !== id
            );

        setSelectStock(newStockValues);

        const newFilter = {
          ...filterAndSort.filter,
          stock: newStockValues,
          page: 1,
        };

        filterAndSort = {
          ...filterAndSort,
          filter: newFilter,
        };
      } else if (name === "status") {
        const newStatusValues = e.target.checked
          ? [...filterAndSort.filter.productStatus, id]
          : filterAndSort.filter.productStatus.filter(
              (statusValue) => statusValue !== id
            );

        setSelectStatus(newStatusValues);

        const newFilter = {
          ...filterAndSort.filter,
          productStatus: newStatusValues,
          page: 1,
        };

        filterAndSort = {
          ...filterAndSort,
          filter: newFilter,
        };
      } else if (name === "visibility") {
        const checked = e.target.checked;

        const newVisibilityValue = checked ? id : "";

        setSelectVisibility(newVisibilityValue);

        const newFilter = {
          ...filterAndSort.filter,
          visibility: newVisibilityValue,
          page: 1,
        };

        filterAndSort = {
          ...filterAndSort,
          filter: newFilter,
        };
      }
      processChange("filterAndSort");
    };

    const handleSortChange = (sortBy, sortOrder) => {
      const newFilter = {
        ...filterAndSort.filter,
        page: pageIndex,
      };

      filterAndSort = {
        ...filterAndSort,
        filter: newFilter,
      };
      setItemLabel(sortBy);

      const newSort = {
        sortOrder: sortOrder,
        sortBy: sortBy,
      };

      filterAndSort = {
        ...filterAndSort,
        sort: newSort,
      };

      processChange("filterAndSort");
    };

    const handleFilter = () => {
      setShowFilter(!showFilter);
    };

    useEffect(() => {
      function handleClickOutside(event) {
        // if (sortRef.current && !sortRef.current.contains(event.target)) {
        //   setSort(false);
        // }

        if (
          dropdownRef.current &&
          !dropdownRef.current.contains(event.target)
        ) {
          const selectDropdowns = document.querySelectorAll(
            ".ant-select-dropdown"
          );

          let isInsideSelectDropdown = false;

          for (const dropdown of selectDropdowns) {
            if (dropdown.contains(event.target)) {
              isInsideSelectDropdown = true;
              break;
            }
          }

          if (!isInsideSelectDropdown) {
            setFilterTextFirst(false);
            setFilterTextSecond(false);
            setFilterTextThird(false);
            setFilterTextForth(false);
          }
        }
      }

      document.addEventListener("mousedown", handleClickOutside);

      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [dropdownRef]);

    useEffect(() => {
      const timeoutId = setTimeout(() => {
        const mainFilter = localStorage.getItem("yourBooleanKey");
        if (mainFilter === "true") {
          filterAndSort = {
            filter: {
              category: [],
              subcategory: [],
              stock: ["lowStock", "outOfStock"],
              productStatus: [],
              visibility: "",
              page: 1,
              searchByTitle: "",
            },
            sort: {
              sortBy: "",
              sortOrder: "",
            },
          };
          saveInput("filterAndSort", filterAndSort);
          localStorage.removeItem("yourBooleanKey");
          setSelectStock(["lowStock", "outOfStock"]);
        } else {
          filterAndSort = {
            filter: {
              category: [],
              subcategory: [],
              stock: [],
              productStatus: [],
              visibility: "",
              page: 1,
              searchByTitle: "",
            },
            sort: {
              sortBy: "",
              sortOrder: "",
            },
          };
          saveInput("filterAndSort", filterAndSort);
        }
      }, 3000);

      return () => clearTimeout(timeoutId);
    }, []);

    const handleClearFilter = () => {
      setPageIndex(1);
      setFilterTextFirst(false);
      setFilterTextSecond(false);
      setFilterTextThird(false);
      setFilterTextForth(false);
      setSelectStatus([]);
      setSelectStock([]);
      setSelectSubcategory([]);
      setSelectedCatId([]);
      setSelectVisibility("");
      filterAndSort = {
        ...filterAndSort,
        filter: {
          category: [],
          subcategory: [],
          stock: [],
          productStatus: [],
          visibility: "",
          page: 1,
        },
      };
      processChange("filterAndSort");
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

    return (
      <>
        <div className=" border border-inherit bg-white h-full py-3	 px-4">
          <div className=" rounded-md gap-3	  sm:flex grid sm:justify-between items-center">
            <div>
              <div className="relative 	">
                <div className="absolute inset-y-0 right-0 flex items-center pr-1 pointer-events-none">
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
                  onChange={handleInputChange}
                  type="text"
                  id="default-search"
                  className="block  shadow-md lg:w-96 w-full h-11 p-4 pl-10 text-sm text-gray-900 border  rounded-md  border-inherit  "
                  placeholder="search product"
                  required=""
                />
              </div>
            </div>
            <div className="flex justify-center items-center gap-2">
              <div
                onClick={handleFilter}
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
              <Sort
                updatedFilterAndSort={updatedFilterAndSort}
                filterAndSort={filterAndSort}
                itemLabel={itemLabel}
                handleSortChange={handleSortChange}
                handleClearSort={handleClearSort}
              />
            </div>
          </div>
          {showFilter && (
            <div
              ref={dropdownRef}
              className="flex justify-between items-center pt-4"
            >
              {/* <Category/> */}

              <div className="flex gap-8 relative flex-wrap">
                <div className="relative">
                  <div
                    className="flex items-center gap-2 cursor-pointer product-category-box"
                    onClick={FirstDropdown}
                  >
                    <h5 className="text-base font-medium text-gray">
                      Sub-category
                    </h5>
                    <div className="">
                      <img src="/assets/dropdownArrow.png" alt="" />
                    </div>
                  </div>
                  {filterTextFirst && (
                    <div
                      className=" z-10 left-0    absolute product-dropdown bg-white shadow-md rounded-lg  h-fit py-1 "
                      style={{ minWidth: "300px", maxWidth: "300px" }}
                    >
                      <ul className="dropdown-content ">
                        {categoryAndSubcategory &&
                          categoryAndSubcategory.map((category, idx) => (
                            <li className="py-2.5 px-4  ">
                              <div className="flex items-center green-checkbox">
                                <input
                                  id={`${idx}-${category.categoryId}`}
                                  type="checkbox"
                                  value={category.categoryId}
                                  onClick={(e) =>
                                    toggleCategoryAndSubcategory(
                                      e,
                                      category.categoryId,
                                      "category",
                                      category.categoryName
                                    )
                                  }
                                  checked={selectedCatId.includes(
                                    category.categoryId
                                  )}
                                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600"
                                />
                                <label
                                  htmlFor={`${idx}-${category.categoryId}`}
                                  className="ml-2 text-sm font-medium text-gray"
                                >
                                  {category.categoryName}
                                </label>
                              </div>

                              {selectedCatId.includes(category.categoryId) && (
                                <ul className="dropdown-content mt-3">
                                  <Select
                                    mode="multiple"
                                    style={{
                                      width: "100%",
                                    }}
                                    value={selectSubcategory
                                      .filter(
                                        (item) =>
                                          item.cat === category.categoryId
                                      )
                                      .flatMap((item) => item.sub)}
                                    placeholder={`select ${category.categoryName}`}
                                    onChange={(e, value) =>
                                      toggleCategoryAndSubcategory(
                                        e,
                                        value,
                                        "subcategory",
                                        category.categoryId
                                      )
                                    }
                                    //value={subCategorySelectedList[idx]}
                                    optionLabelProp="label"
                                  >
                                    {category.subcategory.map((subcat, i) => (
                                      <>
                                        {filterAndSort.filter.category.includes(
                                          category.categoryId
                                        ) && (
                                          <Option
                                            value={subcat.id}
                                            label={subcat.name}
                                            key={i}
                                          >
                                            <Space>{subcat.name}</Space>
                                          </Option>
                                        )}
                                      </>
                                    ))}
                                  </Select>
                                </ul>
                              )}
                            </li>
                          ))}
                      </ul>
                    </div>
                  )}
                </div>
                <div className="relative">
                  <div
                    className="flex items-center cursor-pointer gap-2 product-category-box"
                    onClick={SecondDropdown}
                  >
                    <h5 className="text-base font-medium  text-gray">Stock</h5>
                    <div className="">
                      <img src="/assets/dropdownArrow.png" alt="" />
                    </div>
                  </div>
                  {filterTextSecond && (
                    <div className=" z-10 left-0   w-60 absolute product-dropdown bg-white  shadow-md rounded-lg  h-fit py-3  ">
                      <ul className="dropdown-content    ">
                        {stock.map((ele, idx) => (
                          <li className="py-2.5 px-4  ">
                            <div className="flex items-center">
                              <div className="flex items-center gap-3 green-checkbox">
                                <input
                                  id={`${ele.label}-${idx}`}
                                  type="checkbox"
                                  value={ele.value}
                                  onClick={(e) =>
                                    toggleCategoryAndSubcategory(
                                      e,
                                      ele.value,
                                      "stock"
                                    )
                                  }
                                  checked={selectStock.includes(ele.value)}
                                  className=""
                                />
                              </div>
                              <label
                                htmlFor={`${ele.label}-${idx}`}
                                className="ml-2 text-sm font-medium text-gray"
                              >
                                {ele.label}
                              </label>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
                <div className="relative">
                  <div
                    className="flex items-center cursor-pointer gap-2 product-category-box"
                    onClick={ThirdDropdown}
                  >
                    <h5 className="text-base font-medium  text-gray">Status</h5>
                    <div className="">
                      <img src="/assets/dropdownArrow.png" alt="" />
                    </div>
                  </div>
                  {filterTextThird && (
                    <div className="z-10 left-0 w-60 absolute product-dropdown bg-white shadow-md rounded-lg h-fit py-3 ">
                      <ul className="dropdown-content">
                        {status.map((sts) => (
                          <li className="py-2.5 px-4  ">
                            <div className="flex items-center">
                              <div className="flex items-center gap-3 green-checkbox">
                                <input
                                  id={sts.value}
                                  type="checkbox"
                                  value={sts.value}
                                  checked={selectStatus.includes(sts.value)}
                                  onClick={(e) =>
                                    toggleCategoryAndSubcategory(
                                      e,
                                      sts.value,
                                      "status"
                                    )
                                  }
                                  className=""
                                />
                              </div>
                              <label
                                htmlFor={sts.value}
                                className="ml-2 text-sm font-medium text-gray"
                              >
                                {sts.label}
                              </label>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
                <div className="relative">
                  {/* ref={fourthDropdownRef} */}
                  <div
                    className="flex items-center cursor-pointer gap-2 product-category-box"
                    onClick={ForthDropdown}
                  >
                    <h5 className="text-base font-medium  text-gray">
                      Visibility
                    </h5>
                    <div className="">
                      <img src="/assets/dropdownArrow.png" alt="" />
                    </div>
                  </div>
                  {filterTextForth && (
                    <div className=" z-10 left-0   w-60 absolute product-dropdown bg-white  shadow-md rounded-lg  h-fit py-3  border border-[#e2e8f0]">
                      <ul className="dropdown-content    ">
                        <li className="py-2.5 px-4  ">
                          <div className="flex items-center">
                            <div className="flex items-center gap-3 green-checkbox">
                              <input
                                id="Visible"
                                type="checkbox"
                                onClick={(e) =>
                                  toggleCategoryAndSubcategory(
                                    e,
                                    "1",
                                    "visibility"
                                  )
                                }
                                checked={selectVisibility === "1"}
                                className=""
                              />
                            </div>
                            <label
                              htmlFor="Visible"
                              className="ml-2 text-sm font-medium text-gray"
                            >
                              Visible
                            </label>
                          </div>
                        </li>

                        <li className="py-2.5 px-4  ">
                          <div className="flex items-center">
                            <div className="flex items-center gap-3 green-checkbox">
                              <input
                                id="Hidden"
                                type="checkbox"
                                onClick={(e) =>
                                  toggleCategoryAndSubcategory(
                                    e,
                                    "0",
                                    "visibility"
                                  )
                                }
                                checked={selectVisibility === "0"}
                                className=""
                              />
                            </div>
                            <label
                              htmlFor="Hidden"
                              className="ml-2 text-sm font-medium text-gray"
                            >
                              Hidden
                            </label>
                          </div>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>
              <div
                className="cursor-pointer bg-[#0000] py-1.5 px-3 rounded-md border border-[#0000002e]"
                onClick={() => {
                  setShowFilter(false);
                  handleClearFilter();
                }}
              >
                <h2 className="text-[#DC3545] font-medium text-base leading-[24px] ">
                  Clear filters
                </h2>
              </div>
            </div>
          )}
        </div>
      </>
    );
  }
);

export default SearchProduct;
