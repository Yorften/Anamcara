import { createBrowserRouter } from "react-router-dom";
import Apply from "./views/Apply";
import Images from "./views/Images";
import Videos from "./views/Videos";
import StoneCutter from "./views/StoneCutter";
import WelcomeChecklist from "./views/checklist/Welcome";
import ChecklistIndex from "./views/checklist/Index";
import Tasks from "./views/checklist/Tasks";
import Characters from "./views/checklist/Characters";
import ChecklistSettings from "./views/checklist/Settings";
import DashboardSettings from "./views/dashboard/Settings";
import DashboardImages from "./views/dashboard/Images";
import DashboardVideos from "./views/dashboard/Videos";
import Members from "./views/dashboard/Members";
import GlobalChat from "./views/dashboard/GlobalChat";
import Applicants from "./views/dashboard/Applicants";
import NotFound from "./views/NotFound";
import DefaultLayout from "./components/layouts/default/DefaultLayout";
import DashboardLayout from "./components/layouts/dashboard/DashboardLayout";
import DiscordAuthCallback from "./services/requests/DiscordAuthCallback";
import Application from './views/dashboard/Application';
import History from './views/dashboard/History';

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
        path: "/gallery",
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
        path: "/dashboard/applicants/history",
        element: <History />,
      },

      {
        path: "/dashboard/applicants/:id",
        element: <Application />,
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
        path: "/dashboard/settings",
        element: <DashboardSettings />,
      },
    ],
  },

  {
    path: "/auth/discord/callback",
    element: <DiscordAuthCallback />,
  },

  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
