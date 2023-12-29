import React, { useState, useRef, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import ImportComplete from "./ImportComplete";

function ImportCustomerModal({ show, setShow, error, success }) {
  const [showCompleteModal, setShowCompleteModal] = useState(false);
  const cancelButtonRef = useRef(null);
  const remove = () => {
    if (success) {
      setShow(false);
      setShowCompleteModal(true);
      const timeout = setTimeout(() => {
        setShowCompleteModal(false);
      }, 3000);
      return () => clearTimeout(timeout);
    } else {
      setShow(false);
    }
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

          <div className="fixed   inset-0 z-10 overflow-y-auto">
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
                  {error?.length === 0 && (
                    <div className="bg-white px-8 pb-8 pt-6 sm:p-6 sm:pb-4 rounded-t-lg">
                      <div className="sm:flex sm:items-center">
                        <div className="">
                          <img src="/assets/import-icon.png" alt="" />
                        </div>
                        <div className=" text-center sm:ml-4 sm:mt-0 sm:text-left">
                          <Dialog.Title
                            as="h3"
                            className="text-base font-semibold leading-6 text-gray-900"
                          >
                            Import customer
                          </Dialog.Title>
                        </div>
                      </div>

                      <div className="mt-2">
                        <p className="text-sm text-green  font-semibold">
                          We are currently importing your customer into FOBOH..
                        </p>
                      </div>
                      <div className="bg-white rounded-b-lg sm:flex grid gap-2 justify-center items-center sm:justify-between pb-6 px-8 ">
                        <p
                          className="text-gray text-sm font-medium"
                          style={{ marginTop: "1rem" }}
                        >
                          This could take some time to complete. In the
                          meantime, you can close this dialog box and continue
                          working.
                        </p>

                        <div
                          className="flex gap-3"
                          style={{ marginTop: "1rem" }}
                        >
                          <button
                            className=" rounded-lg	border border-inherit py-2.5	px-5 w-full"
                            type="button"
                            onClick={() => remove()}
                          >
                            <h5 className="text-base	font-medium text-green	">
                              Close
                            </h5>
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                  {error?.length > 0 && (
                    <div
                      className="bg-white px-8 pb-8 pt-8 sm:p-6 sm:pb-4 rounded-t-lg"
                      style={{ maxHeight: "451px", overflowY: "scroll" }}
                    >
                      <div className="sm:flex sm:items-center">
                        <div
                          className=" w-[48px] h-[48px] rounded-full flex justify-center items-center bg-[#FED4C7]"
                          style={{
                            background: "#FED4C7",
                            height: "48px",
                            width: "48px",
                            borderRadius: "100%",
                            border: "4px solid #FFE9E3",
                          }}
                        >
                          <WarningAmberIcon style={{ fill: "#DC3545" }} />
                        </div>
                        <div className=" text-center sm:ml-4 sm:mt-0 sm:text-left">
                          <Dialog.Title
                            as="h3"
                            className="text-base font-semibold leading-6 text-gray-900"
                          >
                            Errors found
                          </Dialog.Title>
                        </div>
                      </div>
                      <div className="mt-2">
                        <div
                          className="my-4 rounded-md	border-y	border-r	border-l-8	border-y-custom	border-left-red py-3 px-4 border-r-custom	"
                          style={{ background: "#FDF5F6" }}
                        >
                          <p className="text-sm font-normal">
                            <span className="font-bold">
                              {error?.length > 1
                                ? `${error?.length} customers`
                                : `${error?.length} customer`}
                            </span>{" "}
                            have errors that need correcting before importing.
                            After you fix the errors, try importing the file
                            again
                          </p>
                        </div>
                      </div>
                      <table
                        className="table-auto"
                        style={{
                          borderRadius: "8px",
                          border: "1px solid #EEEEEE",
                          width: "100%",
                        }}
                      >
                        <thead
                          style={{
                            background: "#F9FAFB",
                            borderBottom: "1px solid #EEEEEE",
                          }}
                        >
                          <tr>
                            <th
                              className="font-semiBold text-sm  p-4"
                              style={{ width: "35px" }}
                            >
                              {" "}
                              Row
                            </th>
                            <th
                              className="font-semiBold text-sm p-4"
                              style={{ width: "200px" }}
                            >
                              Error description
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {error?.map((err, index) => (
                            <tr
                              key={index}
                              style={{ borderBottom: "1px solid #EEEEEE" }}
                            >
                              <td className="font-medium text-sm p-4">
                                {err?.row}
                              </td>

                              <td className="font-normal text-sm p-4">
                                {err?.error}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      <div
                        style={{ justifyContent: "end" }}
                        className="bg-white rounded-b-lg flex gap-2 justify-end items-center sm:justify-between pb-6 px-8 "
                      >
                        <div
                          className="flex gap-3"
                          style={{ marginTop: "1rem" }}
                        >
                          <button
                            className=" rounded-lg	border border-inherit py-2.5	px-5 w-full"
                            type="button"
                            onClick={() => remove()}
                          >
                            <h5 className="text-base	font-medium text-green	">
                              Close
                            </h5>
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
      <ImportComplete
        show={showCompleteModal}
        setShow={(set) => setShowCompleteModal(set)}
      />
    </>
  );
}

export default ImportCustomerModal;
