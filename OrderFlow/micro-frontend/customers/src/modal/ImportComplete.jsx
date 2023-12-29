import React, { useState, useRef, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import CloseIcon from "@mui/icons-material/Close";

function ImportComplete({ show, setShow }) {
  const cancelButtonRef = useRef(null);

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
            <div className="fixed inset-0 bg-[#0000] bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-[40] overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center  sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden  text-left shadow-xl transition-all  w-[211px]	">
                  <div
                    className="bg-[#2B4447] px-[25px] py-[12px] "
                    style={{ padding: "12px 25px", background: "#2B4447" }}
                  >
                    <div className=" flex justify-between items-center gap-2">
                      <div onClick={() => setShow(false)}>
                        <CloseIcon style={{ fill: "#fff", width: "15px" }} />
                      </div>
                      <p className="text-sm text-white  font-semibold">
                        Import complete!
                      </p>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}

export default ImportComplete;
