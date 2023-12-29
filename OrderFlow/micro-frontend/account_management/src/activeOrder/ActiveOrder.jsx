import React, { useEffect, useState } from "react";
import CustomCalender from "./CustomCalender";
import Filter from "./CustomFilter";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { Dropdown, Space, DatePicker, Table, Checkbox } from "antd";
import CalendarTodayRoundedIcon from "@mui/icons-material/CalendarTodayRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

function ActiveOrder({ mutate }) {
  const { RangePicker } = DatePicker;
  const [selectedDates, setSelectedDates] = useState([]);

  function debounce(func, timeout = 500) {
    let timer;
    return (...args) => {
      clearTimeout(timer);

      timer = setTimeout(() => {
        handleMutate(...args);
      }, timeout);
    };
  }
  const debouncedHandleInput = debounce(handleMutate);

  function convertDateFormat(inputDate) {
    const date = new Date(inputDate);

    const year = date.getUTCFullYear();
    const month = (date.getUTCMonth() + 1).toString().padStart(2, "0");
    const day = date.getUTCDate().toString().padStart(2, "0");

    const hours = date.getUTCHours().toString().padStart(2, "0");
    const minutes = date.getUTCMinutes().toString().padStart(2, "0");
    const seconds = date.getUTCSeconds().toString().padStart(2, "0");
    const milliseconds = date.getUTCMilliseconds().toString().padStart(3, "0");
    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}Z`;
  }

  const handleMutate = (dates) => {
    if (dates && dates[0] && dates[1]) {
      mutate({
        filter: {
          searchByValue: "",
          region: [],
          orderStatus: ["New", "Pending"],
          orderEntryDate: convertDateFormat(dates[0].$d),
          OrderFilterEndDate: convertDateFormat(dates[1].$d),
          customeDate: "",
          page: 0,
          pagination: false,
        },
        sort: {
          sortBy: "",
          sortOrder: "",
        },
      });
    } else {
      console.error("Invalid dates:", dates);
    }
  };

  const onChange = (dates) => {
    dates[1] !== null && debouncedHandleInput(dates, 500);
  };
  const handleCustomClear = () => {
    mutate({
      filter: {
        searchByValue: "",
        region: [],
        orderStatus: ["New", "Pending"],
        orderEntryDate: "",
        OrderFilterEndDate: "",
        customeDate: "",
        page: 0,
        pagination: false,
      },
      sort: {
        sortBy: "",
        sortOrder: "",
      },
    });
    setSelectedDates([]);
    setShow("false"); // Clear the selected dates when the custom close button is clicked
  };
  const [show, setShow] = useState("false");
  return (
    <div>
      <div className="border rounded-md border-inherit bg-white h-full py-3	 px-6 md:flex justify-between items-center ">
        <div>
          <h4 className="md:text-2xl text-base	font-medium		md:font-semibold	">
            Active orders
          </h4>
        </div>
        {show === "true" ? (
          <div className="relative w-[40%]">
            <RangePicker
              className="w-full h-[42px] px-[40px]"
              onCalendarChange={onChange}
              suffixIcon={null}
              dropdownClassName="custom-date-picker"
            />

            <div className="custom-icons">
              <CalendarTodayRoundedIcon
                className="calendar-icon absolute top-[21%] left-[12px]  "
                style={{ fill: "#d9d9d9", width: "18px" }}
              />
              <CloseRoundedIcon
                onClick={handleCustomClear}
                className="clear-icon absolute top-[21%] right-[12px]  cursor-pointer "
                style={{
                  fill: "#d9d9d9",
                  width: "18px",
                }}
              />
            </div>
          </div>
        ) : (
          <div
            onClick={() => {
              setShow("true");
            }}
            className="flex justify-center items-center gap-2 px-3 py-2 border border-[#E7E7E7] cursor-pointer rounded-md"
          >
            <div className="">
              <FilterAltIcon style={{ fill: "#fff", stroke: "#637381" }} />
            </div>
            <h6 className="text-base	font-normal	text-gray">
              Filter by Order Date
            </h6>
          </div>
        )}
      </div>
    </div>
  );
}

export default ActiveOrder;
