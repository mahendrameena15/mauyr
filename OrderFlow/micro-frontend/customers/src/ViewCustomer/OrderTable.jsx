import React from "react";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { formatDate } from "../helper/formateDate";
import { json, useNavigate } from "react-router-dom";

function OrderTable({ allOrder }) {
  const tableItem = Array.from({ length: 8 });
  const navigate = useNavigate();

  return (
    <>
      {allOrder?.map((product, index) => {
        return (
          <tr
            key={index}
            className={`bg-white border-b  dark:border-gray-700 bg-violet-600  tableNo-${index} cursor-pointer`}
            onClick={() =>
              navigate(`/main/orders/order-details/${product?.orderId}`)
            }
          >
            <td className=" px-6 py-4 ">
              <h5 className="font-medium whitespace-no-wrap text-gray">
                {product?.orderId}
              </h5>
            </td>
            <td className="px-6 py-4">
              <h5 className="font-normal whitespace-no-wrap text-gray">
                ${product?.payAmountLong}
              </h5>
            </td>
            <td className="px-6 py-4">
              <h5 className="font-normal whitespace-no-wrap text-gray">
                {formatDate(product?.orderEntryDate)}
              </h5>
            </td>
            <td className="px-6 py-4">
              <h5 className="font-normal whitespace-no-wrap text-gray">
                {formatDate(product?.modifiedDate)}
              </h5>
            </td>

            <td className="px-6 py-4">
              <div className="flex items-center gap-1 radius-30 bg-custom-green h-7	w-32">
                <p className="text-gray font-normal		text-sm	">
                  {product?.orderStatus}
                </p>
              </div>
            </td>
            <td className="px-6 py-4 ">
              <ChevronRightIcon />
            </td>
          </tr>
        );
      })}
    </>
  );
}

export default OrderTable;
