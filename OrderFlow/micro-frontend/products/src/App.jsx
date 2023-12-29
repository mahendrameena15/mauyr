import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import "./style.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Range from "./product/Range";
import ViewProduct from "./product/ViewProduct";
import AddProduct from "./product/AddProduct";
import BulkEdit from "./product/BulkEdit";
import InventoryTable from "./inventory/InventoryTable";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Range />} />
        <Route path="/view-product" element={<ViewProduct />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/bulk-edit" element={<BulkEdit />} />
        <Route path="/inventory-table" element={<InventoryTable />} />
      </Routes>
    </Router>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
