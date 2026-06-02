import { platform, version } from "@tauri-apps/plugin-os";

import MainBackground from "./components/home/Background";
import TitleBar from "./components/global/TitleBar";

import "./App.css";
import { useEffect } from "react";
import MainApp from "./components/global/Main";

function App() {
  const os = platform();
  const osver = version();
  const isWindows11 = () => {
    if (os === "windows") {
      if (parseInt(osver.split(".")[2]) >= 22000) {
        return true;
      }
    }
    return false;
  };
  useEffect(() => {
    console.log(os, osver, "isWin11:", isWindows11());
  }, []);
  return (
    <div
      style={{
        backgroundColor:
          os === "windows"
            ? `rgba(255, 255, 255, ${isWindows11() ? 0 : 0.65})`
            : "#fff",
        minHeight: "100svh",
        minWidth: "100svw",
        maxHeight: "100svh",
        maxWidth: "100svw",
        overflow: "hidden",
      }}
    >
      <TitleBar />
      <MainApp />
    </div>
  );
}

export default App;
