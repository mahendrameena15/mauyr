import React, { useState, useRef, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import PreviewProductModal from "./PreviewProductModal";
import * as XLSX from "xlsx";
import { Link } from "@mui/material";
import ErrorFoundModal from "./ErrorFoundModal";
import { saveAs } from "file-saver";

function ImportModal({ show, setShow }) {
  const [addedFile, setAddedFile] = useState(null);
  const [importedProducts, setImportedProducts] = useState([]);
  // const [errorFoundProduct, setErrorFoundProduct] = useState([]);
  const [errorFoundModal, setErrorFoundModal] = useState(false);
  const [errorData, setErrorData] = useState(null);
  const [isOverwrite, setIsOverwrite] = useState(false);

  // Function to handle the file upload
  const handleFileUpload = (evt) => {
    var f = evt.target.files[0];

    if (f) {
      setAddedFile(f);
      var r = new FileReader();
      r.onload = (e) => {
        var workbook = XLSX.read(e.target.result, {
          type: "binary",
        });

        var firstSheet = workbook.SheetNames[0];
        var data = to_json(workbook);
        let productList = [...data[firstSheet]].filter((i) => i.length);
        if (productList.length) {
          localStorage.setItem("productImport", true);
          const dataStructure = [...productList].slice(0, 2);
          const productData = [...productList].slice(2);
          let errorData = [];
          const finalProductArray = productData.map((product, rowIndex) => {
            let tmpObj = {};

            dataStructure[1].forEach((element, index) => {
              tmpObj[element] = product[index];
              if (
                Boolean(!product[index]?.toString()) &&
                dataStructure[0][index] == "Y"
              ) {
                if (!errorData?.[rowIndex]) {
                  errorData[rowIndex] = [];
                }
                errorData[rowIndex] = [...errorData[rowIndex], element];
                // errorData[`row_${rowIndex}`] = {
                //   row: rowIndex,
                //   errors: [errorData.map(ele), element],
                // };
                // errorData.push({ element, rowIndex });
                setErrorFoundModal(true);
                setShow(false);
              }
            });
            return tmpObj;
          });
          setErrorData(errorData);
          setImportedProducts(finalProductArray);
        }
      };
      r.readAsBinaryString(f);
    } else {
    }
  };

  function to_json(workbook) {
    var result = {};
    workbook.SheetNames.forEach(function (sheetName) {
      var roa = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], {
        header: 1,
      });
      if (roa.length) result[sheetName] = roa;
    });
    return result;
  }

  const handleOverwrite = (e) => {
    setIsOverwrite(e.target.checked);
  };

  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const showModal = () => {
    if (addedFile && !errorData?.length > 0) {
      setShowPreviewModal(true);

      setShow(false);
    } else {
      setErrorFoundModal(true);
      setShow(false);
    }
  };

  const cancelButtonRef = useRef(null);
  const handleDownload = () => {
    saveAs(
      "https://fbhdevomsstre.blob.core.windows.net/oms-xlsm-import-templates/OMSProductsBulkImportTemplate.xlsm",
      "products-import-template.xlsm"
    );
  };

  return (
    <>
      <Transition.Root show={show} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-[40]"
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
                <Dialog.Panel className="relative transform overflow-hidden text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-xl	">
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
                          Import products
                        </Dialog.Title>
                      </div>
                    </div>

                    <div className="relative py-6 px-8 ">
                      {addedFile && !errorData?.length ? (
                        <>
                          <div className="pb-4">
                            <p className="text-sm text-lightGreen ">
                              Added file:
                            </p>
                          </div>
                          <div className="flex justify-between items-center py-4 border-y border-inherit">
                            <div className="flex items-center gap-2">
                              <div className="">
                                <svg
                                  width="16"
                                  height="20"
                                  viewBox="0 0 16 20"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M4 16H12V14H4V16ZM4 12H12V10H4V12ZM2 20C1.45 20 0.979167 19.8042 0.5875 19.4125C0.195833 19.0208 0 18.55 0 18V2C0 1.45 0.195833 0.979167 0.5875 0.5875C0.979167 0.195833 1.45 0 2 0H10L16 6V18C16 18.55 15.8042 19.0208 15.4125 19.4125C15.0208 19.8042 14.55 20 14 20H2ZM9 7V2H2V18H14V7H9Z"
                                    fill="#637381"
                                  />
                                </svg>
                              </div>
                              <p className="text-sm font-semibold text-gray">
                                {addedFile.name}
                              </p>
                            </div>
                            <button
                              className=" rounded-lg	border border-inherit py-2.5	px-5 max-w-max	"
                              type="button"
                              onClick={() =>
                                document.getElementById("fileInput").click()
                              }
                            >
                              <h5 className="text-base	font-medium text-green	">
                                Replace
                              </h5>
                            </button>
                            <input
                              id="fileInput"
                              type="file"
                              accept=".csv"
                              onChange={handleFileUpload}
                              className="hidden"
                            />
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="pb-4">
                            <p className="text-sm text-gray-500 text-center">
                              Download a{" "}
                              <span
                                onClick={handleDownload}
                                className="text-blue text-sm font-medium cursor-pointer"
                              >
                                sample CSV template
                              </span>{" "}
                              to see an example of the format required.
                            </p>
                          </div>
                          <div className="border-darkGreen border border-dashed	flex justify-center items-center   bg-slate-100 	 rounded-md	h-44	w-full mt-2 relative">
                            <input
                              type="file"
                              accept=".csv"
                              onChange={handleFileUpload}
                              className={`download-file w-full h-full  absolute opacity-0	`}
                            />
                            <div className="text-center  ">
                              <div className="download-icon relative	mb-3 mx-auto border rounded-full border-inherit bg-white flex justify-center items-center w-10	h-10">
                                <svg
                                  width={16}
                                  height={16}
                                  viewBox="0 0 16 16"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M1.99992 9.33325C2.36811 9.33325 2.66659 9.63173 2.66659 9.99992V12.6666C2.66659 12.8434 2.73682 13.013 2.86185 13.138C2.98687 13.263 3.15644 13.3333 3.33325 13.3333H12.6666C12.8434 13.3333 13.013 13.263 13.138 13.138C13.263 13.013 13.3333 12.8434 13.3333 12.6666V9.99992C13.3333 9.63173 13.6317 9.33325 13.9999 9.33325C14.3681 9.33325 14.6666 9.63173 14.6666 9.99992V12.6666C14.6666 13.197 14.4559 13.7057 14.0808 14.0808C13.7057 14.4559 13.197 14.6666 12.6666 14.6666H3.33325C2.80282 14.6666 2.29411 14.4559 1.91904 14.0808C1.54397 13.7057 1.33325 13.197 1.33325 12.6666V9.99992C1.33325 9.63173 1.63173 9.33325 1.99992 9.33325Z"
                                    fill="#147D73"
                                  />
                                  <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M7.5286 1.52851C7.78894 1.26816 8.21106 1.26816 8.4714 1.52851L11.8047 4.86185C12.0651 5.1222 12.0651 5.54431 11.8047 5.80466C11.5444 6.06501 11.1223 6.06501 10.8619 5.80466L8 2.94273L5.13807 5.80466C4.87772 6.06501 4.45561 6.06501 4.19526 5.80466C3.93491 5.54431 3.93491 5.1222 4.19526 4.86185L7.5286 1.52851Z"
                                    fill="#147D73"
                                  />
                                  <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M7.99992 1.33325C8.36811 1.33325 8.66659 1.63173 8.66659 1.99992V9.99992C8.66659 10.3681 8.36811 10.6666 7.99992 10.6666C7.63173 10.6666 7.33325 10.3681 7.33325 9.99992V1.99992C7.33325 1.63173 7.63173 1.33325 7.99992 1.33325Z"
                                    fill="#147D73"
                                  />
                                </svg>
                              </div>
                              <p className="text-sm	text-gray leading-5 font-normal	">
                                <span className="text-lime-600 	">
                                  Click to upload
                                </span>{" "}
                                or drag and drop
                              </p>
                            </div>
                          </div>
                        </>
                      )}
                    </div>

                    <div className="grid grid-cols-12 items-center  green-checkbox">
                      <input
                        id="default-checkbox"
                        type="checkbox"
                        onChange={handleOverwrite}
                      />
                      <label
                        htmlFor="default-checkbox"
                        className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300 col-span-11"
                      >
                        <p className="text-gray text-sm	 font-normal	">
                          Overwrite any current products that have the same
                          Title and SKU code. Existing values will be used for
                          any missing columns
                        </p>
                      </label>
                    </div>
                  </div>
                  <div className="bg-white rounded-b-lg sm:flex grid gap-2 justify-center items-center sm:justify-between pb-6 px-8 ">
                    <a href="#" className="anchor-blue">
                      <p className="text-blue text-sm font-medium">
                        Need help uploading products?
                      </p>
                    </a>
                    <div className="flex gap-3">
                      <button
                        className=" rounded-lg	border border-inherit py-2.5	px-5 w-full"
                        type="button"
                        onClick={() => setShow(false)}
                      >
                        <h5 className="text-base	font-medium text-green	">
                          Cancel
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
                          Submit
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
      {/* {errorData?.length > 0 && ( */}
      {/* {errorData?.length > 0 && (
       
      )} */}
      <ErrorFoundModal
        importedProducts={importedProducts}
        show={errorFoundModal}
        setShow={(set) => setErrorFoundModal(set)}
        previous={setShow}
        errorData={errorData}
        setErrorData={setErrorData}
        setAddedFile={setAddedFile}
      />
      {/* )} */}

      <PreviewProductModal
        isOverwrite={isOverwrite}
        importedProducts={importedProducts}
        show={showPreviewModal}
        setShow={(set) => setShowPreviewModal(set)}
        previous={setShow}
        setErrorData={setErrorData}
        setAddedFile={setAddedFile}
      />
    </>
  );
}

export default ImportModal;
