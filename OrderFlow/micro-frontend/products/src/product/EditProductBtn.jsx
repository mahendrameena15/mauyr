import React from "react";
import { useNavigate } from "react-router-dom";

function EditProductBtn({ selectedProductsLength, productId }) {
  const navigate = useNavigate();

  const handlelength = (e) => {};

  return (
    <>
      {selectedProductsLength === 1 && (
        <button
          type="button"
          onClick={() => navigate(`/main/products/view-product/${productId}`)}
          className="border-darkGreen shadow-md border rounded	w-32	h-10	flex justify-center items-center text-base	font-medium	"
        >
          <h6 className="text-darkGreen">Edit products</h6>
        </button>
      )}
    </>
  );
}

export default EditProductBtn;
