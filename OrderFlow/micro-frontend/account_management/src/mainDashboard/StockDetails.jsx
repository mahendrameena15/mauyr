import React from "react";

import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

import SignalCellularAltIcon from "@mui/icons-material/SignalCellularAlt";

import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";

import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";

import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { useState } from "react";
import { useEffect } from "react";
import { useQuery } from "react-query";
import { getTilesData } from "../reactQuery/dashboardApiModule";
import { formatPrice } from "../helpers/formatPrice";
import { Skeleton } from "antd";

function StockDetails({ loading }) {
  const [order, setOrder] = useState(0);
  const [customer, setCustomer] = useState(0);
  const [customerPercentage, setCustomerPercentage] = useState(0);
  const [revenue, setRevenue] = useState(0);
  const [profit, setProfit] = useState(0);

  const dashboardUrl = process.env.REACT_APP_DASHBOARD_SUPPLIER_URL;

  const {
    data: tilesData,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["fetchTiles"],
    queryFn: getTilesData,
  });

  const stockBox = [
    {
      title: tilesData?.totalRevenue
        ? `${formatPrice(tilesData?.totalRevenue)}`
        : `00.00`,

      description: "Total Revenue in this month",

      value: (
        <span
          className={`text-sm font-medium ${
            parseFloat(tilesData?.totalRevenuePercentage) === 0
              ? "text-[#637381]"
              : parseFloat(tilesData?.totalRevenuePercentage) > 0
              ? "text-[#009900]"
              : "text-[#DC3545]"
          }`}
        >
          {tilesData?.totalRevenuePercentage ? (
            `${tilesData?.totalRevenuePercentage.toFixed(2)}%`
          ) : (
            <span className="text-[#637381]">00 %</span>
          )}
        </span>
      ),

      Image: <AttachMoneyIcon style={{ fill: "#147D73" }} />,

      Arrow:
        parseFloat(tilesData?.totalRevenuePercentage) > 0 ? (
          <ArrowUpwardIcon style={{ fill: "#009900" }} />
        ) : parseFloat(tilesData?.totalRevenuePercentage) < 0 ? (
          <ArrowDownwardIcon style={{ fill: "#DC3545" }} />
        ) : null,
    },

    {
      title: tilesData?.totalProfit
        ? `${formatPrice(tilesData?.totalProfit)}`
        : `00.00`,

      description: "Gross Profit in this month",

      value: (
        <span
          className={`text-sm font-medium ${
            parseFloat(tilesData?.totalProfitPercentage) === 0
              ? "text-[#637381]"
              : parseFloat(tilesData?.totalProfitPercentage) > 0
              ? "text-[#009900]"
              : "text-[#DC3545]"
          }`}
        >
          {tilesData?.totalProfitPercentage ? (
            `${tilesData?.totalProfitPercentage.toFixed(2)}%`
          ) : (
            <span className="text-[#637381]">00 %</span>
          )}
        </span>
      ),

      Image: <SignalCellularAltIcon style={{ fill: "#147D73" }} />,

      Arrow:
        parseFloat(tilesData?.totalProfitPercentage) > 0 ? (
          <ArrowUpwardIcon style={{ fill: "#009900" }} />
        ) : parseFloat(tilesData?.totalProfitPercentage) < 0 ? (
          <ArrowDownwardIcon style={{ fill: "#DC3545" }} />
        ) : null,
    },

    {
      title: tilesData?.noOfOrders ? tilesData?.noOfOrders : 0,

      description: "Total Orders in this month",

      value: (
        <span
          className={`text-sm font-medium ${
            parseFloat(tilesData?.noOfOrdersPercentage) === 0
              ? "text-[#637381]"
              : parseFloat(tilesData?.noOfOrdersPercentage) > 0
              ? "text-[#009900]"
              : "text-[#DC3545]"
          }`}
        >
          {tilesData?.noOfOrdersPercentage ? (
            `${tilesData?.noOfOrdersPercentage.toFixed(2)}%`
          ) : (
            <span className="text-[#637381]">00 %</span>
          )}
        </span>
      ),

      Image: <ShoppingCartOutlinedIcon style={{ fill: "#147D73" }} />,

      Arrow:
        parseFloat(tilesData?.noOfOrdersPercentage) > 0 ? (
          <ArrowUpwardIcon style={{ fill: "#009900" }} />
        ) : parseFloat(tilesData?.noOfOrdersPercentage) < 0 ? (
          <ArrowDownwardIcon style={{ fill: "#DC3545" }} />
        ) : null,
    },

    {
      title: customer ? customer : "0",

      description: "Active customers",

      value: (
        <span
          className={`text-sm font-medium ${
            parseFloat(customerPercentage) === 0
              ? "text-[#637381]"
              : parseFloat(customerPercentage) > 0
              ? "text-[#009900]"
              : "text-[#DC3545]"
          }`}
        >
          {customerPercentage ? (
            customerPercentage
          ) : (
            <span className="text-[#637381]">00 %</span>
          )}
        </span>
      ),

      Image: <PeopleAltOutlinedIcon style={{ fill: "#147D73" }} />,

      Arrow:
        parseFloat(customerPercentage) > 0 ? (
          <ArrowUpwardIcon style={{ fill: "#009900" }} />
        ) : parseFloat(customerPercentage) < 0 ? (
          <ArrowDownwardIcon style={{ fill: "#DC3545" }} />
        ) : null,
    },
  ];

  const organisationId = localStorage.getItem("organisationId");
  useEffect(() => {
    // total  customer
    fetch(
      `${dashboardUrl}/api/DashBoard/getCustomer?OrganisationId=${organisationId}`,
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          const customerData = data?.data[0];
          setCustomer(customerData?.noOfCustomer);
          setCustomerPercentage(
            `${customerData?.percentageIncrease.toFixed(2)}%`
          );
        }
      })
      .catch((error) => console.log(error));

    fetch(
      `${dashboardUrl}/api/DashBoard/getAllCards?OrganisationId=${organisationId}`,
      {
        method: "GET",
      }
    ).th;

    // // total  order
    fetch(
      `${dashboardUrl}/api/DashBoard/getNoOfoders?OrganisationId=${organisationId}`,
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          const orderData = data?.data[0];
          setOrder(orderData?.noOfOrders);
        }
      })
      .catch((error) => console.log(error));

    // // total  order
    fetch(
      `${dashboardUrl}/api/DashBoard/getTotalRevenue?OrganisationId=${organisationId}`,
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          const revenueData = data?.data[0];
          setRevenue(revenueData?.totalRevenue);
        }
      })
      .catch((error) => console.log(error));

    fetch(
      `${dashboardUrl}/api/DashBoard/getTotalProfit?OrganisationId=${organisationId}`,
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          const profitData = data?.data[0];
          setProfit(profitData?.totalProfit);
        }
      })
      .catch((error) => console.log(error));
  }, [organisationId]);

  return (
    <>
      {stockBox?.map((item, index) => {
        return (
          <div
            key={`${index}-${item?.title}`}
            className={` rounded-md   border border-inherit bg-white grow h-40 stock-${index} w-full`}
          >
            {!loading ? (
              <div className="grid grid-cols-1 gap-6 p-4">
                <div className="flex justify-between ">
                  <div className=" stock-icon h-12 w-12 rounded-full  flex justify-center items-center bg-slate-100 ">
                    {item.Image}
                  </div>
                  <div className="flex items-center gap-1">
                    <p className="text-sm font-semibold ">{item.value}</p>

                    <div className="">{item.Arrow}</div>
                  </div>
                </div>
                <div className="">
                  <h4 className="text-2xl font-bold text-start  ">
                    {item.title}
                  </h4>

                  <div className="flex justify-between">
                    <p className="text-sm font-semibold text-zinc-500">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-4">
                <Skeleton
                  paragraph={{ rows: 3 }}
                  active
                  avatar
                  className="custom-skeleton-header"
                  loading={loading}
                />
              </div>
            )}
          </div>
        );
      })}
    </>
  );
}

export default StockDetails;
