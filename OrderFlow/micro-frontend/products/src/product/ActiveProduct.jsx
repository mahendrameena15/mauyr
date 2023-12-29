import React from "react";
import ImportProductBtn from "./ImportProductBtn";
import EditProductBtn from "./EditProductBtn";
import AddProductBtn from "./AddProductBtn";

function ActiveProduct({ activeData, selectedProductsLength, productId }) {
  return (
    <>
      <div className="pb-6 sm:flex grid items-center justify-between px-6 gap-5">
        <div className="">
          <h4 className=" text-2xl	font-semibold pb-2	text-darkGreen">
            {" "}
            Products
          </h4>
          <p className="text-gray font-medium	 text-sm	">
            {activeData} active products
          </p>
        </div>
        <div className=" flex-wrap	 flex judstify-center items-center gap-2">
          <ImportProductBtn />
          {/* <EditProductBtn
            selectedProductsLength={selectedProductsLength}
            productId={productId}
          /> */}
          <AddProductBtn />
        </div>
      </div>
    </>
  );
}

export default ActiveProduct;
