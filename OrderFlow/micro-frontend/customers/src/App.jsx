import React from "react";
import ReactDOM from "react-dom";
import "./style.css";
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddCustomers from "./customers/AddCustomers";

import CustomerDetails from "./AddCustomersDetails/CustomerDetails";
import ViewCustomer from "./customers/ViewCustomer";
import AddCustomersDetails from "./customers/AddCustomersDetails.jsx";
import CustomerBulkEdit from "./customers/CustomerBulkEdit";
import { QueryClient, QueryClientProvider } from "react-query";

const App = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/customers" element={<AddCustomers />} />
          <Route path="/view-customer-details/:id" element={<ViewCustomer />} />
          <Route path="/customer-app" element={<CustomerDetails />} />
          <Route path="/add-customer/*" element={<AddCustomersDetails />} />
          <Route path="/customer-bulk-edit" element={<CustomerBulkEdit />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
