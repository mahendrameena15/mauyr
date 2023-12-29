import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import "./style.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Range from "./orders/Range";
import SupplierOrderManagement from "./components/orders/SupplierOrderManagement";
import OrderListing from "./components/orderListing/OrderListing";
import SupplierSetting from "./components/settings/SupplierSetting";
// import BankingInformation from "./components/settings/BankingInformation";
import NewOrder from "./notification/NewOrder";
import PaidOrder from "./notification/PaidOrder";
import OrderUpdate from "./notification/OrderUpdate";
// import OrderListing from "./order_details/OrderListing";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SupplierOrderManagement />} />
        <Route path="/order-listing" element={<OrderListing />} />
        <Route path="/settings" element={<SupplierSetting />} />
        <Route path="/new-order" element={<NewOrder />} />
        <Route path="/paid-order" element={<PaidOrder />} />
        <Route path="/update-order" element={<OrderUpdate />} />
        {/* <Route path="/bank-information" element={<BankingInformation />} /> */}
      </Routes>
    </Router>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
