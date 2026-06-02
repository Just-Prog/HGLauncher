import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import { Outlet, useNavigate } from "react-router";
import { ReactNode, useEffect } from "react";
import GamesIcon from "@mui/icons-material/Games";
import InfoIcon from "@mui/icons-material/Info";

interface SideBarItemProps {
  icon: ReactNode;
  desc: string;
  href: string;
}

const SideBarItem: React.FC<SideBarItemProps> = ({ icon, href, desc }) => {
  const nav = useNavigate();
  return (
    <Button variant="text" onClick={() => nav(href)}>
      <div className="flex flex-col gap-y-1 text-xs text-black text-shadow-black/10">
        <span className="text-shadow-sm" style={{ fontSize: 24 }}>
          {icon}
        </span>
        <span className="text-shadow-sm">{desc}</span>
      </div>
    </Button>
  );
};

const SideBar = () => {
  const top_items: SideBarItemProps[] = [
    {
      icon: <GamesIcon />,
      desc: "主页",
      href: "/",
    },
  ];

  const bottom_items: SideBarItemProps[] = [
    {
      icon: <InfoIcon />,
      desc: "关于",
      href: "/about",
    },
  ];

  return (
    <div className="w-20 h-[calc(100svh-32px)] min-h-full bg-white/78 backdrop-blur-[2px] flex items-center flex-col py-4 gap-y-2">
      <div className="flex-col flex items-center">
        {top_items.map((v) => (
          <SideBarItem {...v} />
        ))}
      </div>
      <div className="flex-1" />
      <div className="flex-col flex items-center">
        {bottom_items.map((v) => (
          <SideBarItem {...v} />
        ))}
      </div>
    </div>
  );
};

const SideBarLayout = () => {
  return (
    <div className="flex flex-1 flex-row pt-8">
      <SideBar />
      <div className="w-full flex-1">
        <Outlet />
      </div>
    </div>
  );
};

export default SideBar;
export { SideBarLayout };
