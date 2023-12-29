import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import FallbackComponent from "./FallbackComponent";

const ViewProduct = React.lazy(() =>
  import("products/ViewProduct").catch(() => {
    return { default: () => <FallbackComponent /> };
  })
);
const Range = React.lazy(() =>
  import("products/Range").catch(() => {
    return { default: () => <FallbackComponent /> };
  })
);
const AddProduct = React.lazy(() =>
  import("products/AddProduct").catch(() => {
    return { default: () => <FallbackComponent /> };
  })
);
const BulkEdit = React.lazy(() =>
  import("products/BulkEdit").catch(() => {
    return { default: () => <FallbackComponent /> };
  })
);
const InventoryTable = React.lazy(() =>
  import("products/InventoryTable").catch(() => {
    return { default: () => <FallbackComponent /> };
  })
);

const Products = () => {
  return (
    <Routes>
      <Route path="*" element={<Navigate to="/all-products" />} />
      <Route path="/all-products" element={<Range />} />
      <Route path="/view-product/:id" element={<ViewProduct />} />
      <Route path="/add-product" element={<AddProduct />} />
      <Route path="/bulk-edit" element={<BulkEdit />} />
      <Route path="/inventory-table" element={<InventoryTable />} />
    </Routes>
  );
};

export default Products;
