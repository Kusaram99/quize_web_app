import React from "react";
import Sidebar from "./components/sidebar/Sidebar";
import Header from "./components/header/Header";
import DashboardTable from "./components/dashboard_table/DashboardTable";
import FormContainer from "./components/auth_components/FormContainer";
import { Outlet } from "react-router-dom";


const App = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <Outlet/>
      </div>
    </div> 
  );
};

export default App;



