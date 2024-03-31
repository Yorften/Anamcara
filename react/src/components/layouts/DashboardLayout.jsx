import { Outlet, useLocation } from 'react-router-dom';
import DashboardIndex from "../../views/dashboard/index";

const DashboardLayout = () => {
  const location = useLocation();

  return (
    <div className="dashboard-layout">
      {/* Your dashboard layout elements here (header, sidebar, etc.) */}
      {location.pathname === '/dashboard' && <DashboardIndex />}
      <Outlet />
    </div>
  );
};

export default DashboardLayout;