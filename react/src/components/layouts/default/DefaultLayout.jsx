import { useLocation, Outlet } from "react-router-dom";
import Welcome from "../../../views/Welcome";
import Navigation from "./Navigation";
import Footer from "./Footer";

const DefaultLayout = () => {
  const location = useLocation();
  return (
    <div className='default-layout bg-[#224191] text-white'>
      {
        <>
          <Navigation />
        </>
      }
      <div className='min-h-screen h-full mt-[40vw]'>
        {location.pathname === "/" && <Welcome />}
        <Outlet />
      </div>
      {
        <>
          <Footer />
        </>
      }
    </div>
  );
};

export default DefaultLayout;
