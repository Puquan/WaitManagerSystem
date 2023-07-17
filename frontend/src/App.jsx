import ManagerHomePage from "./pages/ManagerHomePage";
import React from "react";
import {BrowserRouter,Routes,Route} from "react-router-dom";
import CustomerHomePage from "./pages/CustomerHomePage";
import CustomerSelectTable from "./pages/CustomerSelectTable";

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<CustomerSelectTable/>}/>
        <Route exact path="/Order" element={<CustomerHomePage/>}/>
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
