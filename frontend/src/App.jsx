import ManagerHomePage from "./pages/ManagerHomePage";
import KitchenPage from "./pages/KitchenPage";
import { Routes, Route } from "react-router-dom";
import CustomerHomePage from "./pages/CustomerHomePage";
import CustomerSelectTable from "./pages/CustomerSelectTable";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<ManagerHomePage />} />
        <Route path="/kitchen" element={<KitchenPage />} />
        <Route path="/order" element={<CustomerHomePage/>} />
        <Route path="/" element={<CustomerSelectTable/>} />
      </Routes>
    </>
  );
}

export default App;
