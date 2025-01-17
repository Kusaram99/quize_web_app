import React from "react";
import Sidebar from "./components/sidebar/Sidebar";
import Header from "./components/header/Header"; 
import { Outlet } from "react-router-dom";


const App = () => {
  return (
    <div className="flex z-20 relative transition-all duration-[2000ms] ease-in-out">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <Outlet/>
      </div>
    </div> 
  );
};

export default App;



