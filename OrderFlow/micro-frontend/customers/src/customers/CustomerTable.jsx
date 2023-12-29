import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
function CustomerTable({ tableRecords }) {
  const navigate = useNavigate();
  const handleCustomerId = (item) => {
    navigate(`/main/customers/view-customer-details/`, {
      state: { data: item },
    });
  };
  return (
    <>
      {tableRecords?.length > 0 &&
        tableRecords.map((item, index) => {
          return (
            <tr
              key={index}
              className={`bg-white border-b  dark:border-gray-700 hover:bg-gray-50  tableNo-${index}`}
            >
              <td className="w-4 p-4">
                <div className="flex items-center">
                  <input
                    id="default-checkbox"
                    type="checkbox"
                    defaultValue=""
                    className="w-4 h-4 text-darkGreen bg-gray-100 border-gray-300 rounded  dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
              </td>

              <th
                scope="row"
                className="flex justify-center items-center gap-3 px-6 py-4 whitespace-nowrap dark:text-white"
              >
                {/* <img
                src="/assets/defaultRange.png"
                alt=""
                className=" mx-auto object-contain	"
              /> */}

                <h5
                  onClick={() => handleCustomerId(item)}
                  className="font-normal	 whitespace-no-wrap text-gray cursor-pointer"
                >
                  {" "}
                  {item?.BusinessName}
                </h5>
              </th>
              <td className="px-6 py-4">
                <h5 className="font-medium whitespace-no-wrap text-gray">
                  {" "}
                  {item?.BusinessName}{" "}
                </h5>
                <p className="text-gray font-normal text-sm">
                  {item?.OrderingEmail}
                </p>
              </td>
              <td className="px-6 py-4">
                <h5 className="font-normal	 whitespace-no-wrap text-gray">
                  {item?.Address}, {item?.State}
                </h5>
              </td>
              <td className="px-6 py-4">
                {" "}
                {isActive === 1 ? (
                  <div className="flex justify-center items-center gap-1 radius-30 bg-custom-green h-7	w-32		px-3">
                    <p className="text-green-dark font-normal		text-sm	">Active</p>
                  </div>
                ) : (
                  <div className="flex justify-center items-center gap-1 radius-30 bg-custom-red h-7	w-32		px-3">
                    <p className="text-red-dark font-normal		text-sm	">InActive</p>
                  </div>
                )}
              </td>
              <td className="px-6 py-4">
                <h5 className="font-normal	 whitespace-no-wrap text-gray">
                  10 orders
                </h5>
              </td>
              <td className="px-6 py-4 ">
                <p className="text-sm	font-normal		 whitespace-no-wrap text-gray">
                  $5600
                </p>
              </td>
            </tr>
          );
        })}
    </>
  );
}

export default CustomerTable;
