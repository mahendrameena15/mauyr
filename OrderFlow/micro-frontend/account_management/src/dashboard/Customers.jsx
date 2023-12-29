import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import FallbackComponent from "./FallbackComponent";

const AddCustomers = React.lazy(() =>
  import("customers/AddCustomers").catch(() => {
    return { default: () => <FallbackComponent /> };
  })
);
const ViewCustomer = React.lazy(() =>
  import("customers/ViewCustomer").catch(() => {
    return { default: () => <FallbackComponent /> };
  })
);
const AddCustomersDetails = React.lazy(() =>
  import("customers/AddCustomersDetails").catch(() => {
    return { default: () => <FallbackComponent /> };
  })
);
const CustomerBulkEdit = React.lazy(() =>
  import("customers/CustomerBulkEdit").catch(() => {
    return { default: () => <FallbackComponent /> };
  })
);

const Customers = () => {
  return (
    <Routes>
      <Route path="*" element={<Navigate to="/all-customers" replace />} />
      <Route path="/all-customers" element={<AddCustomers />} />
      <Route path="/view-customer-details" element={<ViewCustomer />} />
      <Route path="/add-customer/*" element={<AddCustomersDetails />} />
      <Route path="/customer-bulk-edit" element={<CustomerBulkEdit />} />
    </Routes>
  );
};

export default Customers;
