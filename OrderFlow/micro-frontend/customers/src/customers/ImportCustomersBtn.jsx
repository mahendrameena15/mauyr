import React, { useState } from "react";
import ImportModal from "../modal/ImportModal";
function ImportCustomersBtn() {
  const [show, setShow] = useState(false);
  const showModal = () => {
    setShow(true);
  };

  return (
    <>
      <button
        type="button"
        className="cursor-pointer	 shadow-md border-inherit border rounded	w-fit px-4		h-10	flex justify-center items-center text-base	font-medium	"
        onClick={showModal}
      >
        <h6 className="text-gray">Import</h6>
      </button>
      <ImportModal show={show} setShow={(set) => setShow(set)} />
    </>
  );
}

export default ImportCustomersBtn;
