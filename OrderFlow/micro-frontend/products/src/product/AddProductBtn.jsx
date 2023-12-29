import React from "react";
import { useNavigate } from "react-router-dom";

function AddProductBtn() {
  const navigate = useNavigate();
  return (
    <>
      <button
        onClick={() => navigate("/main/products/add-product")}
        className=" cursor-pointer	bg-custom-darkGreen border rounded 	w-32	h-10	flex justify-center items-center text-base	font-medium	"
      >
        <h6 className="text-white">Add product</h6>
      </button>
    </>
  );
}

export default AddProductBtn;
