import React, { useState, useRef, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import ImportProductModal from "./ImportProductModal";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Spin } from "antd";
import { convertImportedProductList } from "../helpers/importProductModule";
import { useMemo } from "react";
function PreviewProductModal({
  isOverwrite,
  show,
  setShow,
  importedProducts,
  previous,
  setErrorData,
  setAddedFile,
}) {
  const productUrl =process.env.REACT_APP_PRODUCT_API_URL
  const [activeTab, setActiveTab] = useState("PRODUCT 1");
  const cancelButtonRef = useRef(null);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [errList, setErrList] = useState([]);
  const [loading, setLoading] = useState(false);
  const handleOptionChange = (event) => {
    setActiveTab(event.target.value);
  };


  const updatedImports = useMemo(() => {
    try {
      const updatedProducts = convertImportedProductList(importedProducts);
      return updatedProducts;
    } catch (error) {
      console.log("updatedProductserror", error);
    }
  }, [importedProducts]);

  const showModal = () => {
    setShow(false);
    localStorage.setItem("productImport", true);
    setLoading(true);
    fetch(
      `${productUrl}/api/product/CreateUpdateBulkData?overwrite=${isOverwrite}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedImports),
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const errList = data.data.map((item) => {
          return {
            row: item.row,
            error: item.message,
          };
        }).filter(item => item)
        setErrList(errList);
        setLoading(false);
        setShowPreviewModal(true);
      })
      .catch((error) => console.log(error));
  };
  const previousModal = () => {
    previous(true);
    setShowPreviewModal(false);
    setAddedFile(null);
    setErrorData([]);
  };
  return (
    <>
      <Transition.Root show={show} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          initialFocus={cancelButtonRef}
          onClose={setShow}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom=""
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo=""
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-[40] overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden  text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-xl	">
                  <div className="bg-white px-8 pb-8 pt-8 sm:p-6 sm:pb-4 rounded-t-lg">
                    <div className="sm:flex sm:items-center">
                      <div className="">
                        <img src="/assets/downloadBtn.png" alt="" />
                      </div>
                      <div className=" text-center sm:ml-4 sm:mt-0 sm:text-left">
                        <Dialog.Title
                          as="h3"
                          className="text-base font-semibold leading-6 text-gray-900"
                        >
                          Preview products
                        </Dialog.Title>
                      </div>
                    </div>
                    <div className="mt-2">
                      <div className="my-4 rounded-md	border-y	border-r	border-l-8	border-y-custom	border-left-blue py-3 px-4 border-r-custom	">
                        <p className="text-sm font-normal">
                          You are importing {importedProducts.length} products
                          into FOBOH. You have chosen to overwrite any existing
                          products that have the same SKU. If this preview
                          doesn’t look right please update the file and try
                          again.
                        </p>
                      </div>
                    </div>
                    <div className="relative">
                      <div style={{ width: "223px", position: "relative" }}>
                        <KeyboardArrowDownIcon
                          style={{
                            position: "absolute",
                            top: "10px",
                            right: "12px",
                            fill: "#637381",
                          }}
                        />
                        <select
                          onChange={handleOptionChange}
                          style={{
                            width: "223px",
                            border: "none",
                            background: "rgb(241 241 241)",
                            borderRadius: "8px",
                            appearance: "none",
                            marginBottom: "10px",
                            fontSize: "16px ",
                            fontWeight: "700",
                            color: "#637381",
                          }}
                        >
                          {importedProducts.map((tab, index) => (
                            <>
                              <option key={index} onChange={() => {}}>
                                <div
                                  key={index}
                                  className={`text-center w-full py-2 bg-[#F8FAFC]`}
                                >
                                  <p
                                    className="text-sm font-bold text-[#147D73]"
                                    style={{}}
                                  >
                                    {" "}
                                    PRODUCT {index + 1}{" "}
                                  </p>
                                </div>
                              </option>
                            </>
                          ))}
                        </select>
                      </div>
                      <div className="">
                        {importedProducts.map((item, index) => (
                          <div
                            style={{ height: "150px" }}
                            className={`relative px-6 py-3 overflow-y-auto 
                            ${
                              activeTab === `PRODUCT ${index + 1}`
                                ? ""
                                : "hidden"
                            }
                            `}
                            id={`#tabData-${index}`}
                          >
                            <div className="flex justify-between items-center py-3 px-3 border-inherit border-y">
                              <p className="text-sm font-semibold">Title</p>
                              <p className="text-sm font-normal text-lightGreen">
                                {item.title}
                              </p>
                            </div>
                            <div className="flex justify-between items-center py-3 px-3 border-inherit border-y">
                              <p className="text-sm font-semibold">skUcode</p>
                              <p className="text-sm font-normal text-lightGreen">
                                {item.skUcode}
                              </p>
                            </div>
                            <div className="flex justify-between items-center py-3 px-3 border-inherit border-y">
                              <p className="text-sm font-semibold">brand</p>
                              <p className="text-sm font-normal text-lightGreen">
                                {item.brand}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="bg-white rounded-b-lg sm:flex grid gap-2 justify-end items-center  pb-6 px-8 ">
                    <div className="flex gap-3">
                      <button
                        className=" rounded-lg	border border-inherit py-2.5	px-5 w-full"
                        type="button"
                        onClick={() => previousModal()}
                      >
                        <h5 className="text-base	font-medium text-green	">
                          Back
                        </h5>
                      </button>
                      <button
                        className="rounded-lg	bg-custom-skyBlue py-2.5	px-5 w-full"
                        type="button"
                        onClick={showModal}
                        ref={cancelButtonRef}
                      >
                        <h5 className="text-base	font-medium text-white	">
                          {" "}
                          Import
                        </h5>
                      </button>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-[#00000021] bg-opacity-75 backdrop-blur-md">
          <Spin
            spinning={true}
            size="large"
            style={{
              marginLeft: "16rem",
              width: "35px",
            }}
          />
        </div>
      )}

      <ImportProductModal
        show={showPreviewModal}
        setShow={(set) => setShowPreviewModal(set)}
        error={errList}
        loader={loading}
      />
    </>
  );
}

export default PreviewProductModal;
