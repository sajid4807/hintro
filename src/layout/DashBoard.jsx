import { useState } from "react";
import Navbar from "../Components/Navbar";
import Sidebar from "../Components/Sidebar";
import DashBoarContent from "../Components/DashBoarContent/DashBoarContent";

const DashBoard = () => {
  const [userId, setUserId] = useState("u1");
  return (
    <div className="drawer lg:drawer-open min-h-screen bg-base-100">
      <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content font-[Inter] flex flex-col">
        <Navbar userId={userId} setUserId={setUserId} />
        <DashBoarContent userId={userId} />
        <div className="px-5 md:pl-20 md:pr-24 pt-6 space-y-6"></div>
      </div>
      <Sidebar />
    </div>
  );
};

export default DashBoard;