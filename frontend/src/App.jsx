import ManagerHomePage from "./pages/ManagerHomePage";
import KitchenPage from "./pages/KitchenPage";
import { Routes, Route } from "react-router-dom";
import CustomerHomePage from "./pages/CustomerHomePage";
import CustomerSelectTable from "./pages/CustomerSelectTable";
import WaitStaffHomePage from "./pages/WaitStaffHomePage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/Manager" element={<ManagerHomePage />} />
        <Route path="/kitchen" element={<KitchenPage />} />
        <Route path="/order" element={<CustomerHomePage/>} />
        <Route path="/" element={<CustomerSelectTable/>} />
        <Route path="/WaitStaff" element={<WaitStaffHomePage/>} />
      </Routes>
    </>
  );
}

export default App;
