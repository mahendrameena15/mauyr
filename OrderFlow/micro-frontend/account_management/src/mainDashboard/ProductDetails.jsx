import React from "react";

import { stockStatus } from "../helpers/stockStatusButton";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import { Skeleton } from "antd";

function ProductDetails({ stock, loading }) {
  return (
    <>
      {stock?.length > 0 ? (
        stock?.map((item, index) => {
          return (
            <>
              <div
                key={index}
                className={`flex justify-between sm:items-center items-end pb-5 productItem-${index}`}
              >
                <div className=" sm:flex items-center  grid  gap-2 justify-center">
                  <div className=" ">
                    <img
                      src={item?.productImageUrls}
                      alt=""
                      className="w-12 h-12"
                    />
                  </div>

                  <div className="">
                    <h5 className="sm:text-base text-sm font-medium  sm:font-semibold">
                      {item?.title}
                    </h5>

                    <p className="sm:text-sm font-light text-xs     sm:font-normal  ">
                      {item?.availableQty} units remaining
                    </p>
                  </div>
                </div>

                {stockStatus(item?.availableQty, item?.stockThreshold)}
              </div>
            </>
          );
        })
      ) : loading ? (
        <div
          style={{
            position: "relative",
            height: "85px",
          }}
        >
          <Skeleton
            paragraph={{ rows: 5 }}
            active
            avatar
            className="custom-skeleton"
            loading={loading}
          />
        </div>
      ) : (
        <div className="flex justify-center items-center h-full">
          <div className="flex justify-center items-center gap-2 flex-col">
            <svg
              style={{ fill: "#808080", width: "60px" }}
              id="Layer_1"
              data-name="Layer 1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 74 100"
            >
              <defs>
                <style
                  dangerouslySetInnerHTML={{
                    __html:
                      "\n      .cls-1 {\n        stroke-width: 0px;\n      }\n    ",
                  }}
                />
              </defs>
              <path
                className="cls-1"
                d="m62,30C62,13.4,50.8,0,37,0S12,13.4,12,30H0l6,70h62l6-70h-12ZM37,4c11.6,0,21,11.7,21,26H16c0-14.3,9.4-26,21-26Zm15,46c0,2.8-2.2,5-5,5s-5-2.2-5-5,2.2-5,5-5,5,2.2,5,5Zm-20,0c0,2.8-2.2,5-5,5s-5-2.2-5-5,2.2-5,5-5,5,2.2,5,5Zm5,12.6c12.4,0,22.5,10.1,22.5,22.5h-5c0-9.6-7.9-17.5-17.5-17.5s-17.5,7.8-17.5,17.5h-5c0-12.4,10.1-22.5,22.5-22.5Z"
              />
            </svg>

            <h5 className="text-base font-medium text-[#808080]">
              No product found
            </h5>
          </div>
        </div>
      )}
    </>
  );
}

export default ProductDetails;
