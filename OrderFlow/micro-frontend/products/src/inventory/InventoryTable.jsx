import React, { useState } from "react";
import ImportProductBtn from "../product/ImportProductBtn";
import EditProductBtn from "../product/EditProductBtn";
import AddProductBtn from "../product/AddProductBtn";
import Sort from "../product/Sort";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import { Button, Table } from "antd";
const InventoryTable = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(false);
  const start = () => {
    setLoading(true);
    // ajax request after empty completing
    setTimeout(() => {
      setSelectedRowKeys([]);
      setLoading(false);
    }, 1000);
  };
  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const columns = [
    {
      title: <h5 className=" text-base font-medium text-[#F4F7FF]">Title</h5>,
      dataIndex: "Title",
      width: 364,
    },
    {
      title: (
        <h5 className=" text-base font-medium text-[#F4F7FF]">SKU Code</h5>
      ),
      dataIndex: "SKUcode",
      width: 200,
    },
    {
      title: <h5 className=" text-base font-medium text-[#F4F7FF]">Status</h5>,
      dataIndex: "Status",
      width: 210,
    },
    {
      title: (
        <div className="flex justify-start gap-3 items-center">
          <h5 className=" text-base font-medium text-[#F4F7FF]">Committed</h5>
          <div className="h-[16px] w-[16px] rounded-full bg-[#E0E0E0] flex justify-center items-center">
            <QuestionMarkIcon style={{ fill: "#147D73", width: "10px" }} />
          </div>
        </div>
      ),

      dataIndex: "Committed",
      width: 160,
    },
    {
      title: (
        <div className="flex justify-start gap-3 items-center">
          <h5 className=" text-base font-medium text-[#F4F7FF]">Available</h5>
          <div className="h-[16px] w-[16px] rounded-full bg-[#E0E0E0] flex justify-center items-center">
            <QuestionMarkIcon style={{ fill: "#147D73", width: "10px" }} />
          </div>
        </div>
      ),
      dataIndex: "Available",
      width: 150,
    },
    {
      title: (
        <div className="flex justify-start gap-3 items-center">
          <h5 className=" text-base font-medium text-[#F4F7FF]">On hand</h5>
          <div className="h-[16px] w-[16px] rounded-full bg-[#E0E0E0] flex justify-center items-center">
            <QuestionMarkIcon style={{ fill: "#147D73", width: "10px" }} />
          </div>
        </div>
      ),
      dataIndex: "OnHand",
      width: 136,
    },
  ];
  const data = [
    {
      Title: "Good Intentions 'Cape  Jaffa' Chardonnay",
      SKUcode: "ABC-12345-S-BL",
      Status: (
        <div className="bg-[#EDF7F1] rounded-[30px] py-1.5 px-3">
          <p className="text-sm font-medium text-[#219653] text-center">
            In stock (120)
          </p>
        </div>
      ),
      Committed: "5",
      Available: (
        <div className="border border-[#CDCED6] rounded-md py-2 px-2">
          <h6 className="text-base font-normal text-[#637381]">100</h6>
        </div>
      ),
      OnHand: 105,
    },
    {
      Title: "Good Intentions 'Cape  Jaffa' Chardonnay",
      SKUcode: "ABC-12345-S-BL",
      Status: (
        <div className="bg-[#F5EEE1] rounded-[30px] py-1.5 px-3">
          <p className="text-sm font-medium text-[#FFA70B] text-center">
            Low stock (10)
          </p>
        </div>
      ),
      Committed: "5",
      Available: (
        <div className="border border-[#CDCED6] rounded-md py-2 px-2">
          <h6 className="text-base font-normal text-[#637381]">100</h6>
        </div>
      ),
      OnHand: 105,
    },
    {
      Title: "Good Intentions 'Cape  Jaffa' Chardonnay",
      SKUcode: "ABC-12345-S-BL",
      Status: (
        <div className="bg-[#FDF5F6] rounded-[30px] py-1.5 px-3">
          <p className="text-sm font-medium text-[#DC3545] text-center">
            Out of stock (0)
          </p>
        </div>
      ),
      Committed: "5",
      Available: (
        <div className="border border-[#CDCED6] rounded-md py-2 px-2">
          <h6 className="text-base font-normal text-[#637381]">100</h6>
        </div>
      ),
      OnHand: 105,
    },
    {
      Title: "Good Intentions 'Cape  Jaffa' Chardonnay",
      SKUcode: "ABC-12345-S-BL",
      Status: (
        <div className="bg-[#EDF7F1] rounded-[30px] py-1.5 px-3">
          <p className="text-sm font-medium text-[#219653] text-center">
            In stock (120)
          </p>
        </div>
      ),
      Committed: "5",
      Available: (
        <div className="border border-[#CDCED6] rounded-md py-2 px-2">
          <h6 className="text-base font-normal text-[#637381]">100</h6>
        </div>
      ),
      OnHand: 105,
    },
    {
      Title: "Good Intentions 'Cape  Jaffa' Chardonnay",
      SKUcode: "ABC-12345-S-BL",
      Status: (
        <div className="bg-[#EDF7F1] rounded-[30px] py-1.5 px-3">
          <p className="text-sm font-medium text-[#219653] text-center">
            In stock (120)
          </p>
        </div>
      ),
      Committed: "5",
      Available: (
        <div className="border border-[#CDCED6] rounded-md py-2 px-2">
          <h6 className="text-base font-normal text-[#637381]">100</h6>
        </div>
      ),
      OnHand: 105,
    },
    {
      Title: "Good Intentions 'Cape  Jaffa' Chardonnay",
      SKUcode: "ABC-12345-S-BL",
      Status: (
        <div className="bg-[#EDF7F1] rounded-[30px] py-1.5 px-3">
          <p className="text-sm font-medium text-[#219653] text-center">
            In stock (120)
          </p>
        </div>
      ),
      Committed: "5",
      Available: (
        <div className="border border-[#CDCED6] rounded-md py-2 px-2">
          <h6 className="text-base font-normal text-[#637381]">100</h6>
        </div>
      ),
      OnHand: 105,
    },
    {
      Title: "Good Intentions 'Cape  Jaffa' Chardonnay",
      SKUcode: "ABC-12345-S-BL",
      Status: (
        <div className="bg-[#EDF7F1] rounded-[30px] py-1.5 px-3">
          <p className="text-sm font-medium text-[#219653] text-center">
            In stock (120)
          </p>
        </div>
      ),
      Committed: "5",
      Available: (
        <div className="border border-[#CDCED6] rounded-md py-2 px-2">
          <h6 className="text-base font-normal text-[#637381]">100</h6>
        </div>
      ),
      OnHand: 105,
    },
    {
      Title: "Good Intentions 'Cape  Jaffa' Chardonnay",
      SKUcode: "ABC-12345-S-BL",
      Status: (
        <div className="bg-[#EDF7F1] rounded-[30px] py-1.5 px-3">
          <p className="text-sm font-medium text-[#219653] text-center">
            In stock (120)
          </p>
        </div>
      ),
      Committed: "5",
      Available: (
        <div className="border border-[#CDCED6] rounded-md py-2 px-2">
          <h6 className="text-base font-normal text-[#637381]">100</h6>
        </div>
      ),
      OnHand: 105,
    },
  ];
  const modifiedData = data.map((item, index) => {
    return {
      key: index,
      Title: (
        <div className="flex justify-start gap-3">
          <div className="h-[50] w-[50] bg-[#D9D9D9]"></div>
          <p className="text-base font-medium text-[#637381]">{item.Title}</p>
        </div>
      ),
      SKUcode: (
        <p className="text-base font-normal text-[#637381]">{item.SKUcode}</p>
      ),
      Status: <>{item.Status}</>,
      Committed: (
        <p className="text-base font-normal text-[#637381]">{item.Committed}</p>
      ),
      Available: <>{item.Available}</>,
      OnHand: (
        <p className="text-base font-medium text-[#637381]">{item.OnHand}</p>
      ),
    };
  });

  return (
    <>
      <div className="px-6">
        <div className="py-6 sm:flex grid items-center justify-between  gap-5">
          <div className="">
            <h4 className=" text-2xl	font-semibold pb-2	text-darkGreen">
              {" "}
              Products
            </h4>
            <p className="text-gray font-medium	 text-sm	">active products</p>
          </div>
          <div className=" flex-wrap	 flex judstify-center items-center gap-2">
            <ImportProductBtn />
            <EditProductBtn />
            <AddProductBtn />
          </div>
        </div>
        <div className="rounded-md border border-inherit bg-white h-full py-3	 px-6">
          <div className=" rounded-md gap-3	  sm:flex grid sm:justify-between items-center">
            <div>
              <div className="relative 	">
                <div className="absolute inset-y-0 right-0 flex items-center pr-1 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  id="default-search"
                  className="block  shadow-md lg:w-96 w-full h-11 p-4 pl-10 text-sm text-gray-900 border  rounded-md  border-inherit  "
                  placeholder="search product"
                  required=""
                  style={{ marginTop: "0px " }}
                />
              </div>
            </div>
            <div className="flex justify-center items-center gap-2">
              <div className="h-11	w-fit px-5 shadow-md cursor-pointer	border  border-inherit rounded-md flex items-center justify-center gap-2">
                <div className="">
                  <svg
                    width={18}
                    height={18}
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M1.13131 2.44682C1.2458 2.2053 1.4931 2.05078 1.76513 2.05078H15.7395C16.0115 2.05078 16.2588 2.2053 16.3733 2.44682C16.4878 2.68833 16.4487 2.97292 16.273 3.17621L10.8485 9.45426V15.044C10.8485 15.281 10.7231 15.5011 10.5171 15.6257C10.3111 15.7503 10.0539 15.7616 9.83727 15.6556L7.0424 14.2879C6.80569 14.1721 6.65616 13.9353 6.65616 13.6763V9.45426L1.23161 3.17621C1.05596 2.97292 1.01682 2.68833 1.13131 2.44682ZM3.27108 3.41848L7.8884 8.76229C7.99507 8.88574 8.0536 9.04219 8.0536 9.20387V13.2536L9.45103 13.9375V9.20387C9.45103 9.04219 9.50956 8.88574 9.61623 8.76229L14.2335 3.41848H3.27108Z"
                      fill="#637381"
                    />
                  </svg>
                </div>
                <h6 className="text-base	font-normal	text-gray">Filter</h6>
              </div>
              <Sort />
            </div>
          </div>
        </div>
        <div className="py-6">
          <Table
            scroll={{
              x: 700,
              y: 500,
            }}
            className="custom-table"
            rowSelection={rowSelection}
            columns={columns}
            dataSource={modifiedData}
          />
        </div>
      </div>
    </>
  );
};

export default InventoryTable;
