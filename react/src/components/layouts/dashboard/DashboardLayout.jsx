import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import DashboardIndex from "../../../views/dashboard/Index";
import AdminSideBar from "./AdminSideBar";
import NavProfile from "../NavProfile";
import { useDispatch, useSelector } from "react-redux";
import useCookieMonitor from "../../../hooks/useCookieMonitor";
import {
  setIsLoading,
  setToken,
  setUser,
  setUserRoles,
} from "../../../features/auth/authSlice";
import { useEffect } from "react";
import UserRequest from "../../../services/requests/user";
import Cookies from "js-cookie";
import { useHasRole } from "./../../../hooks/useHasRole";

const DashboardLayout = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  const isLoading = useSelector((state) => state.auth.isLoading);
  const hasRole = useHasRole("Officer Team");

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [token, navigate]);

  if (!hasRole) {
    navigate("/");
  }

  useCookieMonitor();

  // getUser with new roles.
  useEffect(() => {
    const fetchUserData = async () => {
      const response = UserRequest.getUser();
      response
        .then((data) => {
          dispatch(setUser(data.user));
          dispatch(setUserRoles(data.user_roles));
          dispatch(setIsLoading(false));
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
          dispatch(setUser(null));
          dispatch(setToken(null));
          dispatch(setIsLoading(false));
        });
    };

    const storedToken = Cookies.get("token");
    if (!user) {
      console.log("test");
      fetchUserData();
    } else if (!storedToken) {
      console.log("test2");
      dispatch(setUser(null));
      dispatch(setToken(null));
      dispatch(setUserRoles([]));
      dispatch(setIsLoading(false));
    }
  });

  return (
    <div className='dashboard-layout'>
      {isLoading && (
        <div className='h-screen bg-[#313338] flex items-center justify-center text-white'>
          <img
            src='/assets/images/Anamlogo_large_transparent.gif'
            className='h-60 w-60'
            alt=''
          />
        </div>
      )}
      {!isLoading && (
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
            <NavProfile user={user} />
          </div>
          <AdminSideBar />
          <main className='h-full ml-14 mt-14 mb-10 md:ml-64'>
            <div className='w-11/12 mx-auto py-8'>
              {location.pathname === "/dashboard" && <DashboardIndex />}
              <Outlet />
            </div>
          </main>
        </div>
      )}
    </div>
  );
};

export default DashboardLayout;
