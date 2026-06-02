import { createBrowserRouter } from "react-router";
import HomeView from "@/pages/Home";
import { SideBarLayout } from "@/components/global/Sidebar";

const router = createBrowserRouter([
  {
    element: <SideBarLayout />,
    children: [
      {
        path: "/",
        element: <HomeView />,
      },
    ],
  },
]);

export default router;
