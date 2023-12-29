import React from "react";
import { Table, Collapse, Checkbox, Dropdown, Space, Menu } from "antd";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import SortOutlinedIcon from "@mui/icons-material/SortOutlined";

const NewOrders = () => {
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
  const newColumns = [
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
      title: <h5 className="text-base font-semibold text-[#2B4447]">Status</h5>,
      dataIndex: "Status",
      width: 150,
    },
  ];
  const newData = [];
  for (let i = 0; i < 100; i++) {
    newData.push({
      key: i,
      OrderID: <p className="text-[15px] font-medium text-[#637381]">#23456</p>,
      Customer: (
        <p className="text-[15px] font-medium text-[#637381]">
          Lofi Wines xxxxxx
        </p>
      ),
      Region: (
        <p className="text-[15px] font-medium text-[#637381]">Sydney, NSW</p>
      ),
      OrderDate: (
        <p className="text-[15px] font-medium text-[#637381]">19/11/2023</p>
      ),
      Amount: (
        <p className="text-[15px] font-medium text-[#637381]">$2345.00</p>
      ),
      Status: (
        <div className="bg-[#D5EEFF]  rounded-md py-[4px] px-[8px] w-[150px]  ">
          <p className="text-[#3498DB] text-[base] font-medium text-center">
            New
          </p>
        </div>
      ),
    });
  }
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
      {/* <div className="pb-5 flex justify-end">
      <button className="border-[#E7E7E7] border rounded-md py-2 px-4 max-w-max flex justify-center items-center gap-2	">
        <SortOutlinedIcon style={{ fill: "#637381" }} />
        <p className="text-base font-normal text-[#2B4447]">
          Sort
        </p>
        <KeyboardArrowDownIcon
          style={{ fill: "#2B4447" }}
          className=""
        />
      </button>
    </div> */}
      <div className="custom-table-pagination">
        <Table
          columns={newColumns}
          dataSource={newData}
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

export default NewOrders;
