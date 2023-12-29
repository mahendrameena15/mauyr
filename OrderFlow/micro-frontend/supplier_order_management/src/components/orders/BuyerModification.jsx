import React from "react";
import { Table, Collapse, Checkbox, Dropdown, Space, Menu } from "antd";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import SortOutlinedIcon from "@mui/icons-material/SortOutlined";
import { DownOutlined } from "@ant-design/icons";

const BuyerModification = () => {
  const items = [
    {
      key: "1",
      type: "group",
      label: (
        <div className="flex justify-between items-center my-2  ">
          <h5 className="text-base font-medium text-[#2B4447]">Order ID</h5>
          <KeyboardArrowDownIcon style={{ fill: "#2B4447" }} />
        </div>
      ),
      children: [
        {
          key: "1-1",
          label: (
            <Checkbox className="text-base font-normal text-[#637381]">
              A -Z
            </Checkbox>
          ),
        },
        {
          key: "1-2",
          label: (
            <Checkbox className="text-base font-normal text-[#637381]">
              Z - A
            </Checkbox>
          ),
        },
      ],
    },
    {
      key: "2",
      type: "group",
      label: (
        <div className="flex justify-between items-center  my-2">
          <h5 className="text-base font-medium text-[#2B4447]">Date</h5>
          <KeyboardArrowDownIcon style={{ fill: "#2B4447" }} />
        </div>
      ),
      children: [
        {
          key: "1-3",
          label: (
            <Checkbox className="text-base font-normal text-[#637381]">
              Oldest - Newest
            </Checkbox>
          ),
        },
        {
          key: "1-4",
          label: (
            <Checkbox className="text-base font-normal text-[#637381]">
              Newest - Oldest
            </Checkbox>
          ),
        },
      ],
    },

    {
      key: "3",
      type: "group",
      label: (
        <div className="flex justify-between items-center  my-2">
          <h5 className="text-base font-medium text-[#2B4447]">
            Customer Name
          </h5>
          <KeyboardArrowDownIcon style={{ fill: "#2B4447" }} />
        </div>
      ),
      children: [
        {
          key: "1-7",
          label: (
            <Checkbox className="text-base font-normal text-[#637381]">
              A -Z
            </Checkbox>
          ),
        },
        {
          key: "1-8",
          label: (
            <Checkbox className="text-base font-normal text-[#637381]">
              Z - A
            </Checkbox>
          ),
        },
      ],
    },
    {
      key: "4",
      type: "group",
      label: (
        <div className="flex justify-between items-center  my-2">
          <h5 className="text-base font-medium text-[#2B4447]">Order Amount</h5>
          <KeyboardArrowDownIcon style={{ fill: "#2B4447" }} />
        </div>
      ),
      children: [
        {
          key: "1-9",
          label: (
            <Checkbox className="text-base font-normal text-[#637381]">
              Low - High
            </Checkbox>
          ),
        },
        {
          key: "1-10",
          label: (
            <Checkbox className="text-base font-normal text-[#637381]">
              High - Low
            </Checkbox>
          ),
        },
      ],
    },
  ];
  const buyerColumns = [
    {
      title: (
        <h5 className="text-base font-semibold text-[#2B4447]">Order ID</h5>
      ),
      dataIndex: "OrderID",
      width: 100,
    },
    {
      title: (
        <h5 className="text-base font-semibold text-[#2B4447]">Customer</h5>
      ),
      dataIndex: "Customer",
      width: 160,
    },
    {
      title: <h5 className="text-base font-semibold text-[#2B4447]">Region</h5>,
      dataIndex: "Region",
      width: 150,
    },
    {
      title: (
        <h5 className="text-base font-semibold text-[#2B4447]">Order Date</h5>
      ),
      dataIndex: "OrderDate",
      width: 120,
    },
    {
      title: <h5 className="text-base font-semibold text-[#2B4447]">Amount</h5>,
      dataIndex: "Amount",
      width: 120,
    },
    {
      title: (
        <h5 className="text-base font-semibold text-[#2B4447]">Last Updated</h5>
      ),
      dataIndex: "LastUpdated",
      width: 180,
    },
    {
      title: (
        <h5 className="text-base font-semibold text-[#2B4447]">Payment</h5>
      ),
      dataIndex: "Payment",
      width: 120,
    },
    {
      title: <h5 className="text-base font-semibold text-[#2B4447]">Status</h5>,
      dataIndex: "Status",
      width: 200,
    },
  ];

  const buyerData = [
    {
      Customer: " Lofi Wines xxxxxx",
      OrderID: "#23456",
      Region: "Sydney, NSW",
      OrderDate: "19/11/2023",
      Payment: "Pending",
      LastUpdated: "19/11/2023",
      Amount: "$2345.00",
      Status: (
        <div className="bg-[#FFF4C9] rounded-md py-[4px] px-[8px] 	w-[166px]  ">
          <p className="text-[#E9B600] text-[base] font-medium">
            Changes requested
          </p>
        </div>
      ),
    },
    {
      Customer: " Lofi Wines xxxxxx",
      OrderID: "#23456",
      Region: "Sydney, NSW",
      LastUpdated: "19/11/2023",
      OrderDate: "19/11/2023",
      Payment: "Pending",
      Amount: "$2345.00",
      Status: (
        <div className="bg-[#FFF4C9] rounded-md py-[4px] px-[8px] 	w-[166px]  ">
          <p className="text-[#E9B600] text-[base] font-medium text-center">
            Changes requested
          </p>
        </div>
      ),
    },
    {
      Customer: " Lofi Wines xxxxxx",
      OrderID: "#23456",
      LastUpdated: "19/11/2023",
      Region: "Sydney, NSW",
      OrderDate: "19/11/2023",
      Payment: "Pending",
      Amount: "$2345.00",
      Status: (
        <div className="bg-[#FFF4C9] rounded-md py-[4px] px-[8px] 	w-[166px]  ">
          <p className="text-[#E9B600] text-[base] font-medium text-center">
            Changes requested
          </p>
        </div>
      ),
    },
    {
      Customer: " Lofi Wines xxxxxx",
      OrderID: "#23456",
      Region: "Sydney, NSW",
      OrderDate: "19/11/2023",
      Payment: "Pending",
      LastUpdated: "19/11/2023",
      Amount: "$2345.00",
      Status: (
        <div className="bg-[#D5EEFF] rounded-md py-[4px] px-[8px] 	w-[166px]  ">
          <p className="text-[#3498DB] text-[base] font-medium text-center">
            Updated
          </p>
        </div>
      ),
    },
    {
      Customer: " Lofi Wines xxxxxx",
      OrderID: "#23456",
      Region: "Sydney, NSW",
      OrderDate: "19/11/2023",
      LastUpdated: "19/11/2023",
      Payment: "Pending",
      Amount: "$2345.00",
      Status: (
        <div className="bg-[#D5EEFF] rounded-md py-[4px] px-[8px] 	w-[166px]  ">
          <p className="text-[#3498DB] text-[base] font-medium text-center">
            Updated
          </p>
        </div>
      ),
    },
  ];

  buyerData.map((item, index) => {
    return {
      key: index,
      OrderID: (
        <p className="text-[15px] font-medium text-[#637381]">{item.OrderID}</p>
      ),
      Customer: (
        <p className="text-[15px] font-medium text-[#637381]">
          {item.Customer}
        </p>
      ),
      Region: (
        <p className="text-[15px] font-medium text-[#637381]">{item.Region}</p>
      ),
      OrderDate: (
        <p className="text-[15px] font-medium text-[#637381]">
          {item.OrderDate}
        </p>
      ),
      LastUpdated: (
        <p className="text-[15px] font-medium text-[#637381]">
          {item.LastUpdated}
        </p>
      ),
      Amount: (
        <p className="text-[15px] font-medium text-[#637381]">{item.Amount}</p>
      ),
      Status: (
        <p className="text-[#637381] text-[base] font-medium">{item.Status}</p>
      ),
    };
  });
  return (
    <>
      <div className="w-full">
        <div className="relative text-right mb-3">
          <Dropdown
            menu={{
              items,
            }}
            trigger={["click"]}
          >
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                <button className="border-[#E7E7E7] border rounded-md py-2 px-4 max-w-max flex justify-center items-center gap-2	">
                  <SortOutlinedIcon style={{ fill: "#637381" }} />
                  <p className="text-base font-normal text-[#2B4447]">Sort</p>
                  <KeyboardArrowDownIcon
                    style={{ fill: "#2B4447" }}
                    className=""
                  />
                </button>
              </Space>
            </a>
          </Dropdown>
        </div>
      </div>
      <div className="custom-table-pagination">
        <Table
          columns={buyerColumns}
          dataSource={buyerData}
          showSizeChanger={false}
          pagination={{
            showSizeChanger: false,
          }}
          scroll={{
            y: 240,
          }}
        />
      </div>
    </>
  );
};

export default BuyerModification;
