import { createBrowserRouter } from "react-router";
import HomeView from "@/pages/Home";
import { SideBarLayout } from "@/components/global/Sidebar";
import AboutView from "@/components/about";

const router = createBrowserRouter([
  {
    element: <SideBarLayout />,
    children: [
      {
        path: "/",
        element: <HomeView />,
      },
      {
        path: "/about",
        element: <AboutView />,
      },
    ],
  },
]);

export default router;
