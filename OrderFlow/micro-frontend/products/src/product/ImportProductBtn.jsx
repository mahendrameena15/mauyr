import React, { useState } from "react";
import ImportModal from "../modal/ImportModal";

function ImportProductBtn() {
  const [show, setShow] = useState(false);
  const showModal = () => {
    setShow(true);
  };
  // const [showModal, setShowModal] = useState(false);
  return (
    <>
      <button
        type="button"
        className="shadow-md border-inherit border rounded	w-28		h-10	flex justify-center items-center text-base	font-medium	"
        onClick={showModal}
      >
        <h6 className="text-gray">Import</h6>
      </button>

      <ImportModal show={show} setShow={(set) => setShow(set)} />
    </>
  );
}

export default ImportProductBtn;
