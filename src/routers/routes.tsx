import { createBrowserRouter } from "react-router";
import HomeView from "@/pages/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeView />,
  },
]);

export default router;
