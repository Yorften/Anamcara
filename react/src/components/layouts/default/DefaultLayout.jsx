import { useLocation, Outlet } from "react-router-dom";
import Welcome from "../../../views/Welcome";
import Navigation from "./Navigation";
import HomeNavigation from "./HomeNavigation";
import Footer from "./Footer";

const DefaultLayout = () => {
  const location = useLocation();
  return (
    <div className='default-layout bg-[#224191] text-white'>
      {<>{location.pathname === "/" ? <HomeNavigation /> : <Navigation />}</>}
      <div className='min-h-screen h-full'>
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
