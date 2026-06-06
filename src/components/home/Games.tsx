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
      className="rounded-xl bg-white/78 backdrop-blur-[2px] flex flex-col overflow-clip relative"
      onMouseEnter={() => {
        setSelectorExpanded(true);
      }}
      onMouseLeave={() => {
        setSelectorExpanded(false);
      }}
    >
      {GameSelectorItems.map((v, k) => (
        <div
          key={k}
          className="overflow-hidden transition-all duration-300 ease-in-out"
          style={{
            maxHeight: selectorExpanded || k === currentGame ? "3.5rem" : "0rem",
            opacity: selectorExpanded || k === currentGame ? 1 : 0,
          }}
        >
          <GameSelectorItem
            icon={v}
            onClick={() => {
              setCurrentGame(k);
            }}
            desc={GameSelectorItemDescs_zh_CN[k]}
          />
        </div>
      ))}
      <span className="absolute right-4 top-4 pointer-events-none">
        {selectorExpanded ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
      </span>
    </div>
  );
};

export { GameSelector };
