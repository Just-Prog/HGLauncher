import { BG_AK, BG_ENDFIELD, BG_PMPM } from "@/components/consts";
import { useEffect, useState } from "react";

const MainBackground = () => {
  const BGs = [BG_AK, BG_ENDFIELD, BG_PMPM, ""];
  const [url, setUrl] = useState(0);
  // useEffect(() => {}, []);
  return (
    <main
      style={{
        objectFit: "contain",
        backgroundImage: `url(${BGs[url]})`,
        backgroundSize: "100svw 100svh",
        paddingTop: "env(titlebar-area-height, 32px)",
        width: "100svw",
        height: "100svh",
        overflow: "hidden",
        zIndex: -10,
        position: "absolute",
        top: 0,
        left: 0,
      }}
    />
  );
};

export default MainBackground;
