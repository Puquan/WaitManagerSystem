import ManagerHomePage from "./pages/ManagerHomePage";
import KitchenPage from "./pages/KitchenPage";
import { Routes, Route } from "react-router-dom";
import CustomerHomePage from "./pages/CustomerHomePage";
import CustomerSelectTable from "./pages/CustomerSelectTable";
import WaitStaffHomePage from "./pages/WaitStaffHomePage";
import StatisticsPage from "./pages/StatisticsPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/Manager" element={<ManagerHomePage />} />
        <Route path="/Kitchen" element={<KitchenPage />} />
        <Route path="/Order" element={<CustomerHomePage />} />
        <Route path="/" element={<CustomerSelectTable />} />
        <Route path="/Waitstaff" element={<WaitStaffHomePage />} />
        <Route path="/Statistics" element={<StatisticsPage />} />
      </Routes>
    </>
  );
}

export default App;
