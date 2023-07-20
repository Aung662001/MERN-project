import { Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <>
      <div className="dash-container">
        <Outlet />
      </div>
    </>
  );
};

export default Dashboard;
