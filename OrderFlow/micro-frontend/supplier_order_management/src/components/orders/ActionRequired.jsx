import { React, useState } from "react";
import { Table, Collapse } from "antd";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import SortOutlinedIcon from "@mui/icons-material/SortOutlined";
import { useEffect } from "react";
import { Space, Menu } from "antd";
import { formatDate } from "../../helpers/dateFormate";
import { useNavigate } from "react-router-dom";
const { SubMenu } = Menu;

const ActionRequired = () => {
  const omsSupplierUrl = process.env.REACT_APP_OMS_SUPPLIER_URL;
  const [page, setPage] = useState(1);
  const [newTotalData, setNewTotalData] = useState();
  const [newTotalPendding, setNewTotalPendding] = useState();
  const [newTotalModification, setNewTotalModification] = useState();
  const [orderNewOrder, setOrderNewOrder] = useState([]);
  const [modification, setModification] = useState([]);
  const [pendding, setpendding] = useState([]);
  const [newSortItem, setNewSortItem] = useState(false);
  const [pandingSortItem, setPandingSortItem] = useState(false);
  const [buyerSortItem, setBuyerSortItem] = useState(false);
  const navigate = useNavigate();
  const newSortBtn = () => {
    setNewSortItem(!newSortItem);
    setPandingSortItem(false);
    setBuyerSortItem(false);
  };

  const pandingSortBtn = () => {
    setPandingSortItem(!pandingSortItem);
    setNewSortItem(false);
    setBuyerSortItem(false);
  };
  const buyerSortBtn = () => {
    setBuyerSortItem(!buyerSortItem);
    setNewSortItem(false);
    setPandingSortItem(false);
  };

  const newColumns = [
    {
      title: (
        <h5 className="text-base font-semibold text-[#2B4447]">Order ID</h5>
      ),
      dataIndex: "OrderID",
      width: 130,
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
  const newOrder = orderNewOrder?.map((item, index) => {
    return {
      key: index,
      OrderID: (
        <p
          onClick={() => navigate(`/main/orders/order-details/${item.orderId}`)}
          className="text-[15px] font-medium text-[#637381] cursor-pointer"
        >
          {item.orderId}
        </p>
      ),
      Customer: (
        <p
          onClick={() => navigate(`/main/orders/order-details/${item.orderId}`)}
          className="text-[15px] font-medium text-[#637381] cursor-pointer"
        >
          {item.customerName}
        </p>
      ),
      Region: (
        <p className="text-[15px] font-medium text-[#637381]">{item.region}</p>
      ),
      OrderDate: (
        <p className="text-[15px] font-medium text-[#637381]">
          {formatDate(item.orderEntryDate)}
        </p>
      ),
      Amount: (
        <p className="text-[15px] font-medium text-[#637381]">
          ${item.payAmountLong}
        </p>
      ),
      Status: (
        <div className="bg-[#D5EEFF]  rounded-md py-[4px] px-[8px] w-[150px]  ">
          <p className="text-[#3498DB] text-[base] font-medium text-center">
            {item.orderStatus}
          </p>
        </div>
      ),
    };
  });

  const pandingColumns = [
    {
      title: (
        <h5 className="text-base font-semibold text-[#2B4447]">Order ID</h5>
      ),
      dataIndex: "OrderID",
      width: 130,
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
      width: 180,
    },
  ];
  const penddingData = pendding?.map((item, index) => {
    return {
      key: index,
      OrderID: (
        <p
          onClick={() => navigate(`/main/orders/order-details/${item.orderId}`)}
          className="text-[15px] font-medium text-[#637381] cursor-pointer"
        >
          {item.orderId}
        </p>
      ),
      Customer: (
        <p
          onClick={() => navigate(`/main/orders/order-details/${item.orderId}`)}
          className="text-[15px] font-medium text-[#637381] cursor-pointer"
        >
          {item.customerName}
        </p>
      ),
      Region: (
        <p className="text-[15px] font-medium text-[#637381]">{item.region}</p>
      ),
      OrderDate: (
        <p className="text-[15px] font-medium text-[#637381]">
          {formatDate(item.orderEntryDate)}
        </p>
      ),
      Amount: (
        <p className="text-[15px] font-medium text-[#637381]">
          ${item.payAmountLong}
        </p>
      ),
      Status: (
        <div className="bg-[#C9C9C9] rounded-md py-[4px] px-[8px] w-[166px]	  ">
          <p className="text-[#637381] text-[base] font-medium text-center">
            {item.orderStatus}
          </p>
        </div>
      ),
    };
  });

  const buyerColumns = [
    {
      title: (
        <h5 className="text-base font-semibold text-[#2B4447]">Order ID</h5>
      ),
      dataIndex: "OrderID",
      width: 130,
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

  const modificationData = modification?.map((item, index) => {
    return {
      key: index,
      OrderID: (
        <p
          onClick={() => navigate(`/main/orders/order-details/${item.orderId}`)}
          className="text-[15px] font-medium text-[#637381] cursor-pointer"
        >
          {item.orderId}
        </p>
      ),
      Customer: (
        <p
          onClick={() => navigate(`/main/orders/order-details/${item.orderId}`)}
          className="text-[15px] font-medium text-[#637381] cursor-pointer"
        >
          {item.customerName}
        </p>
      ),
      Region: (
        <p className="text-[15px] font-medium text-[#637381]">{item.Region}</p>
      ),
      OrderDate: (
        <p className="text-[15px] font-medium text-[#637381]">
          {formatDate(item.orderEntryDate)}
        </p>
      ),
      Amount: (
        <p className="text-[15px] font-medium text-[#637381]">
          ${item.payAmountLong}
        </p>
      ),
      Status: (
        <p className="text-[#637381] text-[base] font-medium">
          {item.orderStatus}
        </p>
      ),
    };
  });

  const onShowSizeChange = (current, pageSize) => {
    setPage(current.current);
  };

  useEffect(() => {
    const orgId = localStorage.getItem("organisationId");
    fetch(
      `${omsSupplierUrl}/api/OMSupplier/OMSupplier/getNew?page=${page}&OrganisationId=${orgId}`,
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setOrderNewOrder(data.data);
        setNewTotalData(data.total);
      })
      .catch((error) => console.log(error));

    fetch(
      `${omsSupplierUrl}/api/OMSupplier/OMSupplier/getPending?page=${page}&OrganisationId=${orgId}`,
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setpendding(data.data);
        setNewTotalPendding(data.total);
      })
      .catch((error) => console.log(error));

    fetch(
      `${omsSupplierUrl}/api/OMSupplier/OMSupplier/getBuyerModification?page=${page}&OrganisationId=${orgId}`,
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setModification(data.data);
        setNewTotalModification(data.total);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      <div className="custom-collapse py-5 hidden">
        <Space direction="vertical" className="w-full ">
          <Collapse
            // expandIcon={({ isActive }) => null}
            collapsible="header "
            headerBg="#fff"
            className="w-full "
            items={[
              {
                key: "1",
                label: (
                  <div className=" flex justify-between items-center w-full">
                    <h5 className="text-lg font-bold text-[#637381] text-637381">
                      New Orders
                    </h5>
                    <div className="flex justify-center items-center gap-3">
                      <div className="bg-[#147D73] bg-147D73 w-[31px] mr-2 h-[28px] rounded-[35px] flex justify-center items-center">
                        {" "}
                        <p className="text-white font-medium text-sm">
                          {newTotalData}
                        </p>
                      </div>
                      {/* <KeyboardArrowDownIcon /> */}
                    </div>
                  </div>
                ),
                children: (
                  <>
                    <div className="pb-5 flex justify-end relative">
                      <button
                        onClick={newSortBtn}
                        className="border-[#E7E7E7] border rounded-md py-2 px-4 max-w-max flex justify-center items-center gap-2	"
                      >
                        <SortOutlinedIcon style={{ fill: "#637381" }} />
                        <p className="text-base font-normal text-[#2B4447]">
                          Sort
                        </p>
                        <KeyboardArrowDownIcon
                          style={{ fill: "#2B4447" }}
                          className=""
                        />
                      </button>
                      {newSortItem && (
                        <div className=" z-10 right-0 top-[72%] px-3 min-h-fit max-h-[180px]  w-max   absolute  bg-white custom-shadow rounded-lg overflow-y-auto custom-scroll-bar py-3  ">
                          <ul className="dropdown-content ">
                            <li className="py-1">
                              <div className="flex justify-between items-center my-2  ">
                                <h5 className="text-base font-medium text-[#2B4447]">
                                  Order ID
                                </h5>
                                <KeyboardArrowDownIcon
                                  style={{ fill: "#2B4447" }}
                                />
                              </div>
                            </li>
                            <li className="py-1 green-checkbox flex justify-start items-center gap-2">
                              <input
                                id="default-checkbox"
                                type="checkbox"
                                className="w-4 h-4 text-darkGreen bg-gray-100 border-gray-300 rounded  dark:bg-gray-700 dark:border-gray-600"
                              />

                              <p className=" text-base font-normal text-[#637381]">
                                A -Z
                              </p>
                            </li>
                            <li className="py-1 green-checkbox flex justify-start items-center gap-2">
                              <input
                                id="default-checkbox"
                                type="checkbox"
                                className="w-4 h-4 text-darkGreen bg-gray-100 border-gray-300 rounded  dark:bg-gray-700 dark:border-gray-600"
                              />
                              <p className="text-base font-normal text-[#637381]">
                                Z - A
                              </p>
                            </li>
                            <li className="py-1">
                              <div className="flex justify-between items-center  my-2">
                                <h5 className="text-base font-medium text-[#2B4447]">
                                  Date
                                </h5>
                                <KeyboardArrowDownIcon
                                  style={{ fill: "#2B4447" }}
                                />
                              </div>
                            </li>
                            <li className="py-1 green-checkbox flex justify-start items-center gap-2">
                              <input
                                id="default-checkbox"
                                type="checkbox"
                                className="w-4 h-4 text-darkGreen bg-gray-100 border-gray-300 rounded  dark:bg-gray-700 dark:border-gray-600"
                              />

                              <p className="text-base font-normal text-[#637381]">
                                Oldest - Newest
                              </p>
                            </li>
                            <li className="py-1 green-checkbox flex justify-start items-center gap-2">
                              <input
                                id="default-checkbox"
                                type="checkbox"
                                className="w-4 h-4 text-darkGreen bg-gray-100 border-gray-300 rounded  dark:bg-gray-700 dark:border-gray-600"
                              />

                              <p className="text-base font-normal text-[#637381]">
                                Newest - Oldest
                              </p>
                            </li>

                            <li className="py-1">
                              <div className="flex justify-between items-center  my-2">
                                <h5 className="text-base font-medium text-[#2B4447]">
                                  Customer Name
                                </h5>
                                <KeyboardArrowDownIcon
                                  style={{ fill: "#2B4447" }}
                                />
                              </div>
                            </li>
                            <li className="py-1 green-checkbox flex justify-start items-center gap-2">
                              <input
                                id="default-checkbox"
                                type="checkbox"
                                className="w-4 h-4 text-darkGreen bg-gray-100 border-gray-300 rounded  dark:bg-gray-700 dark:border-gray-600"
                              />

                              <p className="text-base font-normal text-[#637381]">
                                A -Z
                              </p>
                            </li>
                            <li className="py-1 green-checkbox flex justify-start items-center gap-2">
                              <input
                                id="default-checkbox"
                                type="checkbox"
                                className="w-4 h-4 text-darkGreen bg-gray-100 border-gray-300 rounded  dark:bg-gray-700 dark:border-gray-600"
                              />

                              <p className="text-base font-normal text-[#637381]">
                                Z - A
                              </p>
                            </li>
                            <li className="py-1">
                              <div className="flex justify-between items-center  my-2">
                                <h5 className="text-base font-medium text-[#2B4447]">
                                  Order Amount
                                </h5>
                                <KeyboardArrowDownIcon
                                  style={{ fill: "#2B4447" }}
                                />
                              </div>
                            </li>
                            <li className="py-1 green-checkbox flex justify-start items-center gap-2">
                              <input
                                id="default-checkbox"
                                type="checkbox"
                                className="w-4 h-4 text-darkGreen bg-gray-100 border-gray-300 rounded  dark:bg-gray-700 dark:border-gray-600"
                              />

                              <p className="text-base font-normal text-[#637381]">
                                Low - High
                              </p>
                            </li>
                            <li className="py-1 green-checkbox flex justify-start items-center gap-2">
                              <input
                                id="default-checkbox"
                                type="checkbox"
                                className="w-4 h-4 text-darkGreen bg-gray-100 border-gray-300 rounded  dark:bg-gray-700 dark:border-gray-600"
                              />

                              <p className="text-base font-normal text-[#637381]">
                                High - Low
                              </p>
                            </li>
                          </ul>
                        </div>
                      )}
                    </div>
                    <div className="custom-table-pagination">
                      <Table
                        columns={newColumns}
                        dataSource={newOrder}
                        showSizeChanger={false}
                        onChange={onShowSizeChange}
                        pagination={{
                          current: page,
                          pageSize: 15,
                          total: newTotalData,
                          showSizeChanger: false,
                          showQuickJumper: false,
                        }}
                        scroll={{
                          y: 240,
                        }}
                      />
                    </div>
                  </>
                ),
              },
            ]}
            style={{ background: "none" }}
          />
          <Collapse
            // expandIcon={({ isActive }) => null}
            collapsible="header "
            headerBg="#fff"
            className="w-full "
            items={[
              {
                key: "1",
                label: (
                  <div className=" flex justify-between items-center w-full">
                    <h5 className="text-lg font-bold text-[#637381] text-637381">
                      Pending Orders
                    </h5>
                    <div className="flex justify-center items-center gap-3">
                      <div className="bg-[#3BA2B8] bg-3BA2B8 w-[31px] h-[28px] rounded-[35px] flex justify-center items-center mr-2">
                        {" "}
                        <p className="text-white font-medium text-sm">
                          {newTotalPendding}
                        </p>
                      </div>
                      {/* <KeyboardArrowDownIcon /> */}
                    </div>
                  </div>
                ),
                children: (
                  <>
                    <div className="pb-5 flex justify-end relative">
                      <button
                        onClick={pandingSortBtn}
                        className="border-[#E7E7E7] border rounded-md py-2 px-4 max-w-max flex justify-center items-center gap-2	"
                      >
                        <SortOutlinedIcon style={{ fill: "#637381" }} />
                        <p className="text-base font-normal text-[#2B4447]">
                          Sort
                        </p>
                        <KeyboardArrowDownIcon
                          style={{ fill: "#2B4447" }}
                          className=""
                        />
                      </button>
                      {pandingSortItem && (
                        <div className=" z-10 right-0 top-[72%] px-3 min-h-fit max-h-[180px]  w-max   absolute  bg-white custom-shadow rounded-lg overflow-y-auto custom-scroll-bar py-3  ">
                          <ul className="dropdown-content ">
                            <li className="py-1">
                              <div className="flex justify-between items-center my-2  ">
                                <h5 className="text-base font-medium text-[#2B4447]">
                                  Order ID
                                </h5>
                                <KeyboardArrowDownIcon
                                  style={{ fill: "#2B4447" }}
                                />
                              </div>
                            </li>
                            <li className=" py-1 green-checkbox flex justify-start items-center gap-2">
                              <input
                                id="default-checkbox"
                                type="checkbox"
                                className="w-4 h-4 text-darkGreen bg-gray-100 border-gray-300 rounded  dark:bg-gray-700 dark:border-gray-600"
                              />
                              <p className="text-base font-normal text-[#637381]">
                                A -Z
                              </p>
                            </li>
                            <li className="py-1 green-checkbox flex justify-start items-center gap-2">
                              <input
                                id="default-checkbox"
                                type="checkbox"
                                className="w-4 h-4 text-darkGreen bg-gray-100 border-gray-300 rounded  dark:bg-gray-700 dark:border-gray-600"
                              />
                              <p className="text-base font-normal text-[#637381]">
                                Z - A
                              </p>
                            </li>
                            <li className="py-1">
                              <div className="flex justify-between items-center  my-2">
                                <h5 className="text-base font-medium text-[#2B4447]">
                                  Date
                                </h5>
                                <KeyboardArrowDownIcon
                                  style={{ fill: "#2B4447" }}
                                />
                              </div>
                            </li>
                            <li className="py-1 green-checkbox flex justify-start items-center gap-2">
                              <input
                                id="default-checkbox"
                                type="checkbox"
                                className="w-4 h-4 text-darkGreen bg-gray-100 border-gray-300 rounded  dark:bg-gray-700 dark:border-gray-600"
                              />

                              <p className="text-base font-normal text-[#637381]">
                                Oldest - Newest
                              </p>
                            </li>
                            <li className="py-1 green-checkbox flex justify-start items-center gap-2">
                              <input
                                id="default-checkbox"
                                type="checkbox"
                                className="w-4 h-4 text-darkGreen bg-gray-100 border-gray-300 rounded  dark:bg-gray-700 dark:border-gray-600"
                              />

                              <p className="text-base font-normal text-[#637381]">
                                Newest - Oldest
                              </p>
                            </li>

                            <li className="py-1">
                              <div className="flex justify-between items-center  my-2">
                                <h5 className="text-base font-medium text-[#2B4447]">
                                  Customer Name
                                </h5>
                                <KeyboardArrowDownIcon
                                  style={{ fill: "#2B4447" }}
                                />
                              </div>
                            </li>
                            <li className="py-1 green-checkbox flex justify-start items-center gap-2">
                              <input
                                id="default-checkbox"
                                type="checkbox"
                                className="w-4 h-4 text-darkGreen bg-gray-100 border-gray-300 rounded  dark:bg-gray-700 dark:border-gray-600"
                              />
                              <p className="text-base font-normal text-[#637381]">
                                A -Z
                              </p>
                            </li>
                            <li className="py-1 green-checkbox flex justify-start items-center gap-2">
                              <input
                                id="default-checkbox"
                                type="checkbox"
                                className="w-4 h-4 text-darkGreen bg-gray-100 border-gray-300 rounded  dark:bg-gray-700 dark:border-gray-600"
                              />
                              <p className="text-base font-normal text-[#637381]">
                                Z - A
                              </p>
                            </li>
                            <li className="py-1">
                              <div className="flex justify-between items-center  my-2">
                                <h5 className="text-base font-medium text-[#2B4447]">
                                  Order Amount
                                </h5>
                                <KeyboardArrowDownIcon
                                  style={{ fill: "#2B4447" }}
                                />
                              </div>
                            </li>
                            <li className="py-1 green-checkbox flex justify-start items-center gap-2">
                              <input
                                id="default-checkbox"
                                type="checkbox"
                                className="w-4 h-4 text-darkGreen bg-gray-100 border-gray-300 rounded  dark:bg-gray-700 dark:border-gray-600"
                              />

                              <p className="text-base font-normal text-[#637381]">
                                Low - High
                              </p>
                            </li>
                            <li className="py-1 green-checkbox flex justify-start items-center gap-2">
                              <input
                                id="default-checkbox"
                                type="checkbox"
                                className="w-4 h-4 text-darkGreen bg-gray-100 border-gray-300 rounded  dark:bg-gray-700 dark:border-gray-600"
                              />

                              <p className="text-base font-normal text-[#637381]">
                                High - Low
                              </p>
                            </li>
                          </ul>
                        </div>
                      )}
                    </div>
                    <div className="custom-table-pagination">
                      <Table
                        columns={pandingColumns}
                        dataSource={penddingData}
                        onChange={onShowSizeChange}
                        pagination={{
                          current: page,
                          pageSize: 9,
                          total: newTotalPendding,
                          showSizeChanger: false,
                          showQuickJumper: false,
                        }}
                        scroll={{
                          y: 240,
                        }}
                      />
                    </div>
                  </>
                ),
              },
            ]}
            style={{ background: "none" }}
          />
          <Collapse
            // expandIcon={({ isActive }) => null}
            collapsible="header "
            headerBg="#fff"
            className="w-full hidden"
            items={[
              {
                key: "1",
                label: (
                  <div className=" flex justify-between items-center w-full">
                    <h5 className="text-lg font-bold text-637381 text-[#637381]">
                      Buyer Modification
                    </h5>
                    <div className="flex justify-center items-center gap-3">
                      <div className="bg-[#F9C107] mr-2 bg-F9C107 w-[31px] h-[28px] rounded-[35px] flex justify-center items-center">
                        <p className="text-white font-medium text-sm">
                          {newTotalModification}
                        </p>
                      </div>
                      {/* <KeyboardArrowDownIcon /> */}
                    </div>
                  </div>
                ),
                children: (
                  <>
                    <div className="pb-5 flex justify-end">
                      <div className="pb-5 flex justify-end relative">
                        <button
                          onClick={buyerSortBtn}
                          className="border-[#E7E7E7] border rounded-md py-2 px-4 max-w-max flex justify-center items-center gap-2	"
                        >
                          <SortOutlinedIcon style={{ fill: "#637381" }} />
                          <p className="text-base font-normal text-[#2B4447]">
                            Sort
                          </p>
                          <KeyboardArrowDownIcon
                            style={{ fill: "#2B4447" }}
                            className=""
                          />
                        </button>
                        {buyerSortItem && (
                          <div className=" z-10 right-0 top-[72%] px-3 min-h-fit max-h-[180px]  w-max   absolute  bg-white custom-shadow rounded-lg overflow-y-auto custom-scroll-bar py-3  ">
                            <ul className="dropdown-content ">
                              <li className="py-1">
                                <div className="flex justify-between items-center my-2  ">
                                  <h5 className="text-base font-medium text-[#2B4447]">
                                    Order ID
                                  </h5>
                                  <KeyboardArrowDownIcon
                                    style={{ fill: "#2B4447" }}
                                  />
                                </div>
                              </li>
                              <li className="py-1 green-checkbox flex justify-start items-center gap-2">
                                <input
                                  id="default-checkbox"
                                  type="checkbox"
                                  className="w-4 h-4 text-darkGreen bg-gray-100 border-gray-300 rounded  dark:bg-gray-700 dark:border-gray-600"
                                />

                                <p className="text-base font-normal text-[#637381]">
                                  A -Z
                                </p>
                              </li>
                              <li className="py-1 green-checkbox flex justify-start items-center gap-2">
                                <input
                                  id="default-checkbox"
                                  type="checkbox"
                                  className="w-4 h-4 text-darkGreen bg-gray-100 border-gray-300 rounded  dark:bg-gray-700 dark:border-gray-600"
                                />

                                <p className="text-base font-normal text-[#637381]">
                                  Z - A
                                </p>
                              </li>
                              <li className="py-1">
                                <div className="flex justify-between items-center  my-2">
                                  <h5 className="text-base font-medium text-[#2B4447]">
                                    Date
                                  </h5>
                                  <KeyboardArrowDownIcon
                                    style={{ fill: "#2B4447" }}
                                  />
                                </div>
                              </li>
                              <li className="py-1 green-checkbox flex justify-start items-center gap-2">
                                <input
                                  id="default-checkbox"
                                  type="checkbox"
                                  className="w-4 h-4 text-darkGreen bg-gray-100 border-gray-300 rounded  dark:bg-gray-700 dark:border-gray-600"
                                />
                                <p className="text-base font-normal text-[#637381]">
                                  Oldest - Newest
                                </p>
                              </li>
                              <li className="py-1 green-checkbox flex justify-start items-center gap-2">
                                <input
                                  id="default-checkbox"
                                  type="checkbox"
                                  className="w-4 h-4 text-darkGreen bg-gray-100 border-gray-300 rounded  dark:bg-gray-700 dark:border-gray-600"
                                />
                                <p className="text-base font-normal text-[#637381]">
                                  Newest - Oldest
                                </p>
                              </li>

                              <li className="py-1">
                                <div className="flex justify-between items-center  my-2">
                                  <h5 className="text-base font-medium text-[#2B4447]">
                                    Customer Name
                                  </h5>
                                  <KeyboardArrowDownIcon
                                    style={{ fill: "#2B4447" }}
                                  />
                                </div>
                              </li>
                              <li className="py-1 green-checkbox flex justify-start items-center gap-2">
                                <input
                                  id="default-checkbox"
                                  type="checkbox"
                                  className="w-4 h-4 text-darkGreen bg-gray-100 border-gray-300 rounded  dark:bg-gray-700 dark:border-gray-600"
                                />

                                <p className="text-base font-normal text-[#637381]">
                                  A -Z
                                </p>
                              </li>
                              <li className="py-1 green-checkbox flex justify-start items-center gap-2">
                                <input
                                  id="default-checkbox"
                                  type="checkbox"
                                  className="w-4 h-4 text-darkGreen bg-gray-100 border-gray-300 rounded  dark:bg-gray-700 dark:border-gray-600"
                                />

                                <p className="text-base font-normal text-[#637381]">
                                  Z - A
                                </p>
                              </li>
                              <li className="py-1">
                                <div className="flex justify-between items-center  my-2">
                                  <h5 className="text-base font-medium text-[#2B4447]">
                                    Order Amount
                                  </h5>
                                  <KeyboardArrowDownIcon
                                    style={{ fill: "#2B4447" }}
                                  />
                                </div>
                              </li>
                              <li className="py-1 green-checkbox flex justify-start items-center gap-2">
                                <input
                                  id="default-checkbox"
                                  type="checkbox"
                                  className="w-4 h-4 text-darkGreen bg-gray-100 border-gray-300 rounded  dark:bg-gray-700 dark:border-gray-600"
                                />
                                <p className="text-base font-normal text-[#637381]">
                                  Low - High
                                </p>
                              </li>
                              <li className="py-1 green-checkbox flex justify-start items-center gap-2">
                                <input
                                  id="default-checkbox"
                                  type="checkbox"
                                  className="w-4 h-4 text-darkGreen bg-gray-100 border-gray-300 rounded  dark:bg-gray-700 dark:border-gray-600"
                                />
                                <p className="text-base font-normal text-[#637381]">
                                  High - Low
                                </p>
                              </li>
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="custom-table-pagination">
                      <Table
                        columns={buyerColumns}
                        dataSource={modificationData}
                        showSizeChanger={false}
                        onChange={onShowSizeChange}
                        pagination={{
                          current: page,
                          pageSize: 9,
                          total: newTotalModification,
                          showSizeChanger: false,
                          showQuickJumper: false,
                        }}
                        scroll={{
                          y: 240,
                        }}
                      />
                    </div>
                  </>
                ),
              },
            ]}
            style={{ background: "none" }}
          />
        </Space>
      </div>
    </>
  );
};

export default ActionRequired;
