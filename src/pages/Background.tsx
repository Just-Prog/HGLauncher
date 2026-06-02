import { BG_AK, ICON_AK } from "@/components/global/consts";
import { ReactNode, useEffect, useState } from "react";

const MainBackground = ({ children }: { children: ReactNode }) => {
  const [url, setUrl] = useState(BG_AK);
  useEffect(() => {}, []);
  return (
    <main
      style={{
        objectFit: "contain",
        backgroundImage: `url(${url})`,
        backgroundSize: "100svw 100svh",
        paddingTop: "env(titlebar-area-height, 32px)",
        minHeight: "100svh",
        maxHeight: "100svh",
        overflow: "hidden",
      }}
    >
      {children}
    </main>
  );
};

export default MainBackground;
