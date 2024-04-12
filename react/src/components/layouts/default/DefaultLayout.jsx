import { useLocation, Outlet } from "react-router-dom";
import Welcome from "../../../views/Welcome";
import Navigation from "./Navigation";
import Footer from "./Footer";

const DefaultLayout = () => {
  const location = useLocation();
  return (
    <div className='dashboard-layout'>
      {
        <>
          <Navigation />
        </>
      }
      {location.pathname === "/" && <Welcome />}
      <Outlet />
      {
        <>
          <Footer />
        </>
      }
    </div>
  );
};

export default DefaultLayout;
