import { useSelector } from "react-redux";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Index from "./../../../views/checklist/Index";
import Welcome from "../../../views/checklist/Welcome";
import ChecklistSideBar from "./ChecklistSideBar";

export default function ChecklistLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector((state) => state.auth.user);
  const isLoading = useSelector((state) => state.auth.isLoading);

  if (!user) {
    navigate("/");
  }

  return (
    <div>
      <div>
        {location.pathname === "/checklist" && !user && !isLoading && (
          <Welcome />
        )}
      </div>

      {user &&
        (location.pathname === "/checklist" ||
          location.pathname === "/checklist/") && (
          <div className='h-full flex flex-col flex-auto flex-shrink-0 antialiased'>
            <main className='ml-14 mt-4 md:ml-64'>
              <ChecklistSideBar
                className={"top-[44px] sm:top-[52px] lg:top-[56px]"}
              />
              <Index />
            </main>
          </div>
        )}
      <main className='ml-14 mt-4 md:ml-64'>
        <ChecklistSideBar
          className={"top-[44px] sm:top-[52px] lg:top-[56px]"}
        />
        <Outlet />
      </main>
    </div>
  );
}
