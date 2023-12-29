import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import FallbackComponent from "./FallbackComponent";

const SupplierOrderManagement = React.lazy(() =>
  import("orders/SupplierOrderManagement").catch(() => {
    return { default: () => <FallbackComponent /> };
  })
);

const OrderListing = React.lazy(() =>
  import("orders/OrderListing").catch(() => {
    return { default: () => <FallbackComponent /> };
  })
);

const Orders = () => {
  return (
    <Routes>
      <Route path="*" element={<Navigate to="/all-orders" replace />} />
      <Route path="/all-orders" element={<SupplierOrderManagement />} />
      <Route path="/order-details/:id" element={<OrderListing />} />
    </Routes>
  );
};

export default Orders;
