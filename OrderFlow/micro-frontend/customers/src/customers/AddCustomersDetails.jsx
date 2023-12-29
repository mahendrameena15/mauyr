import React, { useEffect } from "react";
import DetailsHeader from "../AddCustomersDetails/DetailsHeader";
import CustomerAddress from "../AddCustomersDetails/CustomerAddress";
import ContactForm from "../AddCustomersDetails/ContactForm";
import CustomerDetails from "../AddCustomersDetails/CustomerDetails";

import CloseIcon from "@mui/icons-material/Close";
import { message } from "antd";

import CustomerContact from "../AddCustomersDetails/CustomerContact";
import { Routes, Route } from "react-router-dom";

function AddCustomersDetails() {
  const [messageApi, contextHolder] = message.useMessage();
  const isTrue = localStorage.getItem("customerAdded");
  useEffect(() => {
    if (isTrue === "true") {
      saveCustomer();
    }

    const timeout = setTimeout(() => {
      localStorage.setItem("customerAdded", false);
    }, 3000);

    return () => clearTimeout(timeout);
  }, []);
  const saveCustomer = () => {
    messageApi.open({
      content: (
        <div className="flex justify-center gap-2 items-center">
          <CloseIcon style={{ fill: "#fff", width: "15px" }} />
          <p className="text-base font-semibold text-[#F8FAFC]">
            Products saved!
          </p>
        </div>
      ),
      className: "custom-class",
      rtl: true,
    });
  };

  return (
    <>
      <div className="padding-top-custom">
        <DetailsHeader />
        {/* <ContactForm /> */}
        <Routes>
          <Route path="/customer-details" element={<CustomerDetails />} />
          <Route path="/customer-address" element={<CustomerAddress />} />
          <Route path="/customer-contact" element={<CustomerContact />} />
        </Routes>
        {contextHolder}
      </div>
    </>
  );
}

export default AddCustomersDetails;
