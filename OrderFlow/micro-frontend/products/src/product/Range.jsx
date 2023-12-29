import React, { useEffect, useRef, useState } from "react";
import SearchProduct from "./SearchProduct";

import CloseIcon from "@mui/icons-material/Close";

import SearchOffIcon from "@mui/icons-material/SearchOff";

import ActiveProduct from "./ActiveProduct";

import { useNavigate } from "react-router-dom";
import "../style.css";

import {
  Typography,
  CardBody,
  CardFooter,
  select,
} from "@material-tailwind/react";

import createArrayWithNumber from "../helpers/createArrayWithNumbers";

import { PaginationNav1Presentation } from "./Pagination";

import { Skeleton, message, Modal } from "antd";

import Visible from "../modal/Visible";

import HiddenModal from "../modal/HiddenModal";

const TABLE_HEAD = [
  "Title",

  "Code",

  "Configuration",

  "Price",

  "Stock level",

  " Status",
];

function Range() {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [hiddenModalOpen, setHiddenModalOpen] = useState(false);
  const childRef = useRef(null);
  const [isBulkEdit, setIsBulkEdit] = useState(false);
  const [products, setProducts] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  const [prevProducts, setPrevProducts] = useState([]);
  const [pages, setPages] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [pageIndex, setPageIndex] = useState(1);
  const navigate = useNavigate();
  const [selectAllChecked, setSelectAllChecked] = useState(false);
  const [selected, setSlected] = useState(0);
  const [dataLength, setDataLength] = useState(0);
  const [activeData, setActiveData] = useState(0);
  const [loading, setLoading] = useState(true);
  const isTrue = localStorage.getItem("productAdded");
  const isProductDeleted = localStorage.getItem("productDelete");
  // const [modal] = Modal.useModal();
  const [isSearchResult, setisSearchResult] = useState(true);
  const [messageApi, contextHolder] = message.useMessage();

  const saveProduct = () => {
    messageApi.open({
      content: (
        <div className="flex justify-center gap-2 items-center">
          <CloseIcon style={{ fill: "#fff", width: "15px" }} />
          <p className="text-base font-semibold text-[#F8FAFC]">
            Products saved!
          </p>
        </div>
      ),
      className: "custom-class",
      rtl: true,
    });
  };

  const errorModal = (errors) => {
    Modal.error({
      title: "Error Editing Products!",
      content: (
        <>
          <ul>
            {errors?.map((item) => (
              <li className="flex gap-2" key={item.value}>
                <p>{item?.row}</p>: <p>{item?.message}</p>
              </li>
            ))}
          </ul>
        </>
      ),
    });
  };

  const DeleteProduct = () => {
    messageApi.open({
      content: (
        <div className="flex justify-center gap-2 items-center">
          <CloseIcon style={{ fill: "#fff", width: "15px" }} />
          <p className="text-base font-semibold text-[#F8FAFC]">
            Product Deleted!
          </p>
        </div>
      ),
      className: "custom-class",
      rtl: true,
    });
  };

  const productUrl = process.env.REACT_APP_PRODUCT_API_URL;
  // useEffect(() => {
  //   if (importTrue === "true") {
  //     importProduct();
  //   }
  //   const timeout = setTimeout(() => {
  //     localStorage.setItem("productImport", false);
  //   }, 300000);

  //   return () => clearTimeout(timeout);
  // }, []);

  useEffect(() => {
    if (isTrue === "true") {
      saveProduct();
    } else if (isProductDeleted === "true") {
      DeleteProduct();
    }

    const timeout = setTimeout(() => {
      localStorage.setItem("productAdded", false);
      localStorage.setItem("productDelete", false);
    }, 3000);

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    getProductList(1);
  }, []);

  const getProductList = (values) => {
    setLoading(true);

    if (childRef.current) {
      childRef.current.handleFilterPagination(values);
    }

    setSelectedProducts([]);

    setIsBulkEdit(false);
  };

  const handleSelectAllChange = (e) => {
    const checked = e.target.checked;

    checked ? setSelectedProducts([...products]) : setSelectedProducts([]);

    setIsBulkEdit(true);

    if (!checked) {
      setIsBulkEdit(false);
    }
  };

  const handleBulkEdit = () => {
    localStorage.setItem("selectedProducts", JSON.stringify(selectedProducts));

    navigate("/main/products/bulk-edit");
  };

  const handleCheckbox = (e, product) => {
    const checked = e.target.checked;

    const updatedSelectedProducts = checked
      ? [...selectedProducts, product]
      : selectedProducts.filter((prod) => prod !== product);

    setSelectedProducts(updatedSelectedProducts);

    setIsBulkEdit(updatedSelectedProducts.length > 1);
    setSlected(selectedProducts.length);
  };

  // visibility handle

  const handleVisible = (name) => {
    if (name === "visible") {
      setDeleteModalOpen(true);
    } else {
      setHiddenModalOpen(true);
    }
  };

  const handleBulkVisibility = (name) => {
    // return true
    const catalogueId = localStorage.getItem("catalogueId");

    fetch(
      `${productUrl}/api/product/UpdateProductBulkData`,

      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(
          selectedProducts.map((product) => {
            return {
              catalogueId: catalogueId,
              unitofMeasure: product.unitofMeasure,
              productId: product.productId,
              title: product.title,
              skUcode: product.skUcode,
              configuration: product.configuration,
              globalPrice: product.globalPrice,
              buyPrice: product.buyPrice,
              availableQty: product.availableQty,
              visibility: name === "visible" ? "1" : "0",
              productStatus: product.productStatus,
            };
          })
        ),
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setIsBulkEdit(false);
        setSelectedProducts([]);
        if (!data?.data[0]?.success) {
          const errors = data?.data?.map((i) => {
            return {
              row: i?.row,
              message: i?.message,
            };
          });
          errorModal(errors);
        } else {
          saveProduct();
          if (childRef.current) {
            childRef.current.handleFilterPagination(pageIndex);
          }
        }
      })

      .catch((error) => console.log(error));
  };

  const stockStatus = (availableQty, stockThreshold) => {
    if (availableQty === 0) {
      return (
        <div
          className="bg-[#EDF7F1] py-2 px-3.5 rounded-[30px]"
          style={{
            background: "rgba(220, 53, 69, 0.05)",

            paddingLeft: "0.875rem",

            paddingRight: "0.875rem",

            borderRadius: "30px",

            maxWidth: "134px",
          }}
        >
          <Typography className="font-normal md:text-sm text-sm text-[#DC3545] text-center">
            {`Out of stock (${availableQty})`}
          </Typography>
        </div>
      );
    } else if (availableQty <= stockThreshold) {
      return (
        <div
          className="bg-[#EDF7F1] py-2 px-3.5 rounded-[30px]"
          style={{
            background: "rgba(255, 167, 11, 0.08)",

            paddingLeft: "0.875rem",

            paddingRight: "0.875rem",

            borderRadius: "30px",

            maxWidth: "134px",
          }}
        >
          <Typography className="font-normal md:text-sm text-sm text-[#FFA70B] text-center">
            {`Low stock (${availableQty})`}
          </Typography>
        </div>
      );
    } else if (availableQty >= stockThreshold) {
      return (
        <div
          className="bg-[#EDF7F1] py-1 px-3.5 rounded-[30px]"
          style={{
            background: "rgba(33, 150, 83, 0.08)",

            paddingLeft: "0.875rem",

            paddingRight: "0.875rem",

            borderRadius: "30px",

            maxWidth: "134px",

            color: "#219653",
          }}
        >
          <Typography
            style={{ color: "#219653" }}
            className="font-normal md:text-sm text-sm text-center"
          >
            {`In stock (${availableQty})`}
          </Typography>
        </div>
      );
    }
  };

  return (
    <>
      {contextHolder}
      <div className="padding-top-custom">
        <ActiveProduct
          totalProducts={totalProducts}
          selectedProductsLength={selectedProducts.length}
          productId={selectedProducts[0]?.productId}
          activeData={activeData}
        />

        <div className="" style={{ height: "100%" }}>
          <div className="box-3 px-6 ">
            <SearchProduct
              ref={childRef}
              setLoading={setLoading}
              pageIndex={pageIndex}
              setPageIndex={setPageIndex}
              setisSearchResult={setisSearchResult}
              setProducts={setProducts}
              products={products}
              prevProducts={prevProducts}
              setTotalPages={setTotalPages}
              setActiveData={setActiveData}
            />
          </div>

          <div className="pt-6 px-6 relative">
            <div className="relative overflow-x-auto overflow-y-auto custom-scroll-bar shadow-md sm:rounded-lg rounded-md border border-inherit bg-white  w-full">
              <CardBody className="p-0">
                <table
                  className=" text-sm text-left text-gray-500 dark:text-gray-400 w-full"
                  style={{ width: "992px", minWidth: "100%" }}
                >
                  <thead>
                    <tr>
                      <th scope="col" className="p-4 border-y green-checkbox">
                        <div className="flex items-center">
                          <input
                            id="default-checkbox"
                            type="checkbox"
                            checked={
                              selectedProducts.length >= products.length
                                ? true
                                : false
                            }
                            onChange={(e) => handleSelectAllChange(e)}
                            className="w-4 h-4 text-darkGreen bg-gray-100 border-gray-300 rounded  dark:bg-gray-700 dark:border-gray-600"
                          />
                        </div>
                      </th>

                      <th scope="col" className="p-4 border-y">
                        <div className="flex items-center"></div>
                      </th>

                      {TABLE_HEAD.map((head, h) => (
                        <th
                          key={h}
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
                    <tbody>
                      {products?.length > 0 ? (
                        products?.map((product, index) => {
                          const isLast = index === products.length - 1;
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
                                  top: "20px",
                                  left: "14px",
                                }}
                                paragraph={{ rows: 1 }}
                                loading={loading}
                                active
                                avatar
                                className="custom-skeleton"
                              >
                                <td className={classes}>
                                  <div className="flex items-center gap-3 cursor-pointer green-checkbox">
                                    <input
                                      id="default-checkbox"
                                      type="checkbox"
                                      name={product.title}
                                      checked={selectedProducts.includes(
                                        product
                                      )}
                                      onClick={(e) =>
                                        handleCheckbox(e, product)
                                      }
                                      className="w-4 h-4 text-darkGreen bg-gray-100 border-gray-300 rounded cursor-pointer dark:bg-gray-700 dark:border-gray-600"
                                    />
                                  </div>
                                </td>

                                <td className={classes}>
                                  <div
                                    onClick={() =>
                                      navigate(
                                        `/main/products/view-product/${product.productId}`
                                      )
                                    }
                                    className="flex items-center gap-3"
                                  >
                                    {product.productImageUrls ? (
                                      <>
                                        <div
                                          className=""
                                          style={{
                                            borderRadius: "6px",

                                            height: "40px",

                                            width: "40px",
                                          }}
                                        >
                                          <img
                                            src={product.productImageUrls[0]}
                                            alt=""
                                            className="object-cover cursor-pointer  "
                                          />
                                        </div>
                                      </>
                                    ) : (
                                      <div
                                        className=" rounded-[6px] bg-[#D9D9D9]"
                                        style={{
                                          height: "40px",

                                          width: "40px",

                                          borderRadius: "6px",
                                        }}
                                      ></div>
                                    )}
                                  </div>
                                </td>

                                <td
                                  className={`${classes} `}
                                  style={{
                                    maxWidth: "200px",
                                    minWidth: "100%",
                                  }}
                                >
                                  <div
                                    onClick={() =>
                                      navigate(
                                        `/main/products/view-product/${product.productId}`
                                      )
                                    }
                                    className="flex items-center gap-3"
                                  >
                                    <Typography className="font-medium  md:text-base text-sm text-[#637381] cursor-pointer">
                                      {product.title}
                                    </Typography>
                                  </div>
                                </td>

                                <td className={classes}>
                                  <Typography className="font-normal md:text-base text-sm text-[#637381]">
                                    {product.skUcode}
                                  </Typography>
                                </td>

                                <td className={`${classes} `}>
                                  <Typography className="font-normal md:text-base text-sm text-[#637381]">
                                    {product.configuration}
                                  </Typography>
                                </td>

                                <td className={classes}>
                                  <Typography className="font-normal md:text-base text-sm text-[#637381]">
                                    {`$${product.globalPrice}`}
                                  </Typography>
                                </td>

                                <td className={classes}>
                                  {stockStatus(
                                    product.availableQty,

                                    product.stockThreshold
                                  )}
                                </td>

                                <td className={classes}>
                                  <Typography className="font-normal md:text-base text-sm text-[#637381]">
                                    {product.productStatus}

                                    <br />

                                    {product.visibility === "1"
                                      ? "Visible"
                                      : "Hidden"}
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
                  <PaginationNav1Presentation
                    totalPages={totalPages}
                    getProductList={getProductList}
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
              {/* <div className="custom-message">
                <Button onClick={success}>Customized style</Button>
              </div> */}
            </div>
          </div>

          {isBulkEdit ? (
            <div className="bulk-update-popup rounded-lg bg-slate-100 justify-center items-center   border border-darkGreen p-6 w-max  flex gap-3 absolute  bottom-0  left-2/4">
              <button
                onClick={handleBulkEdit}
                className="rounded-md bg-custom-skyBlue py-2.5  px-7  "
              >
                <h6 className="text-white md:font-semibold md:text-base  text-sm font-medium">
                  Bulk edit
                </h6>
              </button>

              <button
                onClick={() => handleVisible("visible")}
                className="rounded-md bg-custom-skyBlue py-2.5  px-7  "
              >
                <h6 className="text-white md:font-semibold md:text-base  text-sm font-medium ">
                  Set as Visible
                </h6>
              </button>

              <button
                onClick={() => handleVisible("hidden")}
                className="rounded-md bg-custom-skyBlue py-2.5  px-7  "
              >
                <h6 className="text-white md:font-semibold md:text-base  text-sm font-medium ">
                  Set as Hidden
                </h6>
              </button>

              <div
                className="cursor-pointer"
                onClick={() => {
                  setIsBulkEdit(false);
                }}
              >
                <div onClick={() => setSelectedProducts([])}>
                  <CloseIcon />
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>

        <Visible
          handleBulkVisibility={handleBulkVisibility}
          totalProducts={selectedProducts.length}
          open={deleteModalOpen}
          onOk={() => {
            setDeleteModalOpen(false);
            setTimeout(() => {
              if (childRef.current) {
                childRef.current.handleFilterPagination(1);
              }
            }, 1000);
          }}
          onCancel={() => {
            setDeleteModalOpen(false);
          }}
        />

        <HiddenModal
          totalProducts={selectedProducts.length}
          handleBulkVisibility={handleBulkVisibility}
          open={hiddenModalOpen}
          onOk={() => {
            setHiddenModalOpen(false);
          }}
          onCancel={() => {
            setHiddenModalOpen(false);
          }}
        />
        {contextHolder}
      </div>
    </>
  );
}

export default Range;
