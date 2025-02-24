import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Sidebar from "./components/sidebar";
import Header from "./components/header";
import AppRoutes from "./routes/AppRoutes";

const App = () => {
  return (
    <Router>
      <div className="flex-1">
        <Header user={{ name: "João Silva", role: "Admin" }} />
        <div className="flex h-screen">
        <Sidebar />
          <div className="p-6 ml-64 mt-20">
            <AppRoutes />
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;
