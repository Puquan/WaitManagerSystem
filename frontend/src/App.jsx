import ManagerHomePage from "./pages/ManagerHomePage";
import KitchenPage from "./pages/KitchenPage";
import { Routes, Route } from "react-router-dom";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<ManagerHomePage />} />
        <Route path="/kitchen" element={<KitchenPage />} />
      </Routes>
    </>
  );
}

export default App;
