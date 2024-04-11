import { createBrowserRouter } from "react-router-dom";
import Apply from "./views/apply";
import Images from "./views/images";
import Videos from "./views/videos";
import StoneCutter from "./views/stone-cutter";
import WelcomeChecklist from "./views/checklist/welcome";
import ChecklistIndex from "./views/checklist/index";
import Tasks from "./views/checklist/tasks";
import Characters from "./views/checklist/characters";
import ChecklistSettings from "./views/checklist/settings";
import DashboardSettings from "./views/dashboard/settings";
import DashboardImages from "./views/dashboard/images";
import DashboardVideos from "./views/dashboard/videos";
import Permissions from "./views/dashboard/permissions";
import Members from "./views/dashboard/members";
import GlobalChat from "./views/dashboard/global";
import Applicants from "./views/dashboard/applicants";
import NotFound from "./views/notfound";
import DefaultLayout from "./components/layouts/DefaultLayout";
import DashboardLayout from './components/layouts/DashboardLayout';

const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      {
        path: "/apply",
        element: <Apply />,
      },

      {
        path: "/images",
        element: <Images />,
      },

      {
        path: "/videos",
        element: <Videos />,
      },

      {
        path: "/stone-cutter",
        element: <StoneCutter />,
      },

      {
        path: "/checklist",
        element: <WelcomeChecklist />,
      },

      {
        path: "/checklist/index",
        element: <ChecklistIndex />,
      },

      {
        path: "/checklist/tasks",
        element: <Tasks />,
      },

      {
        path: "/checklist/characters",
        element: <Characters />,
      },

      {
        path: "/checklist/settings",
        element: <ChecklistSettings />,
      },
    ],
  },

  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        path: "/dashboard/applicants",
        element: <Applicants />,
      },

      {
        path: "/dashboard/global-chat",
        element: <GlobalChat />,
      },

      {
        path: "/dashboard/members",
        element: <Members />,
      },

      {
        path: "/dashboard/images",
        element: <DashboardImages />,
      },

      {
        path: "/dashboard/videos",
        element: <DashboardVideos />,
      },

      {
        path: "/dashboard/permissions",
        element: <Permissions />,
      },

      {
        path: "/dashboard/settings",
        element: <DashboardSettings />,
      },
    ],
  },

  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
