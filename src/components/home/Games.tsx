import { useState } from "react";
import { ICON_AK, ICON_ENFIELD, ICON_PMPM } from "../consts";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
const GameSelectorItem = ({
  icon,
  desc,
  onClick = () => {},
}: {
  icon: string;
  desc: string | undefined;
  onClick?: () => void;
}) => {
  return (
    <div
      className="overflow-clip gap-x-4 p-3 flex flex-row justify-start items-center hover:bg-gray-300/25"
      onClick={onClick}
    >
      <img className="rounded-lg w-8 h-8 object-cover" src={icon} alt="game" />
      {desc ? <span>{desc}</span> : null}
    </div>
  );
};

const GameSelector = ({
  setCurrentGame,
  currentGame,
}: {
  setCurrentGame: (param1: number) => void;
  currentGame: number;
}) => {
  const GameSelectorItems: string[] = [ICON_AK, ICON_ENFIELD, ICON_PMPM];
  const GameSelectorItemDescs_zh_CN: string[] = [
    "明日方舟",
    "明日方舟：终末地",
    "泡姆泡姆",
  ];
  const [selectorExpanded, setSelectorExpanded] = useState<boolean>(false);
  return (
    <div
      className="rounded-xl bg-white/78 backdrop-blur-[2px] flex flex-col ease-in-out transition-all duration-300 overflow-clip"
      style={{
        transition: "width 0.5s ease, height 0.5s ease",
        interpolateSize: "allow-keywords",
      }}
      onMouseEnter={() => {
        setSelectorExpanded(true);
      }}
      onMouseLeave={() => {
        setSelectorExpanded(false);
      }}
    >
      {selectorExpanded ? (
        GameSelectorItems.map((v, k) => (
          <GameSelectorItem
            icon={v}
            key={k}
            onClick={() => {
              setCurrentGame(k);
            }}
            desc={GameSelectorItemDescs_zh_CN[k]}
          />
        ))
      ) : (
        <GameSelectorItem
          icon={GameSelectorItems[currentGame]}
          desc={GameSelectorItemDescs_zh_CN[currentGame]}
        />
      )}
      <span className="absolute right-4 top-4 ">
        {selectorExpanded ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
      </span>
    </div>
  );
};

export { GameSelector };
