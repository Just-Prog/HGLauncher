import { useState } from "react";

import "./TitleBar.css";

const TitleBar = () => {
  const [color, setColor] = useState<"light" | "dark">("light");

  const switchTitlebarColorScheme = () => {
    setColor((previous) => (previous === "dark" ? "light" : "dark"));
  };

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "100vw",
        userSelect: "none",
        fontSize: 14,
        position: "absolute",
        top: 0,
        backgroundColor: color === "light" ? "#0000000a" : "#ffffff0a",
        transition: "200ms",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          minWidth: "calc(100%-24px)",
          alignItems: "center",
        }}
      >
        {/* 标题区 */}
        <div
          id="hg-title-title"
          data-tauri-drag-region
          style={{
            color: color === "light" ? "#fff" : "#000",
            transition: "200ms",
          }}
        >
          HGLauncher - Yet Another Hypergryph Games Launcher
        </div>
        <div
          id="hg-title-controls"
          style={{
            color: color === "light" ? "#fff" : "#000",
          }}
        >
          <div onClick={() => switchTitlebarColorScheme()}>
            <svg
              fill="none"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20.026 17.001c-2.762 4.784-8.879 6.423-13.663 3.661a9.964 9.964 0 0 1-3.234-2.983.75.75 0 0 1 .365-1.131c3.767-1.348 5.785-2.911 6.956-5.146 1.232-2.353 1.551-4.93.689-8.464a.75.75 0 0 1 .769-.926 9.961 9.961 0 0 1 4.457 1.327C21.149 6.1 22.788 12.217 20.025 17Zm-8.248-4.903c-1.25 2.388-3.31 4.099-6.817 5.499a8.492 8.492 0 0 0 2.152 1.766 8.501 8.501 0 1 0 8.502-14.725 8.485 8.485 0 0 0-2.792-1.016c.647 3.384.23 6.044-1.045 8.476Z"
                // fill="#212121"
                fill="currentColor"
              />
            </svg>
          </div>
          <div onClick={() => {}}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 12">
              <path fill="currentColor" d="M19 13H5v-2h14z" />
            </svg>
          </div>
          <div onClick={() => {}}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path fill="currentColor" d="M4 4h16v16H4zm2 4v10h12V8z" />
            </svg>
          </div>
          <div onClick={() => {}}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M13.46 12L19 17.54V19h-1.46L12 13.46L6.46 19H5v-1.46L10.54 12L5 6.46V5h1.46L12 10.54L17.54 5H19v1.46z"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TitleBar;
