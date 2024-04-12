import { Link, Outlet, useLocation } from "react-router-dom";
import DashboardIndex from "../../../views/dashboard/Index";
import AdminSideBar from "./AdminSideBar";
import NavProfile from "../NavProfile";

const DashboardLayout = () => {
  const location = useLocation();

  return (
    <div className='dashboard-layout'>
      <div className='min-h-screen flex flex-col flex-auto flex-shrink-0 antialiased bg-white text-black'>
        <div className='fixed bg-blue-800 w-full flex items-center justify-between h-14 text-white px-4 z-10'>
          <Link className='flex items-center' to={"/"}>
            <img
              src='/assets/images/icon.png'
              className='mr-3 h-6 sm:h-9'
              alt='Flowbite React Logo'
            />
            <span className='self-center whitespace-nowrap text-xl font-semibold'>
              FitNow
            </span>
          </Link>
          <NavProfile user={"user"} />
        </div>
        <AdminSideBar />
        <main className='h-full ml-14 mt-14 mb-10 md:ml-64'>
          <div className='w-11/12 mx-auto py-8'>
            {location.pathname === "/dashboard" && <DashboardIndex />}
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
