import Sidebar from "@/components/Sidebar";
import React from "react";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      {/* Main content area */}
      <div className="flex-1 ml-[260px] min-h-screen">

        {/* Top bar */}
        <div className="sticky top-0 z-30 bg-white border-b border-gray-100 shadow-sm px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-[15px] font-bold text-gray-800 leading-none">Admin Panel</h1>
            <p className="text-[11px] text-gray-400 mt-0.5">Manage your store</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-400 shadow shadow-green-200" />
            <span className="text-xs text-gray-400 font-medium">Live</span>
          </div>
        </div>

        {/* Page content */}
        <div className="p-6 sm:p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;