import Welcome from "../../views/welcome";
import { useLocation, Outlet } from "react-router-dom";

const DefaultLayout = () => {
  const location = useLocation();

  return (
    <div className="dashboard-layout">
      {/* Your dashboard layout elements here (header, sidebar, etc.) */}
      {location.pathname === "/" && <Welcome />}
      <Outlet />
    </div>
  );
};

export default DefaultLayout;
