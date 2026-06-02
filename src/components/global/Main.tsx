import { RouterProvider } from "react-router";
import MainBackground from "../home/Background";
import SideBar from "./Sidebar";
import router from "@/routers/routes";

const MainApp = () => {
  return (
    <main>
      <div className="flex flex-1 flex-row pt-8">
        <SideBar />
        <div className="w-full flex-1">
          <RouterProvider router={router} />
        </div>
      </div>
    </main>
  );
};

export default MainApp;
