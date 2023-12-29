import React from "react";
import { useNavigate } from "react-router-dom";

function AddProductHeader() {
  const navigate = useNavigate();

  return (
    <>
      <div className="pb-6 sm:flex grid items-center justify-between px-6 gap-5">
        <div className="flex justify-start gap-3 items-center">
          <div className="">
            <button
              onClick={() => navigate("/main/products/all-products")}
              className=""
            >
              <img alt="" src="/assets/previousBtn.png" />
            </button>
          </div>
          <h4 className=" text-2xl font-semibold	text-darkGreen">
            Add product{" "}
          </h4>
        </div>
      </div>
    </>
  );
}

export default AddProductHeader;
