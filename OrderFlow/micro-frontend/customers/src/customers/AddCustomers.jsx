import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { message, Skeleton } from "antd";

import "../style.css";
import ActiveCustomers from "./ActiveCustomers";
import SearchCustomer from "./SearchCustomer";
import { Typography, CardBody, CardFooter } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { PaginationCustomer } from "./PaginationCustomer";
import SearchOffIcon from "@mui/icons-material/SearchOff";
import { formatPrice } from "../helper/formatPrice";
import createArrayWithNumber from "../helper/createArrayWithNumbers";
const TABLE_HEAD = [
  "Business name",
  "Ordering contact",
  "Region",
  "Status",
  "Orders",
  "Amount spent",
];
function AddCustomers() {
  const customerUrl = process.env.REACT_APP_CUSTOMER_URL;
  const navigate = useNavigate();
  const [totalPages, setTotalPages] = useState(0);
  const [tableRecords, setTableRecords] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  const [prevCustomer, setPrevCustomer] = useState([]);
  const [page, setPage] = React.useState(1);
  const [pages, setPages] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isBulkEdit, setIsBulkEdit] = useState(false);
  const [loading, setLoading] = useState(true);
  const [messageApi, contextHolder] = message.useMessage();
  const [pageIndex, setPageIndex] = useState(1);
  const [selected, setSlected] = useState(0);
  const [isSearchResult, setisSearchResult] = useState(true);
  const [totalProducts, setTotalProducts] = useState(0);
  const [activeData, setActiveData] = useState(0);
  // const [loadData, setLoadData] = useState(false);
  let timeoutId;

  const saveProduct = () => {
    messageApi.open({
      content: (
        <div className="flex justify-center gap-2 items-center">
          <CloseIcon style={{ fill: "#fff", width: "15px" }} />
          <p className="text-base font-semibold text-[#F8FAFC]">
            Customer saved!
          </p>
        </div>
      ),
      className: "custom-class",
      rtl: true,
    });
  };
  const isTrue = localStorage.getItem("customerAdded");
  const handleDebounce = (value) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      setInputValue(value);
      searchApi(value);
    }, 300);
  };
  const handleInputChange = (event) => {
    const newValue = event.target.value;
    setInputValue(newValue);
    handleDebounce(newValue);
  };
  useEffect(() => {
    if (isTrue === "true") {
      saveProduct();
    }

    const timeout = setTimeout(() => {
      localStorage.setItem("customerAdded", false);
    }, 3000);

    return () => clearTimeout(timeout);
  }, []);
  const handleCustomerId = (item) => {
    navigate(`/main/customers/view-customer-details/`, {
      state: { data: item },
    });
  };

  const searchApi = () => {
    const orgID = localStorage.getItem("organisationId");

    fetch(
      `${customerUrl}/api/Customer/SearchByName?search=${inputValue}&page=1&OrganisationId=${orgID}`,
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setTableRecords(data.data);
        setTimeout(() => {
          setLoadData(false);
        }, 2000);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  };

  const handleCheckbox = (e, product) => {
    const checked = e.target.checked;
    const updatedSelectedProducts = checked
      ? [...selectedProducts, product]
      : selectedProducts.filter((prod) => prod !== product);
    setSelectedProducts(updatedSelectedProducts);
    // setIsBulkEdit(updatedSelectedProducts.length > 1);
    setSlected(selectedProducts.length);
  };

  const handleBulkEdit = () => {
    localStorage.setItem("selectedCustomers", JSON.stringify(selectedProducts));
    navigate("/main/customers/customer-bulk-edit");
  };

  const handleSelectAllChange = (e) => {
    const checked = e.target.checked;
    checked ? setSelectedProducts([...tableRecords]) : setSelectedProducts([]);
    // setIsBulkEdit(true);
    if (!checked) {
      setIsBulkEdit(false);
    }
  };

  return (
    <>
      {contextHolder}
      <div className=" padding-top-custom">
        <ActiveCustomers
          selectedProductsLength={selectedProducts.length}
          product={selectedProducts[0]}
          activeData={activeData}
        />
        <div className="   ">
          <div className="box-3 px-6 ">
            <SearchCustomer
              setProducts={setTableRecords}
              products={tableRecords}
              prevProducts={prevCustomer}
              setTotalPages={setTotalPages}
              setisSearchResult={setisSearchResult}
              pageIndex={pageIndex}
              setPageIndex={setPageIndex}
              setLoading={setLoading}
              setActiveData={setActiveData}
            />
          </div>
          <div className="pt-6 px-6 relative">
            <div className="relative overflow-x-auto overflow-y-auto custom-scroll-bar shadow-md sm:rounded-lg rounded-md border border-inherit bg-white  w-full">
              <CardBody className="p-0">
                <table
                  style={{ width: "1000px", minWidth: "100%" }}
                  className=" text-sm text-left text-gray-500 dark:text-gray-400 w-full"
                >
                  <thead>
                    <tr>
                      <th scope="col" className="p-4 border-y">
                        <div className="flex items-center green-checkbox">
                          <input
                            id="default-checkbox"
                            type="checkbox"
                            onChange={(e) => handleSelectAllChange(e)}
                            className="w-4 h-4 text-darkGreen bg-gray-100 border-gray-300 rounded  dark:bg-gray-700 dark:border-gray-600"
                          />
                        </div>
                      </th>
                      <th scope="col" className="p-4 border-y">
                        <div className="flex items-center"></div>
                      </th>
                      {TABLE_HEAD?.map((head, index) => (
                        <th
                          key={index}
                          className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                        >
                          <Typography
                            variant="small"
                            className="font-medium leading-none text-base text-[#2B4447]"
                          >
                            {head}
                          </Typography>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  {isSearchResult && (
                    <>
                      <tbody>
                        {tableRecords?.length > 0 ? (
                          tableRecords?.map((product, index) => {
                            const isLast = index === product.length - 1;
                            const classes = isLast ? "p-4" : "p-4  ";
                            return (
                              <tr
                                key={index}
                                style={
                                  loading
                                    ? { position: "relative", height: "85px" }
                                    : { position: "relative" }
                                }
                                className="border-b border-blue-gray-50"
                              >
                                <Skeleton
                                  style={{
                                    padding: "10px",
                                    width: "95%",
                                    position: "absolute",
                                    top: "10px",
                                    left: "14px",
                                  }}
                                  paragraph={{ rows: 1 }}
                                  loading={loading}
                                  active
                                  avatar
                                  className="custom-skeleton"
                                >
                                  <td className={classes}>
                                    <div className="flex items-center gap-3 green-checkbox">
                                      <input
                                        id="default-checkbox"
                                        type="checkbox"
                                        name={product.title}
                                        checked={
                                          selectedProducts.includes(product)
                                            ? true
                                            : false
                                        }
                                        onClick={(e) =>
                                          handleCheckbox(e, product)
                                        }
                                        className="w-4 h-4 text-darkGreen bg-gray-100 border-gray-300 rounded  dark:bg-gray-700 dark:border-gray-600"
                                      />
                                    </div>
                                  </td>
                                  <td className={classes}></td>
                                  <td className={`${classes} `}>
                                    <div
                                      onClick={() => handleCustomerId(product)}
                                      className="flex items-center gap-3 cursor-pointer"
                                    >
                                      <Typography className="font-medium	md:text-base text-sm text-[#637381]">
                                        {product.businessName}
                                      </Typography>
                                    </div>
                                  </td>
                                  <td className={classes}>
                                    <div className="">
                                      <Typography className="font-normal md:text-base text-sm text-[#637381]">
                                        {product.orderingFirstName}{" "}
                                        {product.orderingLastName}
                                      </Typography>
                                    </div>
                                    <Typography className="font-normal md:text-base text-sm text-[#637381]">
                                      {product.orderingEmail}
                                    </Typography>
                                  </td>
                                  <td className={`${classes} `}>
                                    <Typography className="font-normal md:text-base text-sm text-[#637381]">
                                      {product.suburb} , {product.state}
                                    </Typography>
                                  </td>
                                  <td className={classes}>
                                    <td className={classes}>
                                      {product?.isActive === "1" ? (
                                        <div
                                          style={{
                                            background: "#EDF7F1",
                                            borderRadius: "30px",
                                          }}
                                          className="flex justify-center items-center gap-1 radius-20 bg-custom-green h-full py-1.5	w-full 		px-3.5"
                                        >
                                          <p className="text-[#219653] font-medium	text-sm	">
                                            Active
                                          </p>
                                        </div>
                                      ) : (
                                        <div
                                          style={{
                                            background: "#FFF8EB",
                                            borderRadius: "30px",
                                          }}
                                          className="flex justify-center items-center rounded-[30px] gap-1 radius-20  h-full py-1.5	w-full 		px-3.5"
                                        >
                                          <p className="text-[#FFA70B] font-normal text-sm	">
                                            Inactive
                                          </p>
                                        </div>
                                      )}
                                    </td>
                                  </td>
                                  <td className={classes}>
                                    <Typography className="font-normal md:text-base text-sm text-[#637381]">
                                      {product?.noOfOrders}
                                    </Typography>
                                  </td>
                                  <td className={classes}>
                                    <Typography className="font-normal md:text-base text-sm text-[#637381]">
                                      {formatPrice(product?.totalspendAmount)}
                                    </Typography>
                                  </td>
                                </Skeleton>
                              </tr>
                            );
                          })
                        ) : (
                          <tr>
                            <td colSpan="8" className="text-center">
                              <div className="flex items-center justify-center h-[200px] no-data flex-col">
                                <svg
                                  style={{ fill: "#808080", width: "60px" }}
                                  id="Layer_1"
                                  data-name="Layer 1"
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 74 100"
                                >
                                  <defs>
                                    <style
                                      dangerouslySetInnerHTML={{
                                        __html:
                                          "\n      .cls-1 {\n        stroke-width: 0px;\n      }\n    ",
                                      }}
                                    />
                                  </defs>
                                  <path
                                    className="cls-1"
                                    d="m62,30C62,13.4,50.8,0,37,0S12,13.4,12,30H0l6,70h62l6-70h-12ZM37,4c11.6,0,21,11.7,21,26H16c0-14.3,9.4-26,21-26Zm15,46c0,2.8-2.2,5-5,5s-5-2.2-5-5,2.2-5,5-5,5,2.2,5,5Zm-20,0c0,2.8-2.2,5-5,5s-5-2.2-5-5,2.2-5,5-5,5,2.2,5,5Zm5,12.6c12.4,0,22.5,10.1,22.5,22.5h-5c0-9.6-7.9-17.5-17.5-17.5s-17.5,7.8-17.5,17.5h-5c0-12.4,10.1-22.5,22.5-22.5Z"
                                  />
                                </svg>

                                <h5 className="text-[#808080] text-lg font-medium">
                                  No Data
                                </h5>
                              </div>
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </>
                  )}
                </table>
              </CardBody>
              <CardFooter
                className={
                  isSearchResult
                    ? "flex w-full items-center justify-between border-t border-blue-gray-50 p-4"
                    : "flex w-full items-center justify-center border-t border-blue-gray-50 p-4"
                }
              >
                {!loading && isSearchResult && (
                  <PaginationCustomer
                    totalPages={totalPages}
                    pageIndex={pageIndex}
                    setPageIndex={setPageIndex}
                  />
                )}
                {!isSearchResult && (
                  <div className="flex items-center justify-center h-[200px] no-data flex-col">
                    <svg
                      style={{ fill: "#808080", width: "60px" }}
                      id="Layer_1"
                      data-name="Layer 1"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 74 100"
                    >
                      <defs>
                        <style
                          dangerouslySetInnerHTML={{
                            __html:
                              "\n      .cls-1 {\n        stroke-width: 0px;\n      }\n    ",
                          }}
                        />
                      </defs>
                      <path
                        className="cls-1"
                        d="m62,30C62,13.4,50.8,0,37,0S12,13.4,12,30H0l6,70h62l6-70h-12ZM37,4c11.6,0,21,11.7,21,26H16c0-14.3,9.4-26,21-26Zm15,46c0,2.8-2.2,5-5,5s-5-2.2-5-5,2.2-5,5-5,5,2.2,5,5Zm-20,0c0,2.8-2.2,5-5,5s-5-2.2-5-5,2.2-5,5-5,5,2.2,5,5Zm5,12.6c12.4,0,22.5,10.1,22.5,22.5h-5c0-9.6-7.9-17.5-17.5-17.5s-17.5,7.8-17.5,17.5h-5c0-12.4,10.1-22.5,22.5-22.5Z"
                      />
                    </svg>

                    <h5 className="text-[#808080] text-lg font-medium">
                      No Data
                    </h5>
                  </div>
                )}
              </CardFooter>
            </div>
          </div>
          {/* {isBulkEdit ? (
            <div className="bulk-update-popup rounded-lg bg-slate-100 justify-center items-center   border border-darkGreen p-6 w-max  flex gap-3 absolute  bottom-0  left-2/4">
              <button
                onClick={handleBulkEdit}
                className="rounded-md bg-custom-skyBlue py-2.5  px-12  "
              >
                <h6 className="text-white md:font-semibold md:text-base  text-sm font-medium">
                  Bulk edit
                </h6>
              </button>

              <div
                className="cursor-pointer"
                onClick={() => {
                  setIsBulkEdit(false);
                }}
              >
                <CloseIcon />
              </div>
            </div>
          ) : (
            ""
          )} */}
        </div>
      </div>
    </>
  );
}

export default AddCustomers;
