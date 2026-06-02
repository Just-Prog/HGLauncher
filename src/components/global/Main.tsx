import { RouterProvider } from "react-router";
import MainBackground from "../home/Background";
import router from "@/routers/routes";

const MainApp = () => {
  return (
    <main>
      <RouterProvider router={router} />
    </main>
  );
};

export default MainApp;
