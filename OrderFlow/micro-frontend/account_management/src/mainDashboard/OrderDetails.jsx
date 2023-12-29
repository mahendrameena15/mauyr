import React from "react";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../helpers/Dateformate";
import { Skeleton } from "antd";
function OrderDetails({ orderDetails, loading }) {
  const navigate = useNavigate();

  const handleClick = (id) => {
    navigate(`/main/orders/order-details/${id}`);
  };

  return (
    <>
      {orderDetails?.length > 0 ? (
        orderDetails?.map((value, index) => {
          return (
            <tr key={index} className={`orderNo-${index}`}>
              <td className="px-4 py-4 border-b border-gray-200 text-base ">
                <h5 className="sm:font-normal font-light text-xs sm:text-sm whitespace-no-wrap text-gray">
                  {value?.orderId}
                </h5>
              </td>

              <td className="px-4 py-4 border-b border-gray-200   ">
                <h5 className="sm:font-semibold font-semibold text-xs sm:text-sm whitespace-no-wrap text-gray">
                  {value?.businessName}
                </h5>

                <p className="text-xs sm:text-sm sm:font-normal font-light text-gray">
                  {" "}
                  ({value?.orderingFirstName} {value?.orderingLastName})
                </p>
              </td>

              <td className="px-4 py-4 border-b border-gray-200   ">
                <h5 className="sm:font-normal font-light text-xs sm:text-sm whitespace-no-wrap text-gray">
                  ${value?.payAmountLong}
                </h5>
              </td>

              <td className="px-4 py-4 border-b border-gray-200   ">
                <h5 className="sm:font-normal  text-xs sm:text-sm whitespace-no-wrap text-gray">
                  {formatDate(value?.orderEntryDate)}
                </h5>
              </td>

              <td className="px-4 py-4 border-b border-gray-200   ">
                <div
                  className="rounded-md flex justify-center px-2 py-1"
                  style={{
                    backgroundColor: (() => {
                      if (
                        value.orderStatus === "Complete" ||
                        value?.orderStatus === "Delivered"
                      ) {
                        return "#CFEBE6";
                      } else if (
                        value?.orderStatus === "Pending" ||
                        value?.orderStatus === "InProcess" ||
                        value?.orderStatus === "Processing"
                      ) {
                        return "#F8F1E5";
                      } else if (value?.orderStatus === "Updated") {
                        return "#D5EEFF";
                      } else if (value?.orderStatus === "Cancelled") {
                        return "#FFDFDB";
                      } else if (value?.orderStatus === "New") {
                        return "#F1F3FE";
                      }
                      // Default background color if none of the conditions match
                      return "transparent";
                    })(),
                    color: (() => {
                      if (
                        value.orderStatus === "Complete" ||
                        value?.orderStatus === "Delivered"
                      ) {
                        return "#CFEBE6";
                      } else if (
                        value?.orderStatus === "Pending" ||
                        value?.orderStatus === "InProcess" ||
                        value?.orderStatus === "Processing"
                      ) {
                        return "#FFA70B";
                      } else if (value?.orderStatus === "Updated") {
                        return "#D5EEFF";
                      } else if (value?.orderStatus === "Cancelled") {
                        return "#D34053";
                      } else if (value?.orderStatus === "New") {
                        return "#4A6CF7";
                      }
                      // Default background color if none of the conditions match
                      return "transparent";
                    })(),
                  }}
                >
                  {value.orderStatus}
                </div>
              </td>

              <td className="px-4 py-4 border-b border-gray-200   ">
                <div>
                  <span
                    onClick={() => handleClick(value.orderId)}
                    className="cursor-pointer border-darkGreen text-darkGreen border rounded w-32    h-10    flex justify-center items-center text-base  font-medium"
                  >
                    Review Order
                  </span>
                </div>
              </td>
            </tr>
          );
        })
      ) : loading ? (
        <tr
          style={
            loading
              ? { position: "relative", height: "400px" }
              : { position: "relative" }
          }
        >
          <td colSpan="6" className="text-center">
            <Skeleton
              style={{
                padding: "10px",

                width: "95%",

                position: "absolute",

                top: "20px",

                left: "14px",
              }}
              paragraph={{ rows: 9 }}
              active
              avatar
              className="custom-skeleton"
              loading={loading}
            />
          </td>
        </tr>
      ) : (
        <tr>
          <td colSpan="6" className="text-center">
            <div className="flex items-center justify-center h-[200px] no-data flex-col">
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

              <h5 className="text-[#808080] text-lg font-medium">No Data</h5>
            </div>
          </td>
        </tr>
      )}
    </>
  );
}

export default OrderDetails;
