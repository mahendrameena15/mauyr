import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import FallbackComponent from "./FallbackComponent";

const Organisation = React.lazy(() =>
  import("../Settings/Organisation").catch(() => {
    return { default: () => <FallbackComponent /> };
  })
);

const SupplierSetting = React.lazy(() =>
  import("orders/SupplierSetting").catch(() => {
    return { default: () => <FallbackComponent /> };
  })
);

const MainDashBoard = React.lazy(() =>
  import("../components/mainPage/MainDashBoard").catch(() => {
    return { default: () => <FallbackComponent /> };
  })
);
const Profile = React.lazy(() =>
  import("../profile/Profile").catch(() => {
    return { default: () => <FallbackComponent /> };
  })
);
const BankingInformation = React.lazy(() =>
  import("../Settings/BankingInformation").catch(() => {
    return { default: () => <FallbackComponent /> };
  })
);

const AccountManagement = () => {
  return (
    <Routes>
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
      <Route path="/dashboard" element={<MainDashBoard />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/settings" element={<SupplierSetting />} />
      <Route path="/settings/organisation" element={<Organisation />} />
      <Route
        path="/settings/bank-information"
        element={<BankingInformation />}
      />
    </Routes>
  );
};

export default AccountManagement;
